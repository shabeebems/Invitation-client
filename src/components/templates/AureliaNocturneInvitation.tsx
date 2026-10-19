"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import AureliaOpening from "@/components/templates/aurelia/AureliaOpening";
import AureliaNav from "@/components/templates/aurelia/AureliaNav";
import AureliaHero from "@/components/templates/aurelia/AureliaHero";
import AureliaCouple from "@/components/templates/aurelia/AureliaCouple";
import AureliaGallery from "@/components/templates/aurelia/AureliaGallery";
import AureliaStory from "@/components/templates/aurelia/AureliaStory";
import AureliaEvents from "@/components/templates/aurelia/AureliaEvents";
import AureliaLocation from "@/components/templates/aurelia/AureliaLocation";
import AureliaCountdown from "@/components/templates/aurelia/AureliaCountdown";
import AureliaDress from "@/components/templates/aurelia/AureliaDress";
import AureliaRsvp from "@/components/templates/aurelia/AureliaRsvp";
import AureliaFinal from "@/components/templates/aurelia/AureliaFinal";
import AureliaFooter from "@/components/templates/aurelia/AureliaFooter";
import { AureliaGrain } from "@/components/templates/aurelia/AureliaDecor";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { MAX_PROGRAM_ITEMS } from "@/lib/content-limits";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

export default function AureliaNocturneInvitation({
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
    commitEventDate,
    commitProgramItem,
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
    setProgramLayout,
    setMeetCoupleLayout,
    setLoveStoryLayout,
    setLocationLayout,
    setFooterLayout,
    setStoryLayout,
    setQuoteLayout,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "aurelia",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const brideUrl = imageUrl(draft.images, "bride");
  const groomUrl = imageUrl(draft.images, "groom");
  const finalImageUrl = imageUrl(draft.images, "envelope");

  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "aurelia")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("aurelia", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl = content.mapsUrl || content.googleMapsUrl || "";
  const themeClass = /ivory|champagne/i.test(themeTitle) ? " palette-ivory" : " palette-nocturne";

  const brideInitial = (content.brideName || "").trim().charAt(0) || "E";
  const groomInitial = (content.groomName || "").trim().charAt(0) || "A";
  const sealLabel = `${brideInitial}\u00A0${groomInitial}`;
  const dateLine =
    [content.weekday, content.day, content.monthYear].filter(Boolean).join(", ") ||
    content.monthYear ||
    "";

  const navLinks = [
    { href: "#hero", label: "Wedding" },
    ...(isSectionEnabled(enabled, "gallery") ? [{ href: "#gallery", label: "Story" }] : []),
    ...(isSectionEnabled(enabled, "events") ? [{ href: "#events", label: "Events" }] : []),
    ...(isSectionEnabled(enabled, "gallery") ? [{ href: "#gallery", label: "Gallery" }] : []),
    ...(isSectionEnabled(enabled, "rsvp") ? [{ href: "#rsvp", label: "RSVP" }] : []),
  ].filter(
    (link, index, arr) => arr.findIndex((item) => item.href === link.href) === index
  );

  function addProgram() {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      if (current.length >= MAX_PROGRAM_ITEMS) return prev;
      const nextItems = [
        ...current,
        { time: "6:00 PM", title: "New Event", description: "Add details here" },
      ];
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function removeProgram(index: number) {
    setDraft((prev) => {
      const nextItems = (prev.content.programItems || []).filter((_, i) => i !== index);
      const nextContent = { ...prev.content, programItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  return (
    <main
      className={`aurelia-nocturne relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }${!sealed ? " is-open" : ""}`}
    >
      {chrome}
      <AureliaGrain />

      <AureliaOpening
        sealLabel={sealLabel}
        eyebrow={field("hostLabel", "au-eyebrow")}
        title={
          <>
            {field("brideName", "au-gate-name")}
            <em> &amp; </em>
            {field("groomName", "au-gate-name")}
            <br />
            {field("envelopeTagline", "au-gate-sub")}
          </>
        }
        openLabel={content.skipLabel || "Open the invitation"}
        editable={editing}
        onCoverChange={onCoverChange}
      />

      <div className="au-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />
        <AureliaNav
          logo={
            <>
              {brideInitial} &amp; {groomInitial}
            </>
          }
          links={navLinks}
        />

        {isSectionEnabled(enabled, "hero") ? (
          <AureliaHero
            editing={editing}
            layout={content.heroLayout}
            heroImageUrl={heroImageUrl}
            field={field}
            onChangeImage={(file) => changeImage(file, "hero")}
            onLayoutChange={setHeroLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "couple") ? (
          <AureliaCouple
            editing={editing}
            layout={content.meetCoupleLayout}
            brideUrl={brideUrl}
            groomUrl={groomUrl}
            field={field}
            onChangeImage={(slot, file) => changeImage(file, slot)}
            onLayoutChange={setMeetCoupleLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "gallery") ? (
          <AureliaGallery
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
          <AureliaStory
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

        {isSectionEnabled(enabled, "events") ? (
          <AureliaEvents
            items={content.programItems || []}
            layout={content.programLayout}
            editing={editing}
            dateLine={dateLine}
            venueName={content.venueName || ""}
            venueCity={content.venueCity || ""}
            mapsUrl={mapsUrl}
            field={field}
            onLayoutChange={setProgramLayout}
            onCommitItem={commitProgramItem}
            onAddItem={addProgram}
            onRemoveItem={removeProgram}
          />
        ) : null}

        {isSectionEnabled(enabled, "location") ? (
          <AureliaLocation
            editing={editing}
            layout={content.locationLayout}
            mapsUrl={mapsUrl}
            field={field}
            onLayoutChange={setLocationLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "countdown") ? (
          <AureliaCountdown
            editing={editing}
            layout={content.countdownLayout}
            eventDateIso={content.eventDateIso}
            field={field}
            onLayoutChange={setCountdownLayout}
            onEventDateChange={(value) => commitEventDate(value, "wedding")}
          />
        ) : null}

        {isSectionEnabled(enabled, "dress") ? (
          <AureliaDress
            editing={editing}
            layout={content.storyLayout}
            field={field}
            onLayoutChange={setStoryLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "rsvp") ? (
          <AureliaRsvp
            editing={editing}
            layout={content.quoteLayout}
            field={field}
            onLayoutChange={setQuoteLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "final") ? (
          <AureliaFinal
            editing={editing}
            layout={content.footerLayout}
            imageUrl={finalImageUrl}
            field={field}
            onChangeImage={(file) => changeImage(file, "envelope")}
            onLayoutChange={setFooterLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "footer") ? (
          <AureliaFooter editing={editing} field={field} />
        ) : null}
      </div>
    </main>
  );
}
