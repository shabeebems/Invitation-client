"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_EVENTS_LAYOUTS,
  type BotanicalEventsLayout,
} from "@/components/templates/botanical/botanical-layouts";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

function EventIcon({ index }: { index: number }) {
  const kind = index % 3;
  if (kind === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M7 11.5V14m10-2.5V14M12 9v5m-4.5 3a4.5 4.5 0 009 0V8a2.5 2.5 0 00-5 0v3a1 1 0 01-2 0V5.5A2.5 2.5 0 007 8v6.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M9 19V6l12-3v13M9 19c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3c.4 0 .778.079 1.125.222M21 16c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3c.4 0 .778.079 1.125.222M9 10l12-3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.4"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="9" cy="12" r="5" strokeWidth="1.4" />
      <circle cx="15" cy="12" r="5" strokeWidth="1.4" />
      <path d="M11 7l1-2 1 2" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

function TimeGlyph() {
  return (
    <svg className="bs-event-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect height="18" rx="2" strokeWidth="1.6" width="18" x="3" y="4" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.6" />
    </svg>
  );
}

function PlaceGlyph() {
  return (
    <svg className="bs-event-glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" strokeWidth="1.6" />
      <circle cx="12" cy="10" r="2.4" strokeWidth="1.6" />
    </svg>
  );
}

export default function BotanicalEvents({
  items,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
}: {
  items: ProgramItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: BotanicalEventsLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_EVENTS_LAYOUTS, "trio-cards");
  const cards = items.length
    ? items
    : [
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
      ];

  return (
    <section className="bs-events" id="events" data-layout={activeLayout} aria-label="Wedding events">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_EVENTS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Events"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-events-head">
        <Reveal>
          <FlourishRule>
            <h2 className="bs-section-eyebrow">{field("programEyebrow", "bs-section-eyebrow")}</h2>
          </FlourishRule>
        </Reveal>
        <p className="bs-events-lead">{field("programIntro", "bs-events-lead", true)}</p>
      </div>

      <div className="bs-events-grid">
        {cards.map((item, index) => (
          <Reveal key={`bs-event-${index}`} className="bs-event-card" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="bs-event-icon">
              <EventIcon index={index} />
            </div>
            <h3 className="bs-event-title">
              <EditableField
                value={item.title || ""}
                editable={editing}
                maxLength={PROGRAM_ITEM_MAX.title}
                onCommit={(value) => onCommitItem(index, "title", value)}
                className="bs-event-field"
              />
            </h3>
            <p className="bs-event-time">
              <TimeGlyph />
              <EditableField
                value={item.time || ""}
                editable={editing}
                maxLength={PROGRAM_ITEM_MAX.time}
                onCommit={(value) => onCommitItem(index, "time", value)}
                className="bs-event-field"
              />
            </p>
            <p className="bs-event-place">
              <PlaceGlyph />
              <EditableField
                value={item.description || ""}
                editable={editing}
                multiline
                maxLength={PROGRAM_ITEM_MAX.description}
                onCommit={(value) => onCommitItem(index, "description", value)}
                className="bs-event-field"
              />
            </p>
            <span className="bs-event-more">View details</span>
            {editing && cards.length > 1 ? (
              <button
                type="button"
                className="bs-item-remove"
                onClick={() => onRemoveItem(index)}
                aria-label={`Remove event ${index + 1}`}
              >
                ×
              </button>
            ) : null}
          </Reveal>
        ))}
      </div>

      {editing && cards.length < MAX_PROGRAM_ITEMS ? (
        <button type="button" className="bs-add-btn" onClick={onAddItem}>
          Add event
        </button>
      ) : null}
    </section>
  );
}
