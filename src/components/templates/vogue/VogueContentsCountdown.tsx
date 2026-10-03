"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { ProgramItem } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";
import { useCountdown } from "@/components/templates/shared/useCountdown";
import { buildGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";

export default function VogueContentsCountdown({
  items,
  editable,
  field,
  eventDateIso,
  eventEndIso,
  title,
  venueName,
  venueCity,
  onCommitItem,
}: {
  items?: ProgramItem[];
  editable: boolean;
  field: (key: any, className?: string) => ReactNode;
  eventDateIso?: string;
  eventEndIso?: string;
  title: string;
  venueName?: string;
  venueCity?: string;
  onCommitItem?: (index: number, key: keyof ProgramItem, value: string) => void;
}) {
  const countdown = useCountdown(eventDateIso);
  const [modalOpen, setModalOpen] = useState(false);

  const displayItems = items && items.length > 0 ? items : [
    { time: "05:00 PM", title: "Couture Welcome & Apertifs", description: "Sunset refreshments, live harpist, and red carpet guest reception in the grand salon." },
    { time: "06:15 PM", title: "The Solemnization Ceremony (Nikah)", description: "The exchange of sacred vows, recitation of holy scriptures, and heartfelt family duas." },
    { time: "07:45 PM", title: "The Haute Gastronomy Banquet", description: "A five-course culinary feast served in the candlelit grand ballroom." },
    { time: "10:00 PM", title: "The Midnight Toast & Farewell", description: "Celebratory cake cutting, starlit sparkler sendoff, and farewell prayers." },
  ];

  const fullLocation = [venueName, venueCity].filter(Boolean).join(", ");

  function handleGoogleCalendar() {
    const url = buildGoogleCalendarUrl({
      title: `${title} — Haute Couture Wedding Celebration`,
      description: `Join us in celebrating the holy matrimony of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
    window.open(url, "_blank");
  }

  function handleAppleCalendar() {
    downloadIcsFile({
      title: `${title} — Haute Couture Wedding Celebration`,
      description: `Join us in celebrating the holy matrimony of ${title}!`,
      location: fullLocation,
      startIso: eventDateIso,
      endIso: eventEndIso,
    });
  }

  return (
    <section id="contents" className="relative z-10 mx-auto my-24 max-w-6xl px-4">
      {/* Magazine Spread Heading */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>SECTION 01 · THE INDEX & RUNNING ORDER</span>
          <span>AUTUMN / WINTER 2026</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          TABLE OF CONTENTS
        </h2>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Table of Contents & Itinerary (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <p className="text-xs font-light text-[var(--ev-text-muted)]">
            {field("programIntro", "text-xs font-light text-[var(--ev-text-muted)]")}
          </p>

          <div className="divide-y divide-[var(--ev-border-light)] border-t border-b border-[var(--ev-border-light)]">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col py-6 transition duration-200 hover:bg-black/[0.02] sm:flex-row sm:items-start sm:gap-6"
              >
                {/* Editorial Page Number */}
                <div className="flex shrink-0 items-baseline gap-2 font-mono text-sm font-bold text-[var(--ev-bronze)] sm:w-28">
                  <span>P. 0{index * 12 + 10}</span>
                  <span className="text-[10px] font-normal text-[var(--ev-text-muted)] opacity-75">· {item.time}</span>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="font-serif text-xl font-bold tracking-wide text-[var(--ev-text-dark)] transition group-hover:text-[var(--ev-bronze)]">
                    <EditableField
                      value={item.title}
                      editable={editable}
                      className="font-serif text-xl font-bold text-[var(--ev-text-dark)]"
                      onCommit={(val) => onCommitItem?.(index, "title", val)}
                    />
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-[var(--ev-text-muted)]">
                    <EditableField
                      value={item.description}
                      editable={editable}
                      multiline
                      className="text-xs font-light leading-relaxed text-[var(--ev-text-muted)]"
                      onCommit={(val) => onCommitItem?.(index, "description", val)}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Attire note inline */}
          <div className="flex items-center gap-3 border-l-2 border-[var(--ev-bronze)] pl-4 text-xs font-light text-[var(--ev-text-muted)]">
            <span className="font-semibold uppercase tracking-wider text-[var(--ev-text-dark)]">Dress Code:</span>
            <span>{field("dressCode", "font-light text-[var(--ev-text-muted)]")}</span>
          </div>
        </div>

        {/* Right Column: Swiss Chronometer Countdown Card (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-[var(--ev-text-dark)] bg-[var(--ev-bg-dark)] p-8 text-center text-white shadow-2xl lg:col-span-5">
          <div>
            <div className="font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--ev-bronze-light)] uppercase">
              {field("countdownHeading", "font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--ev-bronze-light)] uppercase")}
            </div>
            <h3 className="mt-2 font-serif text-2xl font-light text-white sm:text-3xl">
              Chronometer Countdown
            </h3>
            <p className="mt-1 text-[11px] font-light text-white/70">
              Until the doors of the haute couture premiere open
            </p>
          </div>

          {/* Countdown Clock Display */}
          {countdown.isLive ? (
            <div className="my-8">
              <p className="font-serif text-2xl font-medium text-[var(--ev-bronze-light)]">
                The Celebration Has Commenced
              </p>
              <p className="mt-2 text-xs font-light text-white/70">
                Welcome to our wedding celebration.
              </p>
            </div>
          ) : (
            <div className="my-8 grid grid-cols-2 gap-4">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Minutes" },
                { val: countdown.seconds, label: "Seconds" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center transition hover:border-[var(--ev-bronze)]"
                >
                  <span className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    {String(unit.val).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] font-semibold tracking-[0.2em] text-[var(--ev-bronze-light)] uppercase">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sync Calendar Button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="w-full rounded-full bg-white py-3.5 text-xs font-bold tracking-widest text-[var(--ev-text-dark)] uppercase shadow-md transition hover:bg-[var(--ev-bronze)] hover:text-white cursor-pointer"
          >
            Add Issue to Calendar
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl border-2 border-[var(--ev-text-dark)] bg-white p-7 text-center shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-[var(--ev-text-dark)]">
              Synchronize Calendar
            </h3>
            <p className="mt-2 text-xs font-light text-[var(--ev-text-muted)]">
              Reserve your digital schedule for this high-fashion celebration:
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  handleGoogleCalendar();
                  setModalOpen(false);
                }}
                className="rounded-full bg-[var(--ev-text-dark)] py-3 text-xs font-bold tracking-wider text-white uppercase hover:bg-[var(--ev-bronze)] cursor-pointer"
              >
                Google Calendar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAppleCalendar();
                  setModalOpen(false);
                }}
                className="rounded-full border border-[var(--ev-border)] bg-gray-50 py-3 text-xs font-semibold tracking-wider text-[var(--ev-text-dark)] hover:bg-gray-100 cursor-pointer"
              >
                Apple / Outlook (.ics)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="mt-6 text-xs text-[var(--ev-text-faint)] hover:text-black cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
