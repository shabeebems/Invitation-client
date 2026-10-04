"use client";

import type { ReactNode } from "react";
import CrimsonFloralDivider from "./CrimsonFloralDivider";

interface CrimsonInvocationSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}

export default function CrimsonInvocationSection({
  field,
}: CrimsonInvocationSectionProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* Main Invocation Container */}
      <div className="relative z-30 mx-auto max-w-lg space-y-6">
        {/* Sacred Bismillah Calligraphy */}
        <div dir="rtl" className="cr-font-amiri text-2xl text-[var(--cr-crimson)] drop-shadow-sm sm:text-3xl md:text-4xl">
          {field("bismillah", "text-center font-serif text-2xl text-[var(--cr-crimson)] sm:text-3xl md:text-4xl")}
        </div>

        {/* English Translation */}
        <div className="cr-font-amiri text-xs font-bold leading-relaxed text-[var(--cr-crimson)] sm:text-sm md:text-base">
          {field("bismillahTranslation", "text-center text-xs font-bold leading-relaxed text-[var(--cr-crimson)] sm:text-sm md:text-base", true)}
        </div>

        {/* Ornamental Divider */}
        <CrimsonFloralDivider className="my-6 max-w-xs" />

        {/* Host Names Lineage */}
        <div className="cr-font-cormorant text-2xl font-medium italic text-[var(--cr-crimson)] sm:text-3xl md:text-4xl">
          {field("hostNames", "cr-font-cormorant text-2xl font-medium italic text-[var(--cr-crimson)] sm:text-3xl md:text-4xl", true)}
        </div>

        {/* Second Ornamental Divider */}
        <CrimsonFloralDivider className="my-4 max-w-[280px]" />

        {/* Warm Narrative Message */}
        <div className="cr-font-lora mx-auto max-w-md text-xs italic leading-loose text-[var(--cr-espresso)]/80 sm:text-sm">
          {field("introLine", "cr-font-lora text-xs italic leading-loose text-[var(--cr-espresso)]/80 sm:text-sm", true)}
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--cr-crimson)]/70">
        <span className="cr-font-cinzel text-[8px] font-semibold tracking-[0.38em] uppercase">
          Scroll
        </span>
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          className="animate-[cr-scroll-bounce_1.6s_ease-in-out_infinite]"
        >
          <path
            d="M3 6 L9 12 L15 6"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
