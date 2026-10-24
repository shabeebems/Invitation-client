"use client";

import { Fragment, type ReactNode } from "react";
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
        <path d="M8 3h8l-1.6 9.2H9.6L8 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.45" />
        <path d="M10 12.2c.4 2.4 1.2 4.2 2 5.3M8.4 20.2h7.2M12 17.5v2.7" strokeLinecap="round" strokeWidth="1.45" />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <rect height="10.5" rx="1.1" strokeWidth="1.45" width="14" x="5" y="8.5" />
        <path d="M5 11.4h14M12 8.5v10.5" strokeWidth="1.45" />
        <path d="M12 8.5c-1.8-2.6-4.1-1.7-4.1.2C7.9 10.4 10 10.2 12 8.5z" strokeLinejoin="round" strokeWidth="1.45" />
        <path d="M12 8.5c1.8-2.6 4.1-1.7 4.1.2 0 1.7-2.1 1.9-4.1.2z" strokeLinejoin="round" strokeWidth="1.45" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M4.8 13.2 6.4 8.4h11.2l1.6 4.8M4.8 13.2a2 2 0 1 0 .1 4M19.2 13.2a2 2 0 1 1-.1 4M4.8 15.2h14.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg className="bs-itin-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="8" strokeWidth="1.55" />
      <path d="M12 8.2V12l2.6 1.7" strokeLinecap="round" strokeWidth="1.55" />
    </svg>
  );
}

const EMPTY_STOP: LoveStoryItem = { icon: "", title: "", date: "", place: "", url: "", publicId: "" };

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
  const stops = items.length ? items : [EMPTY_STOP, EMPTY_STOP, EMPTY_STOP];

  function renderFields(item: LoveStoryItem, index: number, withClock: boolean) {
    return (
      <>
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
          {withClock ? <ClockGlyph /> : null}
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
      </>
    );
  }

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

      <div className="bs-itin-head">
        <Reveal>
          <FlourishRule>
            <h2 className="bs-section-eyebrow">{field("loveStoryTitle", "bs-section-eyebrow")}</h2>
          </FlourishRule>
        </Reveal>
        <p className="bs-itin-lead">{field("loveStoryIntro", "bs-itin-lead", true)}</p>
      </div>

      {activeLayout === "rail-three" ? (
        <div className="bs-itinerary-rail">
          <div className="bs-itinerary-line" aria-hidden="true" />
          <div className="bs-itinerary-grid">
            {stops.map((item, index) => (
              <Reveal key={`bs-itin-${index}`} className="bs-itin-stop">
                <div className="bs-itin-icon">
                  <ItineraryIcon index={index} />
                </div>
                {renderFields(item, index, false)}
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {activeLayout === "cap-cards" ? (
        <div className="bs-itin-caps">
          {stops.map((item, index) => (
            <Fragment key={`bs-itin-cap-${index}`}>
              <Reveal className="bs-itin-card is-cap">
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
                  <ClockGlyph />
                  <EditableField
                    value={item.date || ""}
                    editable={editing}
                    maxLength={LOVE_STORY_ITEM_MAX.date}
                    onCommit={(value) => onCommitItem(index, "date", value)}
                    className="bs-itin-date"
                  />
                </p>
                <span className="bs-itin-rule" aria-hidden="true" />
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
              {index < stops.length - 1 ? (
                <span className="bs-itin-join" aria-hidden="true">
                  →
                </span>
              ) : null}
            </Fragment>
          ))}
        </div>
      ) : null}

      {activeLayout === "icon-line" ? (
        <div className="bs-itin-line">
          <div className="bs-itin-line-rule" aria-hidden="true" />
          {stops.map((item, index) => (
            <Reveal key={`bs-itin-line-${index}`} className="bs-itin-stop is-line">
              <div className="bs-itin-icon">
                <ItineraryIcon index={index} />
              </div>
              {renderFields(item, index, true)}
            </Reveal>
          ))}
        </div>
      ) : null}

      {activeLayout === "step-cards" ? (
        <div className="bs-itin-steps">
          {stops.map((item, index) => (
            <Reveal key={`bs-itin-step-${index}`} className="bs-itin-card is-step">
              <span className="bs-itin-num">{String(index + 1).padStart(2, "0")}</span>
              <div className="bs-itin-icon">
                <ItineraryIcon index={index} />
              </div>
              {renderFields(item, index, true)}
            </Reveal>
          ))}
        </div>
      ) : null}

      {activeLayout === "chevron-flow" ? (
        <div className="bs-itin-chevrons">
          {stops.map((item, index) => (
            <Reveal
              key={`bs-itin-chev-${index}`}
              className={`bs-itin-card is-chevron${index === stops.length - 1 ? " is-last" : ""}`}
            >
              <div className="bs-itin-icon">
                <ItineraryIcon index={index} />
              </div>
              {renderFields(item, index, true)}
            </Reveal>
          ))}
        </div>
      ) : null}

      {editing && stops.length < MAX_LOVE_STORY_ITEMS ? (
        <button type="button" className="bs-add-btn" onClick={onAddItem}>
          Add itinerary stop
        </button>
      ) : null}
    </section>
  );
}
