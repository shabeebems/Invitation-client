"use client";

import type { ReactNode } from "react";

export default function CelestialStory({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section id="story" className="relative z-10 mx-auto my-28 max-w-4xl px-4 text-center">
      <div className="cs-instrument-card relative overflow-hidden rounded-3xl p-8 sm:p-14">
        <span className="cs-corner-pin tl" />
        <span className="cs-corner-pin tr" />
        <span className="cs-corner-pin bl" />
        <span className="cs-corner-pin br" />

        {/* Subtle center celestial glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--cs-starlight)]/10 blur-3xl" />

        {/* Header */}
        <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
          <span className="font-serif text-xs tracking-[0.3em]">✦ DESTINY IN THE HEAVENS ✦</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
        </div>

        <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
          Cosmic Harmony & Qadr
        </p>

        <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl">
          {field("storyTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl")}
        </h2>

        {/* Constellation Monogram Graphic (Connecting Z and L) */}
        <div className="my-8 flex items-center justify-center">
          <svg className="h-24 w-64" viewBox="0 0 256 96" fill="none">
            {/* Constellation line */}
            <path
              d="M32 48 C 64 16, 96 80, 128 48 C 160 16, 192 80, 224 48"
              stroke="var(--cs-starlight)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-75"
            />
            {/* Left Star (Z) */}
            <circle cx="32" cy="48" r="9" fill="var(--cs-starlight)" className="animate-pulse" />
            <circle cx="32" cy="48" r="18" stroke="var(--cs-starlight)" strokeWidth="0.8" className="opacity-40" />
            <text x="32" y="52" fill="#030612" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              Z
            </text>

            {/* Central Infinity Knot Star */}
            <circle cx="128" cy="48" r="4.5" fill="#ffffff" />
            <circle cx="128" cy="48" r="12" stroke="var(--cs-starlight)" strokeWidth="0.6" className="opacity-60" />

            {/* Right Star (L) */}
            <circle cx="224" cy="48" r="9" fill="var(--cs-starlight)" className="animate-pulse" />
            <circle cx="224" cy="48" r="18" stroke="var(--cs-starlight)" strokeWidth="0.8" className="opacity-40" />
            <text x="224" y="52" fill="#030612" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              L
            </text>
          </svg>
        </div>

        {/* Story Text */}
        <div className="mx-auto max-w-2xl text-base font-light leading-relaxed text-[var(--cs-text-muted)] sm:text-lg">
          {field("storyText", "text-base font-light leading-relaxed text-[var(--cs-text-muted)] sm:text-lg", true)}
        </div>

        {/* Holy Quranic Verse Blessing */}
        <div className="mt-10 border-t border-[var(--cs-border-light)] pt-8">
          <div className="mx-auto max-w-xl">
            <span className="font-serif text-3xl text-[var(--cs-starlight)]">“</span>
            <p className="-mt-3 font-serif text-lg font-light text-[var(--cs-starlight)] italic sm:text-xl">
              {field("blessing", "font-serif text-lg font-light text-[var(--cs-starlight)] italic sm:text-xl")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
