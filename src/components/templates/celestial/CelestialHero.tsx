"use client";

import type { ReactNode } from "react";

export default function CelestialHero({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section className="relative z-10 flex min-h-[95vh] flex-col items-center justify-center px-4 pt-16 pb-20 text-center">
      {/* 3D Armillary Compass Background Rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
        <div className="cs-armillary-cw h-[560px] w-[560px] rounded-full border border-dashed border-[var(--cs-starlight)] sm:h-[720px] sm:w-[720px]" />
        <div className="cs-armillary-ccw absolute inset-8 rounded-full border border-[var(--cs-border)]" />
        <div className="absolute inset-20 rounded-full border border-dotted border-[var(--cs-border-light)]" />
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        {/* Astronomical Epoch Stamp */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--cs-border-light)] bg-black/60 px-4 py-1 font-mono text-[10px] tracking-[0.25em] text-[var(--cs-starlight-dim)] uppercase backdrop-blur-md">
          <span>✦ EPOCH: J2026.9 · CELESTIAL HORIZON ✦</span>
        </div>

        {/* Sacred Bismillah */}
        <div className="space-y-3">
          <div className="font-serif text-3xl font-light text-[var(--cs-starlight)] drop-shadow-[0_0_25px_rgba(243,227,182,0.45)] sm:text-4xl md:text-5xl">
            {field("bismillah", "text-center font-serif text-3xl text-[var(--cs-starlight)] sm:text-4xl md:text-5xl")}
          </div>

          <p className="font-serif text-xs tracking-[0.25em] text-[var(--cs-starlight-dim)] italic sm:text-sm">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Host Label & Cosmic Announcement */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase sm:text-xs">
            {field("hostLabel", "text-center text-[11px] tracking-[0.35em] text-[var(--cs-starlight)] uppercase sm:text-xs")}
          </div>
          <div className="text-base font-light tracking-wide text-[var(--cs-text-main)] sm:text-lg">
            {field("hostNames", "text-center text-base font-light text-[var(--cs-text-main)] sm:text-lg")}
          </div>
          <div className="mx-auto max-w-lg text-xs font-light tracking-widest text-[var(--cs-text-muted)] uppercase sm:text-sm">
            {field("introLine", "text-center text-xs font-light text-[var(--cs-text-muted)] uppercase sm:text-sm")}
          </div>
        </div>

        {/* Grand Celestial Names */}
        <div className="my-8 space-y-4">
          <div className="flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
            <span className="font-serif text-xs tracking-[0.3em]">✦ WRITTEN IN THE STARS ✦</span>
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
          </div>

          <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="cs-starlight-gradient block drop-shadow-[0_4px_40px_rgba(243,227,182,0.5)]">
              {field("groomName", "cs-starlight-gradient font-serif font-semibold")}
            </span>
            <span className="my-2 block font-serif text-2xl font-light text-[var(--cs-starlight-dim)] italic sm:text-3xl">
              &
            </span>
            <span className="cs-starlight-gradient block drop-shadow-[0_4px_40px_rgba(243,227,182,0.5)]">
              {field("brideName", "cs-starlight-gradient font-serif font-semibold")}
            </span>
          </h1>

          {/* Parents Lineage & Blessing */}
          <div className="mx-auto max-w-lg pt-3 text-xs font-light tracking-wide text-[var(--cs-text-muted)] sm:text-sm">
            <span className="opacity-80">{field("brideParentsLabel", "opacity-80")} </span>
            <span className="font-medium text-[var(--cs-starlight-light)]">
              {field("brideParents", "font-medium text-[var(--cs-starlight-light)]")}
            </span>
          </div>

          <p className="mx-auto max-w-md pt-2 text-xs font-light tracking-[0.25em] text-[var(--cs-starlight)] uppercase sm:text-sm">
            {field("inviteLine", "text-center text-xs tracking-[0.25em] text-[var(--cs-starlight)] uppercase sm:text-sm")}
          </p>
        </div>

        {/* Astrolabe Beveled Celestial Instrument Dial */}
        <div className="cs-instrument-card mx-auto max-w-2xl rounded-3xl p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          <span className="cs-corner-pin tl" />
          <span className="cs-corner-pin tr" />
          <span className="cs-corner-pin bl" />
          <span className="cs-corner-pin br" />

          <div className="grid grid-cols-1 divide-y divide-[var(--cs-border-light)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* The Auspicious Date */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                The Auspicious Date
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cs-text-main)] sm:text-xl">
                {field("weekday", "font-medium text-[var(--cs-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cs-text-muted)]">
                {field("day", "text-xs font-light text-[var(--cs-text-muted)]")} {field("monthYear", "text-xs font-light text-[var(--cs-text-muted)]")}
              </p>
            </div>

            {/* Twilight Hour */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Twilight Alignment
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cs-text-main)] sm:text-xl">
                {field("time", "font-medium text-[var(--cs-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cs-text-muted)]">
                Nikah & Starlit Feast
              </p>
            </div>

            {/* Earthly Coordinates */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Coordinates
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cs-text-main)] sm:text-xl">
                {field("venueCity", "font-medium text-[var(--cs-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cs-text-muted)] line-clamp-1">
                {field("venueName", "text-xs font-light text-[var(--cs-text-muted)]")}
              </p>
            </div>
          </div>
        </div>

        {/* Action Suite */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cs-starlight)] bg-gradient-to-r from-[var(--cs-starlight-dim)] via-[var(--cs-starlight)] to-[var(--cs-starlight-dim)] px-8 py-3.5 text-xs font-bold tracking-wider text-[#030612] uppercase shadow-[0_0_25px_rgba(243,227,182,0.35)] transition hover:brightness-110 active:scale-95"
          >
            <span>Planetary Orbit Clock</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </a>

          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cs-border)] bg-[var(--cs-bg-card)] px-8 py-3.5 text-xs font-semibold tracking-wider text-[var(--cs-starlight)] uppercase backdrop-blur-md transition hover:border-[var(--cs-starlight)] hover:bg-[var(--cs-starlight)]/10"
          >
            <span>Wish Upon a Star (RSVP)</span>
            <span>✦</span>
          </a>
        </div>
      </div>
    </section>
  );
}
