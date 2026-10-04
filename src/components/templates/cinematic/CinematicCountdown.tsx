"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export default function CinematicCountdown({
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
      title: `${title} — Wedding Celebration`,
      description: `Join us in celebrating the holy matrimony of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
    window.open(url, "_blank");
  }

  function handleAppleCalendar() {
    downloadIcsFile({
      title: `${title} — Wedding Celebration`,
      description: `Join us in celebrating the holy matrimony of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
  }

  return (
    <section className="relative z-10 mx-auto my-20 w-full max-w-4xl px-4">
      {/* Academy Leader / Timecode Console */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--cv-gold)]/40 bg-gradient-to-b from-black/95 via-[#131019]/90 to-black/95 p-6 text-center shadow-[0_10px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl sm:p-10">
        
        {/* Top SMPTE Header Strip */}
        <div className="flex items-center justify-between border-b border-[var(--cv-gold)]/20 pb-3 font-mono text-[10px] tracking-[0.25em] text-[var(--cv-gold)] uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--cv-gold)] animate-ping" />
            <span>SMPTE TIME-REEL MASTER</span>
          </div>
          <div className="text-[var(--cv-gold-light)]/80">
            SYNC CLOCK: 24.00 FPS
          </div>
        </div>

        <p className="mt-5 font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
          {field("countdownHeading", "text-center font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
        </p>

        {countdown.isLive ? (
          <div className="my-8">
            <p className="font-serif text-3xl font-light text-[var(--cv-gold-light)] sm:text-4xl">
              Alhamdulillah, The Blessed Day Has Arrived!
            </p>
            <p className="mt-2 text-xs font-mono tracking-widest text-[var(--cv-text-muted)] uppercase">
              Now Screening • Live Engagement
            </p>
          </div>
        ) : (
          <div className="my-8">
            {/* Master SMPTE Timecode Display Bar */}
            <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--cv-gold)]/40 bg-black/80 px-4 py-6 shadow-inner sm:px-8">
              <div className="grid grid-cols-4 items-center divide-x divide-[var(--cv-gold)]/30 text-center font-mono">
                {/* Days */}
                <div className="px-2 sm:px-4">
                  <div className="font-mono text-3xl font-bold tracking-wider text-[var(--cv-gold-light)] drop-shadow-[0_0_15px_rgba(226,192,107,0.4)] sm:text-5xl">
                    {String(countdown.days).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-[10px]">
                    DAYS
                  </div>
                </div>

                {/* Hours */}
                <div className="px-2 sm:px-4">
                  <div className="font-mono text-3xl font-bold tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:text-5xl">
                    {String(countdown.hours).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-[10px]">
                    HOURS
                  </div>
                </div>

                {/* Minutes */}
                <div className="px-2 sm:px-4">
                  <div className="font-mono text-3xl font-bold tracking-wider text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] sm:text-5xl">
                    {String(countdown.minutes).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-[10px]">
                    MINUTES
                  </div>
                </div>

                {/* Seconds */}
                <div className="px-2 sm:px-4">
                  <div className="font-mono text-3xl font-bold tracking-wider text-[var(--cv-gold-light)] drop-shadow-[0_0_15px_rgba(226,192,107,0.4)] sm:text-5xl">
                    {String(countdown.seconds).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] font-semibold tracking-[0.25em] text-[var(--cv-gold)] uppercase sm:text-[10px]">
                    SECONDS
                  </div>
                </div>
              </div>

              {/* Timecode Sub-bar */}
              <div className="mt-4 flex items-center justify-between border-t border-[var(--cv-gold)]/20 pt-2 font-mono text-[9px] text-[var(--cv-gold)]/60">
                <span>DROP-FRAME: ENABLED</span>
                <span className="tracking-widest">SMPTE 12M STANDARD</span>
                <span>STATUS: LOCKED</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8010] px-8 py-3 text-xs font-bold tracking-[0.15em] text-[#121016] uppercase shadow-lg transition hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>REEL SYNC • ADD TO CALENDAR</span>
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border border-[var(--cv-gold)] bg-gradient-to-b from-[var(--cv-bg-secondary)] to-[var(--cv-bg-primary)] p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cv-gold)] bg-[var(--cv-gold)]/10 text-xl">
              🗓️
            </div>
            <h3 className="mt-3 font-serif text-2xl font-medium text-[var(--cv-gold-light)]">
              Save The Date
            </h3>
            <p className="mt-2 text-xs font-light leading-relaxed text-[var(--cv-text-muted)]">
              Synchronize this wedding celebration directly into your calendar:
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleGoogleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[var(--cv-gold-dark)] to-[var(--cv-gold)] px-5 py-3 text-xs font-bold text-[#121016] shadow-md hover:brightness-110 cursor-pointer"
              >
                <span>Google Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAppleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--cv-border)] bg-white/5 px-5 py-3 text-xs font-semibold text-[var(--cv-text-main)] hover:bg-white/10 cursor-pointer"
              >
                <span>Apple / Outlook (.ics)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-6 text-xs text-[var(--cv-text-faint)] hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
