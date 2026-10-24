"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import RubyOpening from "@/components/templates/ruby/RubyOpening";
import RubyHero from "@/components/templates/ruby/RubyHero";
import RubyMarquee from "@/components/templates/ruby/RubyMarquee";
import RubyBlessings from "@/components/templates/ruby/RubyBlessings";
import RubyCountdown from "@/components/templates/ruby/RubyCountdown";
import RubyEvents from "@/components/templates/ruby/RubyEvents";
import RubyLocation from "@/components/templates/ruby/RubyLocation";
import RubyRsvp from "@/components/templates/ruby/RubyRsvp";
import RubyFooter from "@/components/templates/ruby/RubyFooter";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { MAX_PROGRAM_ITEMS } from "@/lib/content-limits";
import { type InvitationTemplate, type PendingImage } from "@/lib/api";

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
    setDraft,
    content,
    editing,
    field,
    persist,
    commitEventDate,
    commitProgramItem,
    setCountdownLayout,
    setHeroLayout,
    setProgramLayout,
    setMeetCoupleLayout,
    setLocationLayout,
    setFooterLayout,
    setQuoteLayout,
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
  const mapsUrl = content.mapsUrl || content.googleMapsUrl || "";
  const themeClass = /ember|crimson/i.test(themeTitle) ? " palette-ember" : " palette-ruby";

  const brideInitial = (content.brideName || "").trim().charAt(0) || "A";
  const dateLine =
    [content.day, content.monthYear].filter(Boolean).join(" ") || content.monthYear || "";
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
        hostLabel={field("hostLabel", "rb-env-small")}
        names={
          <>
            {field("brideName", "rb-gv")}
            <span> &amp; </span>
            {field("groomName", "rb-gv")}
          </>
        }
        dateLine={dateLine}
        sealInitial={brideInitial}
        tapHint={content.skipLabel || "TAP THE SEAL"}
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

        {isSectionEnabled(enabled, "blessings") ? (
          <RubyBlessings
            editing={editing}
            layout={content.meetCoupleLayout}
            field={field}
            onLayoutChange={setMeetCoupleLayout}
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
            field={field}
            onLayoutChange={setLocationLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "rsvp") ? (
          <RubyRsvp
            editing={editing}
            layout={content.quoteLayout}
            shareText={content.shareText || ""}
            field={field}
            onLayoutChange={setQuoteLayout}
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
