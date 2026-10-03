"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export default function CelestialMoonPhase({
  eventDateIso,
  eventEndIso,
  title,
  venueName,
  venueCity,
  field,
}: {
  eventDateIso?: string;
  eventEndIso?: string;
  title: string;
  venueName?: string;
  venueCity?: string;
  field: (key: any, className?: string) => ReactNode;
}) {
  const countdown = useCountdown(eventDateIso);
  const [modalOpen, setModalOpen] = useState(false);

  const fullLocation = [venueName, venueCity].filter(Boolean).join(", ");

  function handleGoogleCalendar() {
    const url = buildGoogleCalendarUrl({
      title: `${title} — Celestial Wedding Celebration`,
      description: `Join us under the starlit heavens for the holy union of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
    window.open(url, "_blank");
  }

  function handleAppleCalendar() {
    downloadIcsFile({
      title: `${title} — Celestial Wedding Celebration`,
      description: `Join us under the starlit heavens for the holy union of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
  }

  return (
    <section id="alignment" className="relative z-10 mx-auto my-24 w-full max-w-5xl px-4 py-8">
      <div className="cs-instrument-card relative overflow-hidden rounded-3xl p-8 sm:p-14">
        <span className="cs-corner-pin tl" />
        <span className="cs-corner-pin tr" />
        <span className="cs-corner-pin bl" />
        <span className="cs-corner-pin br" />

        {/* Background Nebula Radial */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--cs-nebula-violet)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[var(--cs-nebula-cyan)]/10 blur-3xl" />

        {/* Section Header */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
            <span className="font-serif text-xs tracking-[0.3em]">✦ THE EPHEMERIS & LUNAR PHASE ✦</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
          </div>

          <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
            {field("countdownHeading", "text-center text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase")}
          </p>
        </div>

        {/* Celestial Dual Visualizer (Moon Phase + Sky Coordinates) */}
        <div className="my-10 grid grid-cols-1 items-center gap-8 rounded-2xl border border-[var(--cs-border-light)] bg-black/50 p-6 backdrop-blur-md md:grid-cols-12">
          {/* 3D Moon Graphic (5 cols) */}
          <div className="flex flex-col items-center justify-center space-y-3 text-center md:col-span-5 md:border-r md:border-[var(--cs-border-light)] md:pr-6">
            <div className="relative flex h-32 w-32 items-center justify-center">
              {/* Outer starlight corona ring */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-[var(--cs-starlight)]/20 blur-xl" />
              {/* Degree tick ring */}
              <div className="cs-armillary-cw absolute inset-0 rounded-full border border-dashed border-[var(--cs-starlight)] opacity-35" />
              {/* Moon sphere */}
              <div className="relative h-24 w-24 rounded-full border border-[var(--cs-starlight)] bg-gradient-to-tr from-[#0e1636] via-[#1a244d] to-[var(--cs-starlight)] shadow-[inset_0_0_25px_rgba(243,227,182,0.45)]">
                {/* Crescent Shadow Overlay */}
                <div className="absolute inset-1 rounded-full border-r-2 border-[var(--cs-starlight-light)]/70 opacity-90" />
                <span className="absolute inset-0 flex items-center justify-center text-3xl opacity-75">
                  🌙
                </span>
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                Phase: Waxing Crescent
              </span>
              <p className="font-serif text-xl font-medium text-white">84% Illumination</p>
              <p className="text-xs font-light text-[var(--cs-text-muted)]">Auspicious Wedding Twilight</p>
            </div>
          </div>

          {/* Astronomical Readout (7 cols) */}
          <div className="space-y-4 md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--cs-text-faint)] uppercase">
                  Declination (DEC)
                </span>
                <p className="font-mono text-base font-medium text-[var(--cs-starlight-light)]">
                  +24° 18&apos; 42&quot; N
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--cs-text-faint)] uppercase">
                  Right Ascension (RA)
                </span>
                <p className="font-mono text-base font-medium text-[var(--cs-starlight-light)]">
                  18h 36m 56s
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
              <span className="font-mono text-[10px] font-semibold tracking-wider text-[var(--cs-text-faint)] uppercase">
                Constellation Meridian
              </span>
              <p className="font-serif text-sm text-[var(--cs-starlight)]">
                Rising under Sagittarius & Lyra — The Celestial Gate of Harmony
              </p>
            </div>
          </div>
        </div>

        {/* Live Astrolabe Countdown Orbit */}
        {countdown.isLive ? (
          <div className="my-8 text-center">
            <p className="font-serif text-3xl font-medium text-[var(--cs-starlight)] sm:text-4xl">
              Alhamdulillah, The Stars Have Aligned!
            </p>
            <p className="mt-2 text-xs font-light text-[var(--cs-text-muted)]">
              The sacred celebration has commenced under the heavens.
            </p>
          </div>
        ) : (
          <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { val: countdown.days, label: "Solar Days" },
              { val: countdown.hours, label: "Sidereal Hours" },
              { val: countdown.minutes, label: "Orbital Minutes" },
              { val: countdown.seconds, label: "Celestial Sec" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--cs-border)] bg-black/60 p-4 shadow-xl backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:border-[var(--cs-starlight)] sm:p-6"
              >
                {/* Degree tick */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--cs-starlight)] to-transparent opacity-80" />

                <span className="font-serif text-4xl font-bold tracking-tight text-[var(--cs-starlight-light)] drop-shadow-[0_0_20px_rgba(243,227,182,0.45)] sm:text-6xl">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="mt-2 font-mono text-[9px] font-semibold tracking-[0.25em] text-[var(--cs-starlight)] uppercase sm:text-[10px]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Calendar Sync Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--cs-starlight)] bg-gradient-to-r from-[var(--cs-starlight-dim)] via-[var(--cs-starlight)] to-[var(--cs-starlight-dim)] px-8 py-3.5 text-xs font-bold tracking-wider text-[#030612] uppercase shadow-[0_0_25px_rgba(243,227,182,0.35)] transition hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Synchronize Celestial Calendar</span>
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border border-[var(--cs-starlight)] bg-gradient-to-b from-[#0b1029] to-[#030612] p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cs-starlight)] bg-[var(--cs-starlight)]/10 text-xl">
              🗓️
            </div>
            <h3 className="mt-3 font-serif text-2xl font-medium text-[var(--cs-starlight)]">
              Celestial Alignment
            </h3>
            <p className="mt-2 text-xs font-light leading-relaxed text-[var(--cs-text-muted)]">
              Mark this auspicious starlit union into your digital calendar:
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleGoogleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--cs-starlight)] bg-gradient-to-r from-[var(--cs-starlight-dim)] to-[var(--cs-starlight)] px-5 py-3 text-xs font-bold text-[#030612] shadow-md hover:brightness-110 cursor-pointer"
              >
                <span>Google Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAppleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--cs-border)] bg-white/5 px-5 py-3 text-xs font-semibold text-[var(--cs-text-main)] hover:bg-white/10 cursor-pointer"
              >
                <span>Apple / Outlook (.ics)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-6 text-xs text-[var(--cs-text-faint)] hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
