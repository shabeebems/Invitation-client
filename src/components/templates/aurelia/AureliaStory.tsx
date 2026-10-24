"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_STORY_LAYOUTS,
  type AureliaStoryLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

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
  }, [milestones.length, activeLayout]);

  function renderDate(item: LoveStoryItem, index: number) {
    return (
      <EditableField
        value={item.date}
        editable={editing}
        maxLength={LOVE_STORY_ITEM_MAX.date}
        onCommit={(value) => onCommitItem(index, "date", value)}
      />
    );
  }

  function renderTitle(item: LoveStoryItem, index: number) {
    return (
      <EditableField
        value={item.title}
        editable={editing}
        maxLength={LOVE_STORY_ITEM_MAX.title}
        onCommit={(value) => onCommitItem(index, "title", value)}
      />
    );
  }

  function renderPlace(item: LoveStoryItem, index: number) {
    return (
      <EditableField
        value={item.place}
        editable={editing}
        multiline
        maxLength={LOVE_STORY_ITEM_MAX.place}
        onCommit={(value) => onCommitItem(index, "place", value)}
      />
    );
  }

  function renderRemove(index: number, className = "au-remove") {
    if (!editing || milestones.length <= 1) return null;
    return (
      <button type="button" className={className} onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    );
  }

  function renderHead() {
    return (
      <Reveal className="au-jn-head">
        <p className="au-eyebrow au-sf-eyebrow is-lined">{field("loveStoryTitle", "au-eyebrow")}</p>
        <h2 className="au-jn-title">{field("presenceLine", "")}</h2>
      </Reveal>
    );
  }

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

      {activeLayout === "milestone-cards" ? (
        <div className="au-jn au-jc">
          {renderHead()}
          <div className="au-jc-row">
            {milestones.map((item, index) => (
              <Reveal key={`au-jc-${index}`} className="au-jc-cell" delay={`${(index % 4) * 0.1}s`}>
                <article className="au-jc-card">
                  <b className="au-jn-year">{renderDate(item, index)}</b>
                  <span className="au-jc-rule" aria-hidden="true" />
                  <h3 className="au-jn-name">{renderTitle(item, index)}</h3>
                  <p className="au-jn-text">{renderPlace(item, index)}</p>
                  {renderRemove(index, "au-remove au-jn-remove")}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : activeLayout === "center-spine" ? (
        <div className="au-jn au-cs">
          {renderHead()}
          <div className="au-cs-track">
            <span className="au-cs-spine" aria-hidden="true" />
            {milestones.map((item, index) => (
              <div
                key={`au-cs-${index}`}
                className={`au-cs-slot ${index % 2 === 0 ? "is-left" : "is-right"}`}
                style={{ "--row": index + 1 } as CSSProperties}
              >
                <Reveal className="au-cs-item">
                  <span className="au-cs-link" aria-hidden="true">
                    <i />
                  </span>
                  <b className="au-jn-year">{renderDate(item, index)}</b>
                  <h3 className="au-jn-name">{renderTitle(item, index)}</h3>
                  <p className="au-jn-text">{renderPlace(item, index)}</p>
                  {renderRemove(index, "au-remove au-jn-remove")}
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      ) : activeLayout === "numbered-track" ? (
        <div className="au-jn au-nt">
          {renderHead()}
          <ol className="au-nt-track">
            {milestones.map((item, index) => (
              <li key={`au-nt-${index}`} className="au-nt-step">
                <Reveal className="au-nt-inner" delay={`${(index % 4) * 0.12}s`}>
                  <span className="au-nt-num" aria-hidden="true">
                    {stepNumber(index)}
                  </span>
                  <div className="au-nt-body">
                    <b className="au-jn-year">{renderDate(item, index)}</b>
                    <h3 className="au-jn-name">{renderTitle(item, index)}</h3>
                    <p className="au-jn-text">{renderPlace(item, index)}</p>
                    {renderRemove(index, "au-remove au-jn-remove")}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      ) : (
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
                <b>{renderDate(item, index)}</b>
                <h3>{renderTitle(item, index)}</h3>
                <p>{renderPlace(item, index)}</p>
                {renderRemove(index)}
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {editing && milestones.length < MAX_LOVE_STORY_ITEMS ? (
        <button type="button" className="au-add" onClick={onAddItem}>
          Add milestone
        </button>
      ) : null}
    </section>
  );
}
