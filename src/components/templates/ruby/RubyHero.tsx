"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { RubyMandala } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_HERO_LAYOUTS,
  type RubyHeroLayout,
} from "@/components/templates/ruby/ruby-layouts";

export default function RubyHero({
  editing,
  layout,
  ready,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  ready: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyHeroLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_HERO_LAYOUTS, "mandala-foil");

  return (
    <header
      className={`rb-hero${ready ? " is-ready" : ""}`}
      id="home"
      data-layout={activeLayout}
      aria-label="Wedding couple"
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="rb-layout-picker"
        />
      ) : null}

      <RubyMandala />

      <div className="rb-hero-inner">
        <div className="rb-tg">{field("introLine", "rb-tg")}</div>
        <h1 className="rb-nm rb-gv rb-foil">
          <span className="rb-s1">{field("brideName", "rb-nm-name")}</span>
          <span className="rb-s2 rb-am">&amp;</span>
          <span className="rb-s3">{field("groomName", "rb-nm-name")}</span>
        </h1>
        <div className="rb-dt rb-mc">
          {field("day", "rb-dt")} · {field("monthYear", "rb-dt")}
        </div>
        <div className="rb-pl2">{field("venueCity", "rb-pl2")}</div>
      </div>
      <div className="rb-cue" aria-hidden="true" />
    </header>
  );
}
