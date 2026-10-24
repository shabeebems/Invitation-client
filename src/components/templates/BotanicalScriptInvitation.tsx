"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import BotanicalHero from "@/components/templates/botanical/BotanicalHero";
import BotanicalStory from "@/components/templates/botanical/BotanicalStory";
import BotanicalEvents from "@/components/templates/botanical/BotanicalEvents";
import BotanicalQuote from "@/components/templates/botanical/BotanicalQuote";
import BotanicalGallery from "@/components/templates/botanical/BotanicalGallery";
import BotanicalItinerary from "@/components/templates/botanical/BotanicalItinerary";
import BotanicalFamily from "@/components/templates/botanical/BotanicalFamily";
import BotanicalLocation from "@/components/templates/botanical/BotanicalLocation";
import BotanicalFooter from "@/components/templates/botanical/BotanicalFooter";
import BotanicalOpening from "@/components/templates/botanical/BotanicalOpening";
import { BotanicalSprigs } from "@/components/templates/botanical/BotanicalDecor";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { MAX_PROGRAM_ITEMS } from "@/lib/content-limits";
import {
  type InvitationTemplate,
  type PendingImage,
  type ImageSlot,
  imageUrl,
} from "@/lib/api";

export default function BotanicalScriptInvitation({
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
    setDraft,
    content,
    editing,
    field,
    persist,
    changeImage,
    commitLoveStoryItem,
    addLoveStoryItem,
    removeLoveStoryItem,
    changeGalleryImage,
    commitGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    setGalleryLayout,
    setHeroLayout,
    setProgramLayout,
    setLoveStoryLayout,
    setMeetCoupleLayout,
    setLocationLayout,
    setFooterLayout,
    setStoryLayout,
    setQuoteLayout,
    commitProgramItem,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "botanical",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const storyImageUrl = imageUrl(draft.images, "story");
  const groomUrl = imageUrl(draft.images, "groom");
  const brideUrl = imageUrl(draft.images, "bride");
  const parentLeftUrl = imageUrl(draft.images, "parentsLeft");
  const parentRightUrl = imageUrl(draft.images, "parentsRight");

  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "botanical")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("botanical", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl = content.mapsUrl || content.googleMapsUrl || "";
  const themeClass = /twilight|fern|dusk|midnight/i.test(themeTitle)
    ? " palette-twilight"
    : " palette-parchment";

  const groomInitial = (content.groomName || "").trim().charAt(0) || "A";
  const brideInitial = (content.brideName || "").trim().charAt(0) || "D";
  const monogram = content.hashtag || `${groomInitial}${brideInitial}`;
  const coupleLine = [content.groomName, content.brideName].filter(Boolean).join(" & ") || "Aarav & Diya";
  const openingDate = [content.day, content.monthYear].filter(Boolean).join(" ");

  const eyebrowText =
    content.hostLabel ||
    [content.day, content.monthYear, content.venueCity].filter(Boolean).join(" • ") ||
    "Save the Date";

  function addProgram() {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      if (current.length >= MAX_PROGRAM_ITEMS) return prev;
      const nextItems = [...current, { time: "", title: "", description: "" }];
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function removeProgram(index: number) {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      const nextItems = current.filter((_, i) => i !== index);
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function changeFamilyImage(slot: "parentsLeft" | "groom" | "bride" | "parentsRight", file: File) {
    changeImage(file, slot as ImageSlot);
  }

  return (
    <main
      className={`botanical-script relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {sealed ? null : chrome}

      <BotanicalOpening
        tagline={content.envelopeTagline || "Two hearts · One forever"}
        coupleLine={coupleLine}
        dateLine={openingDate}
        skipLabel={content.skipLabel || undefined}
        onCoverChange={onCoverChange}
      />

      <div className="bs-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <BotanicalSprigs />
        <SiteAmbiance effect={ambianceEffect} />

        <div className="bs-shell">
          <header className="bs-nav">
            <a className="bs-nav-mono" href="#home" aria-label="Home">
              {monogram}
            </a>
            <nav className="bs-nav-links" aria-label="Invitation sections">
              <a href="#home">Home</a>
              {isSectionEnabled(enabled, "story") ? <a href="#story">Our Story</a> : null}
              {isSectionEnabled(enabled, "events") ? <a href="#events">Events</a> : null}
              {isSectionEnabled(enabled, "gallery") ? <a href="#gallery">Gallery</a> : null}
              {isSectionEnabled(enabled, "location") ? <a href="#location">Location</a> : null}
            </nav>
          </header>

          {isSectionEnabled(enabled, "hero") ? (
            <BotanicalHero
              editing={editing}
              heroImageUrl={heroImageUrl}
              layout={content.heroLayout}
              eyebrowText={eyebrowText}
              field={field}
              onChangeImage={(file) => changeImage(file, "hero")}
              onLayoutChange={setHeroLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "story") ? (
            <BotanicalStory
              editing={editing}
              storyImageUrl={storyImageUrl}
              layout={content.storyLayout}
              field={field}
              onChangeImage={(file) => changeImage(file, "story")}
              onLayoutChange={setStoryLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "events") ? (
            <BotanicalEvents
              items={content.programItems || []}
              layout={content.programLayout}
              editing={editing}
              field={field}
              onLayoutChange={setProgramLayout}
              onCommitItem={commitProgramItem}
              onAddItem={addProgram}
              onRemoveItem={removeProgram}
            />
          ) : null}

          {isSectionEnabled(enabled, "quote") ? (
            <BotanicalQuote
              editing={editing}
              layout={content.quoteLayout}
              field={field}
              onLayoutChange={setQuoteLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "gallery") ? (
            <BotanicalGallery
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

          {isSectionEnabled(enabled, "itinerary") ? (
            <BotanicalItinerary
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

          {isSectionEnabled(enabled, "family") ? (
            <BotanicalFamily
              editing={editing}
              layout={content.meetCoupleLayout}
              parentLeftUrl={parentLeftUrl}
              parentRightUrl={parentRightUrl}
              groomUrl={groomUrl}
              brideUrl={brideUrl}
              field={field}
              onChangeImage={changeFamilyImage}
              onLayoutChange={setMeetCoupleLayout}
            />
          ) : null}

          {isSectionEnabled(enabled, "location") ? (
            <BotanicalLocation
              editing={editing}
              layout={content.locationLayout}
              mapsUrl={mapsUrl}
              field={field}
              onLayoutChange={setLocationLayout}
            />
          ) : null}
        </div>

        {isSectionEnabled(enabled, "footer") ? (
          <BotanicalFooter
            layout={content.footerLayout}
            editing={editing}
            field={field}
            onLayoutChange={setFooterLayout}
          />
        ) : null}
      </div>
    </main>
  );
}
