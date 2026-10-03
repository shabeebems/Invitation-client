"use client";

import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import {
  type InvitationTemplate,
  type PendingImage,
  type ProgramItem,
} from "@/lib/api";

import VogueHeaderBar from "@/components/templates/vogue/VogueHeaderBar";
import VogueCoverHero from "@/components/templates/vogue/VogueCoverHero";
import VogueContentsCountdown from "@/components/templates/vogue/VogueContentsCountdown";
import VogueInterviewSpread from "@/components/templates/vogue/VogueInterviewSpread";
import VogueWardrobeMoodboard from "@/components/templates/vogue/VogueWardrobeMoodboard";
import VogueGallerySpread from "@/components/templates/vogue/VogueGallerySpread";
import VogueDestinationFeature from "@/components/templates/vogue/VogueDestinationFeature";
import VogueBackCoverRsvp from "@/components/templates/vogue/VogueBackCoverRsvp";

export default function VogueWeddingInvitation({
  template,
  editable = false,
  onPublish,
}: {
  template: InvitationTemplate;
  editable?: boolean;
  onPublish?: (draft: InvitationTemplate, images: PendingImage[]) => Promise<string>;
}) {
  const { draft, setDraft, content, editing, persist, field, themeTitle, chrome } = useInvitationEditor({
    template,
    editable,
    onPublish,
    variant: "invite",
  });

  const groomInitial = (content.groomName || "Z").trim().charAt(0) || "Z";
  const brideInitial = (content.brideName || "L").trim().charAt(0) || "L";

  // Dynamic Vogue Theme Classes
  const themeClass = /terracotta|milano|warm/i.test(themeTitle)
    ? " theme-terracotta"
    : /emerald|parisian|green/i.test(themeTitle)
    ? " theme-emerald"
    : "";

  function handleGalleryImageChange(file: File, index: number) {
    const preview = URL.createObjectURL(file);
    const existing = [...(draft.content.galleryItems || [])];
    const item = existing[index] || { eyebrow: `Look 0${index + 1}`, title: "Spread", caption: "", url: "" };
    existing[index] = { ...item, url: preview };

    const nextContent = { ...draft.content, galleryItems: existing };
    setDraft((prev) => ({ ...prev, content: nextContent }));
    void persist(nextContent, { file, slot: "gallery", galleryIndex: index });
  }

  function handleCommitProgramItem(index: number, key: keyof ProgramItem, value: string) {
    const current = [...(draft.content.programItems || [])];
    if (!current[index]) {
      current[index] = { time: "", title: "", description: "" };
    }
    current[index] = { ...current[index], [key]: value };

    const nextContent = { ...draft.content, programItems: current };
    setDraft((prev) => ({ ...prev, content: nextContent }));
    void persist(nextContent);
  }

  return (
    <main className={`editorial-vogue${themeClass} min-h-screen relative`}>
      {chrome}

      {/* Top Editorial Masthead Bar */}
      <VogueHeaderBar
        groomInitial={groomInitial}
        brideInitial={brideInitial}
      />

      {/* Main Magazine Issue Layout */}
      <div className="relative z-10">
        {/* Page 01: Front Cover Masthead & Barcode Hero */}
        <VogueCoverHero field={field} />

        {/* Page 02: Table of Contents & Swiss Chronometer Countdown */}
        <VogueContentsCountdown
          items={content.programItems}
          editable={editing}
          field={field}
          eventDateIso={content.eventDateIso}
          eventEndIso={content.eventEndIso}
          title={`${content.groomName || "Zayd"} & ${content.brideName || "Layla"}`}
          venueName={content.venueName}
          venueCity={content.venueCity}
          onCommitItem={handleCommitProgramItem}
        />

        {/* Page 03: Exclusive Feature Interview with Drop-Cap & Sacred Pull-Quote */}
        <VogueInterviewSpread field={field} />

        {/* Page 04: The Wardrobe Lookbook & Fabric Moodboard */}
        <VogueWardrobeMoodboard field={field} />

        {/* Page 05: Editorial Photo Spread Behind the Lens */}
        <VogueGallerySpread
          items={content.galleryItems}
          editable={editing}
          field={field}
          onImageChange={handleGalleryImageChange}
        />

        {/* Page 06: Destination Report & Estate Architecture */}
        <VogueDestinationFeature
          mapsUrl={content.mapsUrl || content.googleMapsUrl}
          addressFull={content.addressFull}
          venueName={content.venueName}
          venueHall={content.venueHall}
          venueCity={content.venueCity}
          field={field}
        />

        {/* Page 07: Back Cover VIP Guest Pass & RSVP Dispatch */}
        <VogueBackCoverRsvp field={field} />
      </div>
    </main>
  );
}
