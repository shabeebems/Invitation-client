"use client";

import type { ReactNode } from "react";
import type { ProgramItem } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";

export default function WeddingEvents({
  items,
  editable,
  field,
  onCommitItem,
}: {
  items?: ProgramItem[];
  editable: boolean;
  field: (key: any, className?: string) => ReactNode;
  onCommitItem?: (index: number, key: keyof ProgramItem, value: string) => void;
}) {
  const displayItems = items && items.length > 0 ? items : [
    { time: "09:30 AM", title: "Arrival & Traditional Kahwa", description: "Welcoming of the respected families with fresh rose water, dates, and fragrant kahwa." },
    { time: "11:00 AM", title: "The Sacred Vows (Nikah)", description: "The solemnization ceremony, sacred vows, and dua in the Grand Ballroom." },
    { time: "12:30 PM", title: "Royal Banquet Feast", description: "Traditional culinary feast celebrating companionship with cherished loved ones." },
    { time: "03:00 PM", title: "Duo Blessings & Farewell", description: "Cherished photo moments, prayers, and celebratory send-off." },
  ];

  return (
    <section id="schedule" className="relative mx-auto my-20 max-w-4xl px-4 text-center">
      {/* Decorative Arabesque */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--eu-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--eu-gold)]" />
        <span className="text-xs">✦ 📜 ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--eu-gold)]" />
      </div>

      {/* Eyebrow */}
      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase">
        {field("programEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase")}
      </p>

      {/* Heading */}
      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl">
        {field("programTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-sm font-light text-[var(--eu-text-muted)]">
        {field("programIntro", "text-center text-sm font-light text-[var(--eu-text-muted)]")}
      </p>

      {/* Itinerary Timeline Cards */}
      <div className="mt-12 space-y-6 text-left">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="eu-glass group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:scale-[1.01] hover:border-[var(--eu-gold)] sm:flex-row sm:items-center sm:gap-8 sm:p-8"
          >
            {/* Top gold hairline accent on hover */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--eu-gold)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Time Pill */}
            <div className="flex shrink-0 items-center justify-center rounded-2xl border border-[var(--eu-gold)]/40 bg-[var(--eu-gold)]/10 px-5 py-3 font-serif text-lg font-semibold tracking-wide text-[var(--eu-gold-light)] sm:w-40">
              <EditableField
                value={item.time}
                editable={editable}
                className="font-serif text-lg font-semibold text-[var(--eu-gold-light)]"
                onCommit={(val) => onCommitItem?.(index, "time", val)}
              />
            </div>

            {/* Event Content */}
            <div className="min-w-0 flex-1 space-y-1.5">
              <h3 className="font-serif text-2xl font-medium tracking-wide text-[var(--eu-text-main)]">
                <EditableField
                  value={item.title}
                  editable={editable}
                  className="font-serif text-2xl font-medium text-[var(--eu-text-main)]"
                  onCommit={(val) => onCommitItem?.(index, "title", val)}
                />
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--eu-text-muted)]">
                <EditableField
                  value={item.description}
                  editable={editable}
                  multiline
                  className="text-sm font-light leading-relaxed text-[var(--eu-text-muted)]"
                  onCommit={(val) => onCommitItem?.(index, "description", val)}
                />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Attire / Dress Code Badge */}
      <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[var(--eu-border)] bg-[var(--eu-bg-surface)] px-7 py-3 text-xs tracking-wider text-[var(--eu-gold)] uppercase shadow-lg backdrop-blur-md">
        <span className="font-semibold">Attire / Dress Code:</span>
        <span className="font-light text-[var(--eu-text-main)]">
          {field("dressCode", "font-light text-[var(--eu-text-main)]")}
        </span>
      </div>
    </section>
  );
}
