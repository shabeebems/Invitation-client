"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { PalaceHeartRule } from "@/components/templates/palace/PalaceDecor";
import {
  PALACE_FOOTER_LAYOUTS,
  type PalaceFooterLayout,
} from "@/components/templates/palace/palace-layouts";

export default function PalaceFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: PalaceFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, PALACE_FOOTER_LAYOUTS, "duet");

  return (
    <footer className="pp-footer" id="footer" data-layout={activeLayout} aria-label="Thank you">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={PALACE_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="pp-layout-picker"
        />
      ) : null}

      <div className="pp-footer-thanks">
        <h3 className="pp-script pp-footer-title">
          {field("closingPresence", "pp-script pp-footer-title")}
        </h3>
        <PalaceHeartRule />
        <p className="pp-footer-copy">{field("closingBlessing", "pp-footer-copy", true)}</p>
        <p className="pp-script pp-footer-names">
          {field("groomName", "pp-script pp-footer-names")}
          <span> & </span>
          {field("brideName", "pp-script pp-footer-names")}
        </p>
        <span className="pp-footer-ornament" aria-hidden="true">
          ❦
        </span>
      </div>

      <div className="pp-footer-bar">
        <p>{field("footer", "pp-footer-legal")}</p>
        <p className="pp-footer-tags">{field("craftedBy", "pp-footer-tags")}</p>
      </div>
    </footer>
  );
}
