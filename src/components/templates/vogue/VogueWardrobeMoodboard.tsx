"use client";

import type { ReactNode } from "react";

export default function VogueWardrobeMoodboard({
  field,
}: {
  field: (key: any, className?: string) => ReactNode;
}) {
  const swatches = [
    { name: "Obsidian Noir", hex: "#0e0e12", textColor: "#ffffff", note: "Velvet & Barathea" },
    { name: "Champagne Raw Silk", hex: "#e5d8b8", textColor: "#000000", note: "Woven Silk Crepe" },
    { name: "Terracotta Bronze", hex: "#b4653a", textColor: "#ffffff", note: "Antique Accents" },
    { name: "Pearl Ivory", hex: "#f8f6f0", textColor: "#000000", note: "Heavy Satin" },
  ];

  return (
    <section id="lookbook" className="relative z-10 mx-auto my-28 max-w-6xl px-4">
      {/* Magazine Section Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>THE LOOKBOOK · P. 42 – 47</span>
          <span>CURATED STYLE GUIDE</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          THE WARDROBE & MOODBOARD
        </h2>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase">
          ATTIRE DIRECTIVE: {field("dressCode", "font-mono text-[10px] text-[var(--ev-text-dark)] font-bold")}
        </p>
      </div>

      {/* Haute Couture Moodboard Grid */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Curated Color Swatches (4 cols) */}
        <div className="rounded-2xl border border-[var(--ev-border)] bg-white p-8 shadow-sm lg:col-span-4">
          <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
            THE CHOSEN PALETTE
          </span>
          <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
            Textile Swatches
          </h3>
          <p className="mt-2 text-xs font-light leading-relaxed text-[var(--ev-text-muted)]">
            Guests are warmly invited to draw aesthetic inspiration from our evening’s refined chromatic spectrum:
          </p>

          <div className="mt-6 space-y-4">
            {swatches.map((s) => (
              <div key={s.name} className="flex items-center gap-4 border-b border-[var(--ev-border-light)] pb-3">
                <div
                  className="ev-swatch shrink-0"
                  style={{ backgroundColor: s.hex }}
                />
                <div>
                  <h4 className="font-serif text-sm font-bold text-[var(--ev-text-dark)]">
                    {s.name}
                  </h4>
                  <p className="font-mono text-[10px] text-[var(--ev-text-muted)]">
                    {s.note} · {s.hex}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Look 01 & Look 02 Styling Directives (8 cols) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
          {/* Look 01: Gentlemen */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--ev-border)] bg-white p-8 shadow-sm">
            <div>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
                LOOK 01 · GENTLEMEN
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
                The Tailored Silhouette
              </h3>
              <div className="my-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Gentlemen Attire"
                  className="h-full w-full object-cover filter grayscale contrast-115"
                />
              </div>
              <p className="text-xs font-light leading-relaxed text-[var(--ev-text-muted)]">
                Classic black-tie dinner jackets, tailored midnight barathea wool, or regal embroidered bandhgalas and sherwanis. Clean lines, black leather oxfords, and understated pocket squares.
              </p>
            </div>
            <div className="mt-6 border-t border-[var(--ev-border-light)] pt-3 font-mono text-[9px] text-[var(--ev-bronze)]">
              RECOMMENDED: SHARP TAILORING & NOIR ACCENTS
            </div>
          </div>

          {/* Look 02: Ladies */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--ev-border)] bg-white p-8 shadow-sm">
            <div>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
                LOOK 02 · LADIES
              </span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
                Haute Couture Elegance
              </h3>
              <div className="my-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                  alt="Ladies Attire"
                  className="h-full w-full object-cover filter grayscale contrast-115"
                />
              </div>
              <p className="text-xs font-light leading-relaxed text-[var(--ev-text-muted)]">
                Floor-length evening gowns, flowing silks, regal zardozi embellishments, or heritage festive ensembles. Jewel tones, liquid satin, and champagne accessories are encouraged.
              </p>
            </div>
            <div className="mt-6 border-t border-[var(--ev-border-light)] pt-3 font-mono text-[9px] text-[var(--ev-bronze)]">
              RECOMMENDED: FLUID SILKS & TIMELESS SILHOUETTES
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
