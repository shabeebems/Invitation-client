"use client";

import type { ReactNode } from "react";

export default function VogueCoverHero({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-20">
      {/* 1. Grand Masthead Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-center">
        {/* Issue Top Strip */}
        <div className="flex flex-wrap items-center justify-between border-b border-[var(--ev-border-light)] pb-2 text-[10px] font-semibold tracking-[0.25em] text-[var(--ev-text-muted)] uppercase">
          <span>THE WEDDING ISSUE · VOL. 26</span>
          <span className="hidden sm:inline">HAUTE COUTURE EDITION · AUTUMN / WINTER 2026</span>
          <span>PRICELESS · FOR INVITED GUESTS ONLY</span>
        </div>

        {/* Monumental Magazine Title */}
        <h1 className="ev-masthead-title my-4 text-6xl tracking-[0.2em] sm:text-8xl md:text-9xl lg:text-[10.5rem]">
          THE UNION
        </h1>

        <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.2em] text-[var(--ev-bronze)] uppercase">
          <span>{field("coverTagline", "text-[11px] tracking-[0.2em] uppercase font-semibold")}</span>
          <span className="hidden sm:inline">CURATED BY INVITEO ATELIER</span>
          <span>EST. 2026</span>
        </div>
      </div>

      {/* 2. Main Magazine Cover Layout (Editorial Double Grid) */}
      <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left Column: Cover Story Headlines & Parents Blessing (4 cols) */}
        <div className="flex flex-col justify-between space-y-8 border-b border-[var(--ev-border-light)] pb-8 lg:col-span-4 lg:border-b-0 lg:border-r lg:pr-8">
          {/* Sacred Bismillah */}
          <div className="space-y-2">
            <div className="font-serif text-2xl text-[var(--ev-bronze)]">
              {field("bismillah", "font-serif text-2xl text-[var(--ev-bronze)]")}
            </div>
            <p className="text-[10px] tracking-widest text-[var(--ev-text-muted)] uppercase">
              In the name of Allah, Most Gracious, Most Merciful
            </p>
          </div>

          {/* Families Announcement */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
              {field("hostLabel", "text-[10px] font-bold tracking-[0.25em] uppercase")}
            </span>
            <p className="font-serif text-lg font-normal leading-snug text-[var(--ev-text-dark)]">
              {field("hostNames", "font-serif text-lg font-normal text-[var(--ev-text-dark)]")}
            </p>
            <p className="text-xs font-light leading-relaxed text-[var(--ev-text-muted)]">
              {field("introLine", "text-xs font-light text-[var(--ev-text-muted)]")}
            </p>
          </div>

          {/* Cover Features Index Callouts */}
          <div className="space-y-4 border-t border-[var(--ev-border-light)] pt-6 text-left">
            <div className="group cursor-pointer">
              <span className="font-mono text-[9px] font-bold text-[var(--ev-bronze)]">FEATURE 01 · P. 14</span>
              <h4 className="font-serif text-base font-medium text-[var(--ev-text-dark)] transition group-hover:text-[var(--ev-bronze)]">
                The Exclusive Interview: When Two Destinies Align
              </h4>
            </div>

            <div className="group cursor-pointer">
              <span className="font-mono text-[9px] font-bold text-[var(--ev-bronze)]">FEATURE 02 · P. 28</span>
              <h4 className="font-serif text-base font-medium text-[var(--ev-text-dark)] transition group-hover:text-[var(--ev-bronze)]">
                Haute Architecture: The Palace Conservatory Grounds
              </h4>
            </div>

            <div className="group cursor-pointer">
              <span className="font-mono text-[9px] font-bold text-[var(--ev-bronze)]">FEATURE 03 · P. 42</span>
              <h4 className="font-serif text-base font-medium text-[var(--ev-text-dark)] transition group-hover:text-[var(--ev-bronze)]">
                The Wardrobe Moodboard: Black-Tie & Silk Velvet
              </h4>
            </div>
          </div>

          {/* Parents Lineage */}
          <div className="border-t border-[var(--ev-border-light)] pt-4 text-xs font-light text-[var(--ev-text-muted)]">
            <span className="text-[10px] uppercase tracking-wider">{field("brideParentsLabel", "text-[10px] uppercase tracking-wider")} </span>
            <span className="font-serif font-medium text-[var(--ev-text-dark)]">
              {field("brideParents", "font-serif font-medium text-[var(--ev-text-dark)]")}
            </span>
          </div>
        </div>

        {/* Center / Right Column: Cover Photo Portrait with Overlay Typography (8 cols) */}
        <div className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-[var(--ev-bg-dark)] lg:col-span-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11]">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85"
              alt="Editorial Vogue Cover"
              className="h-full w-full object-cover filter grayscale contrast-115 transition duration-700 hover:scale-105"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Overlaid Couple Names in Grand Serif */}
          <div className="absolute inset-x-0 bottom-0 p-6 text-left text-white sm:p-10">
            <span className="text-[11px] font-semibold tracking-[0.3em] text-[var(--ev-bronze-light)] uppercase">
              COUTURE WEDDING ISSUE · COVER STAR
            </span>

            <h2 className="my-2 font-serif text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              <span>{field("groomName", "font-serif font-bold text-white")}</span>
              <span className="mx-3 font-serif font-light text-[var(--ev-bronze-light)] italic">&</span>
              <span>{field("brideName", "font-serif font-bold text-white")}</span>
            </h2>

            <p className="max-w-lg text-xs font-light leading-relaxed text-white/80 sm:text-sm">
              {field("presenceLine", "text-xs font-light text-white/80 sm:text-sm")}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Editorial Issue Ribbon (Date, Time, Venue & Retail Barcode) */}
      <div className="mt-12 rounded-2xl border-2 border-[var(--ev-text-dark)] bg-white p-6 shadow-xl sm:p-8">
        <div className="grid grid-cols-1 items-center gap-6 divide-y divide-[var(--ev-border-light)] sm:grid-cols-12 sm:divide-x sm:divide-y-0">
          {/* Date */}
          <div className="sm:col-span-3 sm:pr-4">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
              THE CELEBRATION DATE
            </span>
            <p className="mt-1 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
              {field("weekday", "font-serif text-2xl font-bold text-[var(--ev-text-dark)]")}
            </p>
            <p className="text-xs font-light text-[var(--ev-text-muted)]">
              {field("day", "text-xs font-light text-[var(--ev-text-muted)]")} {field("monthYear", "text-xs font-light text-[var(--ev-text-muted)]")}
            </p>
          </div>

          {/* Time */}
          <div className="pt-4 sm:col-span-3 sm:px-4 sm:pt-0">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
              COMMENCEMENT HOUR
            </span>
            <p className="mt-1 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
              {field("time", "font-serif text-2xl font-bold text-[var(--ev-text-dark)]")}
            </p>
            <p className="text-xs font-light text-[var(--ev-text-muted)]">
              Prompt Arrival Requested
            </p>
          </div>

          {/* Venue */}
          <div className="pt-4 sm:col-span-3 sm:px-4 sm:pt-0">
            <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
              ESTATE LOCATION
            </span>
            <p className="mt-1 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
              {field("venueCity", "font-serif text-2xl font-bold text-[var(--ev-text-dark)]")}
            </p>
            <p className="text-xs font-light text-[var(--ev-text-muted)] line-clamp-1">
              {field("venueName", "text-xs font-light text-[var(--ev-text-muted)]")}
            </p>
          </div>

          {/* Authentic Retail Barcode */}
          <div className="flex flex-col items-center justify-center pt-4 sm:col-span-3 sm:pl-4 sm:pt-0">
            <div className="font-mono text-[8px] tracking-[0.25em] text-[var(--ev-text-muted)] uppercase">
              ISSN 2026-9812-VOGUE
            </div>
            {/* Barcode Visual Lines */}
            <div className="my-1.5 flex h-9 items-end gap-[2px]">
              {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((h, i) => (
                <span
                  key={i}
                  className="bg-[var(--ev-text-dark)]"
                  style={{ width: i % 3 === 0 ? "2px" : "1.2px", height: `${h * 3.5 + 8}px` }}
                />
              ))}
            </div>
            <span className="font-mono text-[8px] font-bold tracking-[0.2em] text-[var(--ev-text-dark)]">
              ADMIT ONE · HONORED GUEST
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
