"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import RubyOpening from "@/components/templates/ruby/RubyOpening";
import RubyHero from "@/components/templates/ruby/RubyHero";
import RubyMarquee from "@/components/templates/ruby/RubyMarquee";
import RubyCouple from "@/components/templates/ruby/RubyCouple";
import RubyBlessings from "@/components/templates/ruby/RubyBlessings";
import RubyCountdown from "@/components/templates/ruby/RubyCountdown";
import RubyEvents from "@/components/templates/ruby/RubyEvents";
import RubyLocation from "@/components/templates/ruby/RubyLocation";
import RubyGallery from "@/components/templates/ruby/RubyGallery";
import RubyFooter from "@/components/templates/ruby/RubyFooter";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { MAX_PROGRAM_ITEMS } from "@/lib/content-limits";
import { imageUrl, type InvitationTemplate, type PendingImage } from "@/lib/api";

export default function RoyalRubyInvitation({
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
    setStoryLayout,
    commitEventDate,
    commitProgramItem,
    setCountdownLayout,
    setHeroLayout,
    setProgramLayout,
    setMeetCoupleLayout,
    setLocationLayout,
    setFooterLayout,
    changeGalleryImage,
    commitGalleryItem,
    addGalleryItem,
    removeGalleryItem,
    setGalleryLayout,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "ruby",
  });

  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "ruby")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("ruby", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl =
    typeof content.mapsUrl === "string" ? content.mapsUrl : content.googleMapsUrl || "";
  const themeClass = /ros[eé]|ivory|blush/i.test(themeTitle)
    ? " palette-rose"
    : /sapphire|midnight|navy/i.test(themeTitle)
      ? " palette-sapphire"
      : " palette-ruby";

  const brideInitial = (content.brideName || "").trim().charAt(0) || "A";
  const groomInitial = (content.groomName || "").trim().charAt(0) || "A";
  const coupleLine =
    [content.brideName, content.groomName].filter(Boolean).join(" & ") || "Ananya & Arjun";
  const openingDate = [content.day, content.monthYear].filter(Boolean).join(" · ");
  const marqueeDate =
    [content.day, content.monthYear].filter(Boolean).join(" ") || "Save the date";
  const marqueePlace = content.venueCity || "";

  useEffect(() => {
    if (sealed) return;
    function onScroll() {
      const bar = document.getElementById("rb-bar");
      if (!bar) return;
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${pct}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sealed]);

  function addProgram() {
    setDraft((prev) => {
      const current = prev.content.programItems || [];
      if (current.length >= MAX_PROGRAM_ITEMS) return prev;
      const nextItems = [
        ...current,
        { time: "14|FEBRUARY", title: "New Celebration", description: "Add details here" },
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
      className={`royal-ruby relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }`}
    >
      {sealed ? null : chrome}

      <div className="rb-progress" id="rb-bar" aria-hidden="true" />

      <RubyOpening
        tagline={field("envelopeTagline", "rb-mc rb-open-tagline")}
        title={field("openHint", "rb-gv rb-open-title")}
        cardLine={field("inviteLine", "rb-gv rb-open-card-line", true)}
        hint={field("skipLabel", "rb-open-hint-text")}
        monogram={[brideInitial, groomInitial]}
        saveLabel={content.hashtag || "Save the Date"}
        hostLine={content.hostLabel || ""}
        coupleLine={coupleLine}
        dateLine={openingDate}
        placeLine={content.venueCity || ""}
        editable={editing}
        onCoverChange={onCoverChange}
      />

      <div className="rb-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />

        {isSectionEnabled(enabled, "hero") ? (
          <RubyHero
            editing={editing}
            layout={content.heroLayout}
            ready={!sealed}
            field={field}
            onLayoutChange={setHeroLayout}
          />
        ) : null}

        <RubyMarquee
          saveLabel={content.hashtag || "Save the date"}
          dateLabel={marqueeDate}
          placeLabel={marqueePlace}
        />

        {isSectionEnabled(enabled, "story") ? (
          <RubyCouple
            editing={editing}
            layout={content.storyLayout}
            photoUrl={imageUrl(draft.images, "story")}
            field={field}
            onChangeImage={(file) => changeImage(file, "story")}
            onLayoutChange={setStoryLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "countdown") ? (
          <RubyCountdown
            editing={editing}
            layout={content.countdownLayout}
            eventDateIso={content.eventDateIso}
            field={field}
            onLayoutChange={setCountdownLayout}
            onEventDateChange={(value) => commitEventDate(value, "wedding")}
          />
        ) : null}

        {isSectionEnabled(enabled, "blessings") ? (
          <RubyBlessings
            editing={editing}
            layout={content.meetCoupleLayout}
            brideParentsUrl={imageUrl(draft.images, "parentsLeft")}
            groomParentsUrl={imageUrl(draft.images, "parentsRight")}
            field={field}
            onChangeImage={(slot, file) => changeImage(file, slot)}
            onLayoutChange={setMeetCoupleLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "events") ? (
          <RubyEvents
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

        {isSectionEnabled(enabled, "location") ? (
          <RubyLocation
            editing={editing}
            layout={content.locationLayout}
            mapsUrl={mapsUrl}
            venueName={content.venueName || ""}
            venueCity={content.venueCity || ""}
            addressFull={content.addressFull || ""}
            field={field}
            onLayoutChange={setLocationLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "gallery") ? (
          <RubyGallery
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

        {isSectionEnabled(enabled, "footer") ? (
          <RubyFooter
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
