"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { ProgramItem } from "@/lib/api";
import EditableField from "@/components/templates/EditableField";

export default function CelestialOrbitSchedule({
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
  const [activeOrbit, setActiveOrbit] = useState<number>(0);

  const displayItems = items && items.length > 0 ? items : [
    { time: "05:00 PM", title: "Twilight Gathering & Sunset Kahwa", description: "Arrival under the dusk sky, golden-hour drinks, and joyous family greetings in the courtyard." },
    { time: "06:15 PM", title: "The Sacred Vows (Nikah Solemnization)", description: "The solemn exchange of eternal vows and heartfelt prayers under the illuminated glass dome." },
    { time: "07:45 PM", title: "The Starlit Gala Banquet", description: "An exquisite gastronomic feast served beneath thousands of shimmering celestial lights." },
    { time: "09:45 PM", title: "Lantern Illumination & Farewell", description: "Releasing glowing starlight lanterns into the night, midnight dua, and sending off the newlyweds." },
  ];

  const orbitPlanets = [
    { icon: "☀️", name: "Twilight Sun", angle: 0 },
    { icon: "🌙", name: "Crescent Moon", angle: 90 },
    { icon: "✨", name: "Stardust Gala", angle: 180 },
    { icon: "🪐", name: "Lantern Orbit", angle: 270 },
  ];

  const currentItem = displayItems[activeOrbit] || displayItems[0];
  const currentPlanet = orbitPlanets[activeOrbit % orbitPlanets.length];

  return (
    <section id="schedule" className="relative z-10 mx-auto my-28 max-w-5xl px-4 text-center">
      {/* Decorative Astrolabe Header */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
        <span className="text-xs">✦ 24-HOUR PLANETARY ORBIT ✦</span>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
        {field("programEyebrow", "text-center text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl">
        {field("programTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--cs-text-muted)]">
        {field("programIntro", "text-center text-sm font-light text-[var(--cs-text-muted)]")}
      </p>

      {/* Main Astrolabe Radial Instrument */}
      <div className="cs-instrument-card relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl p-6 sm:p-12">
        <span className="cs-corner-pin tl" />
        <span className="cs-corner-pin tr" />
        <span className="cs-corner-pin bl" />
        <span className="cs-corner-pin br" />

        {/* Orbit Node Selector Track (Horizontal Planet Buttons) */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {displayItems.map((item, index) => {
            const isSelected = activeOrbit === index;
            const planet = orbitPlanets[index % orbitPlanets.length];

            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveOrbit(index)}
                className={`cs-sector-btn flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all ${
                  isSelected ? "active" : "border-white/10 bg-black/40 text-white/70 hover:border-white/30"
                }`}
              >
                <span className="text-base">{planet.icon}</span>
                <span className="font-serif font-medium tracking-wider">
                  Orbit 0{index + 1}
                </span>
                <span className="font-mono text-[10px] text-[var(--cs-starlight)] opacity-80">
                  {item.time.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Orbit Center Lens */}
        <div className="relative mx-auto max-w-xl rounded-2xl border border-[var(--cs-border)] bg-gradient-to-b from-[#0e1636] to-[#040817] p-8 text-center shadow-2xl">
          {/* Subtle concentric rings behind */}
          <div className="pointer-events-none absolute inset-0 -m-4 rounded-3xl border border-dashed border-[var(--cs-border-light)] opacity-30" />

          {/* Planetary Icon & Degree Stamp */}
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--cs-starlight)] bg-[var(--cs-starlight)]/15 text-3xl shadow-[0_0_30px_rgba(243,227,182,0.4)]">
            <span>{currentPlanet.icon}</span>
            <div className="absolute -bottom-2.5 rounded-full border border-white/20 bg-black/90 px-2 py-0.5 font-mono text-[9px] text-[var(--cs-starlight)]">
              {currentPlanet.angle}° AZ
            </div>
          </div>

          {/* Time Badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--cs-starlight-dim)] bg-black/60 px-5 py-2 font-serif text-lg font-semibold tracking-wider text-[var(--cs-starlight)] shadow-lg">
            <span>⏳</span>
            <EditableField
              value={currentItem.time}
              editable={editable}
              className="font-serif text-lg font-semibold text-[var(--cs-starlight)]"
              onCommit={(val) => onCommitItem?.(activeOrbit, "time", val)}
            />
          </div>

          {/* Event Title */}
          <h3 className="mt-4 font-serif text-2xl font-medium tracking-wide text-white sm:text-3xl">
            <EditableField
              value={currentItem.title}
              editable={editable}
              className="font-serif text-2xl font-medium text-white sm:text-3xl"
              onCommit={(val) => onCommitItem?.(activeOrbit, "title", val)}
            />
          </h3>

          {/* Event Description */}
          <p className="mt-3 text-sm font-light leading-relaxed text-[var(--cs-text-muted)] sm:text-base">
            <EditableField
              value={currentItem.description}
              editable={editable}
              multiline
              className="text-sm font-light leading-relaxed text-[var(--cs-text-muted)] sm:text-base"
              onCommit={(val) => onCommitItem?.(activeOrbit, "description", val)}
            />
          </p>

          {/* Previous / Next Orbit Navigator */}
          <div className="mt-8 flex items-center justify-between border-t border-[var(--cs-border-light)] pt-5">
            <button
              type="button"
              onClick={() => setActiveOrbit((prev) => (prev > 0 ? prev - 1 : displayItems.length - 1))}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--cs-starlight-dim)] transition hover:text-white cursor-pointer"
            >
              <span>‹</span>
              <span>Previous Orbit</span>
            </button>

            <span className="font-mono text-[10px] tracking-widest text-[var(--cs-text-faint)]">
              {activeOrbit + 1} / {displayItems.length}
            </span>

            <button
              type="button"
              onClick={() => setActiveOrbit((prev) => (prev < displayItems.length - 1 ? prev + 1 : 0))}
              className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--cs-starlight-dim)] transition hover:text-white cursor-pointer"
            >
              <span>Next Orbit</span>
              <span>›</span>
            </button>
          </div>
        </div>

        {/* Attire Guide Seal */}
        <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[var(--cs-border)] bg-black/60 px-7 py-3 text-xs tracking-wider text-[var(--cs-starlight)] uppercase shadow-lg backdrop-blur-md">
          <span className="font-semibold">Celestial Attire:</span>
          <span className="font-light text-[var(--cs-text-main)]">
            {field("dressCode", "font-light text-[var(--cs-text-main)]")}
          </span>
        </div>
      </div>
    </section>
  );
}
