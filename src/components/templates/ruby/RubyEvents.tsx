"use client";

import { useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_EVENTS_LAYOUTS,
  type RubyEventsLayout,
} from "@/components/templates/ruby/ruby-layouts";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

/** Split "14|FEBRUARY" style day/month from time field when formatted as "DAY|MONTH". */
function parseFront(time: string) {
  const parts = (time || "").split("|");
  if (parts.length >= 2) {
    return { day: parts[0].trim(), month: parts[1].trim() };
  }
  return { day: time.slice(0, 2) || "—", month: time.slice(2).trim() || "" };
}

export default function RubyEvents({
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
  onLayoutChange?: (layout: RubyEventsLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_EVENTS_LAYOUTS, "flip-cards");
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const cards = items.length
    ? items
    : [
        { time: "13|FEBRUARY", title: "Mehendi & Sangeet", description: "" },
        { time: "14|FEBRUARY", title: "The Wedding", description: "" },
        { time: "14|FEBRUARY", title: "Reception", description: "" },
      ];

  function toggle(index: number) {
    if (editing) return;
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  return (
    <section className="rb-sec" id="events" data-layout={activeLayout} aria-label="Celebrations">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_EVENTS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Events"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap">
        <SectionTitle>{field("programTitle", "rb-h2 rb-mc")}</SectionTitle>
        <Reveal>
          <p className="rb-lead">{field("programIntro", "rb-lead", true)}</p>
        </Reveal>

        <div className="rb-evs">
          {cards.map((item, index) => {
            const front = parseFront(item.time);
            const isFlip = Boolean(flipped[index]);
            return (
              <Reveal key={`rb-ev-${index}`} delay={`${index * 0.15}s`}>
                <button
                  type="button"
                  className={`rb-fl${isFlip ? " is-flip" : ""}`}
                  onClick={() => toggle(index)}
                  aria-pressed={isFlip}
                >
                  <div className="rb-fl-f">
                    {editing ? (
                      <EditableField
                        value={item.time}
                        editable
                        maxLength={PROGRAM_ITEM_MAX.time}
                        onCommit={(value) => onCommitItem(index, "time", value)}
                        className="rb-fl-time-edit"
                      />
                    ) : (
                      <>
                        <div className="rb-fl-n">{front.day}</div>
                        <div className="rb-fl-m">{front.month}</div>
                      </>
                    )}
                    <h3 className="rb-mc">
                      <EditableField
                        value={item.title}
                        editable={editing}
                        maxLength={PROGRAM_ITEM_MAX.title}
                        onCommit={(value) => onCommitItem(index, "title", value)}
                        className="rb-mc"
                      />
                    </h3>
                    {!editing ? <div className="rb-fl-h">TAP TO FLIP</div> : null}
                  </div>
                  <div className="rb-fl-k">
                    <h3 className="rb-mc">
                      <EditableField
                        value={item.title}
                        editable={editing}
                        maxLength={PROGRAM_ITEM_MAX.title}
                        onCommit={(value) => onCommitItem(index, "title", value)}
                        className="rb-mc"
                      />
                    </h3>
                    <p>
                      <EditableField
                        value={item.description}
                        editable={editing}
                        multiline
                        maxLength={PROGRAM_ITEM_MAX.description}
                        onCommit={(value) => onCommitItem(index, "description", value)}
                      />
                    </p>
                  </div>
                </button>
                {editing && cards.length > 1 ? (
                  <button
                    type="button"
                    className="rb-remove"
                    onClick={() => onRemoveItem(index)}
                    aria-label={`Remove event ${index + 1}`}
                  >
                    Remove
                  </button>
                ) : null}
              </Reveal>
            );
          })}
        </div>

        {editing && cards.length < MAX_PROGRAM_ITEMS ? (
          <button type="button" className="rb-add" onClick={onAddItem}>
            Add celebration
          </button>
        ) : null}
      </div>
    </section>
  );
}
