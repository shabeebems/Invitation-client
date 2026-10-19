"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_ITINERARY_LAYOUTS,
  type BotanicalItineraryLayout,
} from "@/components/templates/botanical/botanical-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

function ItineraryIcon({ index }: { index: number }) {
  const kind = index % 3;
  if (kind === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M12 13v8m-4 0h8M7 3h10l-2 9H9L7 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M4 8l8-4 8 4-8 4-8-4zm0 6l8 4 8-4M4 8v6m16-6v6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M5 13l1.5-5h11L19 13M5 13a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4zm-14 2h14M7 8h10"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function BotanicalItinerary({
  items,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
}: {
  items: LoveStoryItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: BotanicalItineraryLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_ITINERARY_LAYOUTS, "rail-three");
  const stops = items.length
    ? items
    : [
        { icon: "", title: "", date: "", place: "", url: "", publicId: "" },
        { icon: "", title: "", date: "", place: "", url: "", publicId: "" },
        { icon: "", title: "", date: "", place: "", url: "", publicId: "" },
      ];

  return (
    <section className="bs-itinerary" data-layout={activeLayout} aria-label="Weekend itinerary">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_ITINERARY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Itinerary"
          className="bs-layout-picker"
        />
      ) : null}

      <Reveal>
        <FlourishRule>
          <h2 className="bs-section-eyebrow">{field("loveStoryTitle", "bs-section-eyebrow")}</h2>
        </FlourishRule>
      </Reveal>

      <div className="bs-itinerary-rail">
        <div className="bs-itinerary-line" aria-hidden="true" />
        <div className="bs-itinerary-grid">
          {stops.map((item, index) => (
            <Reveal key={`bs-itin-${index}`} className="bs-itin-stop">
              <div className="bs-itin-icon">
                <ItineraryIcon index={index} />
              </div>
              <h3 className="bs-itin-title">
                <EditableField
                  value={item.title || ""}
                  editable={editing}
                  maxLength={LOVE_STORY_ITEM_MAX.title}
                  onCommit={(value) => onCommitItem(index, "title", value)}
                  className="bs-itin-title"
                />
              </h3>
              <p className="bs-itin-date">
                <EditableField
                  value={item.date || ""}
                  editable={editing}
                  maxLength={LOVE_STORY_ITEM_MAX.date}
                  onCommit={(value) => onCommitItem(index, "date", value)}
                  className="bs-itin-date"
                />
              </p>
              <p className="bs-itin-place">
                <EditableField
                  value={item.place || ""}
                  editable={editing}
                  maxLength={LOVE_STORY_ITEM_MAX.place}
                  onCommit={(value) => onCommitItem(index, "place", value)}
                  className="bs-itin-place"
                />
              </p>
              {editing && stops.length > 1 ? (
                <button
                  type="button"
                  className="bs-item-remove"
                  onClick={() => onRemoveItem(index)}
                  aria-label={`Remove itinerary stop ${index + 1}`}
                >
                  ×
                </button>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>

      {editing && stops.length < MAX_LOVE_STORY_ITEMS ? (
        <button type="button" className="bs-add-btn" onClick={onAddItem}>
          Add itinerary stop
        </button>
      ) : null}
    </section>
  );
}
