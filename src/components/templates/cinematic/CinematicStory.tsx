"use client";

import type { ReactNode } from "react";

export default function CinematicStory({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section id="story" className="relative z-10 mx-auto my-20 max-w-4xl px-4 text-center">
      <div className="cv-glass relative overflow-hidden rounded-3xl p-8 sm:p-14">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--cv-gold)]/10 blur-3xl" />

        {/* Header */}
        <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cv-gold)] opacity-80">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cv-gold)]" />
          <span className="text-xs">✦ OUR JOURNEY ✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cv-gold)]" />
        </div>

        <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
          Love Story
        </p>

        <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
          {field("storyTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
        </h2>

        {/* Story Text */}
        <div className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-[var(--cv-text-muted)] sm:text-lg">
          {field("storyText", "text-base font-light leading-relaxed text-[var(--cv-text-muted)] sm:text-lg", true)}
        </div>

        {/* Sacred Quote / Blessing */}
        <div className="mt-10 border-t border-[var(--cv-border-light)] pt-8">
          <div className="mx-auto max-w-xl">
            <span className="font-serif text-3xl text-[var(--cv-gold)]">“</span>
            <p className="-mt-3 font-serif text-lg font-light text-[var(--cv-gold)] italic sm:text-xl">
              {field("blessing", "font-serif text-lg font-light text-[var(--cv-gold)] italic sm:text-xl")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
