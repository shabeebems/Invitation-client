"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFloralSwag, VelvetGoldOrnament } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_FOOTER_LAYOUTS,
  type VelvetFooterLayout,
} from "@/components/templates/velvet/velvet-layouts";

export default function VelvetFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: VelvetFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, VELVET_FOOTER_LAYOUTS, "signature");

  return (
    <footer className="vh-footer" id="footer" data-layout={activeLayout}>
      <VelvetFloralSwag className="vh-footer-floral-bl" />
      <VelvetFloralSwag className="vh-footer-floral-br" />

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={VELVET_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="vh-layout-picker is-dark"
        />
      ) : null}

      <Reveal>
        <h2 className="vh-script vh-footer-title">
          {field("closingPresence", "vh-script vh-footer-title")}
        </h2>
      </Reveal>
      <Reveal>
        <VelvetGoldOrnament />
      </Reveal>
      <Reveal>
        <p className="vh-footer-copy">{field("closingBlessing", "vh-footer-copy", true)}</p>
      </Reveal>
      <Reveal className="vh-footer-signature">
        <div className="vh-cap-title vh-footer-with-love">With love,</div>
        <div className="vh-script vh-footer-names">
          {field("groomName", "vh-script vh-footer-names")}
          <span> & </span>
          {field("brideName", "vh-script vh-footer-names")}
        </div>
      </Reveal>
      <Reveal>
        <p className="vh-cap-title vh-footer-legal">{field("footer", "vh-cap-title vh-footer-legal")}</p>
      </Reveal>
    </footer>
  );
}
