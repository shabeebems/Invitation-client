"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export default function WeddingCountdown({
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
    <section className="relative mx-auto my-16 w-full max-w-4xl px-4 py-6">
      <div className="eu-glass rounded-3xl p-8 text-center shadow-[var(--eu-shadow)] sm:p-14">
        {/* Decorative Arabesque Divider */}
        <div className="mx-auto flex items-center justify-center gap-3 text-[var(--eu-gold)] opacity-80">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--eu-gold)]" />
          <span className="text-xs">✦ ⏳ ✦</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--eu-gold)]" />
        </div>

        <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase">
          {field("countdownHeading", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase")}
        </p>

        {countdown.isLive ? (
          <div className="my-8">
            <p className="font-serif text-3xl font-medium text-[var(--eu-gold-light)] drop-shadow sm:text-4xl">
              Alhamdulillah, The Auspicious Day Has Arrived!
            </p>
            <p className="mt-2 text-xs font-light text-[var(--eu-text-muted)]">
              We look forward to your presence and blessings.
            </p>
          </div>
        ) : (
          <div className="my-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { val: countdown.days, label: "Days" },
              { val: countdown.hours, label: "Hours" },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map((unit) => (
              <div
                key={unit.label}
                className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-[var(--eu-border)] bg-gradient-to-b from-black/40 to-black/20 p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:border-[var(--eu-gold)] sm:p-6"
              >
                {/* Subtle arched top inside each timer card */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--eu-gold)] to-transparent opacity-60" />

                <span className="font-serif text-4xl font-bold tracking-tight text-[var(--eu-gold-light)] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] sm:text-6xl">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="mt-2 text-[10px] font-semibold tracking-[0.25em] text-[var(--eu-gold)] uppercase sm:text-xs">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="eu-shimmer-btn inline-flex items-center gap-2 rounded-full border border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] via-[var(--eu-gold)] to-[var(--eu-gold-dark)] px-8 py-3.5 text-xs font-bold tracking-wider text-[#1e050b] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.35)] transition hover:brightness-110 active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Save The Date (Calendar)</span>
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border-2 border-[var(--eu-gold)] bg-gradient-to-b from-[var(--eu-bg-secondary)] to-[var(--eu-bg-primary)] p-7 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--eu-gold)] bg-[var(--eu-gold)]/10 text-xl">
              🗓️
            </div>
            <h3 className="mt-3 font-serif text-2xl font-medium text-[var(--eu-gold-light)]">
              Save The Date
            </h3>
            <p className="mt-2 text-xs font-light leading-relaxed text-[var(--eu-text-muted)]">
              Synchronize this blessed celebration directly into your personal calendar:
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleGoogleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] to-[var(--eu-gold)] px-5 py-3 text-xs font-bold text-[#1e050b] shadow-md hover:brightness-110"
              >
                <span>Google Calendar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAppleCalendar();
                  setModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-full border border-[var(--eu-border)] bg-white/5 px-5 py-3 text-xs font-semibold text-[var(--eu-text-main)] hover:bg-white/10"
              >
                <span>Apple / Outlook Calendar (.ics)</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-6 text-xs text-[var(--eu-text-faint)] hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
