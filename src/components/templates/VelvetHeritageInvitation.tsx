"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import VelvetOpening from "@/components/templates/velvet/VelvetOpening";
import VelvetHero from "@/components/templates/velvet/VelvetHero";
import VelvetCountdown from "@/components/templates/velvet/VelvetCountdown";
import VelvetGallery from "@/components/templates/velvet/VelvetGallery";
import VelvetStory from "@/components/templates/velvet/VelvetStory";
import VelvetLocation from "@/components/templates/velvet/VelvetLocation";
import VelvetFooter from "@/components/templates/velvet/VelvetFooter";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

export default function VelvetHeritageInvitation({
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
    removeGalleryItem,
    setGalleryLayout,
    setCountdownLayout,
    setHeroLayout,
    setLoveStoryLayout,
    setLocationLayout,
    setFooterLayout,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "velvet",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const venueImageUrl = imageUrl(draft.images, "venue") || imageUrl(draft.images, "story");
  const groomInitial = (content.groomName || "").trim().charAt(0) || "A";
  const brideInitial = (content.brideName || "").trim().charAt(0) || "M";
  const sealInitials = `${groomInitial}&${brideInitial}`;
  const shareText = encodeURIComponent(content.shareText || "");
  // Persist via velvet catalog; SiteAmbiance reuses the royal particle renderer.
  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "velvet")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("velvet", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl = content.mapsUrl || content.googleMapsUrl || "";
  const venueName = content.venueName || "Venue";
  const themeTitle =
    draft.selectedThemeTitle ||
    draft.themes?.find((theme) => theme.id === draft.selectedThemeId)?.title ||
    "";
  const themeClass = /champagne/i.test(themeTitle) ? " palette-champagne" : " palette-burgundy";

  return (
    <main
      className={`velvet-heritage relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {sealed ? null : chrome}

      <VelvetOpening
        brandLabel={field("hashtag", "vh-cap-title vh-intro-brand")}
        tagline={field("envelopeTagline", "vh-cap-title vh-intro-tagline")}
        scriptLine={field("openHint", "vh-script")}
        openLabel="Open Invitation"
        skipLabel={content.skipLabel || "Skip →"}
        sealInitials={sealInitials}
        onCoverChange={onCoverChange}
      />

      <div className="vh-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />

        {isSectionEnabled(enabled, "hero") ? (
          <VelvetHero
            editing={editing}
            heroImageUrl={heroImageUrl}
            layout={content.heroLayout}
            field={field}
            onChangeImage={(file) => changeImage(file, "hero")}
            onLayoutChange={setHeroLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "countdown") ? (
          <VelvetCountdown
            eventDateIso={content.eventDateIso || "2027-02-20T11:00:00+05:30"}
            layout={content.countdownLayout}
            editing={editing}
            field={field}
            onLayoutChange={setCountdownLayout}
            onEventDateChange={(value) => commitEventDate(value, "wedding")}
          />
        ) : null}

        {isSectionEnabled(enabled, "gallery") ? (
          <VelvetGallery
            items={content.galleryItems || []}
            layout={content.galleryLayout}
            editing={editing}
            field={field}
            onLayoutChange={setGalleryLayout}
            onCommitItem={commitGalleryItem}
            onRemoveItem={removeGalleryItem}
            onChangeImage={changeGalleryImage}
          />
        ) : null}

        {isSectionEnabled(enabled, "story") ? (
          <VelvetStory
            items={content.loveStoryItems || []}
            layout={content.loveStoryLayout}
            editing={editing}
            field={field}
            onLayoutChange={setLoveStoryLayout}
            onCommitItem={commitLoveStoryItem}
            onAddItem={addLoveStoryItem}
            onRemoveItem={removeLoveStoryItem}
            onChangeImage={changeLoveStoryImage}
          />
        ) : null}

        {isSectionEnabled(enabled, "location") ? (
          <VelvetLocation
            layout={content.locationLayout}
            editing={editing}
            venueName={venueName}
            mapsUrl={mapsUrl}
            venueImageUrl={venueImageUrl}
            directionsLabel={content.getDirectionsLabel || "Get Directions →"}
            field={field}
            onLayoutChange={setLocationLayout}
            onChangeVenueImage={(file) => changeImage(file, "venue")}
          />
        ) : null}

        {isSectionEnabled(enabled, "footer") ? (
          <VelvetFooter
            layout={content.footerLayout}
            editing={editing}
            field={field}
            onLayoutChange={setFooterLayout}
          />
        ) : null}

        <a
          className={`vh-share vh-cap-title${editable ? " is-editing" : ""}`}
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
