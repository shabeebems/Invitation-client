"use client";

import { useRef, useState } from "react";
import EditableField from "@/components/templates/EditableField";
import InvitationEditChrome, { type EditChromeVariant } from "@/components/templates/InvitationEditChrome";
import {
  invitationApiBase,
  invitationDoneHref,
  rememberPendingImage,
  type InvitationTemplate,
  type PendingImage,
  type TemplateContent,
} from "@/lib/api";

type ContentTextKey = Exclude<keyof TemplateContent, "programItems" | "galleryItems">;

type SaveImage = {
  file: File;
  slot?: "hero" | "gallery";
  galleryIndex?: number;
};

export function useInvitationEditor({
  template,
  editable = false,
  onPublish,
  variant,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
  variant: EditChromeVariant;
}) {
  const [draft, setDraft] = useState(template);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [publishing, setPublishing] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const pendingImages = useRef<PendingImage[]>([]);
  const editing = editable && !previewing;

  async function persist(nextContent: TemplateContent, image?: SaveImage) {
    if (onPublish) {
      if (image) {
        pendingImages.current = rememberPendingImage(pendingImages.current, {
          file: image.file,
          slot: image.slot || "hero",
          galleryIndex: image.galleryIndex,
        });
      }
      return;
    }

    setStatus("saving");

    const body = new FormData();
    body.append("content", JSON.stringify(nextContent));

    if (image) {
      body.append("image", image.file);
      body.append("imageSlot", image.slot || "hero");
      if (image.slot === "gallery" && image.galleryIndex !== undefined) {
        body.append("galleryIndex", String(image.galleryIndex));
      }
    }

    try {
      const response = await fetch(invitationApiBase(draft), {
        method: "PUT",
        credentials: "include",
        body,
      });
      const data = (await response.json()) as {
        success?: boolean;
        template?: InvitationTemplate;
      };

      if (!response.ok || !data.success || !data.template) {
        throw new Error("Save failed");
      }

      setDraft(data.template);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }

  function commit(key: ContentTextKey, value: string) {
    setDraft((prev) => {
      if ((prev.content[key] || "") === value) {
        return prev;
      }

      const nextContent = { ...prev.content, [key]: value };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  async function publish() {
    if (!onPublish || publishing) {
      return;
    }

    setPublishing(true);
    setStatus("saving");

    try {
      await onPublish(draft, pendingImages.current);
    } catch (err) {
      setStatus("error");
      setPublishing(false);
      throw err;
    }
  }

  function field(key: ContentTextKey, className = "", multiline = false) {
    const value = draft.content[key];
    return (
      <EditableField
        value={typeof value === "string" ? value : ""}
        editable={editing}
        className={className}
        multiline={multiline}
        onCommit={(next) => commit(key, next)}
      />
    );
  }

  const themeTitle =
    draft.selectedThemeTitle ||
    draft.themes?.find((theme) => theme.id === draft.selectedThemeId)?.title ||
    "";

  const chrome = (
    <InvitationEditChrome
      variant={variant}
      editing={editing}
      previewing={previewing}
      status={status}
      publishing={publishing}
      canPublish={Boolean(onPublish)}
      doneHref={invitationDoneHref(draft)}
      invitationName={draft.name}
      slug={draft.slug}
      selectedThemeId={draft.selectedThemeId}
      themes={draft.themes || []}
      source={draft.source}
      payOpen={payOpen}
      onEnterPreview={() => {
        setStatus("idle");
        setPreviewing(true);
        window.scrollTo({ top: 0 });
      }}
      onBackToEdit={() => {
        setPublishing(false);
        setStatus("idle");
        setPreviewing(false);
        setPayOpen(false);
        window.scrollTo({ top: 0 });
      }}
      onOpenPay={() => {
        setStatus("idle");
        setPayOpen(true);
      }}
      onClosePay={() => {
        if (!publishing) {
          setPayOpen(false);
        }
      }}
      onConfirmPay={publish}
      onThemeChange={(selectedThemeId, themes) => {
        setDraft((prev) => ({
          ...prev,
          selectedThemeId,
          selectedThemeTitle: themes.find((theme) => theme.id === selectedThemeId)?.title || prev.selectedThemeTitle,
          themes,
        }));
        setStatus("saved");
      }}
    />
  );

  return {
    draft,
    setDraft,
    content: draft.content,
    editing,
    previewing,
    payOpen,
    persist,
    field,
    themeTitle,
    chrome,
  };
}
