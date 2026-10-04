"use client";

import { useEffect, useState } from "react";

interface CrimsonCoverGateProps {
  groomName: string;
  brideName: string;
  ceremonyDateText?: string;
  hijriDateText?: string;
  scrollBg?: string;
  editable?: boolean;
}

export default function CrimsonCoverGate({
  groomName,
  brideName,
  ceremonyDateText = "Sunday · 2 August 2026",
  hijriDateText = "18 Safar 1448 AH",
  scrollBg = "/templates/crimson-scroll/scroll-bg.webp",
  editable = false,
}: CrimsonCoverGateProps) {
  // If editable, default to open so editor is not blocked
  const [isOpen, setIsOpen] = useState(editable);
  const [isOpening, setIsOpening] = useState(false);
  const [frameDrawn, setFrameDrawn] = useState(false);

  useEffect(() => {
    if (isOpen) return;
    const timer = setTimeout(() => setFrameDrawn(true), 150);
    return () => clearTimeout(timer);
  }, [isOpen]);

  function handleOpen() {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 850);
  }

  return (
    <>
      {/* Editor replay button */}
      {isOpen && editable && (
        <div className="fixed top-20 right-6 z-40">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsOpening(false);
              setFrameDrawn(false);
            }}
            className="flex items-center gap-2 rounded-full border border-[var(--cr-crimson)]/40 bg-[var(--cr-parchment-light)]/90 px-4 py-1.5 font-mono text-[11px] tracking-widest text-[var(--cr-crimson)] shadow-md backdrop-blur-md transition-all hover:bg-[var(--cr-cream)]"
          >
            <span>✦</span>
            <span>REPLAY COVER ENTRANCE</span>
          </button>
        </div>
      )}

      {/* Interactive Crimson Scroll Entrance Screen */}
      {!isOpen && (
        <div
          onClick={handleOpen}
          className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#fdf5ea] transition-opacity duration-800 ${
            isOpening ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-label="Crimson Scroll Entrance - Tap to Open"
        >
          {/* Scroll Parchment Background Image */}
          <img
            src={scrollBg}
            alt=""
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-fill pointer-events-none"
          />

          <div className="pointer-events-none absolute inset-0 bg-white/[0.08]" />

          {/* Animated Gold Ornate Filigree Rect Frame */}
          <svg
            viewBox="0 0 320 400"
            className="pointer-events-none absolute left-1/2 top-1/2 w-[min(86vw,320px)] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Outer Gold Border */}
            <rect
              x="2"
              y="2"
              width="316"
              height="396"
              fill="none"
              stroke="#c9a060"
              strokeWidth="1.2"
              strokeDasharray="1424"
              strokeDashoffset={frameDrawn ? "0" : "1424"}
              style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />

            {/* Inner Delicate Line */}
            <rect
              x="14"
              y="14"
              width="292"
              height="372"
              fill="none"
              stroke="rgba(201,160,96,0.35)"
              strokeWidth="0.6"
              strokeDasharray="1328"
              strokeDashoffset={frameDrawn ? "0" : "1328"}
              style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s" }}
            />

            {/* 4 Corner Pin Circles */}
            <circle cx="14" cy="14" r="3.8" fill="#c9a060" opacity={frameDrawn ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.8s" }} />
            <circle cx="306" cy="14" r="3.8" fill="#c9a060" opacity={frameDrawn ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.8s" }} />
            <circle cx="306" cy="386" r="3.8" fill="#c9a060" opacity={frameDrawn ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.8s" }} />
            <circle cx="14" cy="386" r="3.8" fill="#c9a060" opacity={frameDrawn ? 1 : 0} style={{ transition: "opacity 0.6s ease 0.8s" }} />

            {/* Horizontal Axis Accent */}
            <line
              x1="126"
              y1="196"
              x2="194"
              y2="196"
              stroke="rgba(201,160,96,0.48)"
              strokeWidth="0.5"
              strokeDasharray="68"
              strokeDashoffset={frameDrawn ? "0" : "68"}
              style={{ transition: "stroke-dashoffset 0.8s ease 1s" }}
            />
          </svg>

          {/* Central Typographic Gate Hierarchy */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
            {/* Wedding Invitation Pill Badge */}
            <div className="mb-4 overflow-hidden text-center">
              <span className="cr-font-cinzel inline-block border border-[#861019]/30 bg-white/60 px-5 py-1.5 text-[9px] font-semibold tracking-[0.58em] text-[var(--cr-crimson-dark)] uppercase shadow-sm">
                Wedding Invitation
              </span>
            </div>

            <div className="mb-5 h-px w-14 bg-[var(--cr-gold)]/60" />

            {/* Bride Name */}
            <h1 className="cr-font-cormorant text-3xl font-normal italic text-[var(--cr-espresso)] leading-tight sm:text-4xl md:text-5xl">
              {brideName}
            </h1>

            {/* Ornate Gold Ampersand */}
            <div className="my-2.5 flex items-center justify-center gap-4">
              <div className="h-px w-7 bg-[var(--cr-gold)]/70" />
              <span className="cr-font-cormorant text-2xl font-light italic text-[var(--cr-gold)]">
                &
              </span>
              <div className="h-px w-7 bg-[var(--cr-gold)]/70" />
            </div>

            {/* Groom Name */}
            <h1 className="cr-font-cormorant text-3xl font-normal italic text-[var(--cr-espresso)] leading-tight sm:text-4xl md:text-5xl">
              {groomName}
            </h1>

            <div className="my-4 h-px w-14 bg-[var(--cr-gold)]/60" />

            {/* Ceremony Date & Islamic Hijri Date */}
            <p className="cr-font-cinzel text-[9.5px] font-bold tracking-[0.3em] text-[var(--cr-espresso)]/85 uppercase">
              {ceremonyDateText}
            </p>
            <p className="cr-font-cinzel mt-1 text-[8.5px] tracking-[0.28em] text-[var(--cr-espresso)]/60 uppercase">
              {hijriDateText}
            </p>

            {/* Tap to Open Action Prompt */}
            <p className="cr-font-cinzel mt-12 text-xs font-bold tracking-[0.38em] text-[var(--cr-crimson)] uppercase drop-shadow-sm animate-pulse">
              Tap to Open Invitation
            </p>
          </div>
        </div>
      )}
    </>
  );
}
