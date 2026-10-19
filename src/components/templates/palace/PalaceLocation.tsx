"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  PALACE_LOCATION_LAYOUTS,
  type PalaceLocationLayout,
} from "@/components/templates/palace/palace-layouts";

export default function PalaceLocation({
  layout,
  editing,
  mapsUrl,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: PalaceLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, PALACE_LOCATION_LAYOUTS, "card");
  const href = mapsUrl || "#";

  return (
    <section className="pp-venue" id="location" data-layout={activeLayout} aria-label="Venue location">
      {editing ? (
        <LayoutPicker
          options={PALACE_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="pp-layout-picker"
        />
      ) : null}

      <div className="pp-venue-card">
        <p className="pp-kicker">{field("locationEyebrow", "pp-kicker")}</p>
        <h3 className="pp-script pp-venue-name">{field("venueName", "pp-script pp-venue-name")}</h3>
        <div className="pp-venue-addr">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
          <div>{field("addressFull", "pp-venue-addr-text", true)}</div>
        </div>
        <a className="pp-dir-btn" href={href} target="_blank" rel="noopener noreferrer">
          {field("getDirectionsLabel", "pp-dir-btn-label")}
          <span>→</span>
        </a>
        {editing ? (
          <p className="pp-maps-edit">Maps URL: {field("mapsUrl", "pp-maps-field")}</p>
        ) : null}
      </div>
    </section>
  );
}
