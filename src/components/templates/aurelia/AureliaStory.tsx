"use client";

import { useEffect, useRef, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_STORY_LAYOUTS,
  type AureliaStoryLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

export default function AureliaStory({
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
  onLayoutChange?: (layout: AureliaStoryLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, AURELIA_STORY_LAYOUTS, "journey-timeline");
  const tlRef = useRef<HTMLDivElement>(null);
  const milestones = items.length
    ? items
    : [
        { icon: "", title: "", date: "", place: "", url: "", publicId: "" },
        { icon: "", title: "", date: "", place: "", url: "", publicId: "" },
      ];

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    function onScroll() {
      if (!tl) return;
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      tl.style.setProperty("--p", `${p * 100}%`);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [milestones.length]);

  return (
    <section className="au-sec au-timeline" id="timeline" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Journey"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-wrap">
        <Reveal>
          <p className="au-eyebrow">{field("loveStoryTitle", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">{field("presenceLine", "au-h2")}</h2>
        </Reveal>

        <div className="au-tl" ref={tlRef} id="au-tl">
          <div className="au-tl-line" aria-hidden="true">
            <i />
          </div>
          {milestones.map((item, index) => (
            <Reveal key={`au-ms-${index}`} className="au-ms">
              <b>
                <EditableField
                  value={item.date}
                  editable={editing}
                  maxLength={LOVE_STORY_ITEM_MAX.date}
                  onCommit={(value) => onCommitItem(index, "date", value)}
                />
              </b>
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
                <button type="button" className="au-remove" onClick={() => onRemoveItem(index)}>
                  Remove
                </button>
              ) : null}
            </Reveal>
          ))}
        </div>

        {editing && milestones.length < MAX_LOVE_STORY_ITEMS ? (
          <button type="button" className="au-add" onClick={onAddItem}>
            Add milestone
          </button>
        ) : null}
      </div>
    </section>
  );
}
