"use client";

import type { ReactNode } from "react";
import BurgundyPetals from "./BurgundyPetals";

interface BurgundyCoupleSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  bgPattern?: string;
}

export default function BurgundyCoupleSection({
  field,
  bgPattern = "/templates/burgundy-bloom/bloom-bg.jpg",
}: BurgundyCoupleSectionProps) {
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

      {/* Central Announcement Card */}
      <div className="relative z-30 mx-auto max-w-md space-y-4">
        {/* Quranic Verse in Arabic */}
        <div dir="rtl" className="ab-font-amiri text-lg leading-relaxed text-[var(--ab-burgundy)] drop-shadow-sm sm:text-xl md:text-2xl">
          {field("blessing", "text-center ab-font-amiri text-lg sm:text-xl md:text-2xl text-[var(--ab-burgundy)]", true)}
        </div>

        {/* Surah Reference */}
        <div className="ab-font-cinzel text-[9px] tracking-[0.25em] text-[var(--ab-burgundy)]/75 uppercase">
          {field("shareText", "ab-font-cinzel text-[9px] tracking-[0.25em] text-[var(--ab-burgundy)]/75 uppercase")}
        </div>

        {/* English Translation */}
        <div className="ab-font-amiri text-xs font-bold leading-relaxed text-[var(--ab-burgundy)] sm:text-sm">
          {field("hamdalah", "ab-font-amiri text-xs font-bold leading-relaxed text-[var(--ab-burgundy)] sm:text-sm")}
        </div>

        {/* Small Gold Divider */}
        <div className="mx-auto my-3 h-px w-12 bg-[var(--ab-gold)]/60" />

        {/* Bride Name & Lineage */}
        <div className="space-y-1 pt-1">
          <h1 className="ab-font-cormorant text-3xl font-medium italic text-[var(--ab-espresso)] sm:text-4xl md:text-5xl">
            {field("brideName", "ab-font-cormorant text-3xl sm:text-4xl md:text-5xl font-medium italic text-[var(--ab-espresso)]")}
          </h1>
          <div className="ab-font-lora text-[11px] font-semibold text-[var(--ab-espresso)]/70 sm:text-xs">
            {field("brideParents", "ab-font-lora text-[11px] sm:text-xs font-semibold text-[var(--ab-espresso)]/70")}
          </div>
        </div>

        {/* Ornate Gold Ampersand Divider */}
        <div className="mx-auto flex w-full max-w-[200px] items-center justify-center gap-3.5 my-2">
          <div className="h-px flex-1 bg-[var(--ab-gold)]/70" />
          <span className="ab-font-cormorant text-2xl font-light italic text-[var(--ab-gold)]">
            &
          </span>
          <div className="h-px flex-1 bg-[var(--ab-gold)]/70" />
        </div>

        {/* Groom Name & Lineage */}
        <div className="space-y-1">
          <h1 className="ab-font-cormorant text-3xl font-medium italic text-[var(--ab-espresso)] sm:text-4xl md:text-5xl">
            {field("groomName", "ab-font-cormorant text-3xl sm:text-4xl md:text-5xl font-medium italic text-[var(--ab-espresso)]")}
          </h1>
          <div className="ab-font-lora text-[11px] font-semibold text-[var(--ab-espresso)]/70 sm:text-xs">
            {field("hostNames", "ab-font-lora text-[11px] sm:text-xs font-semibold text-[var(--ab-espresso)]/70")}
          </div>
        </div>

        {/* Small Gold Divider */}
        <div className="mx-auto my-4 h-px w-12 bg-[var(--ab-gold)]/60" />

        {/* Event Date Announcement */}
        <div className="ab-font-cinzel text-xs font-bold tracking-[0.28em] text-[var(--ab-espresso)] uppercase sm:text-sm">
          <span>{field("weekday", "font-bold")}</span>,{" "}
          <span>{field("day", "font-bold")}</span>{" "}
          <span>{field("monthYear", "font-bold")}</span>
        </div>
      </div>
    </section>
  );
}
