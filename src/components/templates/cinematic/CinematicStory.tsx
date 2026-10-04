"use client";

import type { ReactNode } from "react";

export default function CinematicStory({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section id="story" className="relative z-10 mx-auto my-28 max-w-4xl px-4">
      {/* Screenplay Binder Card */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--cv-gold)]/40 bg-gradient-to-b from-[#110e16] via-[#16121f] to-[#0e0c13] p-7 shadow-[0_12px_45px_rgba(0,0,0,0.85)] sm:p-12">
        
        {/* Top Screenplay Draft Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--cv-gold)]/20 pb-4 font-mono text-[10px] tracking-[0.25em] text-[var(--cv-gold)] uppercase">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--cv-gold-light)]">ORIGINAL SCREENPLAY</span>
            <span className="opacity-40">•</span>
            <span>SHOOTING DRAFT</span>
          </div>
          <div className="text-[var(--cv-text-muted)]">
            SCENE NO. 42 • ACT I
          </div>
        </div>

        {/* Script Content */}
        <div className="mt-8 space-y-6 text-left">
          {/* Scene slugline */}
          <div className="font-mono text-xs font-bold tracking-widest text-[var(--cv-gold)] uppercase">
            FADE IN:
          </div>

          <div className="font-mono text-xs font-semibold tracking-wider text-[var(--cv-gold-light)] uppercase">
            EXT. THE PATH OF DESTINY — GOLDEN HOUR
          </div>

          <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-4xl">
            {field("storyTitle", "font-serif text-3xl font-light text-white sm:text-4xl")}
          </h2>

          {/* Action text */}
          <div className="font-mono text-xs leading-relaxed text-[var(--cv-text-muted)] sm:text-sm">
            {field("storyText", "font-mono text-xs leading-relaxed text-[var(--cv-text-muted)] sm:text-sm", true)}
          </div>

          {/* Screenplay Dialogue / Blessing Lockup */}
          <div className="my-8 rounded-2xl border-l-2 border-[var(--cv-gold)] bg-black/50 p-5 pl-6 sm:p-6 sm:pl-8">
            <div className="font-mono text-[10px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
              THE SACRED VOW (O.S.)
            </div>
            <p className="mt-2 font-serif text-lg font-light text-[var(--cv-gold-light)] italic sm:text-xl">
              “{field("blessing", "font-serif text-lg font-light text-[var(--cv-gold-light)] italic sm:text-xl")}”
            </p>
          </div>

          <div className="font-mono text-right text-xs font-bold tracking-widest text-[var(--cv-gold)] uppercase">
            FADE TO HAPPILY EVER AFTER.
          </div>
        </div>

      </div>
    </section>
  );
}

