"use client";

import type { ReactNode } from "react";

export default function VogueInterviewSpread({
  field,
}: {
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <section id="interview" className="relative z-10 mx-auto my-28 max-w-6xl px-4">
      {/* Magazine Section Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>FEATURE ARTICLE · P. 14 – 19</span>
          <span>THE EXCLUSIVE PROFILE</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          {field("storyTitle", "font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl")}
        </h2>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase">
          WORDS BY SOCIETY EDITOR · PORTRAITS IN RESIDENCE · MUSCAT, 2026
        </p>
      </div>

      {/* Double Column Magazine Article Spread */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Column 1: Main Story with Drop Cap (6 cols) */}
        <div className="space-y-6 lg:col-span-6">
          <div className="ev-drop-cap text-base font-light leading-relaxed text-[var(--ev-text-muted)] sm:text-lg">
            {field("storyText", "text-base font-light leading-relaxed text-[var(--ev-text-muted)] sm:text-lg", true)}
          </div>

          {/* Q&A Exchange 01 */}
          <div className="space-y-2 border-t border-[var(--ev-border-light)] pt-6">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--ev-bronze)] uppercase">
              THE UNION: What was the first moment you knew this was destined?
            </span>
            <p className="font-serif text-base italic leading-relaxed text-[var(--ev-text-dark)]">
              “It was during an autumn sunset when our families first met. What began as quiet conversation about faith, dreams, and values felt as though it had already been written long ago.”
            </p>
          </div>

          {/* Q&A Exchange 02 */}
          <div className="space-y-2 border-t border-[var(--ev-border-light)] pt-6">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--ev-bronze)] uppercase">
              THE UNION: What is your vision for this new chapter together?
            </span>
            <p className="font-serif text-base italic leading-relaxed text-[var(--ev-text-dark)]">
              “To build a sanctuary of peace, kindness, and continuous growth—anchored in unwavering faith and joyful companionship.”
            </p>
          </div>
        </div>

        {/* Column 2: Oversized Pull-Quote & Photographic Inset (6 cols) */}
        <div className="flex flex-col justify-between space-y-8 lg:col-span-6 lg:border-l lg:border-[var(--ev-border-light)] lg:pl-12">
          {/* Oversized High-Fashion Pull Quote */}
          <div className="relative border-y-2 border-[var(--ev-text-dark)] py-8 text-center sm:py-12">
            <span className="font-serif text-6xl leading-none text-[var(--ev-bronze)] select-none">“</span>
            <blockquote className="-mt-6 font-serif text-2xl font-light italic leading-snug text-[var(--ev-text-dark)] sm:text-3xl">
              {field("blessing", "font-serif text-2xl font-light italic text-[var(--ev-text-dark)] sm:text-3xl")}
            </blockquote>
            <span className="mt-4 block font-mono text-[9px] tracking-[0.25em] text-[var(--ev-text-muted)] uppercase">
              THE SACRED BENEDICTION · SURAH AR-RUM
            </span>
          </div>

          {/* Editorial Inset Photograph with Caption */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
                alt="The Couple Portrait"
                className="h-full w-full object-cover filter grayscale contrast-110"
              />
            </div>
            <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-[var(--ev-text-muted)] uppercase">
              <span>PLATE NO. 04 · THE PALACE LOGGIA</span>
              <span>EXCLUSIVE TO THE UNION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
