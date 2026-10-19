"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_DRESS_LAYOUTS,
  type CreamDressLayout,
} from "@/components/templates/cream/cream-layouts";

const SWATCHES: { name: string; color: string }[] = [
  { name: "Ivory", color: "#FBF7F0" },
  { name: "Sage", color: "#A8AE96" },
  { name: "Dusty rose", color: "#D8B8AD" },
  { name: "Champagne", color: "#C6A779" },
  { name: "Cocoa", color: "#7a5f4c" },
];

export default function CreamDress({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamDressLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_DRESS_LAYOUTS, "two-column");

  return (
    <section className="ce-dress" id="dress" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_DRESS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Dress & Travel"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w ce-two">
        <div>
          <p className="ce-eyebrow">{field("venueLabel", "ce-eyebrow")}</p>
          <Reveal>
            <h2 className="ce-h2">{field("dressCode", "ce-h2")}</h2>
          </Reveal>
          <Reveal>
            <p className="ce-soft ce-dress-note">{field("storyText", "ce-soft", true)}</p>
          </Reveal>
          <Reveal>
            <div className="ce-sw" aria-hidden="true">
              {SWATCHES.map((swatch) => (
                <div key={swatch.color}>
                  <i style={{ background: swatch.color }} />
                  {swatch.name}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <p className="ce-eyebrow">{field("locationEyebrow", "ce-eyebrow")}</p>
          <Reveal>
            <h2 className="ce-h2 ce-h2-sm">
              Getting <em>here</em>
            </h2>
          </Reveal>
          <div className="ce-tr">
            <div>
              <h3>{field("amenityOneLabel", "ce-tr-label")}</h3>
              <p className="ce-soft">{field("amenityOneDetail", "ce-soft", true)}</p>
            </div>
            <div>
              <h3>{field("amenityTwoLabel", "ce-tr-label")}</h3>
              <p className="ce-soft">{field("amenityTwoDetail", "ce-soft", true)}</p>
            </div>
            <div>
              <h3>{field("destinationLabel", "ce-tr-label")}</h3>
              <p className="ce-soft">{field("addressShort", "ce-soft", true)}</p>
            </div>
            <div>
              <h3>{field("amenityThreeDetail", "ce-tr-label")}</h3>
              <p className="ce-soft">{field("copyAddressLabel", "ce-soft", true)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
