"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export default function VogueDestinationFeature({
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

  const displayAddress = addressFull || "Al Bustan Street, Qantab Coastal Road, Muscat 114, Sultanate of Oman";
  const displayVenue = venueName || "Al Bustan Palace Estate";
  const displayHall = venueHall || "The Majan Grand Ballroom";
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
    <section id="destination" className="relative z-10 mx-auto my-28 max-w-6xl px-4">
      {/* Magazine Section Header */}
      <div className="border-b-2 border-[var(--ev-text-dark)] pb-4 text-left">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-[var(--ev-bronze)] uppercase">
          <span>DESTINATION REPORT · P. 72 – 77</span>
          <span>ESTATE & ARCHITECTURE</span>
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl">
          {field("locationEyebrow", "font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)] sm:text-5xl")}
        </h2>
        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-[var(--ev-text-muted)] uppercase">
          INSPECTION & DISPATCH · COASTAL OMAN
        </p>
      </div>

      {/* Main Destination Editorial Card */}
      <div className="mt-10 overflow-hidden rounded-2xl border-2 border-[var(--ev-text-dark)] bg-white shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Estate Editorial Narrative (5 cols) */}
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
            <div className="space-y-6">
              <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-[var(--ev-bronze)] uppercase">
                ESTATE PROFILE · RESIDENCE 01
              </span>

              <div className="space-y-1">
                <h3 className="font-serif text-3xl font-bold tracking-tight text-[var(--ev-text-dark)]">
                  {field("venueName", "font-serif text-3xl font-bold text-[var(--ev-text-dark)]")}
                </h3>
                <p className="font-serif text-lg text-[var(--ev-bronze)]">
                  {field("venueHall", "font-serif text-lg text-[var(--ev-bronze)]")}
                </p>
                <p className="font-mono text-xs font-semibold tracking-widest text-[var(--ev-text-muted)] uppercase">
                  {field("venueCity", "font-mono text-xs font-semibold tracking-widest uppercase")}
                </p>
              </div>

              <div className="border-t border-[var(--ev-border-light)] pt-5">
                <span className="font-mono text-[9px] font-bold tracking-widest text-[var(--ev-text-muted)] uppercase">
                  Physical Address
                </span>
                <p className="mt-1 font-serif text-base font-light leading-relaxed text-[var(--ev-text-dark)]">
                  {field("addressFull", "font-serif text-base font-light leading-relaxed text-[var(--ev-text-dark)]")}
                </p>
              </div>

              {/* Valet service information */}
              <div className="rounded-xl border border-[var(--ev-border-light)] bg-gray-50 p-4 text-xs font-light text-[var(--ev-text-muted)]">
                <span className="font-mono text-[10px] font-bold text-[var(--ev-text-dark)] uppercase">
                  🚗 Valet & Carriage Concierge
                </span>
                <p className="mt-1 text-[11px] leading-relaxed">
                  Complimentary valet parking and white-glove arrival assistance will be provided at the grand palace rotunda entrance.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={effectiveMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ev-text-dark)] px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition hover:bg-[var(--ev-bronze)] active:scale-95"
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ev-border)] bg-white px-6 py-3.5 text-xs font-semibold tracking-wider text-[var(--ev-text-dark)] uppercase transition hover:bg-gray-50 cursor-pointer"
              >
                <span>{copied ? "Address Copied! ✓" : "Copy Estate Coordinates"}</span>
              </button>
            </div>
          </div>

          {/* Minimalist Editorial Map Embed (7 cols) */}
          <div className="relative min-h-[380px] lg:col-span-7">
            <iframe
              title="Venue Location Map"
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="h-full min-h-[380px] w-full border-0 filter grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
