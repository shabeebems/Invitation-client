"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  CREAM_FOOTER_LAYOUTS,
  type CreamFooterLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_FOOTER_LAYOUTS, "minimal");

  return (
    <footer className="ce-footer" id="footer" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="ce-layout-picker"
        />
      ) : null}
      <p>{field("footer", "ce-footer-text")}</p>
    </footer>
  );
}
