"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_EVENTS_LAYOUTS,
  type CreamEventsLayout,
} from "@/components/templates/cream/cream-layouts";
import {
  LOCATION_ITEM_MAX,
  MAX_LOCATION_ITEMS,
  MAX_PROGRAM_ITEMS,
  PROGRAM_ITEM_MAX,
} from "@/lib/content-limits";
import type { LocationItem, ProgramItem } from "@/lib/api";

export default function CreamEvents({
  items,
  scheduleItems,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
  onCommitSchedule,
  onAddSchedule,
  onRemoveSchedule,
}: {
  items: ProgramItem[];
  scheduleItems: LocationItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamEventsLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onCommitSchedule: (index: number, key: keyof LocationItem, value: string) => void;
  onAddSchedule: () => void;
  onRemoveSchedule: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_EVENTS_LAYOUTS, "trio-schedule");
  const cards = items.length
    ? items
    : [
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
      ];
  const schedule = scheduleItems.length
    ? scheduleItems
    : [{ label: "", title: "", address: "", mapsUrl: "" }];

  return (
    <section className="ce-events" id="events" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_EVENTS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Events"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w">
        <p className="ce-eyebrow">
          {field("weekday", "ce-eyebrow")}
          {", "}
          {field("day", "ce-eyebrow")} {field("monthYear", "ce-eyebrow")}
        </p>
        <Reveal>
          <h2 className="ce-h2">{field("programTitle", "ce-h2")}</h2>
        </Reveal>

        <div className="ce-ev">
          {cards.map((item, index) => (
            <Reveal key={`ce-ev-${index}`}>
              <article>
                <time>
                  <EditableField
                    value={item.time}
                    editable={editing}
                    maxLength={PROGRAM_ITEM_MAX.time}
                    onCommit={(value) => onCommitItem(index, "time", value)}
                  />
                </time>
                <h3>
                  <EditableField
                    value={item.title}
                    editable={editing}
                    maxLength={PROGRAM_ITEM_MAX.title}
                    onCommit={(value) => onCommitItem(index, "title", value)}
                  />
                </h3>
                <p className="ce-soft">
                  <EditableField
                    value={item.description}
                    editable={editing}
                    multiline
                    maxLength={PROGRAM_ITEM_MAX.description}
                    onCommit={(value) => onCommitItem(index, "description", value)}
                  />
                </p>
                {editing && cards.length > 1 ? (
                  <button type="button" className="ce-remove" onClick={() => onRemoveItem(index)}>
                    Remove
                  </button>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        {editing && cards.length < MAX_PROGRAM_ITEMS ? (
          <button type="button" className="ce-add" onClick={onAddItem}>
            Add event
          </button>
        ) : null}

        <h3 className="ce-sch-title">
          The day, <em>hour by hour</em>
        </h3>
        <ul className="ce-sch">
          {schedule.map((item, index) => (
            <Reveal key={`ce-sch-${index}`}>
              <li>
                <b>
                  <EditableField
                    value={item.label}
                    editable={editing}
                    maxLength={LOCATION_ITEM_MAX.label}
                    onCommit={(value) => onCommitSchedule(index, "label", value)}
                  />
                </b>
                <span>
                  <EditableField
                    value={item.title}
                    editable={editing}
                    maxLength={LOCATION_ITEM_MAX.title}
                    onCommit={(value) => onCommitSchedule(index, "title", value)}
                  />
                </span>
                {editing && schedule.length > 1 ? (
                  <button
                    type="button"
                    className="ce-remove"
                    onClick={() => onRemoveSchedule(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ul>

        {editing && schedule.length < MAX_LOCATION_ITEMS ? (
          <button type="button" className="ce-add" onClick={onAddSchedule}>
            Add schedule row
          </button>
        ) : null}
      </div>
    </section>
  );
}
