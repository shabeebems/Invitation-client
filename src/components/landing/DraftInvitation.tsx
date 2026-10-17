"use client";

import { useSyncExternalStore, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import InvitationView from "@/components/templates/InvitationView";
import {
  createWork,
  updateWork,
  type InvitationTemplate,
  type PendingImage,
  type TemplateContent,
} from "@/lib/api";
import { clearUseDraft, readUseDraft } from "@/lib/use-draft";

const emptySubscribe = () => () => {};

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
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const stored = useSyncExternalStore(
    emptySubscribe,
    () => readUseDraft(template.slug),
    () => null
  );

  useEffect(() => {
    if (mounted && !stored) {
      router.replace(`/user/use/${template.slug}`);
    }
  }, [mounted, stored, router, template.slug]);

  async function publish(draft: InvitationTemplate, images: PendingImage[], orderId?: string) {
    const details = contentForSave(draft.content);
    const existing = createdSlug.current;
    let slug = existing;

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
    } else if (existing) {
      await updateWork(slug, details);
    }

    clearUseDraft(template.slug);
    router.push(`/user/published/${slug}`);
    return slug;
  }

  if (!stored) {
    return <p className="p-8 text-sm text-zinc-500">Opening invitation…</p>;
  }

  const preview: InvitationTemplate = {
    ...template,
    name: stored.name,
    content: { ...template.content, ...stored.content },
  };

  return <InvitationView template={preview} editable onPublish={publish} />;
}
