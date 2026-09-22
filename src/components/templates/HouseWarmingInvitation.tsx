"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { invitationApiBase, invitationDoneHref, type GalleryItem, type InvitationTemplate, type InvitationTheme, type ProgramItem, type TemplateContent, imageUrl, withImageUrl } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";
import ThemePicker from "@/components/templates/ThemePicker";

export const TERRACOTTA_THEME_ID = "6ab11eefd26a7018a27ad6e4";
export const SAGE_THEME_ID = "6ab11eefd26a7018a27ad6e7";

type ContentTextKey = Exclude<keyof TemplateContent, "programItems" | "galleryItems">;
type ImageSlot = "hero";

type Countdown = { days: number; hours: number; minutes: number; seconds: number; live: boolean };

function useCountdown(iso: string): Countdown {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const target = new Date(iso).getTime();
  if (!iso || Number.isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true };
  }

  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    live: diff <= 0,
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function mapsEmbed(url: string) {
  const pair = url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=17&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
}

function Flower({ className = "" }: { className?: string }) {
  return <span className={className}>❀</span>;
}

function HouseIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20H4v-8.5Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function HouseWarmingInvitation({
  template,
  editable = false,
}: {
  template: InvitationTemplate;
  editable?: boolean;
}) {
  const [draft, setDraft] = useState(template);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [opened, setOpened] = useState(editable);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const imageRefs = useRef<Record<ImageSlot, HTMLInputElement | null>>({
    hero: null,
  });
  const galleryInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { content } = draft;
  const countdown = useCountdown(content.eventDateIso || "");
  const shareText = encodeURIComponent(content.shareText || "");
  const heroSrc = imageUrl(draft.images, "hero");

  const program = content.programItems || [];
  const gallery = content.galleryItems || [];

  async function persist(
    nextContent: TemplateContent,
    image?: File,
    imageSlot: ImageSlot | "gallery" = "hero",
    galleryIndex?: number
  ) {
    setStatus("saving");
    const body = new FormData();
    body.append("content", JSON.stringify(nextContent));

    if (image) {
      body.append("image", image);
      body.append("imageSlot", imageSlot);
      if (imageSlot === "gallery" && galleryIndex !== undefined) {
        body.append("galleryIndex", String(galleryIndex));
      }
    }

    try {
      const response = await fetch(invitationApiBase(draft), {
        method: "PUT",
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

  function persistProgram(items: ProgramItem[]) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, programItems: items };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function commitProgram(index: number, key: keyof ProgramItem, value: string) {
    persistProgram(
      program.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item))
    );
  }

  function addProgram() {
    persistProgram([...program, { time: "Time", title: "New program", description: "Tap to add details" }]);
  }

  function removeProgram(index: number) {
    persistProgram(program.filter((_, itemIndex) => itemIndex !== index));
  }

  function persistGallery(items: GalleryItem[]) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, galleryItems: items };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function commitGallery(index: number, key: keyof Pick<GalleryItem, "eyebrow" | "title" | "caption">, value: string) {
    persistGallery(gallery.map((item, itemIndex) => (itemIndex === index ? { ...item, [key]: value } : item)));
  }

  function addGallery() {
    persistGallery([
      ...gallery,
      { eyebrow: "Tag", title: "New photo", caption: "Tap to add details", url: "", publicId: "" },
    ]);
  }

  function removeGallery(index: number) {
    persistGallery(gallery.filter((_, itemIndex) => itemIndex !== index));
    setLightbox((open) => (open === index ? null : open !== null && open > index ? open - 1 : open));
  }

  function changeImage(slot: ImageSlot, file: File) {
    const preview = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, images: withImageUrl(prev.images, slot, preview) }));
    void persist(draft.content, file, slot);
  }

  function changeGalleryImage(index: number, file: File) {
    const preview = URL.createObjectURL(file);
    setDraft((prev) => {
      const items = [...(prev.content.galleryItems || [])];
      items[index] = { ...items[index], url: preview };
      return { ...prev, content: { ...prev.content, galleryItems: items } };
    });
    void persist(content, file, "gallery", index);
  }

  const field = (key: ContentTextKey, className = "", multiline = false) => (
    <EditableField
      value={typeof content[key] === "string" ? content[key] : ""}
      editable={editable}
      className={className}
      multiline={multiline}
      onCommit={(value) => commit(key, value)}
    />
  );

  function imageButton(slot: ImageSlot, className: string, children: ReactNode, label: string) {
    return (
      <>
        <div
          className={`${className} ${editable ? "cursor-pointer" : ""}`}
          role={editable ? "button" : undefined}
          tabIndex={editable ? 0 : undefined}
          onClick={() => {
            if (editable) {
              imageRefs.current[slot]?.click();
            }
          }}
          onKeyDown={(event) => {
            if (editable && (event.key === "Enter" || event.key === " ")) {
              event.preventDefault();
              imageRefs.current[slot]?.click();
            }
          }}
          aria-label={editable ? label : undefined}
        >
          {children}
          {editable ? (
            <span className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)]/90 px-3 py-1 text-[10px] font-semibold tracking-[1.2px] text-[#87361b] uppercase">
              Change photo
            </span>
          ) : null}
        </div>
        {editable ? (
          <input
            ref={(node) => {
              imageRefs.current[slot] = node;
            }}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void changeImage(slot, file);
              }
              event.target.value = "";
            }}
          />
        ) : null}
      </>
    );
  }

  function downloadIcs() {
    const start = icsStamp(content.eventDateIso || new Date().toISOString());
    const end = icsStamp(content.eventEndIso || content.eventDateIso || new Date().toISOString());
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:Housewarming — ${content.hostNames}`,
      `LOCATION:${content.addressFull}`,
      `DESCRIPTION:${(content.shareText || "").replace(/\n/g, "\\n")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "housewarming.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(content.addressFull || "");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  const googleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Housewarming Celebration — ${content.hostNames}`
  )}&dates=${icsStamp(content.eventDateIso || new Date().toISOString()).replace("Z", "")}/${icsStamp(
    content.eventEndIso || content.eventDateIso || new Date().toISOString()
  ).replace("Z", "")}&details=${encodeURIComponent(
    content.shareText || ""
  )}&location=${encodeURIComponent(content.addressFull || "")}`;

  let themeClass = "";
  if (draft.selectedThemeId === SAGE_THEME_ID) {
    themeClass = " palette-sage";
  } else if (draft.selectedThemeId === TERRACOTTA_THEME_ID) {
    themeClass = "";
  }

  const units = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Minutes", value: countdown.minutes },
    { label: "Seconds", value: countdown.seconds },
  ];

  return (
    <main className={`house-warming relative${themeClass}`}>
      {editable ? (
        <div className="fixed top-[max(10px,env(safe-area-inset-top,0px))] left-[max(12px,env(safe-area-inset-left,0px))] z-[1200] flex max-w-[min(92vw,360px)] flex-col gap-1 rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-nav)] px-3 py-2.5 text-[#221c18] shadow-[0_10px_28px_rgba(34,28,24,0.12)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Link
              href={invitationDoneHref(draft)}
              className="rounded-full border border-[#ab4f3166] px-3 py-1 text-[10px] font-semibold tracking-[1.4px] text-[#87361b] uppercase no-underline hover:bg-[#ab4f31] hover:text-white"
            >
              Done
            </Link>
            <span className="text-[9px] tracking-[1.4px] text-[#796e65] uppercase">
              {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : status === "error" ? "Could not save" : "Editing"}
            </span>
          </div>
          <p className="m-0 text-[11px] text-[#796e65]">Tap any text or photo to edit</p>
          <ThemePicker
            slug={draft.slug}
            selectedThemeId={draft.selectedThemeId}
            themes={draft.themes || []}
            source={draft.source}
            variant="house"
            onChange={(selectedThemeId, themes: InvitationTheme[]) => {
              setDraft((prev) => ({
                ...prev,
                selectedThemeId,
                selectedThemeTitle: themes.find((theme) => theme.id === selectedThemeId)?.title || prev.selectedThemeTitle,
                themes,
              }));
              setStatus("saved");
            }}
          />
        </div>
      ) : null}

      <div className={`hw-envelope ${opened ? "is-open" : ""}`}>
        <p className="hw-font-arabic mb-1 text-center text-[1.85rem] leading-[1.4] text-[#e4be57] [text-shadow:0_2px_14px_#e6c56859]">
          {content.bismillah}
        </p>
        <p className="mb-7 text-center text-[0.88rem] font-medium tracking-[0.12em] text-[#f7f1e7cc] uppercase">
          {field("envelopeTagline", "uppercase")}
        </p>
        <button type="button" className="hw-envelope-card" onClick={() => setOpened(true)} aria-label="Break wax seal and open invitation">
          <span className="hw-wax">
            <HouseIcon className="h-8 w-8 text-[#fff2e0]" />
            <span className="mt-0.5 text-[0.62rem] font-bold tracking-[0.14em] text-[#ffe6cf] uppercase">Open</span>
          </span>
        </button>
        <p className="mt-8 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.95rem] text-[#f7f1e7]">
          → {field("openHint")}
        </p>
        <button type="button" className="mt-3.5 text-[0.82rem] text-white/55 underline" onClick={() => setOpened(true)}>
          {field("skipLabel")}
        </button>
      </div>

      <nav className="hw-nav" aria-label="Primary Navigation">
        <a href="#celebration" className="hw-font-serif flex items-center gap-2 text-[1.15rem] font-semibold text-[#221c18] no-underline">
          <Flower className="text-[var(--color-terracotta)]" />
          {field("hostNames")}
          <Flower className="text-[var(--color-terracotta)]" />
        </a>
        <ul className="hw-nav-links m-0 flex list-none items-center gap-6 p-0">
          <li>
            <a className="text-[0.88rem] font-medium text-[#473e37] no-underline hover:text-[var(--color-terracotta)]" href="#celebration">
              {field("navCelebration")}
            </a>
          </li>
          <li>
            <a className="text-[0.88rem] font-medium text-[#473e37] no-underline hover:text-[var(--color-terracotta)]" href="#schedule">
              {field("navProgram")}
            </a>
          </li>
          <li>
            <a className="text-[0.88rem] font-medium text-[#473e37] no-underline hover:text-[var(--color-terracotta)]" href="#gallery">
              {field("navTour")}
            </a>
          </li>
          <li>
            <a className="text-[0.88rem] font-medium text-[#473e37] no-underline hover:text-[var(--color-terracotta)]" href="#location">
              {field("navLocation")}
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#c59b2740] bg-[var(--color-terracotta-soft)] text-[var(--color-terracotta-dark)]"
          onClick={() => setOpened(false)}
          aria-label="Replay envelope opening"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
            <path d="M4 8h12l-3-3M20 16H8l3 3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      <section id="celebration" className="relative z-[2] flex min-h-svh flex-col items-center px-6 pt-[110px] pb-[70px] text-center">
        <p className="hw-font-arabic mb-1.5 text-[clamp(2.2rem,5vw,3.2rem)] leading-[1.3] text-[#c59b27] [filter:drop-shadow(0_2px_8px_#c59b2740)]">
          {field("bismillah")}
        </p>
        <p className="mb-[22px] text-[0.88rem] tracking-[0.08em] text-[#796e65] italic">
          {field("bismillahTranslation")}
        </p>
        <p className="hw-badge mb-5 inline-flex items-center gap-2 px-5 py-1.5 text-[0.82rem] font-semibold">
          <Flower /> {field("mashallahBadge")} <Flower />
        </p>
        <h1 className="hw-font-serif mb-3.5 text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.15] font-semibold text-[#221c18]">
          {field("headlinePrefix")}
          <span className="hw-name-gradient mt-1 block">{field("hostNames")}</span>
        </h1>
        <p className="hw-font-serif mb-2.5 text-[1.3rem] tracking-[0.04em] text-[var(--color-terracotta-dark)] italic">
          {field("familyLine")}
        </p>
        <p className="mx-auto mb-7 max-w-[640px] text-[clamp(1rem,2vw,1.2rem)] leading-[1.7] text-[#473e37] italic">
          “{field("blessing", "", true)}”
        </p>

        {imageButton(
          "hero",
          "hw-cutout-stage relative mx-auto mb-9 flex w-full max-w-[820px] flex-col items-center",
          <>
            <span className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[90%] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(#e6c56852_0%,#ab4f311f_45%,transparent_75%)] blur-2xl" />
            {heroSrc ? (
              <img src={heroSrc} alt={content.houseName} className="hw-cutout-img relative z-[2]" />
            ) : (
              <span className="relative z-[2] inline-flex min-h-48 items-center rounded-2xl border border-dashed border-[var(--color-linen-border)] px-8 text-sm text-[#796e65]">
                Add house photo
              </span>
            )}
            <span className="relative z-[3] mt-3.5 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)]/90 px-4 py-1.5 shadow-sm">
              <span className="hw-font-serif inline-flex items-center gap-1.5 text-[1.05rem] font-semibold text-[#221c18]">
                <HouseIcon className="h-4 w-4 text-[var(--color-terracotta)]" />
                {field("houseName")}
              </span>
              <span className="border-l border-[var(--color-linen-border)] pl-2.5 text-[0.82rem] text-[#796e65]">{field("venueCity")}</span>
            </span>
          </>,
          "Change house photo"
        )}

        <div className="mb-9 flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-5 py-2.5 text-[0.92rem] font-medium shadow-sm">
            {field("weekday")}
            {", "}
            {field("day")} {field("monthYear")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-5 py-2.5 text-[0.92rem] font-medium shadow-sm">
            {field("time")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-5 py-2.5 text-[0.92rem] font-medium shadow-sm">
            {field("venueName")}
          </span>
        </div>

        <div className="relative mx-auto mb-9 w-full max-w-[620px] rounded-[24px] border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-8 py-7 shadow-[var(--shadow-md)]">
          <p className="hw-font-serif mb-5 flex items-center justify-center gap-2 text-[1.18rem] font-semibold tracking-[0.08em] text-[var(--color-terracotta-dark)] uppercase">
            {countdown.live ? field("countdownLiveLabel") : field("countdownHeading")}
          </p>
          <div className="grid grid-cols-4 gap-3.5">
            {units.map((unit) => (
              <div key={unit.label} className="rounded-2xl border border-[var(--color-terracotta-soft)] bg-[var(--color-linen-surface)] px-2 py-4">
                <p className="mb-1 text-[clamp(1.8rem,3.8vw,2.4rem)] leading-none font-bold text-[var(--color-terracotta-dark)]">
                  {pad(unit.value)}
                </p>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-[#796e65] uppercase">{unit.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button type="button" className="hw-btn-primary inline-flex items-center gap-2.5 px-[30px] py-[15px] text-[0.96rem] font-semibold" onClick={() => setCalendarOpen(true)}>
            {field("addToCalendarLabel")}
          </button>
          {editable ? (
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-7 py-[15px] text-[0.96rem] font-semibold shadow-sm">
              {field("getDirectionsLabel")}
            </span>
          ) : (
            <a
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] px-7 py-[15px] text-[0.96rem] font-semibold text-[#221c18] no-underline shadow-sm"
              href={content.googleMapsUrl || content.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.getDirectionsLabel}
            </a>
          )}
        </div>
        {editable ? <p className="mt-3 max-w-xl text-[11px] break-all text-[#796e65]">{field("googleMapsUrl", "", true)}</p> : null}
      </section>

      <section id="schedule" className="relative z-[2] mx-auto max-w-[940px] px-6 py-[90px]">
        <header className="mb-[50px] text-center">
          <p className="mb-2 inline-flex items-center gap-1.5 text-[0.8rem] font-bold tracking-[0.16em] text-[var(--color-sage)] uppercase">
            {field("programEyebrow")}
          </p>
          <h2 className="hw-font-serif mb-3 text-[clamp(2.1rem,4.2vw,3rem)] font-semibold text-[#221c18]">
            {field("programTitle")}
          </h2>
          <p className="mx-auto max-w-[600px] text-[1rem] leading-[1.65] text-[#796e65]">{field("programIntro", "", true)}</p>
        </header>
        <div className="hw-timeline relative mx-auto max-w-[760px] py-5">
          {program.map((item, index) => {
            const odd = index % 2 === 0;
            return (
              <article
                key={`${item.title}-${index}`}
                className={`relative mb-11 flex items-start md:mb-12 ${odd ? "md:flex-row-reverse" : ""}`}
              >
                <span className="relative z-[5] flex h-16 min-w-16 items-center justify-center rounded-full border-2 border-[#e4be57] bg-[var(--color-linen-card)] text-[var(--color-terracotta)] shadow-[0_6px_18px_#c59b2738] md:absolute md:left-1/2 md:-translate-x-1/2">
                  <HouseIcon className="h-[26px] w-[26px]" />
                </span>
                <div
                  className={`relative flex-1 rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] p-[26px] shadow-sm md:w-[44%] md:flex-none ${
                    odd ? "ml-5 md:mr-9 md:ml-0 md:text-right" : "ml-5 md:ml-9"
                  }`}
                >
                  {editable ? (
                    <button
                      type="button"
                      className={`absolute top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] text-[#87361b] hover:bg-[#ab4f31] hover:text-white ${
                        odd ? "left-3" : "right-3"
                      }`}
                      onClick={() => removeProgram(index)}
                      aria-label="Delete program item"
                    >
                      ×
                    </button>
                  ) : null}
                  <p className="mb-2.5 inline-flex rounded-full bg-[var(--color-terracotta-soft)] px-3.5 py-1 text-[0.82rem] font-bold text-[var(--color-terracotta-dark)]">
                    <EditableField
                      value={item.time || ""}
                      editable={editable}
                      onCommit={(value) => commitProgram(index, "time", value)}
                    />
                  </p>
                  <h3 className="hw-font-serif mb-1.5 text-[1.4rem] text-[#221c18]">
                    <EditableField
                      value={item.title || ""}
                      editable={editable}
                      onCommit={(value) => commitProgram(index, "title", value)}
                    />
                  </h3>
                  <p className="text-[0.93rem] leading-[1.65] text-[#796e65]">
                    <EditableField
                      value={item.description || ""}
                      editable={editable}
                      multiline
                      onCommit={(value) => commitProgram(index, "description", value)}
                    />
                  </p>
                </div>
              </article>
            );
          })}
          {editable ? (
            <div className="relative flex justify-center pt-2">
              <button
                type="button"
                className="relative z-[5] flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#e4be57] bg-[var(--color-linen-card)] text-[1.7rem] leading-none text-[var(--color-terracotta)] shadow-[0_6px_18px_#c59b2738]"
                onClick={addProgram}
                aria-label="Add program item"
              >
                +
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section id="gallery" className="relative z-[2] mx-auto max-w-[940px] px-6 py-[90px]">
        <header className="mb-[50px] text-center">
          <p className="mb-2 inline-flex text-[0.8rem] font-bold tracking-[0.16em] text-[var(--color-sage)] uppercase">
            {field("galleryEyebrow")}
          </p>
          <h2 className="hw-font-serif mb-3 text-[clamp(2.1rem,4.2vw,3rem)] font-semibold text-[#221c18]">
            {field("galleryTitle")}
          </h2>
          <p className="mx-auto max-w-[600px] text-[1rem] leading-[1.65] text-[#796e65]">{field("galleryIntro", "", true)}</p>
        </header>
        <div className="grid grid-cols-12 gap-[22px]">
          {gallery.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className={`hw-gallery-card relative min-h-[300px] overflow-hidden rounded-[24px] border border-[var(--color-linen-border)] shadow-[var(--shadow-md)] ${
                index === 0 ? "col-span-12 min-h-[440px]" : "col-span-12 min-h-[330px] md:col-span-6"
              }`}
            >
              <div className="absolute inset-0">
                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center bg-[#2b221c] text-white/70">Add photo</span>
                )}
              </div>
              {editable ? (
                <input
                  ref={(node) => {
                    galleryInputRefs.current[index] = node;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void changeGalleryImage(index, file);
                    }
                    event.target.value = "";
                  }}
                />
              ) : null}
              <div
                className={`hw-gallery-overlay absolute inset-0 z-[2] flex flex-col justify-end p-[26px] text-white ${
                  editable ? "" : "pointer-events-none"
                }`}
              >
                {editable ? (
                  <button
                    type="button"
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-[#120e0bb8] text-white hover:bg-[#ab4f31]"
                    onClick={() => removeGallery(index)}
                    aria-label="Delete gallery photo"
                  >
                    ×
                  </button>
                ) : null}
                <p className="mb-1.5 text-[0.76rem] font-semibold tracking-[0.12em] text-[#e4be57] uppercase">
                  <EditableField
                    value={item.eyebrow || ""}
                    editable={editable}
                    onCommit={(value) => commitGallery(index, "eyebrow", value)}
                  />
                </p>
                <h3 className="hw-font-serif mb-1 text-[1.45rem] font-semibold">
                  <EditableField
                    value={item.title || ""}
                    editable={editable}
                    onCommit={(value) => commitGallery(index, "title", value)}
                  />
                </h3>
                <p className="mb-3 text-[0.9rem] text-white/82">
                  <EditableField
                    value={item.caption || ""}
                    editable={editable}
                    multiline
                    onCommit={(value) => commitGallery(index, "caption", value)}
                  />
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="pointer-events-auto inline-flex w-fit items-center gap-1.5 text-[0.84rem] font-semibold text-white"
                    onClick={() => setLightbox(index)}
                  >
                    {content.viewPhotoLabel}
                  </button>
                  {editable ? (
                    <button
                      type="button"
                      className="inline-flex rounded-full border border-[var(--color-linen-border)] bg-[var(--color-linen-card)]/90 px-3 py-1 text-[10px] font-semibold tracking-[1.2px] text-[#87361b] uppercase"
                      onClick={() => galleryInputRefs.current[index]?.click()}
                    >
                      Change photo
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
          {editable ? (
            <button
              type="button"
              className={`flex min-h-[120px] items-center justify-center rounded-[24px] border-2 border-dashed border-[#e4be57] bg-[var(--color-linen-card)] text-[1.7rem] leading-none text-[var(--color-terracotta)] ${
                gallery.length === 0 ? "col-span-12" : "col-span-12 md:col-span-6"
              }`}
              onClick={addGallery}
              aria-label="Add gallery photo"
            >
              +
            </button>
          ) : null}
        </div>
      </section>

      <section id="location" className="relative z-[2] mx-auto max-w-[940px] px-6 py-[90px]">
        <header className="mb-[50px] text-center">
          <p className="mb-2 inline-flex text-[0.8rem] font-bold tracking-[0.16em] text-[var(--color-sage)] uppercase">
            {field("locationEyebrow")}
          </p>
          <h2 className="hw-font-serif mb-3 text-[clamp(2.1rem,4.2vw,3rem)] font-semibold text-[#221c18]">
            {field("locationTitle")}
          </h2>
          <p className="mx-auto max-w-[600px] text-[1rem] leading-[1.65] text-[#796e65]">{field("locationIntro", "", true)}</p>
        </header>
        <div className="grid overflow-hidden rounded-[24px] border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] shadow-[var(--shadow-lg)] md:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-center px-9 py-11">
            <p className="mb-2 text-[0.76rem] font-bold tracking-[0.14em] text-[var(--color-sage)] uppercase">
              {field("destinationLabel")}
            </p>
            <h3 className="hw-font-serif mb-2 text-[2.2rem] text-[var(--color-terracotta-dark)]">{field("houseName")}</h3>
            <p className="mt-4 mb-7 text-[0.98rem] leading-[1.7] text-[#473e37]">{field("addressFull", "", true)}</p>
            <p className="mb-7 flex items-center gap-2 text-[0.9rem] font-medium text-[var(--color-sage)]">
              {field("addressShort")}
            </p>
            <div className="flex flex-col gap-3">
              <button type="button" className="hw-btn-primary px-5 py-3.5 text-sm font-semibold" onClick={() => void copyAddress()}>
                {field("copyAddressLabel")}
              </button>
              {editable ? (
                <>
                  <span className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-center text-sm font-semibold">
                    {field("openGoogleLabel")}
                  </span>
                  {field("googleMapsUrl", "block break-all text-[11px] text-[#796e65]", true)}
                  <span className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-center text-sm font-semibold">
                    {field("openAppleLabel")}
                  </span>
                  {field("appleMapsUrl", "block break-all text-[11px] text-[#796e65]", true)}
                </>
              ) : (
                <>
                  <a
                    className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-center text-sm font-semibold text-[#221c18] no-underline"
                    href={content.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.openGoogleLabel}
                  </a>
                  <a
                    className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-center text-sm font-semibold text-[#221c18] no-underline"
                    href={content.appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content.openAppleLabel}
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="min-h-[330px] bg-[var(--color-linen-surface)]">
            <iframe
              title="Venue map"
              className="h-full min-h-[330px] w-full border-0"
              src={mapsEmbed(content.appleMapsUrl || content.googleMapsUrl || content.addressFull)}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <footer className="relative z-[2] border-t border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-6 pt-[70px] pb-[90px] text-center">
        <p className="hw-font-arabic mb-2 text-[1.9rem] text-[var(--color-terracotta)]">{field("hamdalah")}</p>
        <p className="hw-font-serif mx-auto mb-3.5 max-w-[620px] text-[1.3rem] leading-[1.6] text-[#221c18] italic">
          “{field("closingBlessing", "", true)}”
        </p>
        <p className="text-[0.96rem] font-medium text-[#796e65]">
          {field("closingPresence")}
          <br />
          <strong className="text-[#221c18]">{field("hostNames")}</strong>
          <br />
          {field("familyLine")}
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#e4be57] bg-[var(--color-linen-card)] px-5 py-2 text-[0.86rem] font-semibold text-[var(--color-terracotta-dark)] shadow-sm"
          onClick={() => setOpened(false)}
        >
          {field("replayLabel")}
        </button>
        <p className="mt-8 border-t border-[var(--color-terracotta-soft)] pt-[18px] text-[0.82rem] tracking-[0.06em] text-[#796e65]">
          {field("craftedBy")}
        </p>
      </footer>

      <a
        className="hw-wa fixed right-6 bottom-6 z-[9998] inline-flex items-center gap-2.5 rounded-full border border-white/50 px-[22px] py-3 text-[0.92rem] font-semibold text-white no-underline"
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share invitation via WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.7 15l-1.2 4.3 4.4-1.2A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5l-.3.5c-.1.2-.3.3-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1.2.1 1.6.8 1.9.9.3.2.5.2.6.3.1.2.1 1-.1 1.7z"
          />
        </svg>
        Share on WhatsApp
      </a>

      {calendarOpen ? (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-[#120e0bbf] p-5 backdrop-blur-md" onClick={() => setCalendarOpen(false)}>
          <div className="relative w-full max-w-[450px] rounded-[24px] border border-[var(--color-linen-border)] bg-[var(--color-linen-card)] p-8 text-center" onClick={(event) => event.stopPropagation()}>
            <h3 className="hw-font-serif mb-2 text-[1.6rem] text-[#221c18]">{field("calendarModalTitle")}</h3>
            <p className="mb-6 text-[0.92rem] text-[#796e65]">{field("calendarModalDesc")}</p>
            <div className="flex flex-col gap-3">
              <a
                className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-sm font-semibold text-[#221c18] no-underline"
                href={googleCalendar}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.googleCalendarLabel}
              </a>
              <button type="button" className="rounded-2xl border border-[var(--color-linen-border)] bg-[var(--color-linen-surface)] px-5 py-3.5 text-sm font-semibold" onClick={downloadIcs}>
                {content.icsCalendarLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {lightbox !== null && gallery[lightbox]?.url ? (
        <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#120e0bf0] p-5 backdrop-blur-md" onClick={() => setLightbox(null)}>
          <img src={gallery[lightbox].url} alt={gallery[lightbox].title} className="max-h-[72vh] max-w-full rounded-2xl object-contain" />
          <p className="hw-font-serif mt-4 text-[1.35rem] text-[#e4be57]">{gallery[lightbox].title}</p>
        </div>
      ) : null}

      {copied ? (
        <p className="fixed bottom-8 left-1/2 z-[100000] -translate-x-1/2 rounded-full bg-[#1e1916] px-6 py-3 text-[0.92rem] text-white">
          Address copied to clipboard!
        </p>
      ) : null}
    </main>
  );
}
