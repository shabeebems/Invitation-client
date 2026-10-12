"use client";

import { useCallback, useRef, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import RoyalReceptionOpening from "@/components/templates/royal/RoyalReceptionOpening";
import RoyalCountdown from "@/components/templates/royal/RoyalCountdown";
import RoyalMeetCouple from "@/components/templates/royal/RoyalMeetCouple";
import RoyalLoveStory from "@/components/templates/royal/RoyalLoveStory";
import RoyalGallery from "@/components/templates/royal/RoyalGallery";
import RoyalLocation from "@/components/templates/royal/RoyalLocation";
import { normalizeAmbianceEffect, SiteAmbiance } from "@/components/templates/royal/AmbianceEffects";
import { type InvitationTemplate, type PendingImage, imageUrl, withImageUrl } from "@/lib/api";

function OrnamentWave() {
  return (
    <svg className="mx-auto my-1.5 mb-3 block w-[130px] max-w-full text-[#b9893e] opacity-90" viewBox="0 0 160 24" fill="none" aria-hidden="true">
      <path
        d="M4 12 C 24 12, 30 5, 44 5 C 58 5, 60 19, 74 19 C 80 19, 80 12, 80 12 C 80 12, 80 5, 86 5 C 100 5, 102 19, 116 19 C 130 19, 136 12, 156 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="80" cy="12" r="2.6" fill="currentColor" />
      <circle cx="8" cy="12" r="1.6" fill="currentColor" />
      <circle cx="152" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CornerVine({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute hidden w-[clamp(56px,11vw,96px)] text-[#b9893ea6] sm:block ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className="block h-auto w-full">
        <path d="M8 8 C30 10 24 38 48 44 C70 50 66 18 92 26 C106 30 110 48 116 54" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 8 C12 30 38 24 48 44 C22 60 28 86 32 112" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="48" cy="44" r="3" fill="currentColor" />
        <circle cx="8" cy="8" r="2.4" fill="currentColor" />
        <path d="M72 20 C78 12 90 16 90 26 C90 34 78 34 74 28 C70 22 72 20 72 20Z" fill="currentColor" opacity="0.55" />
      </svg>
    </span>
  );
}

export default function RoyalReceptionInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [sealed, setSealed] = useState(true);
  const onCoverChange = useCallback((covering: boolean) => setSealed(covering), []);
  const {
    draft,
    setDraft,
    content,
    editing,
    persist,
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
  });
  const heroImageUrl = imageUrl(draft.images, "hero");
  const groomImageUrl = imageUrl(draft.images, "groom");
  const brideImageUrl = imageUrl(draft.images, "bride");
  const groomsInitial = (content.groomName || "").trim().charAt(0) || "I";
  const bridesInitial = (content.brideName || "").trim().charAt(0) || "A";
  const shareText = encodeURIComponent(content.shareText || "");
  const themeClass = /emerald/i.test(themeTitle) ? " palette-emerald" : " palette-velvet";
  const ambianceEffect = normalizeAmbianceEffect(content.ambianceEffect);

  function changeHeroImage(file: File) {
    const preview = URL.createObjectURL(file);
    setDraft((prev) => ({ ...prev, images: withImageUrl(prev.images, "hero", preview) }));
    void persist(draft.content, { file, slot: "hero" });
  }

  return (
    <main
      className={`royal-invitation relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {chrome}

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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[1100] px-[clamp(12px,2.5vw,32px)]">
        <div className="flex min-h-16 items-center justify-center">
          <a href="#home" className="pointer-events-auto flex flex-col items-center no-underline" aria-label="Home">
            <span className="font-names text-[clamp(28px,4vw,38px)] leading-none tracking-wide text-[#e7d3a4] [text-shadow:0_2px_18px_rgba(185,137,62,0.35)]">
              {groomsInitial}
              <span className="mx-0.5 text-[0.55em] text-[#b9893e]">&</span>
              {bridesInitial}
            </span>
          </a>
        </div>
      </header>

      <section
        id="home"
        className="invite-hero relative z-[2] flex min-h-svh items-center justify-center overflow-hidden px-[clamp(16px,3vw,40px)] pt-[clamp(64px,8vh,88px)] pb-[clamp(24px,4vh,40px)] text-[#f3e8cd]"
      >
        <CornerVine className="top-[clamp(70px,12vh,96px)] left-[clamp(10px,2vw,24px)]" />
        <CornerVine className="top-[clamp(70px,12vh,96px)] right-[clamp(10px,2vw,24px)] -scale-x-100" />

        <div className="relative z-[4] grid w-[min(1180px,100%)] grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-[clamp(20px,3.5vw,48px)]">
          <div className="relative z-[5] order-2 flex min-h-0 items-end justify-center lg:order-1 lg:min-h-[min(78vh,720px)]">
            <div
              className={`relative ${editing ? "cursor-pointer" : ""}`}
              role={editing ? "button" : undefined}
              tabIndex={editing ? 0 : undefined}
              onClick={() => editing && imageInputRef.current?.click()}
              onKeyDown={(event) => {
                if (editing && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  imageInputRef.current?.click();
                }
              }}
              aria-label={editing ? "Change couple photo" : undefined}
            >
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt={`${content.groomName} and ${content.brideName}`}
                  className="h-auto w-full max-w-[min(86vw,620px)] object-contain object-bottom lg:max-h-[min(78vh,720px)] lg:max-w-none"
                />
              ) : (
                <span className="font-caps inline-flex min-h-48 min-w-48 items-center justify-center border border-dashed border-[#e7d3a473] px-6 text-[10px] tracking-[2px] text-[#e7d3a4] uppercase">
                  Add photo
                </span>
              )}
              {editing ? (
                <span className="font-caps pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-[color:color-mix(in_srgb,var(--gold-light)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--night)_78%,transparent)] px-3 py-1.5 text-[9px] tracking-[1.6px] text-[color:var(--gold-light)] uppercase">
                  Change photo
                </span>
              ) : null}
            </div>
            {editing ? (
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void changeHeroImage(file);
                  }
                  event.target.value = "";
                }}
              />
            ) : null}
          </div>

          <div className="order-1 w-full max-w-[540px] justify-self-center self-end px-4 text-center lg:order-2 lg:px-0">
            <p className="font-arabic text-[clamp(22px,2.4vw+0.6rem,34px)] leading-[1.5] text-[#e7d3a4] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
              {field("bismillah", "")}
            </p>
            <OrnamentWave />
            <p className="font-caps px-1 text-[clamp(10px,0.35vw+0.55rem,12.5px)] leading-[1.75] tracking-[2.4px] text-[#f3e8cdc7] uppercase">
              {field("hostLabel", "")}
              {field(
                "hostNames",
                "font-invite-serif mt-1 block text-[clamp(20px,1.6vw+0.7rem,28px)] tracking-[0.4px] text-[#e7d3a4] normal-case italic"
              )}
            </p>
            <p className="font-caps mt-2.5 px-1 text-[clamp(10px,0.35vw+0.55rem,12.5px)] leading-[1.75] tracking-[2.4px] text-[#f3e8cdd9] uppercase">
              {field("introLine", "")}
            </p>
            <h1 className="font-names my-3 mb-2 flex w-full flex-col items-center">
              {field("groomName", "text-shimmer block text-[clamp(46px,5vw+0.5rem,82px)] leading-[1.05]")}
              <span className="font-invite-serif my-0.5 text-[clamp(22px,2vw+0.4rem,34px)] text-[#b9893e] italic">
                &
              </span>
              {field("brideName", "text-shimmer block text-[clamp(42px,4.5vw+0.5rem,72px)] leading-[1.05]")}
            </h1>
            <p className="font-caps mt-1 px-1 text-[clamp(9px,0.3vw+0.5rem,11px)] leading-[1.7] tracking-[2px] text-[#f3e8cdb8] uppercase">
              {field("brideParentsLabel", "")}
              {field(
                "brideParents",
                "font-invite-serif mt-0.5 block text-[clamp(16px,1.2vw+0.55rem,22px)] tracking-[0.3px] text-[#e7d3a4] normal-case italic"
              )}
            </p>
            <p className="font-caps mx-auto mt-2.5 max-w-[380px] text-[clamp(10px,0.3vw+0.55rem,12px)] leading-[1.7] tracking-[2px] text-[#e7d3a4c7] uppercase">
              {field("presenceLine", "", true)}
            </p>
          </div>
        </div>
      </section>

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

      <RoyalLocation
        items={content.locationItems || []}
        fallback={{
          label: content.venueLabel || "Venue",
          title: [content.venueName, content.venueHall].filter(Boolean).join(" — ") || "Grand Palace",
          address: [content.venueHall, content.venueCity].filter(Boolean).join(", ") || "Kozhikode",
          mapsUrl: content.mapsUrl || content.googleMapsUrl || "",
          appleMapsUrl: content.appleMapsUrl || "",
        }}
        editing={editing}
        layout={content.locationLayout}
        field={field}
        onCommitItem={commitLocationItem}
        onAddItem={addLocationItem}
        onRemoveItem={removeLocationItem}
        onLayoutChange={setLocationLayout}
      />

      <footer className={`invite-footer relative z-[1] overflow-hidden px-[clamp(16px,3vw,32px)] pt-[clamp(24px,4vh,40px)] text-center ${editable ? "pb-40" : "pb-6"}`}>
        <p className="font-names text-shimmer-slow mt-0 text-[clamp(34px,5vw+0.5rem,54px)] leading-[1.15]">
          {field("groomName", "")} <span className="font-invite-serif text-[0.55em] text-[#b9893e] not-italic"> & </span> {field("brideName", "")}
        </p>
        <p className="font-caps mt-1.5 text-[clamp(10px,0.4vw+0.5rem,12px)] tracking-[3px] text-[#b9893e] uppercase">
          {field("hashtag", "")}
        </p>
        <p className="font-invite-serif mx-auto mt-3.5 max-w-[440px] px-2 text-[clamp(14px,1vw+0.55rem,17px)] leading-[1.7] text-[#f3e8cdc7] italic">
          {field("blessing", "", true)}
        </p>
        <p className="font-caps mt-2.5 px-2 text-[clamp(9px,0.3vw+0.45rem,11px)] leading-[1.5] tracking-[2.2px] text-[#e7d3a4a6] uppercase">
          {field("inviteLine", "", true)}
        </p>
        <p className="font-invite-sans mt-4 mb-0 text-[9px] tracking-[0.14em] text-[#f3e8cd38]">
          {field("footer", "")}
        </p>
      </footer>

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
