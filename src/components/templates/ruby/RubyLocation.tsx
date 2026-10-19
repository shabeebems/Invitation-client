"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_LOCATION_LAYOUTS,
  type RubyLocationLayout,
} from "@/components/templates/ruby/ruby-layouts";

export default function RubyLocation({
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
  onLayoutChange?: (layout: RubyLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_LOCATION_LAYOUTS, "centered-venue");

  return (
    <section
      className="rb-sec rb-sec-alt"
      id="location"
      data-layout={activeLayout}
      aria-label="Venue"
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap">
        <SectionTitle>{field("locationTitle", "rb-h2 rb-mc")}</SectionTitle>
        <Reveal>
          <p className="rb-gv rb-venue-name">{field("venueName", "rb-gv rb-venue-name")}</p>
        </Reveal>
        <Reveal>
          <p className="rb-lead rb-venue-addr">{field("addressFull", "rb-lead", true)}</p>
        </Reveal>
        <Reveal>
          <a
            className="rb-btn"
            href={mapsUrl || "#"}
            target={mapsUrl ? "_blank" : undefined}
            rel={mapsUrl ? "noopener noreferrer" : undefined}
          >
            {field("getDirectionsLabel", "rb-btn-label")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
