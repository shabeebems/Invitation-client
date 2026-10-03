"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { getMapsEmbedUrl, getDirectionsUrl } from "@/lib/maps";

export default function WeddingLocation({
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
  field: (key: any, className?: string, multiline?: boolean) => ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const displayAddress = addressFull || `${venueName || "Grand Palace Auditorium"}, ${venueCity || "Kozhikode"}`;
  const embedUrl = getMapsEmbedUrl(mapsUrl || displayAddress);
  const directionsUrl = mapsUrl || getDirectionsUrl(displayAddress);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(displayAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="relative mx-auto my-20 max-w-5xl px-4 text-center">
      {/* Eyebrow */}
      <p className="text-xs font-semibold tracking-[0.25em] text-[var(--eu-gold)] uppercase">
        {field("locationEyebrow", "text-center text-xs font-semibold tracking-[0.25em] text-[var(--eu-gold)] uppercase")}
      </p>

      {/* Heading */}
      <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl">
        {field("venueLabel", "font-serif text-3xl font-medium tracking-tight text-[var(--eu-gold-light)] sm:text-5xl")}
      </h2>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Interactive Map Embed */}
        <div className="overflow-hidden rounded-3xl border border-[var(--eu-border)] shadow-[var(--eu-shadow)]">
          <iframe
            src={embedUrl}
            title="Venue Location Map"
            className="h-80 w-full border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Venue Information Card */}
        <div className="eu-glass rounded-3xl p-8 text-left sm:p-10">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                Destination
              </span>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-[var(--eu-text-main)] sm:text-3xl">
                {field("venueName", "font-serif text-2xl font-semibold text-[var(--eu-text-main)] sm:text-3xl")}
              </h3>
              <p className="text-sm font-medium text-[var(--eu-gold-light)]">
                {field("venueHall", "text-sm font-medium text-[var(--eu-gold-light)]")}
              </p>
            </div>

            <div className="border-t border-[var(--eu-border-light)] pt-4">
              <span className="text-[10px] font-semibold tracking-widest text-[var(--eu-gold)] uppercase">
                Address
              </span>
              <p className="mt-1 text-sm font-light leading-relaxed text-[var(--eu-text-muted)]">
                {field("addressFull", "text-sm font-light leading-relaxed text-[var(--eu-text-muted)]", true)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--eu-gold)] bg-[var(--eu-gold)] px-5 py-2.5 text-xs font-bold text-[#1e050b] shadow-md hover:bg-[var(--eu-gold-light)]"
              >
                <span>Google Maps</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--eu-border)] bg-white/5 px-5 py-2.5 text-xs font-semibold text-[var(--eu-text-main)] hover:bg-white/10"
              >
                <span>{copied ? "Copied!" : "Copy Address"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
