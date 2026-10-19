"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  AURELIA_FOOTER_LAYOUTS,
  type AureliaFooterLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: AureliaFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_FOOTER_LAYOUTS, "minimal-bar");

  return (
    <footer className="au-footer" id="footer" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="au-layout-picker"
        />
      ) : null}
      <p>{field("footer", "au-footer-text")}</p>
      <p className="au-footer-tags">{field("craftedBy", "au-footer-tags")}</p>
    </footer>
  );
}
