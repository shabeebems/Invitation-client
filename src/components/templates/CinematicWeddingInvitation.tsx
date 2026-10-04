"use client";

import { useState } from "react";
import { useInvitationEditor } from "@/components/templates/useInvitationEditor";
import {
  type InvitationTemplate,
  type PendingImage,
  type ProgramItem,
} from "@/lib/api";

import CinematicVideoBackground from "@/components/templates/cinematic/CinematicVideoBackground";
import CinematicNavbar from "@/components/templates/cinematic/CinematicNavbar";
import CinematicHero from "@/components/templates/cinematic/CinematicHero";
import CinematicSchedule from "@/components/templates/cinematic/CinematicSchedule";
import CinematicRsvp from "@/components/templates/cinematic/CinematicRsvp";

export default function CinematicWeddingInvitation({
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

  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const groomInitial = (content.groomName || "Z").trim().charAt(0) || "Z";
  const brideInitial = (content.brideName || "L").trim().charAt(0) || "L";

  // Dynamic Theme Class
  const themeClass = /sapphire|blue/i.test(themeTitle)
    ? " theme-sapphire"
    : /emerald|twilight|green/i.test(themeTitle)
    ? " theme-emerald"
    : "";

  function handleGalleryImageChange(file: File, index: number) {
    const preview = URL.createObjectURL(file);
    const existing = [...(draft.content.galleryItems || [])];
    const item = existing[index] || { eyebrow: "Moments", title: "Frame", caption: "", url: "" };
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
    <main className={`cinematic-vows${themeClass} min-h-screen relative`}>
      {chrome}

      {/* Living Ambient Background Video Canvas (Plays immediately over entire view) */}
      <CinematicVideoBackground
        videoUrl={content.videoUrl}
        posterUrl={content.videoPosterUrl}
        videoPlaying={videoPlaying}
        audioPlaying={audioPlaying}
        onAudioStateChange={setAudioPlaying}
      />

      {/* Elegant Universal Navbar (No REC, No Gimmicks, Clean Monogram & Audio/Video Controls) */}
      <CinematicNavbar
        groomInitial={groomInitial}
        brideInitial={brideInitial}
        videoPlaying={videoPlaying}
        audioPlaying={audioPlaying}
        onToggleVideo={() => setVideoPlaying((prev) => !prev)}
        onToggleAudio={() => setAudioPlaying((prev) => !prev)}
      />

      {/* Main Overlaid Luxury Experience — Focused Cinema Premiere Layout */}
      <div className="relative z-10">
        {/* 1. Grand 70mm Panavision Premiere Billboard */}
        <CinematicHero field={field} />

        {/* 2. Director's Call Sheet & 35mm Film Strip Scene Breakdown */}
        <CinematicSchedule
          items={content.programItems}
          editable={editing}
          field={field}
          onCommitItem={handleCommitProgramItem}
        />

        {/* 3. Hollywood Will-Call Box Office Pass & Guest Registration */}
        <CinematicRsvp field={field} />

        {/* Ultra-Luxury Glass Footer */}
        <footer className="border-t border-[var(--cv-border-light)] bg-black/60 py-16 text-center backdrop-blur-md">
          <div className="mx-auto max-w-md space-y-4 px-4 font-mono text-xs uppercase">
            <p className="font-serif text-2xl font-light text-[var(--cv-gold)] italic normal-case">
              {field("closingBlessing", "font-serif text-2xl font-light text-[var(--cv-gold)] italic normal-case")}
            </p>
            <p className="text-[11px] tracking-widest text-[var(--cv-text-muted)]">
              {field("presenceLine", "text-[11px] tracking-widest text-[var(--cv-text-muted)]")}
            </p>
            <div className="border-t border-white/10 pt-4 text-[9px] tracking-[0.25em] text-[var(--cv-text-faint)]">
              {field("footer", "text-[9px] tracking-[0.25em] text-[var(--cv-text-faint)]")}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
