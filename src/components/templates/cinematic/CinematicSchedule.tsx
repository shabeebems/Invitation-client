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
    { time: "04:30 PM", title: "Arrival & Red Carpet Greetings", description: "Welcoming of honored guests with refreshing sunset beverages and family portraits in the foyer." },
    { time: "05:45 PM", title: "The Sacred Vows (Nikah Ceremony)", description: "The solemnization ceremony, sacred vows, and collective prayers in the Grand Glass Pavilion." },
    { time: "07:30 PM", title: "The Grand Premiere Banquet", description: "An exquisite multi-course culinary feast accompanied by live acoustic melodies and heartfelt toasts." },
    { time: "09:30 PM", title: "Credits Roll & Golden Send-off", description: "Cherished photo moments, sparkling exit, and warmest blessings for the newlyweds." },
  ];

  return (
    <section id="schedule" className="relative z-10 mx-auto my-28 max-w-4xl px-4 text-center">
      {/* Film Reel Slate Header */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)]/40 bg-black/70 px-5 py-1.5 font-mono text-[11px] tracking-[0.25em] text-[var(--cv-gold)] uppercase shadow-lg">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span>DIRECTOR&apos;S CALL SHEET • PRODUCTION SCHEDULE</span>
      </div>

      <p className="mt-4 font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("programEyebrow", "text-center font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("programTitle", "font-serif text-3xl font-light tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-xs font-light tracking-widest text-[var(--cv-text-muted)] uppercase sm:text-sm">
        {field("programIntro", "text-center text-xs font-light tracking-widest text-[var(--cv-text-muted)] uppercase sm:text-sm")}
      </p>

      {/* 35mm Film Strip Reel Timeline */}
      <div className="relative mt-14">
        {/* Film Strip Left & Right Perforations Border on desktop */}
        <div className="relative space-y-6">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-[var(--cv-gold)]/30 bg-gradient-to-r from-black/90 via-[#15121b]/95 to-black/90 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--cv-gold)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              {/* Top Film Clapperboard Slate Bar */}
              <div className="flex items-center justify-between border-b border-[var(--cv-gold)]/20 bg-black/60 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-[var(--cv-gold)] uppercase">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--cv-gold-light)]">SCENE 0{index + 1}</span>
                  <span className="opacity-40">|</span>
                  <span className="text-[var(--cv-text-muted)]">TAKE 01</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="opacity-50">CALL TIME:</span>
                  <span className="font-bold text-[var(--cv-gold-light)]">
                    <EditableField
                      value={item.time}
                      editable={editable}
                      className="font-mono font-bold text-[var(--cv-gold-light)]"
                      onCommit={(val) => onCommitItem?.(index, "time", val)}
                    />
                  </span>
                </div>
              </div>

              {/* Scene Content */}
              <div className="p-6 text-left sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-serif text-2xl font-light tracking-wide text-white group-hover:text-[var(--cv-gold-light)]">
                    <EditableField
                      value={item.title}
                      editable={editable}
                      className="font-serif text-2xl font-light text-white"
                      onCommit={(val) => onCommitItem?.(index, "title", val)}
                    />
                  </h3>
                </div>

                <div className="mt-3 text-sm font-light leading-relaxed text-[var(--cv-text-muted)] sm:text-base">
                  <EditableField
                    value={item.description}
                    editable={editable}
                    multiline
                    className="text-sm font-light leading-relaxed text-[var(--cv-text-muted)] sm:text-base"
                    onCommit={(val) => onCommitItem?.(index, "description", val)}
                  />
                </div>
              </div>

              {/* Bottom Film Frame Perforation Line */}
              <div className="flex items-center justify-between border-t border-[var(--cv-gold)]/10 bg-black/40 px-5 py-1.5 font-mono text-[8px] text-[var(--cv-gold)]/40 tracking-widest">
                <span>EASTMAN 5219</span>
                <span>✦ FRAME {index * 24 + 1}0A ✦</span>
                <span>24 FPS</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wardrobe & Costume Dept Badge */}
      <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-[var(--cv-gold)]/40 bg-black/80 px-8 py-4 font-mono text-xs tracking-wider text-[var(--cv-gold)] uppercase shadow-lg backdrop-blur-md">
        <span className="font-bold text-[var(--cv-gold-light)]">✦ WARDROBE &amp; ATTIRE:</span>
        <span className="font-light text-white">
          {field("dressCode", "font-light text-white")}
        </span>
      </div>
    </section>
  );
}

