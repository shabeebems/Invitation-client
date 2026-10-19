"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_TRAVEL_LAYOUTS,
  type BotanicalTravelLayout,
} from "@/components/templates/botanical/botanical-layouts";

export default function BotanicalTravel({
  editing,
  layout,
  mapsUrl,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: BotanicalTravelLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_TRAVEL_LAYOUTS, "map-rsvp");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="bs-travel" id="travel" data-layout={activeLayout} aria-label="Travel and RSVP">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_TRAVEL_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Travel"
          className="bs-layout-picker"
        />
      ) : null}

      <Reveal>
        <FlourishRule>
          <h2 className="bs-section-eyebrow">{field("locationTitle", "bs-section-eyebrow")}</h2>
        </FlourishRule>
      </Reveal>

      <div className="bs-travel-grid">
        <div className="bs-travel-left">
          <a
            className="bs-map-card"
            href={mapsUrl || "#"}
            target={mapsUrl ? "_blank" : undefined}
            rel={mapsUrl ? "noopener noreferrer" : undefined}
            aria-label="Open venue directions"
          >
            <svg className="bs-map-bg" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,40 Q150,80 300,50 T600,100" fill="none" stroke="#D1C3AD" strokeWidth="8" />
              <path d="M0,120 Q200,90 400,150 T600,60" fill="none" stroke="#C9BBA5" strokeWidth="4" />
              <circle cx="280" cy="90" fill="#DCEDD9" opacity="0.7" r="45" />
              <path d="M220,180 Q320,140 380,190" fill="none" opacity="0.7" stroke="#B8D6E8" strokeWidth="12" />
            </svg>
            <div className="bs-map-compass" aria-hidden="true">
              <span>N</span>
              <svg viewBox="0 0 10 20" fill="currentColor">
                <polygon points="5,0 9,15 5,12 1,15" />
              </svg>
            </div>
            <div className="bs-map-pin">
              <span className="bs-map-dot" />
              <span className="bs-map-label">{field("venueName", "bs-map-label")}</span>
            </div>
          </a>

          <div className="bs-rsvp-card" id="rsvp">
            <div className="bs-rsvp-head">
              <h3 className="bs-rsvp-kicker">{field("rsvpNote", "bs-rsvp-kicker")}</h3>
              <p className="bs-rsvp-hint">{field("locationIntro", "bs-rsvp-hint", true)}</p>
            </div>
            {sent ? (
              <p className="bs-rsvp-thanks">Thank you for your RSVP!</p>
            ) : (
              <form className="bs-rsvp-form" onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="bs-rsvp-name">
                  Your Name
                </label>
                <input
                  id="bs-rsvp-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="bs-rsvp-input"
                  disabled={editing}
                />
                <label className="sr-only" htmlFor="bs-rsvp-attend">
                  Will you attend?
                </label>
                <select id="bs-rsvp-attend" name="attend" className="bs-rsvp-input" disabled={editing} defaultValue="yes">
                  <option value="yes">Will you attend? Yes</option>
                  <option value="no">Regretfully decline</option>
                </select>
                <label className="sr-only" htmlFor="bs-rsvp-guests">
                  Number of Guests
                </label>
                <input
                  id="bs-rsvp-guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={10}
                  placeholder="Number of Guests"
                  className="bs-rsvp-input"
                  disabled={editing}
                />
                <button type="submit" className="bs-btn-solid" disabled={editing}>
                  {field("getDirectionsLabel", "bs-btn-solid-label")}
                </button>
              </form>
            )}
          </div>
        </div>

        <Reveal className="bs-registry-card">
          <div className="bs-registry-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M20 12v10H4V12m16 0H4m16 0a3 3 0 00-3-3m-13 3a3 3 0 013-3m10 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v4m-4-4a2 2 0 00-2 2v4m0 0H4m8 0v10"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <h3 className="bs-registry-title">{field("destinationLabel", "bs-registry-title")}</h3>
          <p className="bs-registry-copy">{field("addressFull", "bs-registry-copy", true)}</p>
          <a className="bs-btn-outline" href={mapsUrl || "#registry"}>
            {field("copyAddressLabel", "bs-btn-outline-label")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
