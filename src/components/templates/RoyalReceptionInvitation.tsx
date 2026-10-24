"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import RoyalReceptionOpening from "@/components/templates/royal/RoyalReceptionOpening";
import RoyalNav from "@/components/templates/royal/RoyalNav";
import RoyalHero from "@/components/templates/royal/RoyalHero";
import RoyalCountdown from "@/components/templates/royal/RoyalCountdown";
import RoyalMeetCouple from "@/components/templates/royal/RoyalMeetCouple";
import RoyalLoveStory from "@/components/templates/royal/RoyalLoveStory";
import RoyalGallery from "@/components/templates/royal/RoyalGallery";
import RoyalLocation from "@/components/templates/royal/RoyalLocation";
import RoyalFooter from "@/components/templates/royal/RoyalFooter";
import { normalizeAmbianceEffect, SiteAmbiance } from "@/components/templates/royal/AmbianceEffects";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

export default function RoyalReceptionInvitation({
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
  const [sealed, setSealed] = useState(true);
  const onCoverChange = useCallback((covering: boolean) => setSealed(covering), []);
  const {
    draft,
    content,
    editing,
    field,
    commitEventDate,
    changeImage,
    commitLoveStoryItem,
    addLoveStoryItem,
    removeLoveStoryItem,
    changeLoveStoryImage,
    changeGalleryImage,
    commitGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    setGalleryLayout,
    setCountdownLayout,
    setMeetCoupleLayout,
    setLoveStoryLayout,
    setLocationLayout,
    commitLocationItem,
    addLocationItem,
    removeLocationItem,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "royal",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const groomImageUrl = imageUrl(draft.images, "groom");
  const brideImageUrl = imageUrl(draft.images, "bride");
  const groomsInitial = (content.groomName || "").trim().charAt(0) || "I";
  const bridesInitial = (content.brideName || "").trim().charAt(0) || "A";
  const shareText = encodeURIComponent(content.shareText || "");
  const themeClass = /emerald/i.test(themeTitle) ? " palette-emerald" : " palette-velvet";
  const ambianceEffect = normalizeAmbianceEffect(content.ambianceEffect);
  const enabled = useMemo(
    () => resolveEnabledSections("royal", content.enabledSections),
    [content.enabledSections]
  );

  return (
    <main
      className={`royal-invitation relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {sealed ? null : chrome}

      <RoyalReceptionOpening
        groomName={content.groomName || "Ibrahim"}
        brideName={content.brideName || "Aisha"}
        groomInitial={groomsInitial}
        brideInitial={bridesInitial}
        bismillah={field("bismillah", "rr-opening-bismillah-edit")}
        weekday={content.weekday}
        day={content.day}
        monthYear={content.monthYear}
        tagline={
          editable || content.envelopeTagline
            ? field("envelopeTagline", "rr-opening-tagline-edit")
            : "An invitation awaits"
        }
        openHint={content.openHint || "Tap the seal to open"}
        editable={editable}
        onCoverChange={onCoverChange}
      />

      <div className="rr-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />
        <RoyalNav groomInitial={groomsInitial} brideInitial={bridesInitial} />

        {isSectionEnabled(enabled, "hero") ? (
          <RoyalHero
            editing={editing}
            heroImageUrl={heroImageUrl}
            groomName={content.groomName || "Ibrahim"}
            brideName={content.brideName || "Aisha"}
            field={field}
            onChangeImage={(file) => changeImage(file, "hero")}
          />
              ) : null}

        {isSectionEnabled(enabled, "countdown") ? (
          <RoyalCountdown
            eventDateIso={content.eventDateIso || "2026-12-25T11:00:00+05:30"}
            weekday={content.weekday}
            day={content.day}
            monthYear={content.monthYear}
            time={content.time}
            layout={content.countdownLayout}
            editing={editing}
            field={field}
            onLayoutChange={setCountdownLayout}
            onEventDateChange={(value) => {
              commitEventDate(value, "wedding");
                }}
              />
            ) : null}

        {isSectionEnabled(enabled, "couple") ? (
          <RoyalMeetCouple
            groomName={content.groomName || "Ibrahim"}
            brideName={content.brideName || "Aisha"}
            groomSrc={groomImageUrl}
            brideSrc={brideImageUrl}
            editing={editing}
            layout={content.meetCoupleLayout}
            onChangeImage={(slot, file) => changeImage(file, slot)}
            onLayoutChange={setMeetCoupleLayout}
            field={field}
          />
        ) : null}

        {isSectionEnabled(enabled, "story") ? (
          <RoyalLoveStory
            groomName={content.groomName || "Ibrahim"}
            brideName={content.brideName || "Aisha"}
            items={content.loveStoryItems || []}
            editing={editing}
            layout={content.loveStoryLayout}
            field={field}
            onCommitItem={commitLoveStoryItem}
            onAddItem={addLoveStoryItem}
            onRemoveItem={removeLoveStoryItem}
            onChangeImage={changeLoveStoryImage}
            onLayoutChange={setLoveStoryLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "gallery") ? (
          <RoyalGallery
            items={content.galleryItems || []}
            layout={content.galleryLayout}
            editing={editing}
            field={field}
            onLayoutChange={setGalleryLayout}
            onCommitItem={commitGalleryItem}
            onAddItem={addGalleryItem}
            onRemoveItem={removeGalleryItem}
            onChangeImage={changeGalleryImage}
          />
        ) : null}

        {isSectionEnabled(enabled, "location") ? (
          <RoyalLocation
            items={content.locationItems || []}
            fallback={{
              label: content.venueLabel || "Venue",
              title: [content.venueName, content.venueHall].filter(Boolean).join(" — ") || "Grand Palace",
              address: [content.venueHall, content.venueCity].filter(Boolean).join(", ") || "Kozhikode",
              mapsUrl: content.mapsUrl || content.googleMapsUrl || "",
            }}
            editing={editing}
            layout={content.locationLayout}
            field={field}
            onCommitItem={commitLocationItem}
            onAddItem={addLocationItem}
            onRemoveItem={removeLocationItem}
            onLayoutChange={setLocationLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "footer") ? <RoyalFooter editable={editable} field={field} /> : null}

      <a
        className={`invite-share font-caps fixed right-[max(14px,env(safe-area-inset-right,0px))] z-[10060] inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#f3e8cd73] px-4 py-3 text-[10px] tracking-[2px] text-[#e7d3a4] uppercase no-underline ${editable ? "bottom-[4.75rem]" : "bottom-[max(18px,env(safe-area-inset-bottom,0px))]"}`}
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share invitation on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.7 15l-1.2 4.3 4.4-1.2A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.3 1.2-1.8 1.3-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-3.9-4.7-4.1-.2-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.7 2 .8 2.1.1.2.1.3 0 .5l-.3.5c-.1.2-.3.3-.4.5-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.8-1c.2-.2.4-.2.6-.1.2.1 1.6.8 1.9.9.3.2.5.2.6.3.1.2.1 1-.1 1.7z"
          />
        </svg>
        <span className="max-sm:sr-only">Share</span>
      </a>
      </div>
    </main>
  );
}
