"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaMap, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_LOCATION_LAYOUTS,
  type AureliaLocationLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaLocation({
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
  onLayoutChange?: (layout: AureliaLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_LOCATION_LAYOUTS, "stylized-map");

  return (
    <section className="au-sec au-location" id="location" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-wrap au-center">
        <Reveal>
          <p className="au-eyebrow">{field("locationTitle", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">{field("venueName", "au-h2")}</h2>
        </Reveal>
        <Reveal>
          <p className="au-venue-place">{field("venueCity", "au-venue-place")}</p>
        </Reveal>
        <Reveal className="au-venue-frame">
          <AureliaMap />
        </Reveal>
        <Reveal>
          <a
            className="au-btn"
            href={mapsUrl || "#"}
            target={mapsUrl ? "_blank" : undefined}
            rel={mapsUrl ? "noopener noreferrer" : undefined}
          >
            {field("getDirectionsLabel", "au-btn-label")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
