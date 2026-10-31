"use client";

import { useCallback, useMemo, useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import CreamOpening from "@/components/templates/cream/CreamOpening";
import CreamNav from "@/components/templates/cream/CreamNav";
import CreamHero from "@/components/templates/cream/CreamHero";
import CreamWelcome from "@/components/templates/cream/CreamWelcome";
import CreamCouple from "@/components/templates/cream/CreamCouple";
import CreamStory from "@/components/templates/cream/CreamStory";
import CreamGallery from "@/components/templates/cream/CreamGallery";
import CreamEvents from "@/components/templates/cream/CreamEvents";
import CreamLocation from "@/components/templates/cream/CreamLocation";
import CreamCountdown from "@/components/templates/cream/CreamCountdown";
import CreamDress from "@/components/templates/cream/CreamDress";
import CreamFaq from "@/components/templates/cream/CreamFaq";
import CreamFinal from "@/components/templates/cream/CreamFinal";
import CreamFooter from "@/components/templates/cream/CreamFooter";
import { CreamGrain } from "@/components/templates/cream/CreamDecor";
import {
  SiteAmbiance,
  normalizeAmbianceEffect as normalizeRoyalAmbiance,
} from "@/components/templates/royal/AmbianceEffects";
import { normalizeAmbianceEffect } from "@/lib/template-ambiance";
import { isSectionEnabled, resolveEnabledSections } from "@/lib/template-sections";
import { MAX_LOVE_STORY_ITEMS, MAX_PROGRAM_ITEMS } from "@/lib/content-limits";
import { type InvitationTemplate, type PendingImage, imageUrl } from "@/lib/api";

const FAQ_ICON = "faq";

export default function CreamEditorialInvitation({
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
    removeLoveStoryItem,
    changeLoveStoryImage,
    changeProgramImage,
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
    setDressColors,
    themeTitle,
    chrome,
  } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
    sectionFamily: "cream",
  });

  const heroImageUrl = imageUrl(draft.images, "hero");
  const heroAltImageUrl = imageUrl(draft.images, "heroAlt");
  const brideUrl = imageUrl(draft.images, "bride");
  const groomUrl = imageUrl(draft.images, "groom");
  const coupleUrl = imageUrl(draft.images, "couple");
  const storyFeatureUrl = imageUrl(draft.images, "storyFeature");
  const venueImageUrl = imageUrl(draft.images, "story");
  const countdownImageUrl = imageUrl(draft.images, "countdown");

  const ambianceEffect = normalizeRoyalAmbiance(
    normalizeAmbianceEffect(content.ambianceEffect, "cream")
  );
  const enabled = useMemo(
    () => resolveEnabledSections("cream", content.enabledSections),
    [content.enabledSections]
  );
  const mapsUrl = typeof content.mapsUrl === "string" ? content.mapsUrl : content.googleMapsUrl || "";
  const themeClass = /sage|garden/i.test(themeTitle) ? " palette-sage" : " palette-ivory";

  const brideInitial = (content.brideName || "").trim().charAt(0) || "I";
  const groomInitial = (content.groomName || "").trim().charAt(0) || "J";

  const dateLine =
    [content.weekday, content.day, content.monthYear].filter(Boolean).join(", ") ||
    content.monthYear ||
    "";

  const allStory = content.loveStoryItems || [];
  const storyItems = allStory.filter((item) => item.icon !== FAQ_ICON);
  const faqItems = allStory.filter((item) => item.icon === FAQ_ICON);

  const storyGlobalIndex = (local: number) => {
    let seen = -1;
    for (let i = 0; i < allStory.length; i++) {
      if (allStory[i].icon === FAQ_ICON) continue;
      seen += 1;
      if (seen === local) return i;
    }
    return local;
  };

  const faqGlobalIndex = (local: number) => {
    let seen = -1;
    for (let i = 0; i < allStory.length; i++) {
      if (allStory[i].icon !== FAQ_ICON) continue;
      seen += 1;
      if (seen === local) return i;
    }
    return local;
  };

  const navLinks = [
    { href: "#welcome", label: "Welcome" },
    ...(isSectionEnabled(enabled, "couple") ? [{ href: "#couple", label: "The couple" }] : []),
    ...(isSectionEnabled(enabled, "story") ? [{ href: "#story", label: "Our story" }] : []),
    ...(isSectionEnabled(enabled, "gallery") ? [{ href: "#gallery", label: "Gallery" }] : []),
    ...(isSectionEnabled(enabled, "events") ? [{ href: "#events", label: "Events" }] : []),
    ...(isSectionEnabled(enabled, "location") ? [{ href: "#venue", label: "Venue" }] : []),
    ...(isSectionEnabled(enabled, "dress") ? [{ href: "#dress", label: "Dress code" }] : []),
    ...(isSectionEnabled(enabled, "faq") ? [{ href: "#faq", label: "FAQ" }] : []),
  ];

  function setWelcomeLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, galleryIntro: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setFaqLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, viewPhotoLabel: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function setMinimalFooterLayout(layout: string) {
    setDraft((prev) => {
      const nextContent = { ...prev.content, craftedBy: layout };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

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

  function addStoryMilestone() {
    setDraft((prev) => {
      const current = prev.content.loveStoryItems || [];
      if (current.length >= MAX_LOVE_STORY_ITEMS) return prev;
      const nextItems = [
        ...current,
        { icon: "", date: "2027", title: "New chapter", place: "Add your story", url: "", publicId: "" },
      ];
      const nextContent = { ...prev.content, loveStoryItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  function addFaqItem() {
    setDraft((prev) => {
      const current = prev.content.loveStoryItems || [];
      if (current.length >= MAX_LOVE_STORY_ITEMS) return prev;
      const nextItems = [
        ...current,
        {
          icon: FAQ_ICON,
          date: "",
          title: "New question?",
          place: "Add the answer here.",
          url: "",
          publicId: "",
        },
      ];
      const nextContent = { ...prev.content, loveStoryItems: nextItems };
      void persist(nextContent);
      return { ...prev, content: nextContent };
    });
  }

  return (
    <main
      className={`cream-editorial relative${themeClass}${editable ? " is-editing" : ""}${
        sealed ? " is-sealed" : ""
      }${!sealed ? " is-open" : ""}`}
    >
      {sealed ? null : chrome}
      <CreamGrain />

      <CreamOpening
        mono={
          <>
            {brideInitial}
            <small>&amp;</small>
            {groomInitial}
          </>
        }
        eyebrow={field("hostLabel", "ce-eyebrow")}
        title={
          <>
            {field("brideName", "ce-cover-title")}
            {" & "}
            {field("groomName", "ce-cover-title")}
          </>
        }
        dateLine={dateLine}
        openLabel={content.skipLabel || "Open Invitation"}
        editable={editing}
        onCoverChange={onCoverChange}
      />

      <div className="ce-site" aria-hidden={sealed || undefined} inert={sealed || undefined}>
        <SiteAmbiance effect={ambianceEffect} />
        <CreamNav
          logo={
            <>
              {brideInitial}
              <span className="ce-amp">&amp;</span>
              {groomInitial}
            </>
          }
          links={navLinks}
        />

        {isSectionEnabled(enabled, "hero") ? (
          <CreamHero
            editing={editing}
            layout={content.heroLayout}
            introLine={content.introLine}
            heroImageUrl={heroImageUrl}
            heroAltImageUrl={heroAltImageUrl}
            field={field}
            onChangeImage={(slot, file) => changeImage(file, slot)}
            onLayoutChange={setHeroLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "welcome") ? (
          <CreamWelcome
            editing={editing}
            layout={content.galleryIntro}
            field={field}
            onLayoutChange={setWelcomeLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "couple") ? (
          <CreamCouple
            editing={editing}
            layout={content.meetCoupleLayout}
            title={content.storyTitle}
            brideName={content.brideName}
            groomName={content.groomName}
            brideUrl={brideUrl}
            groomUrl={groomUrl}
            coupleUrl={coupleUrl}
            field={field}
            onChangeImage={(slot, file) => changeImage(file, slot)}
            onLayoutChange={setMeetCoupleLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "story") ? (
          <CreamStory
            items={storyItems}
            layout={content.loveStoryLayout}
            editing={editing}
            field={field}
            onLayoutChange={setLoveStoryLayout}
            onCommitItem={(index, key, value) =>
              commitLoveStoryItem(storyGlobalIndex(index), key, value)
            }
            featureUrl={storyFeatureUrl}
            onAddItem={addStoryMilestone}
            onRemoveItem={(index) => removeLoveStoryItem(storyGlobalIndex(index))}
            onChangeItemImage={(index, file) => changeLoveStoryImage(storyGlobalIndex(index), file)}
            onChangeFeature={(file) => changeImage(file, "storyFeature")}
          />
        ) : null}

        {isSectionEnabled(enabled, "gallery") ? (
          <CreamGallery
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

        {isSectionEnabled(enabled, "events") ? (
          <CreamEvents
            items={content.programItems || []}
            layout={content.programLayout}
            editing={editing}
            field={field}
            onLayoutChange={setProgramLayout}
            onCommitItem={commitProgramItem}
            onAddItem={addProgram}
            onRemoveItem={removeProgram}
            onChangeImage={changeProgramImage}
          />
        ) : null}

        {isSectionEnabled(enabled, "location") ? (
          <CreamLocation
            editing={editing}
            layout={content.locationLayout}
            venueImageUrl={venueImageUrl}
            mapsUrl={mapsUrl}
            mapQuery={[content.venueName, content.venueCity].filter(Boolean).join(", ")}
            field={field}
            onChangeImage={(file) => changeImage(file, "story")}
            onLayoutChange={setLocationLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "countdown") ? (
          <CreamCountdown
            editing={editing}
            layout={content.countdownLayout}
            eventDateIso={content.eventDateIso}
            imageUrl={countdownImageUrl}
            field={field}
            onLayoutChange={setCountdownLayout}
            onEventDateChange={(value) => commitEventDate(value, "wedding")}
            onChangeImage={(file) => changeImage(file, "countdown")}
          />
        ) : null}

        {isSectionEnabled(enabled, "dress") ? (
          <CreamDress
            editing={editing}
            layout={content.storyLayout}
            colors={content.dressColors}
            field={field}
            onLayoutChange={setStoryLayout}
            onColorsChange={setDressColors}
          />
        ) : null}

        {isSectionEnabled(enabled, "faq") ? (
          <CreamFaq
            items={faqItems}
            layout={content.viewPhotoLabel}
            editing={editing}
            field={field}
            onLayoutChange={setFaqLayout}
            onCommitItem={(index, key, value) =>
              commitLoveStoryItem(faqGlobalIndex(index), key, value)
            }
            onAddItem={addFaqItem}
            onRemoveItem={(index) => removeLoveStoryItem(faqGlobalIndex(index))}
          />
        ) : null}

        {isSectionEnabled(enabled, "final") ? (
          <CreamFinal
            editing={editing}
            layout={content.footerLayout}
            field={field}
            onLayoutChange={setFooterLayout}
          />
        ) : null}

        {isSectionEnabled(enabled, "footer") ? (
          <CreamFooter
            editing={editing}
            layout={content.craftedBy}
            field={field}
            onLayoutChange={setMinimalFooterLayout}
          />
        ) : null}
      </div>
    </main>
  );
}
