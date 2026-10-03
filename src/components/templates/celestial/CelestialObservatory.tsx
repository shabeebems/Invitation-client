"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function CelestialObservatory({
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

  const displayAddress = addressFull || "Al Bustan Street, Qantab, Muscat 114, Sultanate of Oman";
  const displayVenue = venueName || "Al Bustan Palace Dome";
  const displayHall = venueHall || "The Celestial Atrium & Gardens";
  const displayCity = venueCity || "Muscat, Sultanate of Oman";

  const mapQuery = encodeURIComponent(`${displayVenue}, ${displayAddress}`);
  const fallbackMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const effectiveMapsUrl = mapsUrl || fallbackMapsUrl;

  function handleCopy() {
    navigator.clipboard.writeText(`${displayVenue} - ${displayHall}, ${displayAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="observatory" className="relative z-10 mx-auto my-28 max-w-5xl px-4 text-center">
      {/* Decorative Divider */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cs-starlight)] opacity-80">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--cs-starlight)]" />
        <span className="font-serif text-xs tracking-[0.3em]">✦ THE CELESTIAL OBSERVATORY ✦</span>
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--cs-starlight)]" />
      </div>

      <p className="mt-3 text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase">
        {field("locationEyebrow", "text-center text-[11px] font-semibold tracking-[0.35em] text-[var(--cs-starlight)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl">
        {field("venueLabel", "font-serif text-3xl font-medium tracking-tight text-[var(--cs-starlight-light)] sm:text-5xl")}
      </h2>

      {/* Main Glass Venue Card */}
      <div className="cs-instrument-card mt-12 overflow-hidden rounded-3xl text-left shadow-2xl backdrop-blur-xl">
        <span className="cs-corner-pin tl" />
        <span className="cs-corner-pin tr" />
        <span className="cs-corner-pin bl" />
        <span className="cs-corner-pin br" />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Observatory Info (5 cols) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--cs-starlight)]/40 bg-[var(--cs-starlight)]/10 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[var(--cs-starlight)] uppercase">
                <span>🔭</span>
                <span>Astrological Grounds</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-medium tracking-wide text-white sm:text-3xl">
                  {field("venueName", "font-serif text-2xl font-medium text-white sm:text-3xl")}
                </h3>
                <p className="font-serif text-base text-[var(--cs-starlight)]">
                  {field("venueHall", "font-serif text-base text-[var(--cs-starlight)]")}
                </p>
                <p className="font-mono text-xs font-medium tracking-widest text-[var(--cs-starlight-dim)] uppercase">
                  {field("venueCity", "font-mono text-xs font-medium tracking-widest text-[var(--cs-starlight-dim)] uppercase")}
                </p>
              </div>

              <div className="border-t border-[var(--cs-border-light)] pt-5">
                <span className="font-mono text-[10px] font-semibold tracking-widest text-[var(--cs-text-muted)] uppercase">
                  Coordinates: 23° 34&apos; N · 58° 32&apos; E
                </span>
                <p className="mt-1 text-sm font-light leading-relaxed text-[var(--cs-text-main)]">
                  {field("addressFull", "text-sm font-light leading-relaxed text-[var(--cs-text-main)]")}
                </p>
              </div>

              {/* Starlit Valet note */}
              <div className="rounded-2xl border border-[var(--cs-border-light)] bg-white/5 p-4 text-xs font-light text-[var(--cs-text-muted)]">
                <div className="flex items-center gap-2 font-medium text-[var(--cs-starlight)]">
                  <span>🚗</span>
                  <span>Astronomical Guest Parking & Valet</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed">
                  Complimentary valet reception at the main grand palace dome rotunda.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={effectiveMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--cs-starlight)] bg-gradient-to-r from-[var(--cs-starlight-dim)] via-[var(--cs-starlight)] to-[var(--cs-starlight-dim)] px-6 py-3.5 text-xs font-bold tracking-wider text-[#030612] uppercase shadow-lg transition hover:brightness-110 active:scale-95"
              >
                <span>Navigate via Google Maps</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--cs-border)] bg-black/50 px-6 py-3.5 text-xs font-semibold tracking-wider text-[var(--cs-starlight)] uppercase backdrop-blur-md transition hover:border-[var(--cs-starlight)] hover:bg-[var(--cs-starlight)]/10 cursor-pointer"
              >
                <span>{copied ? "Coordinates Copied! ✓" : "Copy Observatory Coordinates"}</span>
              </button>
            </div>
          </div>

          {/* Embedded Map Visual with Viewfinder Reticle (7 cols) */}
          <div className="relative min-h-[400px] lg:col-span-7">
            <iframe
              title="Observatory Location Map"
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[400px] w-full border-0 filter grayscale contrast-125 invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Viewfinder Crosshair */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-28 w-28 rounded-full border border-[var(--cs-starlight)]/40 opacity-70" />
              <div className="absolute h-px w-36 bg-[var(--cs-starlight)]/30" />
              <div className="absolute h-36 w-px bg-[var(--cs-starlight)]/30" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030612]/75 via-transparent to-[#030612]/35" />
          </div>
        </div>
      </div>
    </section>
  );
}
