"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function WeddingEnvelope({
  groomInitial,
  brideInitial,
  tagline,
  onOpen,
  editable,
  field,
}: {
  groomInitial: string;
  brideInitial: string;
  tagline: string;
  onOpen: () => void;
  editable: boolean;
  field: (key: any, className?: string) => ReactNode;
}) {
  const [opening, setOpening] = useState(false);
  const [burstParticles, setBurstParticles] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    setBurstParticles(true);

    // Give time for wax cracking and flap rotation before unveiling
    setTimeout(() => {
      onOpen();
    }, 1100);
  }

  return (
    <div className="relative flex min-h-[95vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 transition-opacity duration-1000">
      {/* Ambient Radial Spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)]" />

      {/* Floating Stardust Motifs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="eu-stardust absolute top-1/4 left-1/5 h-2 w-2 rounded-full bg-[var(--eu-gold-light)]" />
        <div className="eu-stardust absolute top-1/3 right-1/4 h-2.5 w-2.5 rounded-full bg-[var(--eu-gold)] [animation-delay:1.5s]" />
        <div className="eu-stardust absolute bottom-1/4 left-1/3 h-1.5 w-1.5 rounded-full bg-[var(--eu-gold-light)] [animation-delay:2.8s]" />
      </div>

      {/* 3D Envelope Presentation */}
      <div className="eu-envelope-3d relative w-full max-w-lg">
        {/* Envelope Body Card */}
        <div
          className={`relative overflow-hidden rounded-3xl border-2 border-[var(--eu-gold)] bg-gradient-to-b from-[var(--eu-bg-secondary)] via-[#22050d] to-[var(--eu-bg-primary)] p-8 text-center shadow-[0_25px_70px_rgba(0,0,0,0.8)] transition-all duration-1000 ${
            opening ? "scale-95 opacity-80" : "scale-100 opacity-100"
          }`}
        >
          {/* Top Envelope Flap (3D Flip Animation) */}
          <div
            className={`eu-envelope-flap-3d absolute top-0 inset-x-0 h-32 origin-top border-b-2 border-[var(--eu-gold)]/60 bg-gradient-to-b from-[#3a0815] to-[#25050e] shadow-lg ${
              opening ? "eu-envelope-flap-open" : ""
            }`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />

          {/* Golden Arabesque Header */}
          <div className="relative z-10 pt-4">
            <div className="flex items-center justify-center gap-2 text-[var(--eu-gold)] opacity-80">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--eu-gold)]" />
              <span className="text-xs">✦ ✧ ✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--eu-gold)]" />
            </div>

            <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase">
              Royal Wedding Invitation
            </p>

            <h3 className="mt-2 font-serif text-2xl font-light text-[var(--eu-text-main)] sm:text-3xl">
              {field("envelopeTagline", "font-serif text-2xl font-light text-[var(--eu-text-main)] sm:text-3xl")}
            </h3>
          </div>

          {/* Interactive Wax Seal Button */}
          <div className="relative z-20 my-10 flex flex-col items-center justify-center">
            {/* Wax Fragment Burst Animation */}
            {burstParticles && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-[var(--eu-gold-light)] shadow-[0_0_8px_var(--eu-gold)]"
                    style={{
                      transform: `rotate(${i * 30}deg) translate(55px)`,
                      opacity: 0,
                      transition: "all 0.8s ease-out",
                    }}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleOpen}
              disabled={opening}
              aria-label="Break wax seal and open invitation"
              className="eu-wax-seal group relative flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--eu-gold-light)]"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[var(--eu-gold)]/40" />

              {/* Inner Crest Monogram */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="font-serif text-3xl font-bold tracking-wider text-[var(--eu-gold-light)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {groomInitial} & {brideInitial}
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--eu-gold-light)]/90 uppercase">
                  {opening ? "Opening..." : "Break Seal"}
                </span>
              </div>
            </button>

            <p className="mt-4 text-xs font-light tracking-widest text-[var(--eu-gold)] uppercase">
              {opening ? "Unfolding Royal Scroll..." : "Tap seal to reveal invitation"}
            </p>
          </div>

          {/* Bottom Open CTA Button */}
          <div className="relative z-10 pt-2">
            <button
              type="button"
              onClick={handleOpen}
              disabled={opening}
              className="eu-shimmer-btn inline-flex items-center gap-2 rounded-full border border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] via-[var(--eu-gold)] to-[var(--eu-gold-dark)] px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-[#1e050b] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition hover:brightness-110 active:scale-95"
            >
              <span>{opening ? "Revealing Ceremony" : "Open Invitation"}</span>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
