"use client";

import { useEffect, useState } from "react";

interface CelestialEntranceGateProps {
  groomName: string;
  brideName: string;
  groomInitial: string;
  brideInitial: string;
  editable?: boolean;
}

export default function CelestialEntranceGate({
  groomName,
  brideName,
  groomInitial,
  brideInitial,
  editable = false,
}: CelestialEntranceGateProps) {
  // If editable, default to open so editor isn'\''t blocked, but allow manual trigger
  const [isOpen, setIsOpen] = useState(editable);
  const [isOpening, setIsOpening] = useState(false);
  const [isAligning, setIsAligning] = useState(false);

  function handleUnlock() {
    if (isOpening || isOpen) return;
    setIsAligning(true);

    // Phase 1: Alignment lock & supernova flare
    setTimeout(() => {
      setIsOpening(true);
    }, 450);

    // Phase 2: Dome shutters finish parting
    setTimeout(() => {
      setIsOpen(true);
    }, 1500);
  }

  // Allow editor to re-preview the dramatic entrance
  if (isOpen && editable) {
    return (
      <div className="fixed top-20 right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            setIsOpening(false);
            setIsAligning(false);
          }}
          className="flex items-center gap-2 rounded-full border border-[var(--cs-border)] bg-black/80 px-4 py-1.5 font-mono text-[11px] tracking-widest text-[var(--cs-starlight)] shadow-lg backdrop-blur-md transition-all hover:border-[var(--cs-starlight)] hover:bg-[var(--cs-starlight)]/15 hover:shadow-[0_0_20px_rgba(243,227,182,0.3)]"
        >
          <span>✦</span>
          <span>REPLAY CELESTIAL ENTRANCE</span>
        </button>
      </div>
    );
  }

  if (isOpen) return null;

  return (
    <div
      className={`cs-entrance-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isOpening ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-label="Celestial Astrolabe Gate"
    >
      {/* Left Observatory Dome Shutter */}
      <div
        className={`cs-dome-shutter cs-dome-left ${
          isOpening ? "cs-dome-open-left" : ""
        }`}
      />

      {/* Right Observatory Dome Shutter */}
      <div
        className={`cs-dome-shutter cs-dome-right ${
          isOpening ? "cs-dome-open-right" : ""
        }`}
      />

      {/* Stardust Nebula & Cosmic Backdrop */}
      <div className="absolute inset-0 bg-[#02040c]">
        {/* Deep space radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.12)_0%,rgba(125,211,252,0.06)_40%,transparent_70%)]" />
        {/* Subtle star particle grid */}
        <div className="cs-starlight-dust absolute inset-0 opacity-60" />
      </div>

      {/* Supernova Shockwave Burst on Unlock */}
      {isAligning && (
        <div className="cs-supernova-flare pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}

      {/* Main Astrolabe Instrument Assembly */}
      <div
        className={`relative z-20 flex flex-col items-center px-4 text-center transition-all duration-700 ${
          isOpening ? "scale-125 opacity-0 blur-md" : "scale-100 opacity-100"
        }`}
      >
        {/* Observatory Header Badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-[var(--cs-border-light)] bg-black/60 px-5 py-1.5 font-mono text-[10px] tracking-[0.3em] text-[var(--cs-starlight-dim)] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[var(--cs-starlight)]" />
          <span>ROYAL OBSERVATORY · EPOCH J2026.9</span>
        </div>

        {/* 3D Astrolabe Brass Mechanism */}
        <div
          onClick={handleUnlock}
          className="group relative my-4 flex h-72 w-72 cursor-pointer items-center justify-center sm:h-96 sm:w-96"
          title="Click to align the astrolabe"
        >
          {/* Ring 1: Outer Zodiac & Celestial Degree Ring */}
          <div
            className={`cs-astrolabe-outer absolute inset-0 rounded-full border border-[var(--cs-border)] transition-transform duration-500 group-hover:border-[var(--cs-starlight)] ${
              isAligning ? "cs-astrolabe-spin-fast" : "cs-armillary-cw"
            }`}
          >
            {/* Degree Notches */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[var(--cs-starlight-dim)]">
              000° · N
            </span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[var(--cs-starlight-dim)]">
              180° · S
            </span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[var(--cs-starlight-dim)]">
              270° · W
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[var(--cs-starlight-dim)]">
              090° · E
            </span>

            {/* Zodiac Constellation Emblems */}
            <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-widest text-[var(--cs-starlight)] opacity-40">
              <span className="absolute top-6 left-12">♈</span>
              <span className="absolute top-6 right-12">♉</span>
              <span className="absolute bottom-6 left-12">♏</span>
              <span className="absolute bottom-6 right-12">♐</span>
            </div>
          </div>

          {/* Ring 2: Counter-Rotating Armillary Reticle */}
          <div
            className={`cs-astrolabe-middle absolute inset-6 rounded-full border border-dashed border-[var(--cs-border-light)] ${
              isAligning ? "cs-astrolabe-spin-fast-ccw" : "cs-armillary-ccw"
            }`}
          />

          {/* Ring 3: Concentric Optical Iris Track */}
          <div className="absolute inset-12 rounded-full border border-dotted border-[var(--cs-starlight-dim)]/50 transition-all duration-500 group-hover:scale-105 group-hover:border-[var(--cs-starlight)]" />

          {/* Pulsing Starlight Corona Behind Center Core */}
          <div className="cs-starlight-halo absolute h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(243,227,182,0.35)_0%,rgba(125,211,252,0.15)_50%,transparent_75%)] blur-md transition-transform duration-500 group-hover:scale-125" />

          {/* Central Astrolabe Medallion with Monogram */}
          <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-[var(--cs-starlight)] bg-[#070b1e]/90 shadow-[0_0_35px_rgba(243,227,182,0.45)] backdrop-blur-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_55px_rgba(243,227,182,0.7)] sm:h-36 sm:w-36">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[var(--cs-starlight-dim)] uppercase">
              ALIGN
            </span>
            <div className="my-0.5 flex items-center gap-1 font-serif text-2xl font-light text-[var(--cs-starlight-light)] sm:text-3xl">
              <span>{groomInitial}</span>
              <span className="text-xs text-[var(--cs-starlight)]">✦</span>
              <span>{brideInitial}</span>
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] text-[var(--cs-starlight-dim)] uppercase">
              HORIZON
            </span>
          </div>
        </div>

        {/* Telemetry and Story Hook */}
        <div className="mt-4 max-w-md space-y-3">
          <p className="font-serif text-sm tracking-[0.25em] text-[var(--cs-starlight-dim)] italic sm:text-base">
            Two souls destined in the cosmic scrolls
          </p>

          <h2 className="font-serif text-2xl font-normal tracking-wider text-[var(--cs-text-main)] sm:text-3xl">
            <span className="cs-starlight-gradient">{groomName || "Zayd"}</span>
            <span className="mx-2 text-[var(--cs-starlight)]">&</span>
            <span className="cs-starlight-gradient">{brideName || "Layla"}</span>
          </h2>

          <div className="font-mono text-[10px] tracking-[0.28em] text-[var(--cs-text-faint)] uppercase">
            RA: 18h 36m 12s · DEC: +24° 18&apos; 04&quot;
          </div>
        </div>

        {/* Action Button: ALIGN THE STARS TO ENTER */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleUnlock}
            disabled={isAligning || isOpening}
            className="cs-entrance-btn group relative flex items-center gap-3 overflow-hidden rounded-full border border-[var(--cs-starlight)] bg-black/60 px-8 py-3.5 font-serif text-xs tracking-[0.3em] text-[var(--cs-starlight-light)] uppercase shadow-[0_0_30px_rgba(243,227,182,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-[var(--cs-starlight)]/15 hover:shadow-[0_0_45px_rgba(243,227,182,0.55)] active:scale-95 sm:text-sm"
          >
            {/* Shimmer line across button */}
            <span className="cs-btn-shimmer" />

            <span className="text-[var(--cs-starlight)] transition-transform duration-300 group-hover:rotate-90">
              ✦
            </span>
            <span className="font-medium">
              {isAligning ? "ALIGNING CONSTELLATIONS..." : "ALIGN THE STARS TO ENTER"}
            </span>
            <span className="text-[var(--cs-starlight)] transition-transform duration-300 group-hover:-rotate-90">
              ✦
            </span>
          </button>

          {/* Quick Skip for accessibility / returning users */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="font-mono text-[10px] tracking-widest text-[var(--cs-text-faint)] uppercase underline-offset-4 hover:text-[var(--cs-starlight-dim)] hover:underline"
          >
            Direct Entry (Skip Intro)
          </button>
        </div>
      </div>
    </div>
  );
}
