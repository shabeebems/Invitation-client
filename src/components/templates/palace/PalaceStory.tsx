"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { PalaceHeartRule, PalaceStoryIcon } from "@/components/templates/palace/PalaceDecor";
import {
  PALACE_STORY_LAYOUTS,
  type PalaceStoryLayout,
} from "@/components/templates/palace/palace-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

export default function PalaceStory({
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
  onLayoutChange: (layout: PalaceStoryLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, PALACE_STORY_LAYOUTS, "icons");
  const nodes = items.length ? items : [];

  return (
    <section className="pp-timeline" id="story" data-layout={activeLayout} aria-label="Relationship timeline">
      {editing ? (
        <LayoutPicker
          options={PALACE_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Timeline"
          className="pp-layout-picker"
        />
      ) : null}

      <div className="pp-section-head">
        <p className="pp-kicker">{field("loveStoryTitle", "pp-kicker")}</p>
        <h2 className="pp-script pp-section-script">{field("storyTitle", "pp-script pp-section-script")}</h2>
        <PalaceHeartRule />
      </div>

      <div className="pp-timeline-wrap">
        <div className="pp-timeline-rail" aria-hidden="true" />
        <div className="pp-timeline-grid">
          {nodes.map((item, index) => (
            <div key={`pp-tl-${index}`} className="pp-timeline-node">
              <div className="pp-timeline-icon">
                <PalaceStoryIcon kind={item.icon || item.title} />
              </div>
              {editing ? (
                <>
                  <EditableField
                    value={item.icon || ""}
                    editable
                    className="pp-tl-icon-field"
                    maxLength={40}
                    onCommit={(value) => onCommitItem(index, "icon", value)}
                  />
                  <EditableField
                    value={item.date}
                    editable
                    className="pp-tl-date"
                    maxLength={LOVE_STORY_ITEM_MAX.date}
                    onCommit={(value) => onCommitItem(index, "date", value)}
                  />
                  <EditableField
                    value={item.title}
                    editable
                    className="pp-tl-title"
                    maxLength={LOVE_STORY_ITEM_MAX.title}
                    onCommit={(value) => onCommitItem(index, "title", value)}
                  />
                  <EditableField
                    value={item.place}
                    editable
                    multiline
                    className="pp-tl-desc"
                    maxLength={LOVE_STORY_ITEM_MAX.place}
                    onCommit={(value) => onCommitItem(index, "place", value)}
                  />
                  {nodes.length > 1 ? (
                    <button type="button" className="pp-chip-btn tiny" onClick={() => onRemoveItem(index)}>
                      Remove
                    </button>
                  ) : null}
                </>
              ) : (
                <>
                  <span className="pp-tl-date">{item.date}</span>
                  <h3 className="pp-tl-title">{item.title}</h3>
                  <p className="pp-tl-desc">{item.place}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {editing && nodes.length < MAX_LOVE_STORY_ITEMS ? (
        <button type="button" className="pp-chip-btn" onClick={onAddItem}>
          Add timeline moment
        </button>
      ) : null}

      {editing ? (
        <p className="pp-tl-hint">Icon key: meet · chat · date · ring · wedding</p>
      ) : null}
    </section>
  );
}
