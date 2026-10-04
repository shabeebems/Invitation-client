"use client";

import type { ReactNode } from "react";
import CrimsonFloralDivider from "./CrimsonFloralDivider";

interface CrimsonEventsSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}

export default function CrimsonEventsSection({
  field,
}: CrimsonEventsSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Events Container */}
      <div className="relative z-30 mx-auto max-w-xl space-y-7">
        <CrimsonFloralDivider className="max-w-[260px]" />

        {/* --- 1. Nikah Ceremony --- */}
        <div className="space-y-2">
          <div className="cr-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--cr-crimson)] uppercase">
            {field("ceremonyTitle", "cr-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--cr-crimson)] uppercase")}
          </div>

          <div className="cr-font-lora text-lg italic text-[var(--cr-crimson)] sm:text-2xl">
            <span className="bg-gradient-to-r from-[var(--cr-crimson)] via-[var(--cr-crimson-vibrant)] via-[var(--cr-gold)] via-[var(--cr-crimson-vibrant)] to-[var(--cr-crimson)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[cr-shimmer_5s_linear_infinite]">
              Saturday, 1 August 2026
            </span>
          </div>

          <div className="cr-font-lora text-base italic text-[var(--cr-crimson)]">
            {field("time", "cr-font-lora text-base italic text-[var(--cr-crimson)]")}
          </div>

          {/* Hena Hut Venue Card */}
          <div className="space-y-1 pt-1">
            <p className="cr-font-cormorant text-xl font-medium italic text-[var(--cr-crimson)]">
              {field("venueHall", "cr-font-cormorant text-xl font-medium italic text-[var(--cr-crimson)]")}
            </p>
            <p className="cr-font-cinzel text-[9.5px] font-bold tracking-[0.12em] text-[var(--cr-crimson-dark)]/85 uppercase">
              {field("venueCity", "cr-font-cinzel text-[9.5px] font-bold tracking-[0.12em] text-[var(--cr-crimson-dark)]/85 uppercase")}
            </p>
          </div>

          <div className="flex justify-center pt-1">
            <a
              href="https://maps.app.goo.gl/z2ay3uANz7QCJXsa7"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-card-hover group inline-flex max-w-xs items-center gap-3 rounded-xl border border-[var(--cr-crimson)]/20 bg-[var(--cr-parchment-light)] px-3.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--cr-crimson)]/10 text-[var(--cr-crimson)]">
                <svg width="13" height="16" viewBox="0 0 14 18" fill="none">
                  <path d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12C13 2.69 10.31 0 7 0z" fill="currentColor" />
                  <circle cx="7" cy="6" r="2.2" fill="white" />
                </svg>
              </div>
              <div className="text-left">
                <div className="cr-font-lora text-xs font-medium italic text-[var(--cr-espresso)]">
                  Hena Hut
                </div>
                <div className="cr-font-cinzel truncate text-[8.5px] tracking-wide text-[var(--cr-crimson-dark)]/70 uppercase">
                  Kavu Haji Road, Nileshwar
                </div>
              </div>
              <div className="ml-auto pl-2 border-l border-[var(--cr-crimson)]/15">
                <span className="flex items-center gap-1 rounded bg-[var(--cr-crimson)] px-2.5 py-1 text-[8.5px] font-bold tracking-wider text-[var(--cr-cream)] uppercase transition-all group-hover:bg-[var(--cr-crimson-vibrant)]">
                  Map →
                </span>
              </div>
            </a>
          </div>
        </div>

        <CrimsonFloralDivider className="max-w-[200px]" />

        {/* --- 2. Reception Ceremony --- */}
        <div className="space-y-2">
          <div className="cr-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--cr-crimson)] uppercase">
            Reception
          </div>

          <div className="cr-font-lora text-lg italic text-[var(--cr-crimson)] sm:text-2xl">
            <span className="bg-gradient-to-r from-[var(--cr-crimson)] via-[var(--cr-crimson-vibrant)] via-[var(--cr-gold)] via-[var(--cr-crimson-vibrant)] to-[var(--cr-crimson)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[cr-shimmer_5s_linear_infinite]">
              Saturday, 1 August 2026
            </span>
          </div>

          <div className="cr-font-lora text-base italic text-[var(--cr-crimson)]">
            {field("receptionTitle", "cr-font-lora text-base italic text-[var(--cr-crimson)]")}
          </div>

          <div className="space-y-0.5 pt-1">
            <p className="cr-font-cormorant text-xl font-medium italic text-[var(--cr-crimson)]">
              {field("houseName", "cr-font-cormorant text-xl font-medium italic text-[var(--cr-crimson)]")}
            </p>
          </div>
        </div>

        <CrimsonFloralDivider className="max-w-[200px]" />

        {/* --- 3. Wedding Ceremony --- */}
        <div className="space-y-2">
          <div className="cr-font-cinzel text-xs font-semibold tracking-[0.28em] text-[var(--cr-crimson)] uppercase">
            Wedding
          </div>

          <div className="cr-font-lora text-lg italic text-[var(--cr-crimson)] sm:text-2xl">
            <span className="bg-gradient-to-r from-[var(--cr-crimson)] via-[var(--cr-crimson-vibrant)] via-[var(--cr-gold)] via-[var(--cr-crimson-vibrant)] to-[var(--cr-crimson)] bg-[length:200%_auto] bg-clip-text text-transparent animate-[cr-shimmer_5s_linear_infinite]">
              Sunday, 2 August 2026
            </span>
          </div>

          <div className="cr-font-lora text-base italic text-[var(--cr-espresso)]">
            {field("dayNote", "cr-font-lora text-base italic text-[var(--cr-espresso)]")}
          </div>

          {/* Mina Villa Venue Card */}
          <div className="space-y-1 pt-1">
            <p className="cr-font-cormorant text-2xl font-medium italic text-[var(--cr-crimson)]">
              {field("venueName", "cr-font-cormorant text-2xl font-medium italic text-[var(--cr-crimson)]")}
            </p>
            <p className="cr-font-cinzel text-[10px] font-bold tracking-[0.14em] text-[var(--cr-crimson-dark)]/85 uppercase">
              {field("addressFull", "cr-font-cinzel text-[10px] font-bold tracking-[0.14em] text-[var(--cr-crimson-dark)]/85 uppercase")}
            </p>
          </div>

          <div className="flex justify-center pt-1">
            <a
              href="https://maps.app.goo.gl/ikPrfDBgTPo21RwN7"
              target="_blank"
              rel="noopener noreferrer"
              className="cr-card-hover group inline-flex max-w-sm items-center gap-3 rounded-xl border border-[var(--cr-crimson)]/20 bg-[var(--cr-parchment-light)] px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--cr-crimson)]/10 text-[var(--cr-crimson)]">
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                  <path d="M7 0C3.69 0 1 2.69 1 6c0 4.5 6 12 6 12s6-7.5 6-12C13 2.69 10.31 0 7 0z" fill="currentColor" />
                  <circle cx="7" cy="6" r="2.2" fill="white" />
                </svg>
              </div>
              <div className="text-left">
                <div className="cr-font-lora text-xs font-medium italic text-[var(--cr-espresso)]">
                  Mina Villa — Bride&apos;s Residence
                </div>
                <div className="cr-font-cinzel truncate text-[9px] tracking-wide text-[var(--cr-crimson-dark)]/70 uppercase">
                  Near CK Nair College, Padannakkad
                </div>
              </div>
              <div className="ml-auto pl-3 border-l border-[var(--cr-crimson)]/15">
                <span className="flex items-center gap-1.5 rounded-lg bg-[var(--cr-crimson)] px-3 py-1.5 text-[9px] font-bold tracking-wider text-[var(--cr-cream)] uppercase transition-all group-hover:bg-[var(--cr-crimson-vibrant)]">
                  Map →
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Closing In Sha Allah & Family Blessing */}
        <div className="pt-6 space-y-2">
          <CrimsonFloralDivider className="max-w-[240px]" />
          <p className="cr-font-cormorant text-2xl font-light italic text-[var(--cr-crimson)] tracking-wide sm:text-3xl">
            In Sha Allah
          </p>
          <div className="space-y-0.5 pt-1">
            <p className="cr-font-cinzel text-[9.5px] font-semibold tracking-[0.2em] text-[var(--cr-espresso)]/60 uppercase">
              Sharing the Happiness
            </p>
            <p className="cr-font-cormorant text-2xl font-medium italic text-[var(--cr-espresso)] sm:text-3xl">
              {field("presenceLine", "cr-font-cormorant text-2xl sm:text-3xl italic text-[var(--cr-espresso)]")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
