"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_STORY_LAYOUTS,
  type CreamStoryLayout,
} from "@/components/templates/cream/cream-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

export default function CreamStory({
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
  onLayoutChange?: (layout: CreamStoryLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_STORY_LAYOUTS, "year-rail");
  const milestones = items.length
    ? items
    : [{ icon: "", title: "", date: "", place: "", url: "", publicId: "" }];

  return (
    <section className="ce-story" id="story" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Story"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w">
        <p className="ce-eyebrow">{field("loveStoryTitle", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">{field("envelopeTagline", "ce-h2")}</h2>
        </Reveal>

        <div className="ce-st">
          {milestones.map((item, index) => (
            <Reveal key={`ce-st-${index}`}>
              <div className="ce-st-row">
                <b>
                  <EditableField
                    value={item.date}
                    editable={editing}
                    maxLength={LOVE_STORY_ITEM_MAX.date}
                    onCommit={(value) => onCommitItem(index, "date", value)}
                  />
                </b>
                <span>
                  <h3>
                    <EditableField
                      value={item.title}
                      editable={editing}
                      maxLength={LOVE_STORY_ITEM_MAX.title}
                      onCommit={(value) => onCommitItem(index, "title", value)}
                    />
                  </h3>
                  <p>
                    <EditableField
                      value={item.place}
                      editable={editing}
                      multiline
                      maxLength={LOVE_STORY_ITEM_MAX.place}
                      onCommit={(value) => onCommitItem(index, "place", value)}
                    />
                  </p>
                  {editing && milestones.length > 1 ? (
                    <button type="button" className="ce-remove" onClick={() => onRemoveItem(index)}>
                      Remove
                    </button>
                  ) : null}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {editing && milestones.length < MAX_LOVE_STORY_ITEMS ? (
          <button type="button" className="ce-add" onClick={onAddItem}>
            Add milestone
          </button>
        ) : null}
      </div>
    </section>
  );
}
