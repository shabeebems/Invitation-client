"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function CinematicLocation({
  mapsUrl,
  addressFull,
  venueName,
  venueHall,
  venueCity,
  field,
}: {
  mapsUrl?: string;
  addressFull?: string;
  venueName?: string;
  venueHall?: string;
  venueCity?: string;
  field: (key: any, className?: string) => ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const displayAddress = addressFull || "Al Bustan Palace, Ritz-Carlton Hotel, Muscat, Oman";
  const displayVenue = venueName || "Al Bustan Palace";
  const displayHall = venueHall || "Majan Ballroom";
  const displayCity = venueCity || "Muscat, Oman";

  const mapQuery = encodeURIComponent(`${displayVenue}, ${displayAddress}`);
  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const effectiveMapsUrl = mapsUrl || fallbackMapsUrl;

  function handleCopy() {
    navigator.clipboard.writeText(`${displayVenue} - ${displayHall}, ${displayAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="location" className="relative z-10 mx-auto my-28 max-w-5xl px-4 text-center">
      {/* Cinema Marquee Overhead Header */}
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)]/40 bg-black/80 px-6 py-2 font-mono text-[10px] tracking-[0.3em] text-[var(--cv-gold)] uppercase shadow-lg">
        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
        <span>PREMIERE PAVILION • RED CARPET LOCATION</span>
      </div>

      <p className="mt-4 font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("venueEyebrow", "text-center font-mono text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-light tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("venueTitle", "font-serif text-3xl font-light tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-xs font-light tracking-widest text-[var(--cv-text-muted)] uppercase sm:text-sm">
        {field("venueIntro", "text-center text-xs font-light tracking-widest text-[var(--cv-text-muted)] uppercase sm:text-sm")}
      </p>

      {/* Retro Marquee Box */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--cv-gold)]/50 bg-gradient-to-b from-black/95 via-[#14101b]/95 to-black/95 text-left shadow-[0_15px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        {/* Top Marquee Ribbon */}
        <div className="flex items-center justify-between border-b border-[var(--cv-gold)]/30 bg-black/80 px-6 py-3 font-mono text-[10px] tracking-[0.25em] text-[var(--cv-gold)] uppercase">
          <div className="flex items-center gap-2">
            <span>NOW SHOWING: EXCLUSIVE ENGAGEMENT</span>
          </div>
          <div className="text-[var(--cv-gold-light)]">
            RED CARPET ACCESS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y divide-[var(--cv-gold)]/20 lg:divide-y-0 lg:divide-x">
          {/* Cinema Details (6 cols) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-6">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[var(--cv-gold)] uppercase">
                  ✦ PREMIERE THEATRE &amp; ESTATE
                </span>
                <h3 className="mt-1 font-serif text-3xl font-light tracking-wide text-white sm:text-4xl">
                  {field("venueName", "font-serif text-3xl font-light text-white sm:text-4xl")}
                </h3>
                <p className="mt-1 font-serif text-lg text-[var(--cv-gold-light)]">
                  {field("venueHall", "font-serif text-lg text-[var(--cv-gold-light)]")}
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-[var(--cv-gold)]/20 bg-black/50 p-4 font-mono text-xs">
                <span className="text-[9px] font-bold tracking-widest text-[var(--cv-gold)] uppercase">
                  LOCATION ADDRESS:
                </span>
                <p className="font-light text-[var(--cv-text-muted)] leading-relaxed">
                  {field("addressFull", "font-light text-[var(--cv-text-muted)] leading-relaxed")}
                </p>
              </div>

              {/* Cinema Amenities */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-[11px] text-[var(--cv-text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--cv-gold)]">✓</span>
                  <span>Valet &amp; Limousine Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--cv-gold)]">✓</span>
                  <span>Red Carpet Media Wall</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--cv-gold)]">✓</span>
                  <span>Climate Controlled Pavilion</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--cv-gold)]">✓</span>
                  <span>VIP Guest Seating</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={effectiveMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8010] px-7 py-3 text-xs font-bold tracking-[0.15em] text-[#121016] uppercase shadow-lg transition hover:brightness-110 active:scale-95"
              >
                <span>OPEN CINEMA MAP</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)]/40 bg-black/60 px-6 py-3 font-mono text-xs font-semibold tracking-wider text-[var(--cv-gold-light)] uppercase backdrop-blur-md transition hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/15 active:scale-95 cursor-pointer"
              >
                <span>{copied ? "COPIED TO CLIPBOARD ✓" : "COPY DISPATCH DIRECTIVES"}</span>
              </button>
            </div>
          </div>

          {/* Embedded Map Visual (6 cols) */}
          <div className="relative min-h-[380px] lg:col-span-6 bg-black">
            <iframe
              title="Venue Location Map"
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[380px] w-full border-0 filter grayscale contrast-125 invert opacity-75 hover:opacity-100 transition-opacity"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-lg border border-[var(--cv-gold)]/40 bg-black/80 px-3 py-1 font-mono text-[9px] tracking-widest text-[var(--cv-gold)] uppercase">
              SAT-NAV GUIDANCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
