"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BrandLoader from "@/components/brand/BrandLoader";
import InvitationView from "@/components/templates/InvitationView";
import {
  createWork,
  updateWork,
  type InvitationTemplate,
  type PendingImage,
  type TemplateContent,
} from "@/lib/api";
import { markNavigationStart } from "@/lib/navigation-busy";
import { clearUseDraft, readUseDraft, type UseDraft } from "@/lib/use-draft";

function contentForSave(content: TemplateContent): TemplateContent {
  return {
    ...content,
    galleryItems: content.galleryItems?.map((item) => ({
      ...item,
      url: item.url.startsWith("blob:") ? "" : item.url,
    })),
  };
}

export default function DraftInvitation({ template }: { template: InvitationTemplate }) {
  const router = useRouter();
  const createdSlug = useRef("");
  const [stored, setStored] = useState<UseDraft | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const draft = readUseDraft(template.slug);
    setStored(draft);
    setReady(true);

    if (!draft) {
      markNavigationStart();
      router.replace(`/user/use/${template.slug}`);
    }
  }, [router, template.slug]);

  async function publish(draft: InvitationTemplate, images: PendingImage[], orderId?: string) {
    const details = contentForSave(draft.content);
    let slug = createdSlug.current;

    // First attempt creates + claims the paid order. Retries reuse createdSlug, or
    // createWork(orderId) returns the already-linked work if the tab was refreshed.
    if (!slug) {
      const work = await createWork({
        name: draft.name,
        categoryId: template.categoryId,
        templateId: template.id,
        selectedThemeId: draft.selectedThemeId,
        orderId,
        details,
      });
      slug = work.slug;
      createdSlug.current = slug;
    }

    if (images.length) {
      for (const image of images) {
        await updateWork(slug, details, image);
      }
    }

    clearUseDraft(template.slug);
    markNavigationStart();
    router.push(`/user/published/${slug}`);
    return slug;
  }

  if (!ready || !stored) {
    return <BrandLoader label="Opening invitation" />;
  }

  const preview: InvitationTemplate = {
    ...template,
    name: stored.name,
    content: { ...template.content, ...stored.content },
    selectedThemeId: stored.selectedThemeId || template.selectedThemeId,
    selectedThemeTitle:
      template.themes?.find((theme) => theme.id === (stored.selectedThemeId || template.selectedThemeId))
        ?.title || template.selectedThemeTitle,
  };

  return <InvitationView template={preview} editable onPublish={publish} />;
}
