"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { EventIcon, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_EVENTS_LAYOUTS,
  type AureliaEventsLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

export default function AureliaEvents({
  items,
  layout,
  editing,
  dateLine,
  venueName,
  venueCity,
  mapsUrl,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
}: {
  items: ProgramItem[];
  layout?: string;
  editing: boolean;
  dateLine: string;
  venueName: string;
  venueCity: string;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: AureliaEventsLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_EVENTS_LAYOUTS, "ivory-cards");
  const cards = items.length
    ? items
    : [
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
      ];

  return (
    <section className="au-sec au-events" id="events" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_EVENTS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Events"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-wrap au-center">
        <Reveal>
          <p className="au-eyebrow">{field("weekday", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">{field("programTitle", "au-h2")}</h2>
        </Reveal>

        <div className="au-cards">
          {cards.map((item, index) => (
            <Reveal key={`au-ev-${index}`} delay={`${index * 0.2}s`} className="au-card">
              <div className="au-card-in">
                <EventIcon kind={index % 2 === 0 ? "ring" : "glass"} />
                <h3>
                  <EditableField
                    value={item.title}
                    editable={editing}
                    maxLength={PROGRAM_ITEM_MAX.title}
                    onCommit={(value) => onCommitItem(index, "title", value)}
                  />
                </h3>
                <p className="au-eyebrow au-card-date">{dateLine}</p>
                <div className="au-card-time">
                  <EditableField
                    value={item.time}
                    editable={editing}
                    maxLength={PROGRAM_ITEM_MAX.time}
                    onCommit={(value) => onCommitItem(index, "time", value)}
                  />
                </div>
                <p>
                  {venueName}
                  <br />
                  {venueCity}
                </p>
                <p className="au-card-desc">
                  <EditableField
                    value={item.description}
                    editable={editing}
                    multiline
                    maxLength={PROGRAM_ITEM_MAX.description}
                    onCommit={(value) => onCommitItem(index, "description", value)}
                  />
                </p>
                <a
                  className="au-btn"
                  href={mapsUrl || "#"}
                  target={mapsUrl ? "_blank" : undefined}
                  rel={mapsUrl ? "noopener noreferrer" : undefined}
                >
                  {field("getDirectionsLabel", "au-btn-label")}
                </a>
                {editing && cards.length > 1 ? (
                  <button type="button" className="au-remove" onClick={() => onRemoveItem(index)}>
                    Remove
                  </button>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>

        {editing && cards.length < MAX_PROGRAM_ITEMS ? (
          <button type="button" className="au-add" onClick={onAddItem}>
            Add event
          </button>
        ) : null}
      </div>
    </section>
  );
}
