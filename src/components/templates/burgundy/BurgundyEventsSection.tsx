"use client";

import type { ReactNode } from "react";
import BurgundyPetals from "./BurgundyPetals";
import BurgundyFloralDivider from "./BurgundyFloralDivider";

interface BurgundyEventsSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  bgPattern?: string;
  mapsUrl?: string;
}

export default function BurgundyEventsSection({
  field,
  bgPattern = "/templates/burgundy-bloom/bloom-bg.jpg",
  mapsUrl = "https://maps.app.goo.gl/SnXKiwnKtErqcHAa7",
}: BurgundyEventsSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[var(--ab-cream)] px-6 py-20 text-center">
      {/* Background Floral Tapestry */}
      <img
        src={bgPattern}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
      />

      {/* Floating Rose Petals */}
      <BurgundyPetals />

      {/* Events Container */}
      <div className="relative z-30 mx-auto max-w-xl space-y-6">
        <BurgundyFloralDivider className="max-w-[240px]" />

        {/* --- Nikkah Ceremony --- */}
        <div className="space-y-2">
          <div className="ab-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--ab-burgundy)] uppercase">
            {field("ceremonyTitle", "ab-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--ab-burgundy)] uppercase")}
          </div>

          {/* Shimmering Date Line */}
          <div className="ab-font-lora text-lg italic text-[var(--ab-burgundy)] sm:text-2xl">
            <span className="bg-gradient-to-r from-[var(--ab-burgundy)] via-[var(--ab-crimson)] via-[var(--ab-gold)] via-[var(--ab-crimson)] to-[var(--ab-burgundy)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[ab-shimmer_5s_linear_infinite]">
              <span>{field("weekday", "font-normal")}</span>, <span>{field("day", "font-normal")}</span> <span>{field("monthYear", "font-normal")}</span>
            </span>
          </div>

          <div className="ab-font-lora text-base italic text-[var(--ab-espresso)] sm:text-lg">
            {field("time", "ab-font-lora text-base sm:text-lg italic text-[var(--ab-espresso)]")}
          </div>
        </div>

        <BurgundyFloralDivider className="max-w-[200px]" />

        {/* --- Reception Ceremony --- */}
        <div className="space-y-2">
          <div className="ab-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--ab-burgundy)] uppercase">
            Reception
          </div>

          {/* Shimmering Date Line */}
          <div className="ab-font-lora text-lg italic text-[var(--ab-burgundy)] sm:text-2xl">
            <span className="bg-gradient-to-r from-[var(--ab-burgundy)] via-[var(--ab-crimson)] via-[var(--ab-gold)] via-[var(--ab-crimson)] to-[var(--ab-burgundy)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[ab-shimmer_5s_linear_infinite]">
              <span>{field("weekday", "font-normal")}</span>, <span>{field("day", "font-normal")}</span> <span>{field("monthYear", "font-normal")}</span>
            </span>
          </div>

          <div className="ab-font-lora text-base italic text-[var(--ab-espresso)] sm:text-lg">
            {field("receptionTitle", "ab-font-lora text-base sm:text-lg italic text-[var(--ab-espresso)]")}
          </div>
        </div>

        <BurgundyFloralDivider className="max-w-[200px]" />

        {/* --- Venue Card & Interactive Map --- */}
        <div className="space-y-4 pt-2">
          <div className="space-y-1">
            <div className="ab-font-cormorant text-2xl font-medium italic text-[var(--ab-burgundy)] sm:text-3xl">
              {field("venueName", "ab-font-cormorant text-2xl sm:text-3xl font-medium italic text-[var(--ab-burgundy)]")}
            </div>
            <div className="ab-font-cinzel text-[10px] font-bold tracking-[0.14em] text-[var(--ab-wine-dark)]/85 uppercase sm:text-xs">
              {field("addressFull", "ab-font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.14em] text-[var(--ab-wine-dark)]/85 uppercase")}
            </div>
          </div>

          {/* Map Pill Button */}
          <div className="flex justify-center pt-2">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ab-card-hover group inline-flex max-w-sm items-center gap-3 rounded-xl border border-[var(--ab-burgundy)]/20 bg-[var(--ab-ivory-light)] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all"
            >
              {/* Pin Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--ab-burgundy)]/10 text-[var(--ab-burgundy)]">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path
                    d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12C13 2.69 10.31 0 7 0z"
                    fill="currentColor"
                  />
                  <circle cx="7" cy="6" r="2.2" fill="white" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-left">
                <div className="ab-font-lora text-xs font-medium italic text-[var(--ab-espresso)]">
                  {field("venueName", "ab-font-lora text-xs font-medium italic text-[var(--ab-espresso)]")}
                </div>
                <div className="ab-font-cinzel truncate text-[9px] tracking-wide text-[var(--ab-wine-dark)]/70 uppercase">
                  {field("addressFull", "ab-font-cinzel text-[9px] tracking-wide text-[var(--ab-wine-dark)]/70 uppercase")}
                </div>
              </div>

              {/* Map Action Button */}
              <div className="ml-auto pl-3 border-l border-[var(--ab-burgundy)]/15">
                <span className="flex items-center gap-1.5 rounded-lg bg-[var(--ab-burgundy)] px-3 py-1.5 text-[9px] font-bold tracking-wider text-[var(--ab-cream)] uppercase transition-all group-hover:bg-[var(--ab-crimson)]">
                  <span>Map</span>
                  <span>→</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
