"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamOrnament, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_FINAL_LAYOUTS,
  type CreamFinalLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamFinal({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamFinalLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_FINAL_LAYOUTS, "sage-close");

  return (
    <section className="ce-end" id="end" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_FINAL_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Closing"
          className="ce-layout-picker"
        />
      ) : null}

      <div>
        <CreamOrnament />
        <Reveal>
          <h2 className="ce-h2">{field("closingBlessing", "ce-h2", true)}</h2>
        </Reveal>
        <Reveal>
          <p className="ce-end-msg">{field("closingPresence", "ce-end-msg", true)}</p>
        </Reveal>
        <Reveal>
          <a className="ce-btn" href="#hero">
            {field("replayLabel", "ce-btn-label")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
