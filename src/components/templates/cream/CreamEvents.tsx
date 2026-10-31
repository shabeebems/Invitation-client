"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, DiamondRule, Reveal } from "@/components/templates/cream/CreamDecor";
import { CreamBlossomTwig, CreamLeafSprig } from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_EVENTS_LAYOUTS,
  type CreamEventsLayout,
} from "@/components/templates/cream/cream-layouts";
import { MAX_PROGRAM_ITEMS, PROGRAM_ITEM_MAX } from "@/lib/content-limits";
import type { ProgramItem } from "@/lib/api";

type EventIcon = "rings" | "glass" | "dining" | "music" | "heart";

const ICON_ORDER: EventIcon[] = ["rings", "glass", "dining", "music", "heart"];

const PLACEHOLDERS: [string, string][] = [
  ["#E8D9BF", "#A8AE96"],
  ["#EFD9C8", "#C6A779"],
  ["#D8B8AD", "#8b6f5e"],
];

const ICON_RULES: [EventIcon, RegExp][] = [
  ["rings", /\b(ceremon\w*|vows?|wedding|nikah|muhurt\w*|rings?|i do)\b/],
  ["glass", /\b(cocktails?|drinks?|aperitiv\w*|champagne|spritz|bar)\b/],
  ["dining", /\b(dinner|dining|lunch|breakfast|brunch|feast|meal|reception|banquet)\b/],
  ["music", /\b(music|band|danc\w*|sangeet|party|dj)\b/],
];

function matchIcon(text: string): EventIcon | null {
  const value = text.toLowerCase();
  return ICON_RULES.find(([, rule]) => rule.test(value))?.[0] || null;
}

/** Picks an icon from the event title, then its description, then its position. */
function iconFor(item: ProgramItem, index: number): EventIcon {
  return matchIcon(item.title) || matchIcon(item.description) || ICON_ORDER[index % ICON_ORDER.length];
}

function EventGlyph({ icon }: { icon: EventIcon }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {icon === "rings" ? (
          <>
            <circle cx="12.4" cy="19" r="6.6" />
            <circle cx="19.6" cy="19" r="6.6" />
            <path d="M12.4 7.2l2 2.4-2 2.2-2-2.2z" />
          </>
        ) : null}
        {icon === "glass" ? (
          <>
            <path d="M8 7h16l-8 10z" />
            <path d="M16 17v9M11.5 26h9" />
            <path d="M18.6 6l3.6-2.6" />
            <circle cx="19.2" cy="10.2" r="1.1" />
          </>
        ) : null}
        {icon === "dining" ? (
          <>
            <path d="M9 5v6.4c0 1.8 1.2 3 2.6 3s2.6-1.2 2.6-3V5M11.6 5v22" />
            <path d="M21.6 27V5c2.8 1.8 3.8 5.4 3.4 11h-3.4" />
          </>
        ) : null}
        {icon === "music" ? (
          <>
            <path d="M13 22.5V8.6l11-2.4v13.6" />
            <circle cx="10.4" cy="22.8" r="2.6" />
            <circle cx="21.4" cy="20" r="2.6" />
          </>
        ) : null}
        {icon === "heart" ? (
          <path d="M16 26s-9-5.6-9-12a4.8 4.8 0 0 1 9-2.4A4.8 4.8 0 0 1 25 14c0 6.4-9 12-9 12z" />
        ) : null}
      </g>
    </svg>
  );
}

export default function CreamEvents({
  items,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
  onChangeImage,
}: {
  items: ProgramItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamEventsLayout) => void;
  onCommitItem: (index: number, key: keyof ProgramItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage?: (index: number, file: File) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_EVENTS_LAYOUTS, "trio-schedule");
  const fileRef = useRef<HTMLInputElement>(null);
  const targetIndex = useRef(-1);
  const cards: ProgramItem[] = items.length
    ? items
    : [
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
        { time: "", title: "", description: "" },
      ];
  const canRemove = editing && cards.length > 1;
  const cols = Math.min(Math.max(cards.length, 1), 4);

  function pickImage(index: number) {
    if (!editing || !onChangeImage || !items[index]) return;
    targetIndex.current = index;
    fileRef.current?.click();
  }

  function renderEyebrow(center = false) {
    return (
      <p className={`ce-ex-eyebrow${center ? " is-center" : ""}`}>
        {field("weekday")}
        {", "}
        {field("day")} {field("monthYear")}
      </p>
    );
  }

  function renderTitle(className = "") {
    return <h2 className={`ce-ex-title ${className}`.trim()}>{field("programTitle")}</h2>;
  }

  function renderIcon(item: ProgramItem, index: number, className = "") {
    return (
      <span className={`ce-ex-icon ${className}`.trim()} aria-hidden="true">
        <EventGlyph icon={iconFor(item, index)} />
      </span>
    );
  }

  function renderText(item: ProgramItem, index: number) {
    return (
      <>
        <p className="ce-ex-time">
          <EditableField
            value={item.time}
            editable={editing}
            maxLength={PROGRAM_ITEM_MAX.time}
            onCommit={(value) => onCommitItem(index, "time", value)}
          />
        </p>
        <h3 className="ce-ex-name">
          <EditableField
            value={item.title}
            editable={editing}
            maxLength={PROGRAM_ITEM_MAX.title}
            onCommit={(value) => onCommitItem(index, "title", value)}
          />
        </h3>
        <p className="ce-ex-desc">
          <EditableField
            value={item.description}
            editable={editing}
            multiline
            maxLength={PROGRAM_ITEM_MAX.description}
            onCommit={(value) => onCommitItem(index, "description", value)}
          />
        </p>
      </>
    );
  }

  function renderRemove(index: number) {
    return canRemove ? (
      <button type="button" className="ce-ex-remove" onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    ) : null;
  }

  function renderPhoto(item: ProgramItem, index: number, className: string) {
    return (
      <div
        className={`ce-ex-ph ${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change photo for ${item.title || "event"}` : undefined}
        onClick={() => pickImage(index)}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            pickImage(index);
          }
        }}
      >
        {item.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt="" loading="lazy" />
        ) : (
          <CreamPh colors={PLACEHOLDERS[index % PLACEHOLDERS.length]} label="" />
        )}
        {editing ? <span className="ce-photo-hint">Change photo</span> : null}
      </div>
    );
  }

  function renderAdd(className = "") {
    return editing && cards.length < MAX_PROGRAM_ITEMS ? (
      <button type="button" className={`ce-ex-add ${className}`.trim()} onClick={onAddItem}>
        <span aria-hidden="true">+</span> Add event
      </button>
    ) : null;
  }

  function renderBody() {
    switch (activeLayout) {
      case "icon-timeline":
        return (
          <div className="ce-w ce-ex ce-ex-it">
            <Reveal className="ce-ex-head">
              {renderEyebrow()}
              {renderTitle()}
              <DiamondRule className="ce-ex-rule" />
            </Reveal>
            <ol className="ce-ex-it-list" style={{ "--cols": cols } as CSSProperties}>
              {cards.map((item, index) => {
                const rowEnd = (index + 1) % cols === 0 || index === cards.length - 1;
                return (
                  <li key={`it-${index}`} className={`ce-ex-it-item${rowEnd ? " is-row-end" : ""}`}>
                    <Reveal className="ce-ex-it-card" delay={`${index * 0.08}s`}>
                      {renderIcon(item, index, "ce-ex-it-icon")}
                      <div className="ce-ex-it-body">
                        {renderText(item, index)}
                        {renderRemove(index)}
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
            {renderAdd()}
          </div>
        );
      case "arch-photo-cards":
        return (
          <div className="ce-w ce-ex ce-ex-ac">
            <Reveal className="ce-ex-head">
              {renderEyebrow()}
              {renderTitle()}
              <DiamondRule className="ce-ex-rule" />
            </Reveal>
            <ol className="ce-ex-ac-grid">
              {cards.map((item, index) => (
                <li key={`ac-${index}`} className="ce-ex-ac-item">
                  <Reveal className="ce-ex-ac-card" delay={`${index * 0.08}s`}>
                    {renderPhoto(item, index, "ce-ex-ac-ph")}
                    {renderIcon(item, index, "ce-ex-ac-icon")}
                    {renderText(item, index)}
                    {renderRemove(index)}
                  </Reveal>
                </li>
              ))}
            </ol>
            {renderAdd()}
          </div>
        );
      case "portrait-list":
        return (
          <div className="ce-w ce-ex ce-ex-pl">
            <Reveal className="ce-ex-pl-aside">
              {renderEyebrow()}
              {renderTitle("is-stacked")}
              <DiamondRule className="ce-ex-rule" />
              <CreamLeafSprig className="ce-ex-pl-sprig is-gold" />
              <p className="ce-ex-lead">{field("eventsLead", "", true)}</p>
              {renderAdd("is-aside")}
            </Reveal>
            <ol className="ce-ex-pl-list">
              {cards.map((item, index) => (
                <li key={`pl-${index}`} className="ce-ex-pl-item">
                  <Reveal className="ce-ex-pl-row" delay={`${index * 0.08}s`}>
                    {renderPhoto(item, index, "ce-ex-pl-ph")}
                    <div className="ce-ex-pl-body">{renderText(item, index)}</div>
                    {renderRemove(index)}
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        );
      case "arch-windows":
        return (
          <div className="ce-w ce-ex ce-ex-aw">
            <Reveal className="ce-ex-head is-center">
              {renderEyebrow(true)}
              {renderTitle("is-center")}
              <DiamondRule className="ce-ex-rule is-center" />
            </Reveal>
            <ol className="ce-ex-aw-grid">
              {cards.map((item, index) => (
                <li key={`aw-${index}`} className="ce-ex-aw-item">
                  <Reveal className="ce-ex-aw-card" delay={`${index * 0.08}s`}>
                    {renderIcon(item, index, "ce-ex-aw-icon")}
                    {renderText(item, index)}
                    {renderRemove(index)}
                    <div className="ce-ex-aw-media">
                      {renderPhoto(item, index, "ce-ex-aw-ph")}
                      <CreamBlossomTwig className="ce-ex-aw-floral is-left is-gold" />
                      <CreamBlossomTwig className="ce-ex-aw-floral is-right is-gold" />
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            {editing && cards.length < MAX_PROGRAM_ITEMS ? (
              <div className="ce-ex-aw-foot">{renderAdd()}</div>
            ) : null}
          </div>
        );
      default:
        return (
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
                    {canRemove ? (
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
          </div>
        );
    }
  }

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

      {renderBody()}

      {editing ? (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && targetIndex.current >= 0) onChangeImage?.(targetIndex.current, file);
            e.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}
