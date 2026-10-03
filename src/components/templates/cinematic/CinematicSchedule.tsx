"use client";

import type { ReactNode } from "react";
import type { ProgramItem } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";

export default function CinematicSchedule({
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
    { time: "04:30 PM", title: "Welcome & Traditional Kahwa", description: "Arrival of guests, refreshing sunset drinks, and family greetings in the foyer." },
    { time: "05:45 PM", title: "The Sacred Vows (Nikah)", description: "The solemnization ceremony and prayers in the Grand Glass Pavilion." },
    { time: "07:30 PM", title: "Celebratory Banquet Feast", description: "A culinary feast accompanied by live acoustic melodies and cherished loved ones." },
    { time: "09:30 PM", title: "Duo Blessings & Farewell", description: "Cherished photo moments, prayers, and sending off the newlyweds." },
  ];

  return (
    <section id="schedule" className="relative z-10 mx-auto my-24 max-w-4xl px-4 text-center">
      {/* Decorative Divider */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cv-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cv-gold)]" />
        <span className="text-xs">✦ ITINERARY ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cv-gold)]" />
      </div>

      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("programEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("programTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--cv-text-muted)]">
        {field("programIntro", "text-center text-sm font-light text-[var(--cv-text-muted)]")}
      </p>

      {/* Itinerary Cards */}
      <div className="mt-12 space-y-5 text-left">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="cv-glass group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:scale-[1.01] hover:border-[var(--cv-gold)] sm:flex-row sm:items-center sm:gap-8 sm:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--cv-gold)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Time Pill */}
            <div className="flex shrink-0 items-center justify-center rounded-2xl border border-[var(--cv-border)] bg-black/40 px-5 py-3 font-serif text-lg font-semibold tracking-wide text-[var(--cv-gold-light)] sm:w-44">
              <EditableField
                value={item.time}
                editable={editable}
                className="font-serif text-lg font-semibold text-[var(--cv-gold-light)]"
                onCommit={(val) => onCommitItem?.(index, "time", val)}
              />
            </div>

            {/* Event Content */}
            <div className="min-w-0 flex-1 space-y-1.5">
              <h3 className="font-serif text-2xl font-medium tracking-wide text-white group-hover:text-[var(--cv-gold-light)]">
                <EditableField
                  value={item.title}
                  editable={editable}
                  className="font-serif text-2xl font-medium text-white"
                  onCommit={(val) => onCommitItem?.(index, "title", val)}
                />
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--cv-text-muted)]">
                <EditableField
                  value={item.description}
                  editable={editable}
                  multiline
                  className="text-sm font-light leading-relaxed text-[var(--cv-text-muted)]"
                  onCommit={(val) => onCommitItem?.(index, "description", val)}
                />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Attire / Dress Code Badge */}
      <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[var(--cv-border)] bg-black/50 px-7 py-3 text-xs tracking-wider text-[var(--cv-gold)] uppercase shadow-lg backdrop-blur-md">
        <span className="font-semibold">Attire / Dress Code:</span>
        <span className="font-light text-[var(--cv-text-main)]">
          {field("dressCode", "font-light text-[var(--cv-text-main)]")}
        </span>
      </div>
    </section>
  );
}
