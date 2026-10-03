"use client";

import { useRef, type ReactNode } from "react";

const petals = [
  { left: "3%", width: 14, delay: "0.2s", duration: "13s", sway: "-45px", spin: "420deg" },
  { left: "14%", width: 18, delay: "2.5s", duration: "16s", sway: "60px", spin: "360deg" },
  { left: "26%", width: 12, delay: "4.8s", duration: "14s", sway: "-35px", spin: "270deg" },
  { left: "42%", width: 16, delay: "1.2s", duration: "15s", sway: "50px", spin: "510deg" },
  { left: "62%", width: 15, delay: "3.4s", duration: "17s", sway: "-40px", spin: "380deg" },
  { left: "78%", width: 20, delay: "0.8s", duration: "18s", sway: "65px", spin: "460deg" },
  { left: "91%", width: 13, delay: "4.1s", duration: "14s", sway: "-50px", spin: "310deg" },
];

const stardust = [
  { top: "12%", left: "10%", size: 6, delay: "0.5s", duration: "3.2s" },
  { top: "18%", left: "84%", size: 8, delay: "1.8s", duration: "4.1s" },
  { top: "35%", left: "6%", size: 5, delay: "2.7s", duration: "3.5s" },
  { top: "42%", left: "92%", size: 7, delay: "0.9s", duration: "4.5s" },
  { top: "68%", left: "15%", size: 6, delay: "3.1s", duration: "3.8s" },
  { top: "74%", left: "82%", size: 8, delay: "1.4s", duration: "4.2s" },
  { top: "85%", left: "28%", size: 5, delay: "2.2s", duration: "3.6s" },
  { top: "88%", left: "70%", size: 6, delay: "0.4s", duration: "4.0s" },
];

export default function WeddingHero({
  heroImageUrl,
  editable,
  field,
  onImageChange,
}: {
  heroImageUrl: string;
  editable: boolean;
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
  onImageChange: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-20 text-center">
      {/* Dynamic Ambient Background Highlight */}
      <div className="eu-arch-halo" aria-hidden="true" />

      {/* Floating Animated Golden Rose Petals */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {petals.map((p, i) => (
          <svg
            key={`petal-${i}`}
            className="eu-petal absolute top-[-35px] opacity-75 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
            viewBox="0 0 24 24"
            style={{
              left: p.left,
              width: p.width,
              animationDelay: p.delay,
              animationDuration: p.duration,
              ["--eu-sway" as string]: p.sway,
              ["--eu-spin" as string]: p.spin,
            }}
          >
            <path
              d="M12 2 C18 7, 21 14, 17 21 C14 25, 8 25, 5 21 C1 14, 4 7, 12 2 Z"
              fill="var(--eu-gold)"
              opacity="0.65"
            />
          </svg>
        ))}

        {/* Twinkling Golden Stardust Sparks */}
        {stardust.map((s, i) => (
          <div
            key={`star-${i}`}
            className="eu-stardust pointer-events-none absolute rounded-full bg-[var(--eu-gold-light)] shadow-[0_0_12px_var(--eu-gold)]"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* Main Royal Showcase Container */}
      <div className="relative z-20 mx-auto max-w-4xl space-y-8">
        
        {/* Sacred Bismillah & Crown Emblem */}
        <div className="space-y-3">
          {/* Subtle Arabesque Filigree Crown Flourish */}
          <div className="mx-auto flex items-center justify-center gap-3 text-[var(--eu-gold)] opacity-85">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--eu-gold)] sm:w-28" />
            <span className="text-sm">✦</span>
            <svg className="h-5 w-8 fill-[var(--eu-gold)]" viewBox="0 0 32 16" aria-hidden="true">
              <path d="M16 0 C18 6, 26 8, 32 8 C26 8, 20 12, 16 16 C12 12, 6 8, 0 8 C6 8, 14 6, 16 0 Z" />
            </svg>
            <span className="text-sm">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--eu-gold)] sm:w-28" />
          </div>

          <div className="font-serif text-3xl font-normal tracking-wide text-[var(--eu-gold-light)] drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] sm:text-4xl md:text-5xl">
            {field("bismillah", "text-center font-serif text-3xl text-[var(--eu-gold-light)] sm:text-4xl md:text-5xl")}
          </div>

          <p className="font-serif text-xs tracking-[0.2em] text-[var(--eu-gold)] italic sm:text-sm">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* The Host Announcement & Family Honor */}
        <div className="space-y-2">
          <div className="text-xs font-semibold tracking-[0.3em] text-[var(--eu-gold)] uppercase sm:text-sm">
            {field("hostLabel", "text-center text-xs tracking-[0.3em] text-[var(--eu-gold)] uppercase sm:text-sm")}
          </div>
          <div className="text-base font-light tracking-wide text-[var(--eu-text-main)] sm:text-lg">
            {field("hostNames", "text-center text-base font-light text-[var(--eu-text-main)] sm:text-lg")}
          </div>
          <div className="mx-auto max-w-lg text-xs font-light tracking-widest text-[var(--eu-text-muted)] uppercase sm:text-sm">
            {field("introLine", "text-center text-xs font-light text-[var(--eu-text-muted)] uppercase sm:text-sm")}
          </div>
        </div>

        {/* The Imperial Palace Archway Showcase */}
        <div className="relative mx-auto my-6 max-w-[340px] sm:max-w-[420px] md:max-w-[460px]">
          {/* Arch Corner Spandrel Filigree Flanking */}
          <div className="pointer-events-none absolute -top-5 -left-5 z-30 hidden sm:block text-[var(--eu-gold)]">
            <svg className="h-14 w-14 fill-none stroke-current stroke-1 opacity-80" viewBox="0 0 60 60">
              <path d="M0 60 C0 26, 26 0, 60 0 L60 12 C32 12, 12 32, 12 60 Z" />
              <circle cx="28" cy="28" r="3" fill="var(--eu-gold)" />
            </svg>
          </div>
          <div className="pointer-events-none absolute -top-5 -right-5 z-30 hidden sm:block text-[var(--eu-gold)]">
            <svg className="h-14 w-14 fill-none stroke-current stroke-1 opacity-80" viewBox="0 0 60 60">
              <path d="M60 60 C60 26, 34 0, 0 0 L0 12 C28 12, 48 32, 48 60 Z" />
              <circle cx="32" cy="28" r="3" fill="var(--eu-gold)" />
            </svg>
          </div>

          {/* Keystone Monogram Medallion Apex */}
          <div className="absolute -top-7 left-1/2 z-30 flex -translate-x-1/2 items-center justify-center">
            <div className="eu-monogram-badge flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16">
              <div className="relative flex h-full w-full items-center justify-center">
                {/* Rotating celestial diamond ring */}
                <div className="eu-spin-slow absolute inset-0 flex items-center justify-center text-[8px] text-[#2c0912]">
                  <span className="absolute top-1">✦</span>
                  <span className="absolute bottom-1">✦</span>
                  <span className="absolute left-1">✧</span>
                  <span className="absolute right-1">✧</span>
                </div>
                <span className="font-serif text-sm font-bold tracking-widest text-[#2c0912] sm:text-base">
                  I & A
                </span>
              </div>
            </div>
          </div>

          {/* The Arched Portrait Frame */}
          <div className="eu-arch-portal bg-[var(--eu-bg-secondary)] p-2.5 pt-8 shadow-[var(--eu-shadow)]">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImageChange(file);
              }}
            />

            <div
              onClick={() => editable && fileInputRef.current?.click()}
              className={`eu-arch-inner group relative aspect-[4/5] w-full overflow-hidden border border-[var(--eu-border-light)] ${
                editable ? "cursor-pointer ring-2 ring-[var(--eu-gold)]/50" : ""
              }`}
            >
              {heroImageUrl ? (
                <img
                  src={heroImageUrl}
                  alt="The Royal Couple"
                  className="h-full w-full object-cover object-top transition duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[var(--eu-bg-secondary)] to-black/60 p-6 text-center text-sm text-[var(--eu-text-muted)]">
                  <span className="text-4xl">📸</span>
                  <p className="mt-3 font-serif text-lg font-medium text-[var(--eu-gold-light)]">The Royal Couple</p>
                  <p className="mt-1 text-xs text-[var(--eu-text-faint)]">Tap here to upload portrait</p>
                </div>
              )}

              {/* Bottom Vignette & Royal Ribbon Nameplate */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pt-12 pb-4 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--eu-border)] bg-black/60 px-4 py-1 text-[11px] font-medium tracking-[0.2em] text-[var(--eu-gold-light)] uppercase backdrop-blur-md">
                  <span>✦</span>
                  <span>The Sacred Union</span>
                  <span>✦</span>
                </span>
              </div>

              {/* Hover Edit Overlay */}
              {editable && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-[var(--eu-gold)] bg-[var(--eu-gold)] px-5 py-2.5 text-xs font-bold tracking-wider text-[#1e050b] shadow-xl uppercase">
                    Change Portrait
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grand Royal Typography — Couple Names */}
        <div className="my-6 space-y-4">
          <div className="space-y-1">
            <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-7xl md:text-8xl">
              <span className="eu-gold-gradient block drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
                {field("groomName", "eu-gold-gradient font-serif font-semibold")}
              </span>
            </h1>

            {/* Regal Ampersand Divider */}
            <div className="flex items-center justify-center gap-4 py-1 text-[var(--eu-gold)]">
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--eu-gold)] to-transparent sm:w-32" />
              <span className="font-serif text-3xl font-light text-[var(--eu-gold-light)] italic sm:text-4xl">
                &
              </span>
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-[var(--eu-gold)] to-transparent sm:w-32" />
            </div>

            <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-7xl md:text-8xl">
              <span className="eu-gold-gradient block drop-shadow-[0_4px_25px_rgba(212,175,55,0.35)]">
                {field("brideName", "eu-gold-gradient font-serif font-semibold")}
              </span>
            </h1>
          </div>

          {/* Parents Lineage & Blessing */}
          <div className="mx-auto max-w-lg pt-2 text-xs font-light tracking-wide text-[var(--eu-text-muted)] sm:text-sm">
            <span className="opacity-80">{field("brideParentsLabel", "opacity-80")} </span>
            <span className="font-medium text-[var(--eu-gold-light)]">
              {field("brideParents", "font-medium text-[var(--eu-gold-light)]")}
            </span>
          </div>

          <p className="mx-auto max-w-md pt-1 text-xs font-light tracking-[0.2em] text-[var(--eu-gold)] uppercase sm:text-sm">
            {field("inviteLine", "text-center text-xs tracking-[0.2em] text-[var(--eu-gold)] uppercase")}
          </p>
        </div>

        {/* Architectural Royal Heraldic Event Ribbon */}
        <div className="eu-glass mx-auto max-w-2xl rounded-3xl p-5 shadow-[var(--eu-shadow)] backdrop-blur-xl sm:p-6">
          <div className="grid grid-cols-1 divide-y divide-[var(--eu-border-light)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Date Pillar */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                The Sacred Day
              </span>
              <p className="font-serif text-lg font-medium text-[var(--eu-text-main)] sm:text-xl">
                {field("weekday", "font-medium text-[var(--eu-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--eu-text-muted)]">
                {field("day", "text-xs font-light text-[var(--eu-text-muted)]")} {field("monthYear", "text-xs font-light text-[var(--eu-text-muted)]")}
              </p>
            </div>

            {/* Time Pillar */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                Auspicious Hour
              </span>
              <p className="font-serif text-lg font-medium text-[var(--eu-text-main)] sm:text-xl">
                {field("time", "font-medium text-[var(--eu-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--eu-text-muted)]">
                Solemnization & Feast
              </p>
            </div>

            {/* Venue Pillar */}
            <div className="space-y-1 py-3 sm:py-0 sm:px-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                The Grand Venue
              </span>
              <p className="font-serif text-lg font-medium text-[var(--eu-text-main)] sm:text-xl">
                {field("venueCity", "font-medium text-[var(--eu-text-main)]")}
              </p>
              <p className="text-xs font-light text-[var(--eu-text-muted)] line-clamp-1">
                {field("venueName", "text-xs font-light text-[var(--eu-text-muted)]")}
              </p>
            </div>
          </div>
        </div>

        {/* Quick-Action Royal Suite */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#schedule"
            className="eu-shimmer-btn inline-flex items-center gap-2 rounded-full border border-[var(--eu-gold)] bg-gradient-to-r from-[var(--eu-gold-dark)] via-[var(--eu-gold)] to-[var(--eu-gold-dark)] px-7 py-3 text-xs font-bold tracking-wider text-[#1e050b] uppercase shadow-[0_4px_25px_rgba(212,175,55,0.4)] transition hover:brightness-110 active:scale-95"
          >
            <span>Sacred Itinerary</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>

          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--eu-border)] bg-[var(--eu-bg-surface)] px-7 py-3 text-xs font-semibold tracking-wider text-[var(--eu-gold-light)] uppercase backdrop-blur-md transition hover:border-[var(--eu-gold)] hover:bg-[var(--eu-gold)]/10"
          >
            <span>RSVP & Wishes</span>
            <span>💌</span>
          </a>
        </div>
      </div>
    </section>
  );
}
