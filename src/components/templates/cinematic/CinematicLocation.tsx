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
      {/* Decorative Divider */}
      <div className="mx-auto flex items-center justify-center gap-3 text-[var(--cv-gold)] opacity-80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--cv-gold)]" />
        <span className="text-xs">✦ DESTINATION & VENUE ✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--cv-gold)]" />
      </div>

      <p className="mt-3 text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase">
        {field("venueEyebrow", "text-center text-xs font-semibold tracking-[0.3em] text-[var(--cv-gold)] uppercase")}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl">
        {field("venueTitle", "font-serif text-3xl font-medium tracking-tight text-[var(--cv-gold-light)] sm:text-5xl")}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm font-light text-[var(--cv-text-muted)]">
        {field("venueIntro", "text-center text-sm font-light text-[var(--cv-text-muted)]")}
      </p>

      {/* Main Glass Venue Card */}
      <div className="cv-glass mt-12 overflow-hidden rounded-3xl text-left shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Venue Info (5 cols) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--cv-gold)]/40 bg-[var(--cv-gold)]/10 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-[var(--cv-gold)] uppercase">
                <span>📍</span>
                <span>Celebration Ground</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-medium tracking-wide text-white sm:text-3xl">
                  {field("venueName", "font-serif text-2xl font-medium text-white sm:text-3xl")}
                </h3>
                <p className="font-serif text-base text-[var(--cv-gold-light)]">
                  {field("venueHall", "font-serif text-base text-[var(--cv-gold-light)]")}
                </p>
                <p className="text-xs font-medium tracking-widest text-[var(--cv-gold)] uppercase">
                  {field("venueCity", "text-xs font-medium tracking-widest text-[var(--cv-gold)] uppercase")}
                </p>
              </div>

              <div className="border-t border-[var(--cv-border-light)] pt-5">
                <span className="text-[10px] font-semibold tracking-widest text-[var(--cv-text-muted)] uppercase">
                  Address
                </span>
                <p className="mt-1 text-sm font-light leading-relaxed text-[var(--cv-text-main)]">
                  {field("addressFull", "text-sm font-light leading-relaxed text-[var(--cv-text-main)]")}
                </p>
              </div>

              {/* Parking and Access note */}
              <div className="rounded-2xl border border-[var(--cv-border-light)] bg-white/5 p-4 text-xs font-light text-[var(--cv-text-muted)]">
                <div className="flex items-center gap-2 font-medium text-[var(--cv-gold-light)]">
                  <span>🚗</span>
                  <span>Valet & Guest Parking Available</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed">
                  Complimentary valet parking is provided at the main palace entrance.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={effectiveMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--cv-gold)] bg-gradient-to-r from-[var(--cv-gold-dark)] via-[var(--cv-gold)] to-[var(--cv-gold-dark)] px-6 py-3.5 text-xs font-bold tracking-wider text-[#121016] uppercase shadow-lg transition hover:brightness-110 active:scale-95"
              >
                <span>Open in Google Maps</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--cv-border)] bg-black/40 px-6 py-3.5 text-xs font-semibold tracking-wider text-[var(--cv-gold-light)] uppercase backdrop-blur-md transition hover:border-[var(--cv-gold)] hover:bg-[var(--cv-gold)]/10 cursor-pointer"
              >
                <span>{copied ? "Address Copied! ✓" : "Copy Full Address"}</span>
              </button>
            </div>
          </div>

          {/* Embedded Map Visual (7 cols) */}
          <div className="relative min-h-[380px] lg:col-span-7">
            <iframe
              title="Venue Location Map"
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[380px] w-full border-0 filter grayscale contrast-125 invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
