"use client";

import { useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { DiamondRule, Reveal } from "@/components/templates/cream/CreamDecor";
import { CreamBlossomTwig } from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_FAQ_LAYOUTS,
  type CreamFaqLayout,
} from "@/components/templates/cream/cream-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

function QuestionGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12.4a4 4 0 1 1 5.6 3.7c-1 .5-1.6 1.4-1.6 2.5v1" />
        <circle cx="16" cy="23.4" r=".5" fill="currentColor" />
      </g>
    </svg>
  );
}

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
  const [openIndex, setOpenIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const rows = items.length
    ? items
    : [{ icon: "faq", title: "", date: "", place: "", url: "", publicId: "" }];
  const tab = Math.min(activeTab, rows.length - 1);
  const canRemove = editing && rows.length > 1;

  function number(index: number) {
    return String(index + 1).padStart(2, "0");
  }

  function renderHead(className = "") {
    return (
      <Reveal className={`ce-fq-head ${className}`.trim()}>
        <p className="ce-fq-eyebrow">{field("programEyebrow")}</p>
        <h2 className="ce-fq-title">{field("programIntro")}</h2>
        <DiamondRule className="ce-fq-rule" />
      </Reveal>
    );
  }

  function renderQuestion(item: LoveStoryItem, index: number) {
    return (
      <EditableField
        value={item.title}
        editable={editing}
        maxLength={LOVE_STORY_ITEM_MAX.title}
        onCommit={(value) => onCommitItem(index, "title", value)}
      />
    );
  }

  function renderAnswer(item: LoveStoryItem, index: number) {
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

  function renderRemove(index: number) {
    return canRemove ? (
      <button type="button" className="ce-remove ce-fq-remove" onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    ) : null;
  }

  function renderAdd(className = "") {
    return editing && rows.length < MAX_LOVE_STORY_ITEMS ? (
      <button type="button" className={`ce-add ${className}`.trim()} onClick={onAddItem}>
        Add question
      </button>
    ) : null;
  }

  function renderBody() {
    switch (activeLayout) {
      case "side-index":
        return (
          <div className="ce-w ce-fq ce-fq-si">
            <div className="ce-fq-si-aside">
              {renderHead()}
              <CreamBlossomTwig className="ce-fq-si-twig" />
            </div>
            <div className="ce-fq-si-main">
              <ol className="ce-fq-si-list">
                {rows.map((item, index) => {
                  const open = editing || openIndex === index;
                  return (
                    <li key={`si-${index}`} className={`ce-fq-si-item${open ? " is-open" : ""}`}>
                      <div
                        className="ce-fq-si-q"
                        role={editing ? undefined : "button"}
                        tabIndex={editing ? undefined : 0}
                        aria-expanded={editing ? undefined : open}
                        onClick={() => !editing && setOpenIndex(open ? -1 : index)}
                        onKeyDown={(e) => {
                          if (!editing && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            setOpenIndex(open ? -1 : index);
                          }
                        }}
                      >
                        <span className="ce-fq-num">{number(index)}</span>
                        <h3 className="ce-fq-q">{renderQuestion(item, index)}</h3>
                        <span className="ce-fq-toggle" aria-hidden="true" />
                      </div>
                      <div className="ce-fq-si-a">
                        <div>
                          <p className="ce-fq-a">{renderAnswer(item, index)}</p>
                          {renderRemove(index)}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              {renderAdd()}
            </div>
          </div>
        );
      case "question-cards":
        return (
          <div className="ce-w ce-fq ce-fq-qc">
            {renderHead("is-center")}
            <ul className="ce-fq-qc-grid">
              {rows.map((item, index) => (
                <li key={`qc-${index}`}>
                  <Reveal className="ce-fq-qc-card" delay={`${(index % 2) * 0.08}s`}>
                    <span className="ce-fq-badge" aria-hidden="true">
                      <QuestionGlyph />
                    </span>
                    <h3 className="ce-fq-q">{renderQuestion(item, index)}</h3>
                    <span className="ce-fq-sep" aria-hidden="true" />
                    <p className="ce-fq-a">{renderAnswer(item, index)}</p>
                    {renderRemove(index)}
                  </Reveal>
                </li>
              ))}
            </ul>
            <div className="ce-fq-foot">{renderAdd()}</div>
          </div>
        );
      case "tabbed-answers": {
        const current = rows[tab];
        return (
          <div className="ce-w ce-fq ce-fq-tb">
            {renderHead("is-center")}
            <Reveal className="ce-fq-tb-wrap" delay="0.08s">
              <div className="ce-fq-tb-tabs" role="tablist" aria-orientation="vertical">
                {rows.map((item, index) => (
                  <div
                    key={`tb-${index}`}
                    className={`ce-fq-tb-tab${index === tab ? " is-active" : ""}`}
                    role="tab"
                    tabIndex={index === tab ? 0 : -1}
                    aria-selected={index === tab}
                    onClick={(e) => {
                      setActiveTab(index);
                      e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
                    }}
                    onKeyDown={(e) => {
                      if (editing) return;
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveTab(index);
                      }
                      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                        e.preventDefault();
                        const step = e.key === "ArrowDown" ? 1 : -1;
                        const next = (index + step + rows.length) % rows.length;
                        setActiveTab(next);
                        const tabs = e.currentTarget.parentElement?.children;
                        (tabs?.[next] as HTMLElement | undefined)?.focus();
                      }
                    }}
                  >
                    <span className="ce-fq-num">{number(index)}</span>
                    <span className="ce-fq-tb-label">{renderQuestion(item, index)}</span>
                  </div>
                ))}
                {renderAdd("ce-fq-tb-add")}
              </div>
              <div className="ce-fq-tb-panel" role="tabpanel">
                <span className="ce-fq-tb-mark" aria-hidden="true">
                  “
                </span>
                <p className="ce-fq-tb-count">
                  {number(tab)} / {number(rows.length - 1)}
                </p>
                <h3 className="ce-fq-tb-q">{current.title}</h3>
                <DiamondRule className="ce-fq-rule" />
                <p key={`tb-a-${tab}`} className="ce-fq-a">
                  {renderAnswer(current, tab)}
                </p>
                {renderRemove(tab)}
              </div>
            </Reveal>
          </div>
        );
      }
      default:
        return (
          <div className="ce-w ce-faq-w">
            <p className="ce-eyebrow">{field("programEyebrow", "ce-eyebrow")}</p>
            <Reveal>
              <h2 className="ce-h2">{field("programIntro", "ce-h2")}</h2>
            </Reveal>

            <div className="ce-faq-list">
              {rows.map((item, index) => (
                <details key={`ce-faq-${index}`}>
                  <summary>{renderQuestion(item, index)}</summary>
                  <p>{renderAnswer(item, index)}</p>
                  {canRemove ? (
                    <button type="button" className="ce-remove" onClick={() => onRemoveItem(index)}>
                      Remove
                    </button>
                  ) : null}
                </details>
              ))}
            </div>

            {renderAdd()}
          </div>
        );
    }
  }

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

      {renderBody()}
    </section>
  );
}
