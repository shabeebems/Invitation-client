"use client";

import type { ReactNode } from "react";
import BurgundyPetals from "./BurgundyPetals";
import BurgundyFloralDivider from "./BurgundyFloralDivider";

interface BurgundyInvocationSectionProps {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  bgPattern?: string;
}

export default function BurgundyInvocationSection({
  field,
  bgPattern = "/templates/burgundy-bloom/bloom-bg.jpg",
}: BurgundyInvocationSectionProps) {
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

      {/* Main Invocation Container */}
      <div className="relative z-30 mx-auto max-w-lg space-y-6">
        {/* Sacred Bismillah Calligraphy */}
        <div dir="rtl" className="ab-font-amiri text-2xl text-[var(--ab-burgundy)] drop-shadow-sm sm:text-3xl md:text-4xl">
          {field("bismillah", "text-center font-serif text-2xl text-[var(--ab-burgundy)] sm:text-3xl md:text-4xl")}
        </div>

        {/* English Translation */}
        <div className="ab-font-amiri text-xs font-bold leading-relaxed text-[var(--ab-burgundy)] sm:text-sm md:text-base">
          {field("bismillahTranslation", "text-center text-xs font-bold leading-relaxed text-[var(--ab-burgundy)] sm:text-sm md:text-base", true)}
        </div>

        {/* Ornamental Divider */}
        <BurgundyFloralDivider className="my-6 max-w-xs" />

        {/* Cordial Welcome Title */}
        <div className="ab-font-cormorant text-2xl font-medium italic text-[var(--ab-burgundy)] sm:text-3xl md:text-4xl">
          {field("headlinePrefix", "ab-font-cormorant text-2xl font-medium italic text-[var(--ab-burgundy)] sm:text-3xl md:text-4xl")}
        </div>

        {/* Second Ornamental Divider */}
        <BurgundyFloralDivider className="my-4 max-w-[280px]" />

        {/* Warm Narrative Message */}
        <div className="ab-font-lora mx-auto max-w-md text-xs italic leading-loose text-[var(--ab-espresso)]/80 sm:text-sm">
          {field("introLine", "ab-font-lora text-xs italic leading-loose text-[var(--ab-espresso)]/80 sm:text-sm", true)}
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[var(--ab-burgundy)]/70">
        <span className="ab-font-cinzel text-[8px] font-semibold tracking-[0.38em] uppercase">
          Scroll
        </span>
        <svg
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          className="animate-[ab-scroll-bounce_1.6s_ease-in-out_infinite]"
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
