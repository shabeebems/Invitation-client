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

/** First line of the description reads as the time ("5:00 pm onwards"); the rest is the note. */
function splitDescription(description: string) {
  const [first = "", ...rest] = (description || "").split("\n");
  return { time: first.trim(), note: rest.join("\n").trim() };
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
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function isEditableTarget(target: EventTarget) {
    return target instanceof HTMLElement && Boolean(target.closest("[contenteditable='true']"));
  }

  function renderDate(item: ProgramItem, index: number, className: string) {
    if (editing) {
      return (
        <EditableField
          value={item.time}
          editable
          maxLength={PROGRAM_ITEM_MAX.time}
          onCommit={(value) => onCommitItem(index, "time", value)}
          className={`${className}-edit`}
        />
      );
    }
    const front = parseFront(item.time);
    return (
      <>
        <span className={`${className}-day`}>{front.day}</span>
        <span className={`${className}-month`}>{front.month}</span>
      </>
    );
  }

  function renderTitle(item: ProgramItem, index: number, className: string) {
    return (
      <h3 className={`rb-mc ${className}`}>
        <EditableField
          value={item.title}
          editable={editing}
          maxLength={PROGRAM_ITEM_MAX.title}
          onCommit={(value) => onCommitItem(index, "title", value)}
          className="rb-mc"
        />
      </h3>
    );
  }

  function renderDetails(item: ProgramItem, index: number, className: string) {
    if (editing) {
      return (
        <p className={`${className}-note`}>
          <EditableField
            value={item.description}
            editable
            multiline
            maxLength={PROGRAM_ITEM_MAX.description}
            onCommit={(value) => onCommitItem(index, "description", value)}
          />
        </p>
      );
    }
    const { time, note } = splitDescription(item.description);
    return (
      <>
        {time ? <p className={`rb-mc ${className}-time`}>{time}</p> : null}
        {note ? <p className={`${className}-note`}>{note}</p> : null}
      </>
    );
  }

  function renderRemove(index: number) {
    if (!editing || cards.length <= 1) return null;
    return (
      <button
        type="button"
        className="rb-remove rb-ev-remove"
        onClick={() => onRemoveItem(index)}
        aria-label={`Remove event ${index + 1}`}
      >
        Remove
      </button>
    );
  }

  return (
    <section className="rb-sec rb-sec-alt" id="events" data-layout={activeLayout} aria-label="Celebrations">
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
        {activeLayout === "flip-cards" ? (
          <Reveal>
            <p className="rb-lead">{field("programIntro", "rb-lead", true)}</p>
          </Reveal>
        ) : null}

        {activeLayout === "flip-cards" ? (
        <div className="rb-evs">
          {cards.map((item, index) => {
            const front = parseFront(item.time);
            const isFlip = Boolean(flipped[index]);
            return (
              <Reveal key={`rb-ev-${index}`} delay={`${index * 0.15}s`}>
                <div
                  role="button"
                  tabIndex={0}
                  className={`rb-fl${isFlip ? " is-flip" : ""}${editing ? " is-editing" : ""}`}
                  onClick={(event) => {
                    if (isEditableTarget(event.target)) return;
                    toggle(index);
                  }}
                  onKeyDown={(event) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggle(index);
                    }
                  }}
                  aria-pressed={isFlip}
                  aria-label={isFlip ? "Show the date side" : "Show the details side"}
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
                    <div className="rb-fl-h">TAP TO FLIP</div>
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
                    {editing ? <div className="rb-fl-h is-back">TAP TO FLIP BACK</div> : null}
                  </div>
                </div>
                {editing ? (
                  <div className="rb-fl-tools">
                    <button
                      type="button"
                      className="rb-remove rb-fl-flip-btn"
                      onClick={() => toggle(index)}
                      aria-label={isFlip ? `Show date side of event ${index + 1}` : `Edit details of event ${index + 1}`}
                    >
                      {isFlip ? "↺ Show front" : "↻ Flip to edit details"}
                    </button>
                    {cards.length > 1 ? (
                      <button
                        type="button"
                        className="rb-remove"
                        onClick={() => onRemoveItem(index)}
                        aria-label={`Remove event ${index + 1}`}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
        ) : null}

        {activeLayout === "timeline-rail" ? (
          <ol className="rb-tl">
            {cards.map((item, index) => (
              <li key={`rb-tl-${index}`} className={`rb-tl-item${index % 2 ? " is-right" : " is-left"}`}>
                <Reveal className="rb-tl-node" delay={`${index * 0.12}s`}>
                  {renderDate(item, index, "rb-tl")}
                </Reveal>
                <Reveal className="rb-tl-card" delay={`${index * 0.12 + 0.08}s`}>
                  <span className="rb-tl-count">{String(index + 1).padStart(2, "0")}</span>
                  {renderTitle(item, index, "rb-tl-title")}
                  {renderDetails(item, index, "rb-tl")}
                  {renderRemove(index)}
                </Reveal>
              </li>
            ))}
          </ol>
        ) : null}

        {activeLayout === "ticket-stubs" ? (
          <div className="rb-tk-grid">
            {cards.map((item, index) => (
              <Reveal key={`rb-tk-${index}`} className="rb-tk" delay={`${(index % 2) * 0.12}s`}>
                <div className="rb-tk-stub">
                  <span className="rb-tk-label">Save the date</span>
                  {renderDate(item, index, "rb-tk")}
                  <span className="rb-tk-no">No. {String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="rb-tk-body">
                  <span className="rb-tk-eyebrow">Admit with love</span>
                  {renderTitle(item, index, "rb-tk-title")}
                  <span className="rb-tk-rule" aria-hidden="true">
                    <i />
                  </span>
                  {renderDetails(item, index, "rb-tk")}
                  {renderRemove(index)}
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {activeLayout === "medallion-row" ? (
          <div className="rb-md-grid">
            {cards.map((item, index) => (
              <Reveal key={`rb-md-${index}`} className="rb-md" delay={`${index * 0.12}s`}>
                <div className="rb-md-coin">
                  {renderDate(item, index, "rb-md")}
                </div>
                {renderTitle(item, index, "rb-md-title")}
                <span className="rb-md-orn" aria-hidden="true">
                  <i />
                </span>
                {renderDetails(item, index, "rb-md")}
                {renderRemove(index)}
              </Reveal>
            ))}
          </div>
        ) : null}

        {activeLayout === "royal-programme" ? (
          <Reveal className="rb-pg">
            <span className="rb-pg-corner is-tl" aria-hidden="true" />
            <span className="rb-pg-corner is-tr" aria-hidden="true" />
            <span className="rb-pg-corner is-bl" aria-hidden="true" />
            <span className="rb-pg-corner is-br" aria-hidden="true" />
            <p className="rb-mc rb-pg-head">Order of celebrations</p>
            <span className="rb-pg-head-rule" aria-hidden="true">
              <i />
            </span>
            <ol className="rb-pg-list">
              {cards.map((item, index) => (
                <li key={`rb-pg-${index}`} className="rb-pg-row">
                  <div className="rb-pg-date">
                    {renderDate(item, index, "rb-pg")}
                  </div>
                  <div className="rb-pg-info">
                    {renderTitle(item, index, "rb-pg-title")}
                    {renderDetails(item, index, "rb-pg")}
                    {renderRemove(index)}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}

        {editing && cards.length < MAX_PROGRAM_ITEMS ? (
          <button type="button" className="rb-add" onClick={onAddItem}>
            Add celebration
          </button>
        ) : null}
      </div>
    </section>
  );
}
