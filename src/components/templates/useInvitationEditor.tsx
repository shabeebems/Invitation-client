"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import EditableField from "@/components/templates/EditableField";
import InvitationEditChrome, { type EditChromeVariant } from "@/components/templates/InvitationEditChrome";
import {
  invitationApiBase,
  invitationDoneHref,
  rememberPendingImage,
  withImageUrl,
  type AdminUser,
  type GalleryItem,
  type ImageSlot,
  type InvitationTemplate,
  type LocationItem,
  type LoveStoryItem,
  type PendingImage,
  type ProgramItem,
  type TemplateContent,
} from "@/lib/api";
import {
  GALLERY_ITEM_MAX,
  LOCATION_ITEM_MAX,
  LOVE_STORY_ITEM_MAX,
  MAX_GALLERY_ITEMS,
  MAX_LOCATION_ITEMS,
  MAX_LOVE_STORY_ITEMS,
  MAX_PROGRAM_ITEMS,
  PROGRAM_ITEM_MAX,
  clampText,
  maxForContentField,
} from "@/lib/content-limits";
import { isEventDateAllowed, partsFromEventDate, toEventDateIso } from "@/lib/event-date";
import { loadSession } from "@/lib/session";
import {
  resolveEnabledSections,
  sectionsForFamily,
  toggleSection,
  type TemplateSectionFamily,
} from "@/lib/template-sections";
import { ambianceEffectsForFamily } from "@/lib/template-ambiance";

function clampContent(content: TemplateContent): TemplateContent {
  const next: TemplateContent = { ...content };

  (Object.keys(next) as (keyof TemplateContent)[]).forEach((key) => {
    if (
      key === "programItems" ||
      key === "galleryItems" ||
      key === "loveStoryItems" ||
      key === "locationItems" ||
      key === "enabledSections"
    ) {
      return;
    }
    const value = next[key];
    if (typeof value === "string") {
      next[key] = clampText(value, maxForContentField(key));
    }
  });

  if (Array.isArray(next.programItems)) {
    next.programItems = next.programItems.slice(0, MAX_PROGRAM_ITEMS).map((item) => ({
      time: clampText(item.time || "", PROGRAM_ITEM_MAX.time),
      title: clampText(item.title || "", PROGRAM_ITEM_MAX.title),
      description: clampText(item.description || "", PROGRAM_ITEM_MAX.description),
    }));
  }

  if (Array.isArray(next.galleryItems)) {
    next.galleryItems = next.galleryItems.slice(0, MAX_GALLERY_ITEMS).map((item) => ({
      eyebrow: clampText(item.eyebrow || "", GALLERY_ITEM_MAX.eyebrow),
      title: clampText(item.title || "", GALLERY_ITEM_MAX.title),
      caption: clampText(item.caption || "", GALLERY_ITEM_MAX.caption),
      url: item.url || "",
      publicId: item.publicId || "",
    }));
  }

  if (Array.isArray(next.loveStoryItems)) {
    next.loveStoryItems = next.loveStoryItems.slice(0, MAX_LOVE_STORY_ITEMS).map((item) => ({
      icon: item.icon || "",
      date: clampText(item.date || "", LOVE_STORY_ITEM_MAX.date),
      place: clampText(item.place || "", LOVE_STORY_ITEM_MAX.place),
      title: clampText(item.title || "", LOVE_STORY_ITEM_MAX.title),
      url: item.url || "",
      publicId: item.publicId || "",
    }));
  }

  if (Array.isArray(next.locationItems)) {
    next.locationItems = next.locationItems.slice(0, MAX_LOCATION_ITEMS).map((item) => ({
      label: clampText(item.label || "", LOCATION_ITEM_MAX.label),
      title: clampText(item.title || "", LOCATION_ITEM_MAX.title),
      address: clampText(item.address || "", LOCATION_ITEM_MAX.address),
      mapsUrl: clampText(item.mapsUrl || "", LOCATION_ITEM_MAX.mapsUrl),
    }));
  }

  if (Array.isArray(next.enabledSections)) {
    next.enabledSections = next.enabledSections
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 32);
  }

  return next;
}

type ContentTextKey = Exclude<
  keyof TemplateContent,
  "programItems" | "galleryItems" | "loveStoryItems" | "locationItems" | "enabledSections"
>;

const emptyGalleryItem = (): GalleryItem => ({
  eyebrow: "Moment",
  title: "New photo",
  caption: "Add a short caption",
  url: "",
  publicId: "",
});

type SaveImage = {
  file: File;
  slot?: ImageSlot;
  galleryIndex?: number;
  loveStoryIndex?: number;
};

const emptyLoveStoryItem = (): LoveStoryItem => ({
  icon: "",
  date: "Date",
  place: "Place",
  title: "New chapter",
  url: "",
  publicId: "",
});

export function useInvitationEditor({
  template,
  editable = false,
  onPublish,
  variant,
  sectionFamily,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (
    draft: InvitationTemplate,
    images: PendingImage[],
    orderId?: string
  ) => Promise<string | undefined | void>;
  variant: EditChromeVariant;
  /** Enables section add/remove in the bottom edit bar for this template family. */
  sectionFamily?: TemplateSectionFamily;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(template);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [role, setRole] = useState<AdminUser["role"] | undefined>();
  const pendingImages = useRef<PendingImage[]>([]);
  const draftRef = useRef(draft);
  const savesInFlight = useRef<Promise<boolean>[]>([]);
  const lastSaveOk = useRef(true);
  const editing = editable && !previewing;

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((user) => {
      if (!cancelled) {
        setRole(user?.role);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function persist(nextContent: TemplateContent, image?: SaveImage): Promise<boolean> {
    const safeContent = clampContent(nextContent);

    if (onPublish) {
      if (image) {
        pendingImages.current = rememberPendingImage(pendingImages.current, {
          file: image.file,
          slot: image.slot || "hero",
          galleryIndex: image.galleryIndex,
          loveStoryIndex: image.loveStoryIndex,
        });
      }
      return true;
    }

    setStatus("saving");
    setStatusMessage("");

    const body = new FormData();
    body.append("content", JSON.stringify(safeContent));

    if (image) {
      body.append("image", image.file);
      body.append("imageSlot", image.slot || "hero");
      if (image.slot === "gallery" && image.galleryIndex !== undefined) {
        body.append("galleryIndex", String(image.galleryIndex));
      }
      if (image.slot === "loveStory" && image.loveStoryIndex !== undefined) {
        body.append("loveStoryIndex", String(image.loveStoryIndex));
      }
    }

    const request = (async () => {
      try {
        const response = await fetch(invitationApiBase(draftRef.current), {
          method: "PUT",
          credentials: "include",
          body,
        });
        const data = (await response.json()) as {
          success?: boolean;
          message?: string;
          template?: InvitationTemplate;
          work?: InvitationTemplate;
        };

        const saved = data.template || data.work;
        if (!response.ok || !data.success || !saved) {
          throw new Error(data.message || "Save failed");
        }

        setDraft(saved);
        draftRef.current = saved;
        lastSaveOk.current = true;
        setStatus("saved");
        setStatusMessage("");
        return true;
      } catch (error) {
        lastSaveOk.current = false;
        setStatus("error");
        setStatusMessage(error instanceof Error ? error.message : "Could not save");
        return false;
      }
    })();

    savesInFlight.current.push(request);
    const ok = await request;
    savesInFlight.current = savesInFlight.current.filter((item) => item !== request);
    return ok;
  }

  async function flushSaves() {
    if (savesInFlight.current.length === 0) {
      return lastSaveOk.current;
    }
    const results = await Promise.all([...savesInFlight.current]);
    return results.every(Boolean);
  }

  function commit(key: ContentTextKey, value: string) {
    const safeValue = clampText(value, maxForContentField(key));
    setDraft((prev) => {
      if ((prev.content[key] || "") === safeValue) {
        return prev;
      }

      const nextContent = { ...prev.content, [key]: safeValue };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function commitEventDate(value: string, categoryName = "wedding"): boolean {
    if (!value) {
      return false;
    }

    if (!isEventDateAllowed(value)) {
      setStatus("error");
      return false;
    }

    const iso = toEventDateIso(value);
    if (!iso) {
      return false;
    }

    const parts = partsFromEventDate(value, categoryName);
    setDraft((prev) => {
      const nextContent = {
        ...prev.content,
        eventDateIso: clampText(iso, maxForContentField("eventDateIso")),
        weekday: clampText(parts.weekday, maxForContentField("weekday")),
        day: clampText(parts.day, maxForContentField("day")),
        monthYear: clampText(parts.monthYear, maxForContentField("monthYear")),
        time: clampText(parts.time, maxForContentField("time")),
      };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
    return true;
  }

  function changeImage(file: File, slot: ImageSlot = "hero") {
    const previousImages = draftRef.current.images;
    const preview = URL.createObjectURL(file);
    lastSaveOk.current = false;
    setStatus("saving");
    setStatusMessage("Uploading photo…");
    setDraft((prev) => ({ ...prev, images: withImageUrl(prev.images, slot, preview) }));
    void persist(draftRef.current.content, { file, slot }).then((ok) => {
      URL.revokeObjectURL(preview);
      if (!ok) {
        setDraft((prev) => ({ ...prev, images: previousImages }));
        setStatusMessage("Photo not saved — try again");
      }
    });
  }

  async function finishEditing() {
    setStatus("saving");
    setStatusMessage("Saving…");
    const ok = await flushSaves();
    if (!ok) {
      setStatus("error");
      setStatusMessage("Photo not saved — try again");
      return;
    }
    setStatus("saved");
    setStatusMessage("");
    router.push(invitationDoneHref(draftRef.current, role));
    router.refresh();
  }

  function persistGallery(items: GalleryItem[]) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, galleryItems: items };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function changeGalleryImage(index: number, file: File) {
    const previousItems = draftRef.current.content.galleryItems || [];
    const preview = URL.createObjectURL(file);
    lastSaveOk.current = false;
    setStatus("saving");
    setStatusMessage("Uploading photo…");
    setDraft((prev) => {
      const items = [...(prev.content.galleryItems || [])];
      const item = items[index] || emptyGalleryItem();
      items[index] = { ...item, url: preview };
      const nextContent = { ...prev.content, galleryItems: items };
      void persist(nextContent, { file, slot: "gallery", galleryIndex: index }).then((ok) => {
        URL.revokeObjectURL(preview);
        if (!ok) {
          setDraft((current) => ({
            ...current,
            content: { ...current.content, galleryItems: previousItems },
          }));
          setStatusMessage("Photo not saved — try again");
        }
      });
      return { ...prev, content: nextContent };
    });
  }

  function commitGalleryItem(index: number, key: keyof Pick<GalleryItem, "eyebrow" | "title" | "caption">, value: string) {
    const current = [...(draft.content.galleryItems || [])];
    if (!current[index]) {
      current[index] = emptyGalleryItem();
    }
    current[index] = { ...current[index], [key]: clampText(value, GALLERY_ITEM_MAX[key]) };
    persistGallery(current);
  }

  function addGalleryItem() {
    const current = draft.content.galleryItems || [];
    if (current.length >= MAX_GALLERY_ITEMS) {
      return;
    }
    persistGallery([...current, emptyGalleryItem()]);
  }

  function removeGalleryItem(index: number) {
    persistGallery((draft.content.galleryItems || []).filter((_, itemIndex) => itemIndex !== index));
  }

  function setGalleryLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, galleryLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setCountdownLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, countdownLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setHeroLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, heroLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setProgramLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, programLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setAmbianceEffect(effect: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, ambianceEffect: effect };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setSectionEnabled(sectionId: string, on: boolean) {
    if (!sectionFamily) return;
    setDraft((prev) => {
      const nextSections = toggleSection(
        sectionFamily,
        prev.content.enabledSections || [],
        sectionId,
        on
      );
      const nextContent = {
        ...prev.content,
        enabledSections: resolveEnabledSections(sectionFamily, nextSections),
      };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  const sectionCatalog = sectionFamily ? sectionsForFamily(sectionFamily) : undefined;
  const enabledSections = sectionFamily
    ? resolveEnabledSections(sectionFamily, draft.content.enabledSections)
    : undefined;

  function setMeetCoupleLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, meetCoupleLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setLoveStoryLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, loveStoryLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setLocationLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, locationLayout: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function persistLocations(items: LocationItem[]) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, locationItems: items };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function commitLocationItem(index: number, key: keyof LocationItem, value: string) {
    const current = [...(draft.content.locationItems || [])];
    if (!current[index]) {
      current[index] = { label: "Venue", title: "", address: "", mapsUrl: "" };
    }
    const max = LOCATION_ITEM_MAX[key as keyof typeof LOCATION_ITEM_MAX] ?? maxForContentField(key);
    current[index] = { ...current[index], [key]: clampText(value, max) };
    persistLocations(current);
  }

  function addLocationItem() {
    const current = draft.content.locationItems || [];
    if (current.length >= MAX_LOCATION_ITEMS) {
      return;
    }
    persistLocations([
      ...current,
      {
        label: "New venue",
        title: "Venue name",
        address: "Full address",
        mapsUrl: "",
      },
    ]);
  }

  function removeLocationItem(index: number) {
    persistLocations((draft.content.locationItems || []).filter((_, itemIndex) => itemIndex !== index));
  }

  function commitProgramItem(index: number, key: keyof ProgramItem, value: string) {
    const safeValue = clampText(value, PROGRAM_ITEM_MAX[key]);
    setDraft((prev) => {
      const current = [...(prev.content.programItems || [])].slice(0, MAX_PROGRAM_ITEMS);
      if (!current[index]) {
        current[index] = { time: "", title: "", description: "" };
      }
      current[index] = { ...current[index], [key]: safeValue };
      const nextContent = { ...prev.content, programItems: current };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function persistLoveStory(items: LoveStoryItem[]) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, loveStoryItems: items };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function ensureLoveStoryItems(source: LoveStoryItem[] | undefined, minLength: number) {
    const current = [...(source || [])];
    while (current.length < minLength) {
      current.push(emptyLoveStoryItem());
    }
    return current;
  }

  function commitLoveStoryItem(index: number, key: keyof LoveStoryItem, value: string) {
    const max =
      key in LOVE_STORY_ITEM_MAX
        ? LOVE_STORY_ITEM_MAX[key as keyof typeof LOVE_STORY_ITEM_MAX]
        : maxForContentField(key);
    const safeValue = clampText(value, max);
    setDraft((prev) => {
      const current = ensureLoveStoryItems(prev.content.loveStoryItems, index + 1).slice(
        0,
        MAX_LOVE_STORY_ITEMS
      );
      current[index] = { ...current[index], [key]: safeValue };
      const nextContent = { ...prev.content, loveStoryItems: current };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function addLoveStoryItem() {
    const current = draft.content.loveStoryItems?.length
      ? [...draft.content.loveStoryItems]
      : [
          { icon: "", date: "", place: "", title: "How we met", url: "", publicId: "" },
          { icon: "", date: "", place: "", title: "First conversation", url: "", publicId: "" },
          { icon: "", date: "", place: "", title: "First date", url: "", publicId: "" },
          { icon: "", date: "", place: "", title: "The proposal", url: "", publicId: "" },
          { icon: "", date: "", place: "", title: "Engagement day", url: "", publicId: "" },
          { icon: "", date: "", place: "", title: "Wedding announcement", url: "", publicId: "" },
        ];
    if (current.length >= MAX_LOVE_STORY_ITEMS) {
      return;
    }
    persistLoveStory([...current, emptyLoveStoryItem()]);
  }

  function removeLoveStoryItem(index: number) {
    const current = draft.content.loveStoryItems?.length
      ? draft.content.loveStoryItems
      : [];
    persistLoveStory(current.filter((_, itemIndex) => itemIndex !== index));
  }

  function changeLoveStoryImage(index: number, file: File) {
    const previousItems = draftRef.current.content.loveStoryItems || [];
    const preview = URL.createObjectURL(file);
    lastSaveOk.current = false;
    setStatus("saving");
    setStatusMessage("Uploading photo…");
    setDraft((prev) => {
      const items = ensureLoveStoryItems(prev.content.loveStoryItems, index + 1);
      items[index] = { ...items[index], url: preview };
      const nextContent = { ...prev.content, loveStoryItems: items };
      void persist(nextContent, { file, slot: "loveStory", loveStoryIndex: index }).then((ok) => {
        URL.revokeObjectURL(preview);
        if (!ok) {
          setDraft((current) => ({
            ...current,
            content: { ...current.content, loveStoryItems: previousItems },
          }));
          setStatusMessage("Photo not saved — try again");
        }
      });
      return { ...prev, content: nextContent };
    });
  }

  async function publish(orderId?: string) {
    if (!onPublish || publishing) {
      return;
    }

    setPublishing(true);
    setStatus("saving");

    try {
      await onPublish(
        { ...draft, content: clampContent(draft.content) },
        pendingImages.current,
        orderId
      );
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
        maxLength={maxForContentField(key)}
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
      statusMessage={statusMessage}
      publishing={publishing}
      canPublish={Boolean(onPublish)}
      doneHref={invitationDoneHref(draft, role)}
      onDone={finishEditing}
      invitationName={draft.name}
      slug={draft.slug}
      templateId={draft.templateId || draft.id}
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
      ambianceEffect={draft.content.ambianceEffect}
      ambianceEffects={
        sectionFamily === "royal" || sectionFamily === "house"
          ? ambianceEffectsForFamily(sectionFamily)
          : undefined
      }
      onAmbianceEffectChange={
        sectionFamily === "royal" || sectionFamily === "house" ? setAmbianceEffect : undefined
      }
      sectionCatalog={sectionCatalog}
      enabledSections={enabledSections}
      onSectionToggle={sectionFamily ? setSectionEnabled : undefined}
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
    commitEventDate,
    changeImage,
    changeGalleryImage,
    commitGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    setGalleryLayout,
    setCountdownLayout,
    setProgramLayout,
    setHeroLayout,
    setAmbianceEffect,
    setMeetCoupleLayout,
    setLoveStoryLayout,
    setLocationLayout,
    commitLocationItem,
    addLocationItem,
    removeLocationItem,
    commitProgramItem,
    commitLoveStoryItem,
    addLoveStoryItem,
    removeLoveStoryItem,
    changeLoveStoryImage,
    themeTitle,
    chrome,
  };
}
