"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_DRESS_LAYOUTS,
  type AureliaDressLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

const SWATCHES = ["#0b1226", "#f5efe4", "#c9a29b", "#dcc9a6"];

export default function AureliaDress({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: AureliaDressLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_DRESS_LAYOUTS, "palette-swatches");

  return (
    <section className="au-sec au-dress" id="dress" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_DRESS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Dress"
          className="au-layout-picker"
        />
      ) : null}

      <Reveal>
        <p className="au-eyebrow">{field("venueLabel", "au-eyebrow")}</p>
      </Reveal>
      <Reveal>
        <h2 className="au-h2">{field("dressCode", "au-h2")}</h2>
      </Reveal>
      <Reveal>
        <p className="au-dress-note">{field("storyText", "au-dress-note", true)}</p>
      </Reveal>
      <Reveal>
        <div className="au-sw" aria-hidden="true">
          {SWATCHES.map((color) => (
            <i key={color} style={{ background: color }} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
