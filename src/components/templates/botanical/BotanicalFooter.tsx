"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { HeartMark } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_FOOTER_LAYOUTS,
  type BotanicalFooterLayout,
} from "@/components/templates/botanical/botanical-layouts";

export default function BotanicalFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: BotanicalFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_FOOTER_LAYOUTS, "grove");

  return (
    <footer className="bs-footer" id="footer" data-layout={activeLayout} aria-label="Thank you">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="bs-layout-picker"
        />
      ) : null}

      <svg className="bs-footer-sprig left" viewBox="0 0 100 150" fill="currentColor" aria-hidden="true">
        <path d="M10,140 Q30,80 80,40" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="30" cy="95" rx="14" ry="7" transform="rotate(-30 30 95)" />
        <ellipse cx="60" cy="65" rx="14" ry="7" transform="rotate(-30 60 65)" />
        <ellipse cx="80" cy="40" rx="10" ry="5" transform="rotate(-30 80 40)" />
      </svg>
      <svg className="bs-footer-sprig right" viewBox="0 0 100 150" fill="currentColor" aria-hidden="true">
        <path d="M90,140 Q70,80 20,40" fill="none" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="70" cy="95" rx="14" ry="7" transform="rotate(30 70 95)" />
        <ellipse cx="40" cy="65" rx="14" ry="7" transform="rotate(30 40 65)" />
        <ellipse cx="20" cy="40" rx="10" ry="5" transform="rotate(30 20 40)" />
      </svg>

      <div className="bs-footer-inner">
        <h2 className="bs-script bs-footer-thanks">
          {field("closingPresence", "bs-script bs-footer-thanks")}
        </h2>
        <p className="bs-footer-copy">{field("footer", "bs-footer-copy", true)}</p>
        <div className="bs-footer-heart">
          <HeartMark className="bs-heart-sm" />
        </div>
        <p className="bs-script bs-footer-names">
          {field("groomName", "bs-script bs-footer-names")}
          <span> & </span>
          {field("brideName", "bs-script bs-footer-names")}
        </p>
        <p className="bs-footer-tags">{field("craftedBy", "bs-footer-tags")}</p>
      </div>
    </footer>
  );
}
