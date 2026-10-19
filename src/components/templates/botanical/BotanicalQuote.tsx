"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { HeartMark } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_QUOTE_LAYOUTS,
  type BotanicalQuoteLayout,
} from "@/components/templates/botanical/botanical-layouts";

export default function BotanicalQuote({
  editing,
  layout,
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: BotanicalQuoteLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_QUOTE_LAYOUTS, "burgundy-banner");

  return (
    <section className="bs-quote" data-layout={activeLayout} aria-label="Wedding quote">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_QUOTE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Quote"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-quote-banner">
        <span className="bs-quote-filigree left" aria-hidden="true" />
        <span className="bs-quote-filigree right" aria-hidden="true" />
        <blockquote className="bs-quote-text">{field("blessing", "bs-quote-text", true)}</blockquote>
        <div className="bs-quote-heart">
          <HeartMark className="bs-heart" />
        </div>
      </div>
    </section>
  );
}
