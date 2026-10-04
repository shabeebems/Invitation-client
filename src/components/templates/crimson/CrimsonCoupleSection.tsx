"use client";

import type { ReactNode } from "react";

interface CrimsonCoupleSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}

export default function CrimsonCoupleSection({
  field,
}: CrimsonCoupleSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Central Announcement Card */}
      <div className="relative z-30 mx-auto max-w-md space-y-4">
        {/* Quranic Verse in Arabic */}
        <div dir="rtl" className="cr-font-amiri text-lg leading-relaxed text-[var(--cr-crimson)] drop-shadow-sm sm:text-xl md:text-2xl">
          {field("blessing", "text-center cr-font-amiri text-lg sm:text-xl md:text-2xl text-[var(--cr-crimson)]", true)}
        </div>

        {/* Surah Reference */}
        <div className="cr-font-cinzel text-[9px] tracking-[0.25em] text-[var(--cr-crimson)]/75 uppercase">
          {field("shareText", "cr-font-cinzel text-[9px] tracking-[0.25em] text-[var(--cr-crimson)]/75 uppercase")}
        </div>

        {/* English Translation */}
        <div className="cr-font-amiri text-xs font-bold leading-relaxed text-[var(--cr-crimson)] sm:text-sm">
          {field("hamdalah", "cr-font-amiri text-xs font-bold leading-relaxed text-[var(--cr-crimson)] sm:text-sm")}
        </div>

        {/* Small Gold Divider */}
        <div className="mx-auto my-3 h-px w-12 bg-[var(--cr-gold)]/60" />

        {/* Bride Name & Lineage */}
        <div className="space-y-1.5 pt-1">
          <h1 className="cr-font-cormorant text-3xl font-normal italic text-[var(--cr-espresso)] sm:text-4xl md:text-5xl">
            {field("brideName", "cr-font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal italic text-[var(--cr-espresso)]")}
          </h1>
          <div className="cr-font-lora text-[11px] font-semibold text-[var(--cr-espresso)]/70 sm:text-xs">
            {field("brideParents", "cr-font-lora text-[11px] sm:text-xs font-semibold text-[var(--cr-espresso)]/70")}
          </div>
          <div className="cr-font-lora text-[10px] italic text-[var(--cr-espresso)]/55 leading-relaxed">
            {field("familyLine", "cr-font-lora text-[10px] italic text-[var(--cr-espresso)]/55 leading-relaxed", true)}
          </div>
        </div>

        {/* Ornate Gold Ampersand Divider */}
        <div className="mx-auto flex w-full max-w-[200px] items-center justify-center gap-3.5 my-2">
          <div className="h-px flex-1 bg-[var(--cr-gold)]/70" />
          <span className="cr-font-cormorant text-2xl font-light italic text-[var(--cr-gold)]">
            &
          </span>
          <div className="h-px flex-1 bg-[var(--cr-gold)]/70" />
        </div>

        {/* Groom Name & Lineage */}
        <div className="space-y-1.5">
          <h1 className="cr-font-cormorant text-3xl font-normal italic text-[var(--cr-espresso)] sm:text-4xl md:text-5xl">
            {field("groomName", "cr-font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal italic text-[var(--cr-espresso)]")}
          </h1>
          <div className="cr-font-lora text-[11px] font-semibold text-[var(--cr-espresso)]/70 sm:text-xs">
            {field("hostLabel", "cr-font-lora text-[11px] sm:text-xs font-semibold text-[var(--cr-espresso)]/70")}
          </div>
        </div>

        {/* Small Gold Divider */}
        <div className="mx-auto my-4 h-px w-12 bg-[var(--cr-gold)]/60" />

        {/* Event Date Announcement */}
        <div className="cr-font-cinzel text-xs font-bold tracking-[0.28em] text-[var(--cr-espresso)] uppercase sm:text-sm">
          <span>{field("weekday", "font-bold")}</span>,{" "}
          <span>{field("day", "font-bold")}</span>{" "}
          <span>{field("monthYear", "font-bold")}</span>
        </div>
        <div className="cr-font-cinzel text-[9.5px] font-semibold tracking-[0.24em] text-[var(--cr-espresso)]/60 uppercase">
          {field("headlinePrefix", "cr-font-cinzel text-[9.5px] font-semibold tracking-[0.24em] text-[var(--cr-espresso)]/60 uppercase")}
        </div>
      </div>
    </section>
  );
}
