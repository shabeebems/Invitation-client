"use client";

import { useEffect, useMemo, useState } from "react";
import HouseHero from "@/components/templates/house/HouseHero";
import HouseCountdown from "@/components/templates/house/HouseCountdown";
import HouseFooter from "@/components/templates/house/HouseFooter";
import { HouseIcon } from "@/components/templates/house/HouseIcons";
import HouseLocation from "@/components/templates/house/HouseLocation";
import HouseSchedule from "@/components/templates/house/HouseSchedule";
import HouseAmbiance from "@/components/templates/house/HouseAmbiance";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import {
  type InvitationTemplate,
  type PendingImage,
  type ProgramItem,
  type TemplateContent,
  imageUrl,
} from "@/lib/api";
import {
  MAX_PROGRAM_ITEMS,
  PROGRAM_ITEM_MAX,
  clampText,
} from "@/lib/content-limits";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";

function buildHouseShareMessage(content: TemplateContent, url?: string): string {
  const parts: string[] = [];

  if (content.bismillah?.trim()) {
    parts.push(content.bismillah.trim());
  }

  const houseName = content.houseName?.trim();
  const hostNames = content.hostNames?.trim();
  const familyLine = content.familyLine?.trim();

  const titleLines: string[] = [];
  if (houseName) {
    titleLines.push(`🏡 *${houseName}*`);
  }
  if (hostNames) {
    titleLines.push(
      `Warm Welcome to the New Home of\n*${hostNames}*${familyLine ? `\n_${familyLine}_` : ""}`
    );
  }
  if (titleLines.length > 0) {
    parts.push(titleLines.join("\n\n"));
  }

  // Event date and time
  const dateStr = [
    content.weekday?.trim(),
    [content.day?.trim(), content.monthYear?.trim()].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .join(", ");
  const timeStr = content.time?.trim();
  const dateTime = [dateStr, timeStr].filter(Boolean).join(" · ");
  if (dateTime) {
    parts.push(`🗓 *Event Date & Time:*\n*${dateTime}*`);
  }

  // Full address
  const fullAddress =
    content.addressFull?.trim() ||
    [content.venueName?.trim(), content.venueCity?.trim()].filter(Boolean).join(", ");
  if (fullAddress) {
    parts.push(`📍 *Address:*\n${fullAddress}`);
  }

  if (url) {
    parts.push(`🔗 *View Invitation:*\n${url}`);
  }

  return parts.join("\n\n");
}

export default function HouseWarmingInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (
    draft: InvitationTemplate,
    images: PendingImage[],
    orderId?: string
  ) => Promise<string | undefined | void>;
}) {
  const {
    draft,
    setDraft,
    content,
    editing,
    previewing,
    payOpen,
    persist,
    field,
    commitEventDate,
    themeTitle,
    chrome,
    changeImage,
    setCountdownLayout,
    setProgramLayout,
    setLocationLayout,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "house",
    sectionFamily: "house",
  });
  const ambianceEffect = normalizeAmbianceEffect(content.ambianceEffect, "house");
  const [opened, setOpened] = useState(false);
  const heroSrc = imageUrl(draft.images, "hero");

  const shareMessage = useMemo(() => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    return buildHouseShareMessage(content, currentUrl);
  }, [
    content.bismillah,
    content.houseName,
    content.hostNames,
    content.familyLine,
    content.weekday,
    content.day,
    content.monthYear,
    content.time,
    content.addressFull,
    content.venueName,
    content.venueCity,
  ]);

  function handleWhatsAppClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const msg = buildHouseShareMessage(content, currentUrl);
    const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  const program = content.programItems || [];

  useEffect(() => {
    if (opened) return;
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyHeight = document.body.style.height;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.height = prevBodyHeight;
    };
  }, [opened]);

  function commitProgram(index: number, key: keyof ProgramItem, value: string) {
    const safeValue = clampText(value, PROGRAM_ITEM_MAX[key]);
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      const nextItems = current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: safeValue } : item
      );
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function addProgram() {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      if (current.length >= MAX_PROGRAM_ITEMS) {
        return prev;
      }
      const nextItems = [
        ...current,
        { time: "Time", title: "New program", description: "Tap to add details" },
      ];
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function removeProgram(index: number) {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      const nextItems = current.filter((_, itemIndex) => itemIndex !== index);
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  const themeClass = /sage/i.test(themeTitle) ? " palette-sage" : "";
  const enabled = resolveEnabledSections("house", content.enabledSections);

  return (
    <main className={`house-warming relative${themeClass}${opened ? "" : " is-sealed"}`}>
      {opened ? chrome : null}
      <div className={`hw-envelope ${opened ? "is-open" : ""}`}>
        <p className="hw-font-arabic mb-1 text-center text-[1.85rem] leading-[1.4] text-[#e4be57] [text-shadow:0_2px_14px_#e6c56859]">
          {field("bismillah")}
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
          → Tap the wax seal to unveil your invitation
        </p>
        <button type="button" className="mt-3.5 text-[0.82rem] text-white/55 underline" onClick={() => setOpened(true)}>
          {field("skipLabel")}
        </button>
      </div>

      {opened ? (
        <>
          <HouseAmbiance effect={ambianceEffect} />

          {isSectionEnabled(enabled, "hero") ? (
            <HouseHero
              field={field}
              editing={editing}
              heroSrc={heroSrc}
              houseName={content.houseName || ""}
              onChangeHeroImage={(file) => changeImage(file, "hero")}
            />
          ) : null}

          {isSectionEnabled(enabled, "countdown") ? (
            <HouseCountdown
              field={field}
              editing={editing}
              eventDateIso={content.eventDateIso || ""}
              weekday={content.weekday}
              day={content.day}
              monthYear={content.monthYear}
              time={content.time}
              layout={content.countdownLayout}
              onLayoutChange={setCountdownLayout}
              onEventDateChange={(value) => {
                commitEventDate(value, "house");
              }}
            />
          ) : null}

          {isSectionEnabled(enabled, "schedule") ? (
            <HouseSchedule
              field={field}
              editing={editing}
              layout={content.programLayout}
              onLayoutChange={setProgramLayout}
              program={program}
              onCommitProgram={commitProgram}
              onRemoveProgram={removeProgram}
              onAddProgram={addProgram}
            />
          ) : null}

          {isSectionEnabled(enabled, "location") ? (
            <HouseLocation
              field={field}
              editing={editing}
              layout={content.locationLayout}
              onLayoutChange={setLocationLayout}
              googleMapsUrl={content.googleMapsUrl}
              addressFull={content.addressFull}
            />
          ) : null}

          {isSectionEnabled(enabled, "footer") ? (
            <HouseFooter editable={editable} field={field} onReplay={() => setOpened(false)} />
          ) : null}

          <a
            className={`hw-wa fixed right-6 z-[10060] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white no-underline shadow-lg transition-transform hover:scale-105 ${editable ? "bottom-24" : "bottom-6"} ${previewing || payOpen ? "pointer-events-none invisible" : ""}`}
            href={`https://wa.me/?text=${encodeURIComponent(shareMessage)}`}
            onClick={handleWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share invitation via WhatsApp"
            aria-hidden={previewing || payOpen}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a10 10 0 0 0-8.7 15l-1.2 4.3 4.4-1.2A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5l-.3.5c-.1.2-.3.3-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1.2.1 1.6.8 1.9.9.3.2.5.2.6.3.1.2.1 1-.1 1.7z"
              />
            </svg>
          </a>
        </>
      ) : null}
    </main>
  );
}
