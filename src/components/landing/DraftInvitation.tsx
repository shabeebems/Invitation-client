"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import InvitationView from "@/components/templates/InvitationView";
import {
  API_URL,
  type InvitationTemplate,
  type PendingImage,
  type TemplateContent,
} from "@/lib/api";
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
  const [stored, setStored] = useState<UseDraft | null | undefined>(undefined);

  useEffect(() => {
    const draft = readUseDraft(template.slug);

    if (!draft) {
      router.replace(`/use/${template.slug}`);
      return;
    }

    setStored(draft);
  }, [router, template.slug]);

  async function publish(draft: InvitationTemplate, images: PendingImage[]) {
    const details = contentForSave(draft.content);
    const existing = createdSlug.current;
    let slug = existing;

    if (!slug) {
      const response = await fetch(`${API_URL}/api/works`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: draft.name,
          categoryId: template.categoryId,
          templateId: template.id,
          selectedThemeId: draft.selectedThemeId,
          details,
        }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        work?: { slug?: string };
      };

      if (!response.ok || !data.success || !data.work?.slug) {
        throw new Error(data.message || "Could not save invitation");
      }

      slug = data.work.slug;
      createdSlug.current = slug;
    }

    if (images.length) {
      for (const image of images) {
        const body = new FormData();
        body.append("content", JSON.stringify(details));
        body.append("image", image.file);
        body.append("imageSlot", image.slot);

        if (image.galleryIndex !== undefined) {
          body.append("galleryIndex", String(image.galleryIndex));
        }

        const response = await fetch(`${API_URL}/api/works/${slug}`, {
          method: "PUT",
          credentials: "include",
          body,
        });

        if (!response.ok) {
          const data = (await response.json()) as { message?: string };
          throw new Error(data.message || "Could not save a photo");
        }
      }
    } else if (existing) {
      const body = new FormData();
      body.append("content", JSON.stringify(details));
      const response = await fetch(`${API_URL}/api/works/${slug}`, {
        method: "PUT",
        credentials: "include",
        body,
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        throw new Error(data.message || "Could not save invitation");
      }
    }

    clearUseDraft(template.slug);
    router.push(`/published/${slug}`);
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
