"use client";

import type { ReactNode } from "react";

export default function CinematicHero({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-4 pt-16 pb-20 text-center">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Sacred Blessing / Bismillah */}
        <div className="space-y-3">
          <div className="font-serif text-3xl font-light text-[var(--cv-gold-light)] drop-shadow-[0_2px_15px_rgba(226,192,107,0.4)] sm:text-4xl md:text-5xl">
            {field("bismillah", "text-center font-serif text-3xl text-[var(--cv-gold-light)] sm:text-4xl md:text-5xl")}
          </div>

          <p className="font-serif text-xs tracking-[0.2em] text-[var(--cv-gold)] italic sm:text-sm">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Host Label & Announcement */}
        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase sm:text-sm">
            {field("hostLabel", "text-center text-xs tracking-[0.3em] text-[var(--cv-gold)] uppercase sm:text-sm")}
          </div>
          <div className="text-base font-light tracking-wide text-[var(--cv-text-main)] sm:text-lg">
            {field("hostNames", "text-center text-base font-light text-[var(--cv-text-main)] sm:text-lg")}
          </div>
          <div className="mx-auto max-w-lg text-xs font-light tracking-widest text-[var(--cv-text-muted)] uppercase sm:text-sm">
            {field("introLine", "text-center text-xs font-light text-[var(--cv-text-muted)] uppercase sm:text-sm")}
          </div>
        </div>

        {/* Grand Typography — Couple Names */}
        <div className="my-8 space-y-3">
          <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-7xl md:text-8xl lg:text-9xl">
            <span className="cv-gold-gradient block drop-shadow-[0_4px_30px_rgba(226,192,107,0.4)]">
              {field("groomName", "cv-gold-gradient font-serif font-semibold")}
            </span>
            <span className="my-2 block font-serif text-2xl font-light text-[var(--cv-gold)] italic sm:text-3xl">
              &
            </span>
            <span className="cv-gold-gradient block drop-shadow-[0_4px_30px_rgba(226,192,107,0.4)]">
              {field("brideName", "cv-gold-gradient font-serif font-semibold")}
            </span>
          </h1>

          {/* Parents Lineage & Blessing */}
          <div className="mx-auto max-w-lg pt-3 text-xs font-light tracking-wide text-[var(--cv-text-muted)] sm:text-sm">
            <span className="opacity-80">{field("brideParentsLabel", "opacity-80")} </span>
            <span className="font-medium text-[var(--cv-gold-light)]">
              {field("brideParents", "font-medium text-[var(--cv-gold-light)]")}
            </span>
          </div>

          <p className="mx-auto max-w-md pt-2 text-xs font-light tracking-[0.2em] text-[var(--cv-gold)] uppercase sm:text-sm">
            {field("inviteLine", "text-center text-xs tracking-[0.2em] text-[var(--cv-gold)] uppercase sm:text-sm")}
          </p>
        </div>

        {/* Architectural Event Ribbon */}
        <div className="cv-glass mx-auto max-w-2xl rounded-3xl p-5 backdrop-blur-xl sm:p-6">
          <div className="grid grid-cols-1 divide-y divide-[var(--cv-border-light)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Date */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                The Wedding Day
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cv-text-main)] sm:text-xl">
                {field("weekday", "font-medium text-[var(--cv-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cv-text-muted)]">
                {field("day", "text-xs font-light text-[var(--cv-text-muted)]")} {field("monthYear", "text-xs font-light text-[var(--cv-text-muted)]")}
              </p>
            </div>

            {/* Time */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                Auspicious Hour
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cv-text-main)] sm:text-xl">
                {field("time", "font-medium text-[var(--cv-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cv-text-muted)]">
                Ceremony & Reception
              </p>
            </div>

            {/* Venue */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                The Venue
              </span>
              <p className="font-serif text-lg font-medium text-[var(--cv-text-main)] sm:text-xl">
                {field("venueCity", "font-medium text-[var(--cv-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--cv-text-muted)] line-clamp-1">
                {field("venueName", "text-xs font-light text-[var(--cv-text-muted)]")}
              </p>
            </div>
          </div>
        </div>

        {/* Quick-Action Suite */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#schedule"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[var(--cv-gold-dark)] via-[var(--cv-gold)] to-[var(--cv-gold-dark)] px-8 py-3.5 text-xs font-bold tracking-wider text-[#121016] uppercase shadow-lg transition hover:brightness-110 active:scale-95"
          >
            <span>Celebration Schedule</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-border)] bg-black/40 px-8 py-3.5 text-xs font-semibold tracking-wider text-[var(--cv-gold-light)] uppercase backdrop-blur-md transition hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/10"
          >
            <span>RSVP & Wishes</span>
            <span>💌</span>
          </a>
        </div>
      </div>
    </section>
  );
}
