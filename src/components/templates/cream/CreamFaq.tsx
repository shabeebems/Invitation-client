"use client";

import type { ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_FAQ_LAYOUTS,
  type CreamFaqLayout,
} from "@/components/templates/cream/cream-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

export default function CreamFaq({
  items,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
}: {
  /** FAQ rows — typically loveStoryItems with icon === "faq" */
  items: LoveStoryItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamFaqLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_FAQ_LAYOUTS, "accordion");
  const rows = items.length
    ? items
    : [{ icon: "faq", title: "", date: "", place: "", url: "", publicId: "" }];

  return (
    <section className="ce-faq" id="faq" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_FAQ_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="FAQ"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w ce-faq-w">
        <p className="ce-eyebrow">{field("programEyebrow", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">{field("programIntro", "ce-h2")}</h2>
        </Reveal>

        <div className="ce-faq-list">
          {rows.map((item, index) => (
            <details key={`ce-faq-${index}`}>
              <summary>
                <EditableField
                  value={item.title}
                  editable={editing}
                  maxLength={LOVE_STORY_ITEM_MAX.title}
                  onCommit={(value) => onCommitItem(index, "title", value)}
                />
              </summary>
              <p>
                <EditableField
                  value={item.place}
                  editable={editing}
                  multiline
                  maxLength={LOVE_STORY_ITEM_MAX.place}
                  onCommit={(value) => onCommitItem(index, "place", value)}
                />
              </p>
              {editing && rows.length > 1 ? (
                <button type="button" className="ce-remove" onClick={() => onRemoveItem(index)}>
                  Remove
                </button>
              ) : null}
            </details>
          ))}
        </div>

        {editing && rows.length < MAX_LOVE_STORY_ITEMS ? (
          <button type="button" className="ce-add" onClick={onAddItem}>
            Add question
          </button>
        ) : null}
      </div>
    </section>
  );
}
