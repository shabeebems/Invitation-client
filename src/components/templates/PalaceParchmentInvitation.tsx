"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import PalaceOpening from "@/components/templates/palace/PalaceOpening";
import PalaceHero from "@/components/templates/palace/PalaceHero";
import PalaceCountdown from "@/components/templates/palace/PalaceCountdown";
import PalaceGallery from "@/components/templates/palace/PalaceGallery";
import PalaceStory from "@/components/templates/palace/PalaceStory";
import PalaceLocation from "@/components/templates/palace/PalaceLocation";
import PalaceFooter from "@/components/templates/palace/PalaceFooter";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

export default function PalaceParchmentInvitation({
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
    changeGalleryImage,
    commitGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    setGalleryLayout,
    setCountdownLayout,
    setHeroLayout,
    setLoveStoryLayout,
    setLocationLayout,
    setFooterLayout,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "palace",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const groomInitial = (content.groomName || "").trim().charAt(0) || "A";
  const brideInitial = (content.brideName || "").trim().charAt(0) || "D";
  const sealInitials = `${groomInitial} & ${brideInitial}`;
  const shareText = encodeURIComponent(content.shareText || "");
  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "palace")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("palace", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl = content.mapsUrl || content.googleMapsUrl || "";
  const city = content.venueCity?.split(",")[0]?.trim() || "";
  const year = content.monthYear?.match(/\d{4}/)?.[0] || "";
  const badgeText = [city, year].filter(Boolean).join(" • ") || "Our Day";
  const doorDate = [content.day, content.monthYear].filter(Boolean).join(" ") || content.monthYear || "";
  const themeClass = /sage|olive/i.test(themeTitle) ? " palette-sage" : " palette-parchment";

  return (
    <main
      className={`palace-parchment relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {chrome}

      <PalaceOpening
        leftName={field("groomName", "pp-door-name")}
        rightName={field("brideName", "pp-door-name")}
        leftLabel={field("groomLabel", "pp-door-kicker")}
        rightLabel={field("brideLabel", "pp-door-kicker")}
        crestLeft={field("mashallahBadge", "pp-door-crest")}
        crestRight={doorDate}
        latchHint={field("envelopeTagline", "pp-latch-hint")}
        latchAction={content.openHint || "Tap to Open"}
        skipLabel={content.skipLabel || "Skip Intro →"}
        sealInitials={sealInitials}
        editable={editing}
        onCoverChange={onCoverChange}
      />

      <div className="pp-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />

        <div className="pp-shell">
          <header className="pp-topnav">
            <div className="pp-topnav-brand">
              <span>{field("hashtag", "pp-topnav-brand")}</span>
              <span className="pp-topnav-heart" aria-hidden="true">
                ♥
              </span>
            </div>
            <a className="pp-topnav-skip" href="#location">
              Skip <span>→</span>
            </a>
          </header>

          {isSectionEnabled(enabled, "hero") ? (
            <PalaceHero
              editing={editing}
              heroImageUrl={heroImageUrl}
              layout={content.heroLayout}
              badgeText={badgeText}
              field={field}
              onChangeImage={(file) => changeImage(file, "hero")}
              onLayoutChange={setHeroLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "countdown") ? (
            <PalaceCountdown
              eventDateIso={content.eventDateIso || "2025-11-22T10:00:00+05:30"}
              layout={content.countdownLayout}
              editing={editing}
              field={field}
              onLayoutChange={setCountdownLayout}
              onEventDateChange={(value) => commitEventDate(value, "wedding")}
            />
          ) : null}

          {isSectionEnabled(enabled, "gallery") ? (
            <PalaceGallery
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

          {isSectionEnabled(enabled, "story") ? (
            <PalaceStory
              items={content.loveStoryItems || []}
              layout={content.loveStoryLayout}
              editing={editing}
              field={field}
              onLayoutChange={setLoveStoryLayout}
              onCommitItem={commitLoveStoryItem}
              onAddItem={addLoveStoryItem}
              onRemoveItem={removeLoveStoryItem}
            />
          ) : null}

          {isSectionEnabled(enabled, "location") ? (
            <PalaceLocation
              layout={content.locationLayout}
              editing={editing}
              mapsUrl={mapsUrl}
              field={field}
              onLayoutChange={setLocationLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "footer") ? (
            <PalaceFooter
              layout={content.footerLayout}
              editing={editing}
              field={field}
              onLayoutChange={setFooterLayout}
            />
          ) : null}
        </div>

        <a
          className={`pp-share${editable ? " is-editing" : ""}`}
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share invitation on WhatsApp"
        >
          Share
        </a>
      </div>
    </main>
  );
}
