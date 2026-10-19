"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_BLESSINGS_LAYOUTS,
  type RubyBlessingsLayout,
} from "@/components/templates/ruby/ruby-layouts";

export default function RubyBlessings({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyBlessingsLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_BLESSINGS_LAYOUTS, "dual-folio");

  return (
    <section className="rb-sec" id="blessings" data-layout={activeLayout} aria-label="With blessings">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_BLESSINGS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Blessings"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap">
        <SectionTitle>{field("meetCoupleTitle", "rb-h2 rb-mc")}</SectionTitle>
        <Reveal>
          <p className="rb-lead">{field("meetCoupleIntro", "rb-lead", true)}</p>
        </Reveal>
        <div className="rb-fam">
          <Reveal className="rb-fc">
            <small>{field("brideParentsLabel", "rb-fc-label")}</small>
            <h3 className="rb-gv rb-fc-name">{field("brideParents", "rb-gv rb-fc-name")}</h3>
            <p className="rb-fc-note">{field("brideDetail", "rb-fc-note", true)}</p>
          </Reveal>
          <Reveal className="rb-fc" delay="0.15s">
            <small>{field("groomLabel", "rb-fc-label")}</small>
            <h3 className="rb-gv rb-fc-name">{field("hostNames", "rb-gv rb-fc-name")}</h3>
            <p className="rb-fc-note">{field("groomDetail", "rb-fc-note", true)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
