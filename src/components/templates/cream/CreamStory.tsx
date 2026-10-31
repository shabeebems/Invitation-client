"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CreamBlossomCluster,
  CreamHeart,
  CreamStemBloom,
} from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_STORY_LAYOUTS,
  type CreamStoryLayout,
} from "@/components/templates/cream/cream-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

const PLACEHOLDERS: [string, string][] = [
  ["#E8D9BF", "#C9B79A"],
  ["#EFE4D2", "#D8B8AD"],
  ["#E9DCC6", "#A8AE96"],
];

function DiamondOrnament({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 64 12" aria-hidden="true">
      <path d="M0 6h22M42 6h22" stroke="currentColor" strokeWidth="1" />
      <path d="M32 1.2L36.8 6 32 10.8 27.2 6Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M32 3.6L34.4 6 32 8.4 29.6 6Z" fill="currentColor" />
      <circle cx="24.6" cy="6" r="1" fill="currentColor" />
      <circle cx="39.4" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

export default function CreamStory({
  items,
  layout,
  editing,
  featureUrl = "",
  field,
  onLayoutChange,
  onCommitItem,
  onAddItem,
  onRemoveItem,
  onChangeItemImage,
  onChangeFeature,
}: {
  items: LoveStoryItem[];
  layout?: string;
  editing: boolean;
  featureUrl?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: CreamStoryLayout) => void;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeItemImage?: (index: number, file: File) => void;
  onChangeFeature?: (file: File) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, CREAM_STORY_LAYOUTS, "year-rail");
  const itemFileRef = useRef<HTMLInputElement>(null);
  const featureFileRef = useRef<HTMLInputElement>(null);
  const targetIndex = useRef(-1);
  const milestones = items.length
    ? items
    : [{ icon: "", title: "", date: "", place: "", url: "", publicId: "" }];
  const canRemove = editing && milestones.length > 1;

  function pickItemImage(index: number) {
    if (!editing || !onChangeItemImage) return;
    targetIndex.current = index;
    itemFileRef.current?.click();
  }

  function pickFeature() {
    if (editing && onChangeFeature) featureFileRef.current?.click();
  }

  function onPickKey(e: KeyboardEvent, pick: () => void) {
    if (editing && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      pick();
    }
  }

  function renderEyebrow() {
    return <p className="ce-sx-eyebrow">{field("loveStoryTitle")}</p>;
  }

  function renderHeading() {
    return <h2 className="ce-sx-title">{field("envelopeTagline")}</h2>;
  }

  function renderHeartRule(className = "") {
    return (
      <span className={`ce-sx-hrule ${className}`.trim()} aria-hidden="true">
        <i />
        <CreamHeart className="ce-sx-heart" />
        <i />
      </span>
    );
  }

  function renderYear(item: LoveStoryItem, index: number, className = "ce-sx-year") {
    return (
      <b className={className}>
        <EditableField
          value={item.date}
          editable={editing}
          maxLength={LOVE_STORY_ITEM_MAX.date}
          onCommit={(value) => onCommitItem(index, "date", value)}
        />
      </b>
    );
  }

  function renderText(item: LoveStoryItem, index: number) {
    return (
      <>
        <h3 className="ce-sx-name">
          <EditableField
            value={item.title}
            editable={editing}
            maxLength={LOVE_STORY_ITEM_MAX.title}
            onCommit={(value) => onCommitItem(index, "title", value)}
          />
        </h3>
        <p className="ce-sx-desc">
          <EditableField
            value={item.place}
            editable={editing}
            multiline
            maxLength={LOVE_STORY_ITEM_MAX.place}
            onCommit={(value) => onCommitItem(index, "place", value)}
          />
        </p>
        {canRemove ? (
          <button type="button" className="ce-sx-remove" onClick={() => onRemoveItem(index)}>
            Remove
          </button>
        ) : null}
      </>
    );
  }

  function renderItemPhoto(item: LoveStoryItem, index: number, className: string) {
    return (
      <div
        className={`ce-sx-ph ${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
        onClick={() => pickItemImage(index)}
        onKeyDown={(e) => onPickKey(e, () => pickItemImage(index))}
      >
        {item.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt="" loading="lazy" />
        ) : (
          <CreamPh colors={PLACEHOLDERS[index % PLACEHOLDERS.length]} label={item.date || "photo"} />
        )}
        {editing ? <span className="ce-photo-hint">Change photo</span> : null}
      </div>
    );
  }

  function renderAdd() {
    return editing && milestones.length < MAX_LOVE_STORY_ITEMS ? (
      <button type="button" className="ce-sx-add" onClick={onAddItem}>
        Add milestone
      </button>
    ) : null;
  }

  function renderBody() {
    switch (activeLayout) {
      case "floral-rail":
        return (
          <div className="ce-w ce-sx ce-sx-fr">
            <div className="ce-sx-fr-art">
              <CreamStemBloom className="ce-sx-fr-stem" />
            </div>
            <div className="ce-sx-fr-main">
              <Reveal className="ce-sx-head">
                {renderEyebrow()}
                {renderHeading()}
              </Reveal>
              <ol className="ce-sx-fr-list">
                {milestones.map((item, index) => (
                  <li key={`fr-${index}`} className="ce-sx-fr-item">
                    <Reveal className="ce-sx-fr-row" delay={`${index * 0.08}s`}>
                      <span className="ce-sx-fr-mark" aria-hidden="true">
                        <CreamHeart className="ce-sx-heart" />
                      </span>
                      {renderYear(item, index)}
                      <div className="ce-sx-fr-body">{renderText(item, index)}</div>
                    </Reveal>
                  </li>
                ))}
              </ol>
              {renderAdd()}
            </div>
          </div>
        );
      case "arch-cards":
        return (
          <div className="ce-w ce-sx ce-sx-ac">
            <Reveal className="ce-sx-head ce-sx-ac-head">
              {renderEyebrow()}
              <div className="ce-sx-ac-titlerow">
                {renderHeading()}
                <span className="ce-sx-ac-flourish" aria-hidden="true">
                  <CreamHeart className="ce-sx-heart" />
                  <i />
                </span>
              </div>
            </Reveal>
            <ol className="ce-sx-ac-grid">
              {milestones.map((item, index) => (
                <li key={`ac-${index}`} className="ce-sx-ac-item">
                  <Reveal className="ce-sx-ac-card" delay={`${index * 0.1}s`}>
                    {renderItemPhoto(item, index, "ce-sx-ac-ph")}
                    {renderYear(item, index)}
                    {renderText(item, index)}
                    <DiamondOrnament className="ce-sx-ac-orn" />
                  </Reveal>
                </li>
              ))}
            </ol>
            {renderAdd()}
          </div>
        );
      case "polaroid-ledger":
        return (
          <div className="ce-w ce-sx ce-sx-pl">
            <Reveal className="ce-sx-head ce-sx-pl-head">
              {renderEyebrow()}
              {renderHeading()}
              {renderHeartRule()}
            </Reveal>
            <aside className="ce-sx-pl-note">
              <p className="ce-sx-script">{field("storySideNote", "", true)}</p>
              <CreamHeart className="ce-sx-heart" />
            </aside>
            <div className="ce-sx-pl-main">
              <ol className="ce-sx-pl-list">
                {milestones.map((item, index) => (
                  <li key={`pl-${index}`} className="ce-sx-pl-item">
                    <Reveal className="ce-sx-pl-row" delay={`${index * 0.08}s`}>
                      {renderYear(item, index)}
                      <figure className="ce-sx-pl-card">
                        {renderItemPhoto(item, index, "ce-sx-pl-ph")}
                      </figure>
                      <div className="ce-sx-pl-body">{renderText(item, index)}</div>
                    </Reveal>
                  </li>
                ))}
              </ol>
              {renderAdd()}
            </div>
          </div>
        );
      case "arch-journey":
        return (
          <div className="ce-w ce-sx ce-sx-aj">
            <Reveal className="ce-sx-aj-media">
              <span className="ce-sx-aj-outline" aria-hidden="true" />
              <div
                className={`ce-sx-ph ce-sx-aj-ph${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? "Change story photo" : undefined}
                onClick={pickFeature}
                onKeyDown={(e) => onPickKey(e, pickFeature)}
              >
                {featureUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featureUrl} alt="" loading="lazy" />
                ) : (
                  <CreamPh colors={["#E8D9BF", "#C9B79A"]} label="Our story" />
                )}
                {editing ? <span className="ce-photo-hint">Change photo</span> : null}
              </div>
              <CreamBlossomCluster className="ce-sx-aj-floral" />
            </Reveal>
            <div className="ce-sx-aj-main">
              <Reveal className="ce-sx-head">
                {renderEyebrow()}
                {renderHeading()}
                {renderHeartRule()}
              </Reveal>
              <ol className="ce-sx-aj-list">
                {milestones.map((item, index) => (
                  <li key={`aj-${index}`} className="ce-sx-aj-item">
                    <Reveal className="ce-sx-aj-row" delay={`${index * 0.08}s`}>
                      <span className="ce-sx-aj-num" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="ce-sx-aj-body">
                        {renderYear(item, index, "ce-sx-year is-small")}
                        {renderText(item, index)}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
              {renderAdd()}
            </div>
            <aside className="ce-sx-aj-note">
              <span className="ce-sx-aj-line is-top" aria-hidden="true" />
              <p className="ce-sx-script">{field("storyScriptNote", "", true)}</p>
              <span className="ce-sx-aj-line" aria-hidden="true" />
              <CreamHeart className="ce-sx-heart" />
            </aside>
          </div>
        );
      default:
        return (
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
                      {canRemove ? (
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
        );
    }
  }

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

      {renderBody()}

      {editing ? (
        <>
          <input
            ref={itemFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && targetIndex.current >= 0) onChangeItemImage?.(targetIndex.current, file);
              e.target.value = "";
            }}
          />
          <input
            ref={featureFileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChangeFeature?.(file);
              e.target.value = "";
            }}
          />
        </>
      ) : null}
    </section>
  );
}
