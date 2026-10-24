"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, LeafTwig, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_LOCATION_LAYOUTS,
  type BotanicalLocationLayout,
} from "@/components/templates/botanical/botanical-layouts";

function mapsEmbed(url: string) {
  if (!url) return "";
  const pair = url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=14&output=embed`;
  }
  try {
    const parsed = new URL(url);
    const query = parsed.searchParams.get("q") || parsed.searchParams.get("query") || url;
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
  } catch {
    return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&z=14&output=embed`;
  }
}

function PinGlyph({ className = "bs-loc-glyph" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 21s-7-7.2-7-12a7 7 0 1114 0c0 4.8-7 12-7 12z" strokeLinejoin="round" strokeWidth="1.45" />
      <circle cx="12" cy="9.2" r="2.3" strokeWidth="1.45" />
    </svg>
  );
}

function StayGlyph() {
  return (
    <svg className="bs-loc-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M3.8 11.2 12 5.2l8.2 6" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M6 10.8V18.4h12V10.8" strokeLinejoin="round" strokeWidth="1.45" />
      <path d="M10 18.4v-4.2h4v4.2" strokeWidth="1.45" />
    </svg>
  );
}

function LotusMark() {
  return (
    <svg className="bs-loc-lotus" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M16 26c0 0-7.2-6.4-7.2-12.2C8.8 9.4 12 7.6 16 11.4 20 7.6 23.2 9.4 23.2 13.8 23.2 19.6 16 26 16 26z" strokeLinejoin="round" strokeWidth="1.35" />
      <path d="M16 26c-3.4-5.2-9.6-7.6-10.8-12.8" strokeLinecap="round" strokeWidth="1.35" />
      <path d="M16 26c3.4-5.2 9.6-7.6 10.8-12.8" strokeLinecap="round" strokeWidth="1.35" />
      <path d="M16 26V12.2" strokeLinecap="round" strokeWidth="1.35" />
    </svg>
  );
}

function DocGlyph() {
  return (
    <svg className="bs-loc-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M7 3.6h7.2L19 8.4V20.4H7z" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M14.2 3.6V8.4H19" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M9.4 12.4h5.2M9.4 15.6h5.2" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

function MapArt() {
  return (
    <svg className="bs-map-bg" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect fill="currentColor" className="bs-map-wash" height="560" width="800" />
      <g className="bs-map-streets" fill="none" strokeWidth="10">
        <path d="M0 90 H800" />
        <path d="M0 180 H800" />
        <path d="M0 270 H800" />
        <path d="M0 360 H800" />
        <path d="M0 450 H800" />
        <path d="M90 0 V560" />
        <path d="M220 0 V560" />
        <path d="M360 0 V560" />
        <path d="M500 0 V560" />
        <path d="M640 0 V560" />
        <path d="M740 0 V560" />
      </g>
      <path className="bs-map-water" d="M-20 390 C 140 350, 260 430, 400 390 S 640 330, 820 400" fill="none" strokeWidth="22" />
    </svg>
  );
}

export default function BotanicalLocation({
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
  onLayoutChange?: (layout: BotanicalLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_LOCATION_LAYOUTS, "map-only", {
    "map-rsvp": "map-only",
    map: "map-only",
  });

  const href = mapsUrl || undefined;
  const embed = mapsEmbed(mapsUrl);
  const isCollage = activeLayout !== "map-only";

  function MapScene({ variant }: { variant: "rect" | "circle" }) {
    return (
      <div className={`bs-loc-scene is-${variant}`}>
        <MapArt />
        {embed ? (
          <iframe
            className="bs-loc-embed"
            src={embed}
            title="Venue map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
        ) : null}
        <div className="bs-map-compass" aria-hidden="true">
          <span>N</span>
        </div>
        <a
          className="bs-loc-scene-link"
          href={href || "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          aria-label="Open venue directions"
        >
          <span className="bs-map-pin">
            <PinGlyph className="bs-map-pin-icon" />
            <span className="bs-map-label">{field("venueName", "bs-map-label")}</span>
          </span>
        </a>
      </div>
    );
  }

  function LocCopy({
    mark,
    sprig = false,
    className = "",
  }: {
    mark: "lotus" | "pin";
    sprig?: boolean;
    className?: string;
  }) {
    return (
      <div className={`bs-loc-copy ${className}`.trim()}>
        {sprig ? <LeafTwig className="bs-loc-sprig" /> : null}
        {mark === "lotus" ? <LotusMark /> : <PinGlyph className="bs-loc-mark-pin" />}
        <h3 className="bs-script bs-loc-name">{field("venueName", "bs-script bs-loc-name")}</h3>
        <p className="bs-loc-city">
          <PinGlyph />
          <span>{field("venueCity", "bs-loc-city-text")}</span>
        </p>
        <a
          className="bs-btn-outline bs-loc-dir"
          href={href || "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
        >
          {field("getDirectionsLabel", "bs-loc-dir-label")}
        </a>
        {editing ? (
          <p className="bs-loc-url">
            <DocGlyph />
            <span className="bs-loc-url-label">Maps URL:</span>
            <span className="bs-loc-url-value">{field("mapsUrl", "bs-loc-maps-field")}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section className="bs-location" id="location" data-layout={activeLayout} aria-label="Location">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Location"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-loc-head">
        <Reveal>
          <FlourishRule>
            <h2 className="bs-section-eyebrow">{field("locationTitle", "bs-section-eyebrow")}</h2>
          </FlourishRule>
        </Reveal>
        <p className="bs-loc-lead">{field("locationIntro", "bs-loc-lead", true)}</p>
      </div>

      {activeLayout === "map-only" ? (
        <div className="bs-loc-board">
          <Reveal className="bs-loc-map-col">
            <a
              className="bs-map-card"
              href={href || "#"}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
              aria-label="Open venue directions"
            >
              <MapArt />
              <div className="bs-map-compass" aria-hidden="true">
                <span>N</span>
              </div>
              <div className="bs-map-pin">
                <span className="bs-map-dot" />
                <span className="bs-map-label">{field("venueName", "bs-map-label")}</span>
              </div>
            </a>
          </Reveal>

          <Reveal className="bs-loc-panel">
            <LeafTwig className="bs-loc-sprig" />
            <p className="bs-kicker">{field("locationEyebrow", "bs-kicker")}</p>
            <h3 className="bs-script bs-loc-name">{field("venueName", "bs-script bs-loc-name")}</h3>
            <p className="bs-loc-city">{field("venueCity", "bs-loc-city")}</p>
            <div className="bs-loc-facts">
              <div className="bs-loc-fact">
                <PinGlyph />
                <p className="bs-loc-fact-text">{field("addressFull", "bs-loc-fact-text", true)}</p>
              </div>
              <div className="bs-loc-fact">
                <StayGlyph />
                <p className="bs-loc-fact-text">{field("venueHall", "bs-loc-fact-text")}</p>
              </div>
            </div>
            <a
              className="bs-btn-outline bs-loc-dir"
              href={href || "#"}
              target={href ? "_blank" : undefined}
              rel={href ? "noopener noreferrer" : undefined}
            >
              {field("getDirectionsLabel", "bs-loc-dir-label")}
            </a>
            {editing ? (
              <p className="bs-loc-maps-edit">
                Maps URL: {field("mapsUrl", "bs-loc-maps-field")}
              </p>
            ) : null}
          </Reveal>
        </div>
      ) : null}

      {isCollage ? (
        <Reveal className={activeLayout === "framed-folio" ? "bs-loc-folio" : "bs-loc-pair"}>
          <MapScene variant={activeLayout === "circle-atlas" ? "circle" : "rect"} />
          <LocCopy
            mark={activeLayout === "circle-atlas" ? "pin" : "lotus"}
            sprig={activeLayout === "circle-atlas"}
            className={activeLayout === "open-lotus" ? "is-airy" : ""}
          />
        </Reveal>
      ) : null}
    </section>
  );
}
