"use client";

import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import {
  type InvitationTemplate,
  type PendingImage,
  type ProgramItem,
} from "@/lib/api";

import CelestialStarCanvas from "@/components/templates/celestial/CelestialStarCanvas";
import CelestialNavbar from "@/components/templates/celestial/CelestialNavbar";
import CelestialHero from "@/components/templates/celestial/CelestialHero";
import CelestialMoonPhase from "@/components/templates/celestial/CelestialMoonPhase";
import CelestialStory from "@/components/templates/celestial/CelestialStory";
import CelestialRsvp from "@/components/templates/celestial/CelestialRsvp";
import CelestialEntranceGate from "@/components/templates/celestial/CelestialEntranceGate";

export default function CelestialWeddingInvitation({
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

  // Dynamic Celestial Theme Classes
  const themeClass = /eclipse|noir|black/i.test(themeTitle)
    ? " theme-eclipse"
    : /aurora|borealis|emerald|green/i.test(themeTitle)
    ? " theme-aurora"
    : "";

  function handleGalleryImageChange(file: File, index: number) {
    const preview = URL.createObjectURL(file);
    const existing = [...(draft.content.galleryItems || [])];
    const item = existing[index] || { eyebrow: "Constellation", title: "Frame", caption: "", url: "" };
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
    <main className={`celestial-starlight${themeClass} min-h-screen relative`}>
      {chrome}

      {/* Dramatic Astrolabe Observatory Dome Entrance Gate */}
      <CelestialEntranceGate
        groomName={content.groomName || "Zayd"}
        brideName={content.brideName || "Layla"}
        groomInitial={groomInitial}
        brideInitial={brideInitial}
        editable={editable}
      />

      {/* Living Interactive Constellation & Star Canvas */}
      <CelestialStarCanvas />

      {/* Ambient Deep Space Nebula Glow Layers */}
      <div className="cs-space-glow" aria-hidden="true" />

      {/* Starlit Observatory Navigation */}
      <CelestialNavbar
        groomInitial={groomInitial}
        brideInitial={brideInitial}
      />

      {/* Main Celestial Experience */}
      <div className="relative z-10">
        {/* 1. Celestial Grand Hero */}
        <CelestialHero field={field} />

        {/* 2. Moon Phase & Astrological Alignment Widget */}
        <CelestialMoonPhase
          eventDateIso={content.eventDateIso}
          eventEndIso={content.eventEndIso}
          title={`${content.groomName || "Zayd"} & ${content.brideName || "Layla"}`}
          venueName={content.venueName}
          venueCity={content.venueCity}
          field={field}
        />

        {/* 3. Written in the Stars Love Story */}
        <CelestialStory field={field} />

        {/* 4. Wish Upon a Star RSVP */}
        <CelestialRsvp field={field} />

        {/* Astrolabe Starlit Footer */}
        <footer className="border-t border-[var(--cs-border-light)] bg-[#030612]/90 py-16 text-center backdrop-blur-xl">
          <div className="mx-auto max-w-md space-y-4 px-4 font-serif">
            {/* Glowing Star Icon */}
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cs-starlight-dim)] bg-[var(--cs-starlight)]/10 text-sm text-[var(--cs-starlight)] shadow-[0_0_15px_rgba(243,227,182,0.3)]">
              ✦
            </div>

            <p className="text-2xl font-light text-[var(--cs-starlight)] italic">
              {field("closingBlessing", "text-2xl font-light text-[var(--cs-starlight)] italic")}
            </p>

            <p className="text-xs tracking-widest text-[var(--cs-text-muted)]">
              {field("presenceLine", "text-xs tracking-widest text-[var(--cs-text-muted)]")}
            </p>

            <div className="border-t border-white/10 pt-4 text-[10px] tracking-[0.25em] text-[var(--cs-text-faint)] uppercase">
              {field("footer", "text-[10px] tracking-[0.25em] text-[var(--cs-text-faint)] uppercase")}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
