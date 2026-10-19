"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFoliage } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_LOCATION_LAYOUTS,
  type VelvetLocationLayout,
} from "@/components/templates/velvet/velvet-layouts";

function VenueMap({ venueName }: { venueName: string }) {
  return (
    <svg className="vh-venue-map-svg" viewBox="0 0 420 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="vhMapCream" cx="0.5" cy="0.4" r="0.9">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7EBDC" />
        </radialGradient>
      </defs>
      <rect width="420" height="220" fill="url(#vhMapCream)" />
      <path
        d="M 0 0 C 60 40 45 110 70 160 C 85 190 60 210 65 220 L 0 220 Z"
        fill="#E4F0F5"
        opacity="0.95"
      />
      <path
        d="M 70 0 C 60 40 45 110 70 160 C 85 190 60 210 65 220"
        fill="none"
        stroke="#B8D7E3"
        strokeWidth="2"
      />
      <text
        x="24"
        y="115"
        fill="#759BA8"
        fontFamily="Cinzel, Georgia, serif"
        fontSize="9"
        letterSpacing="2"
      >
        ARABIAN SEA
      </text>
      <g fill="#EFE5D5" opacity="0.75">
        <rect x="95" y="15" width="85" height="42" rx="4" />
        <rect x="200" y="20" width="105" height="38" rx="4" />
        <rect x="325" y="25" width="75" height="45" rx="4" />
        <rect x="100" y="80" width="60" height="55" rx="4" />
        <rect x="290" y="85" width="110" height="45" rx="4" />
        <rect x="110" y="155" width="95" height="50" rx="4" />
        <rect x="225" y="150" width="85" height="55" rx="4" />
      </g>
      <g fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="10">
        <path d="M 70 40 L 420 40" />
        <path d="M 70 120 L 420 120" />
        <path d="M 90 200 L 420 200" />
        <path d="M 180 0 L 180 220" />
        <path d="M 280 0 L 280 220" />
      </g>
      <g fill="none" stroke="#DFC8A6" strokeLinecap="round" strokeWidth="2.5">
        <path d="M 70 40 L 420 40" />
        <path d="M 70 120 L 420 120" />
        <path d="M 90 200 L 420 200" />
        <path d="M 180 0 L 180 220" />
        <path d="M 280 0 L 280 220" />
      </g>
      <circle cx="230" cy="100" r="14" fill="#C29653" opacity="0.25" />
      <ellipse cx="230" cy="116" rx="10" ry="3.5" fill="#430B0B" opacity="0.2" />
      <path
        d="M 230 72 C 219 72 210 81 210 92 C 210 106 230 118 230 118 C 230 118 250 106 250 92 C 250 81 241 72 230 72 Z"
        fill="#8C1A22"
        stroke="#C29653"
        strokeWidth="1.8"
      />
      <circle cx="230" cy="91" r="5" fill="#FFF2DF" />
      <rect
        x="155"
        y="128"
        width="150"
        height="26"
        rx="13"
        fill="#FFFFFF"
        stroke="#C29653"
        strokeWidth="1.2"
      />
      <text
        x="230"
        y="145"
        textAnchor="middle"
        fill="#430B0B"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize="11"
        fontWeight="700"
      >
        {(venueName || "Venue").slice(0, 28)}
      </text>
    </svg>
  );
}

export default function VelvetLocation({
  layout,
  editing,
  venueName,
  mapsUrl,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  venueName: string;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: VelvetLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, VELVET_LOCATION_LAYOUTS, "atlas");
  const href = mapsUrl || "#";

  return (
    <section className="vh-venue" id="location" data-layout={activeLayout}>
      <VelvetFoliage className="foliage-tl" />
      <VelvetFoliage className="foliage-tr" />
      <VelvetFoliage className="foliage-bl" />
      <VelvetFoliage className="foliage-br" />

      {editing ? (
        <LayoutPicker
          options={VELVET_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="vh-layout-picker"
        />
      ) : null}

      <div className="vh-venue-inner">
        <Reveal className="vh-venue-info">
          <span className="vh-cap-title vh-venue-eyebrow">
            {field("locationEyebrow", "vh-cap-title vh-venue-eyebrow")}
          </span>
          <h3 className="vh-script vh-venue-name">{field("venueName", "vh-script vh-venue-name")}</h3>
          <div className="vh-venue-addr">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>{field("addressFull", "vh-venue-addr-text", true)}</span>
          </div>
          <a
            className="vh-venue-dir-btn vh-cap-title"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {field("getDirectionsLabel", "vh-cap-title")}
          </a>
          {editing ? (
            <p className="vh-venue-maps-edit">
              Maps URL: {field("mapsUrl", "vh-venue-maps-field")}
            </p>
          ) : null}
        </Reveal>

        <Reveal className="vh-venue-map-panel">
          <VenueMap venueName={venueName} />
        </Reveal>

        <Reveal className="vh-amenity-card">
          <div className="vh-amenity-row">
            <div className="vh-amenity-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 20V8l9-5 9 5v12M9 20v-6h6v6" />
              </svg>
            </div>
            <div>
              <strong>{field("amenityOneLabel")}</strong>
              <small>{field("amenityOneDetail")}</small>
            </div>
          </div>
          <div className="vh-amenity-row">
            <div className="vh-amenity-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect height="18" rx="3" width="16" x="4" y="3" />
                <path d="M9 17V7h4.5a3 3 0 010 6H9" />
              </svg>
            </div>
            <div>
              <strong>{field("amenityTwoLabel")}</strong>
              <small>{field("amenityTwoDetail")}</small>
            </div>
          </div>
          <div className="vh-amenity-row">
            <div className="vh-amenity-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect height="13" rx="3" width="16" x="4" y="4" />
                <path d="M4 11h16M7 21l1-4M17 21l-1-4" />
              </svg>
            </div>
            <div>
              <strong>{field("amenityThreeLabel")}</strong>
              <small>{field("amenityThreeDetail")}</small>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
