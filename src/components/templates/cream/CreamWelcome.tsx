"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamOrnament, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_WELCOME_LAYOUTS,
  type CreamWelcomeLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamWelcome({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamWelcomeLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_WELCOME_LAYOUTS, "centered-ornament");

  return (
    <section className="ce-welcome" id="welcome" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_WELCOME_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Welcome"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w">
        <CreamOrnament />
        <Reveal>
          <p className="ce-welcome-big">{field("presenceLine", "ce-welcome-big", true)}</p>
        </Reveal>
        <Reveal>
          <p className="ce-welcome-text">{field("meetCoupleIntro", "ce-welcome-text", true)}</p>
        </Reveal>
      </div>
    </section>
  );
}
