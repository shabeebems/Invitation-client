"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { RubyDiya } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_FOOTER_LAYOUTS,
  type RubyFooterLayout,
} from "@/components/templates/ruby/ruby-layouts";

export default function RubyFooter({
  layout,
  editing,
  field,
  onLayoutChange,
}: {
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyFooterLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_FOOTER_LAYOUTS, "diya-signature");

  return (
    <footer className="rb-footer" id="footer" data-layout={activeLayout} aria-label="Closing">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_FOOTER_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Footer"
          className="rb-layout-picker"
        />
      ) : null}

      <RubyDiya />
      <div className="rb-gv rb-foil rb-footer-names">
        {field("brideName", "rb-gv")}
        <span> &amp; </span>
        {field("groomName", "rb-gv")}
      </div>
      <p className="rb-mc rb-footer-tag">{field("closingPresence", "rb-mc rb-footer-tag")}</p>
      <p className="rb-footer-legal">{field("footer", "rb-footer-legal")}</p>
    </footer>
  );
}
