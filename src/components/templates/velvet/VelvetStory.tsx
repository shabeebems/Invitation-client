"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_STORY_LAYOUTS,
  VELVET_STORY_LAYOUT_ALIASES,
  type VelvetStoryLayout,
} from "@/components/templates/velvet/velvet-layouts";
import {
  VelvetCurveCornerLeaf,
  VelvetFlowingWindingCurve,
  VelvetModernStripFlourish,
  VelvetStoryMilestoneIcon,
  VelvetVerticalFlowPin,
} from "@/components/templates/velvet/VelvetStoryArt";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

const DEFAULT_VELVET_STORY: LoveStoryItem[] = [
  {
    icon: "heart",
    title: "First Meet",
    date: "5 Mar 2021",
    place: "Our paths crossed for the first time.",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    publicId: "",
  },
  {
    icon: "chat",
    title: "First Chat",
    date: "19 Apr 2021",
    place: "A simple message changed everything.",
    url: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    publicId: "",
  },
  {
    icon: "date",
    title: "First Date",
    date: "7 Sep 2022",
    place: "Coffee, smiles and endless talks.",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    publicId: "",
  },
  {
    icon: "ring",
    title: "Engagement",
    date: "12 Dec 2025",
    place: "A promise of forever, sealed with love.",
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    publicId: "",
  },
  {
    icon: "wedding",
    title: "Our Wedding",
    date: "20 Feb 2027",
    place: "A new chapter begins.",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    publicId: "",
  },
];

export default function VelvetStory({
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
  items: LoveStoryItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: VelvetStoryLayout) => void;
  onCommitItem: (index: number, key: "date" | "place" | "title", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);

  const activeLayout = normalizeLayoutId(
    layout,
    VELVET_STORY_LAYOUTS,
    "rail",
    VELVET_STORY_LAYOUT_ALIASES
  );

  const nodes = items.length ? items : DEFAULT_VELVET_STORY;

  function handlePhotoClick(index: number) {
    if (!editing) return;
    setUploadIndex(index);
    fileRef.current?.click();
  }

  function handlePhotoKeyDown(event: KeyboardEvent, index: number) {
    if (editing && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setUploadIndex(index);
      fileRef.current?.click();
    }
  }

  function renderCommonItemText(item: LoveStoryItem, index: number) {
    if (editing) {
      return (
        <>
          <EditableField
            value={item.date}
            editable
            className="vh-item-date"
            maxLength={LOVE_STORY_ITEM_MAX.date}
            onCommit={(value) => onCommitItem(index, "date", value)}
          />
          <EditableField
            value={item.title}
            editable
            className="vh-item-title"
            maxLength={LOVE_STORY_ITEM_MAX.title}
            onCommit={(value) => onCommitItem(index, "title", value)}
          />
          <EditableField
            value={item.place}
            editable
            multiline
            className="vh-item-desc"
            maxLength={LOVE_STORY_ITEM_MAX.place}
            onCommit={(value) => onCommitItem(index, "place", value)}
          />
          {nodes.length > 1 ? (
            <button
              type="button"
              className="vh-cap-title vh-t-remove"
              onClick={() => onRemoveItem(index)}
            >
              Remove
            </button>
          ) : null}
        </>
      );
    }

    return (
      <>
        <time className="vh-item-date">{item.date}</time>
        <h3 className="vh-item-title">{item.title}</h3>
        <p className="vh-item-desc">{item.place}</p>
      </>
    );
  }

  return (
    <section className="vh-timeline" id="story" data-layout={activeLayout}>
      {editing ? (
        <LayoutPicker
          options={VELVET_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Journey"
          className="vh-layout-picker is-dark"
        />
      ) : null}

      {/* Common Section Header */}
      <Reveal>
        <div className="vh-script vh-tl-script">
          {field("loveStoryTitle", "vh-script vh-tl-script")}
        </div>
      </Reveal>
      <Reveal>
        <h2 className="vh-cap-title vh-tl-heading">
          {field("storyTitle", "vh-cap-title vh-tl-heading")}
        </h2>
      </Reveal>
      <Reveal>
        <div className="vh-journey-divider" aria-hidden="true">
          <span className="vh-journey-divider-line" />
          <span className="vh-journey-divider-heart">♥</span>
          <span className="vh-journey-divider-line" />
        </div>
      </Reveal>
      <Reveal>
        <p className="vh-tl-sub">{field("meetCoupleIntro", "vh-tl-sub", true)}</p>
      </Reveal>

      {/* =========================================================================
          LAYOUT 1: VERTICAL FLOW (Panel 02)
          ========================================================================= */}
      {activeLayout === "vertical-flow" && (
        <div className="vh-vertical-flow">
          <div className="vh-vf-spine" aria-hidden="true">
            <VelvetVerticalFlowPin />
            <div className="vh-vf-line" />
          </div>

          <div className="vh-vf-list">
            {nodes.map((item, index) => {
              const isEven = index % 2 === 0;
              const displayUrl =
                item.url || DEFAULT_VELVET_STORY[index % DEFAULT_VELVET_STORY.length]?.url || "";

              return (
                <Reveal key={`vh-vf-${index}`}>
                  <div className={`vh-vf-row ${isEven ? "is-even" : "is-odd"}`}>
                    {/* Left Column */}
                    <div className="vh-vf-col vh-vf-left">
                      {isEven ? (
                        <div
                          className={`vh-vf-photo-card${editing ? " is-editable" : ""}`}
                          role={editing ? "button" : undefined}
                          tabIndex={editing ? 0 : undefined}
                          aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
                          onClick={() => handlePhotoClick(index)}
                          onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                        >
                          {displayUrl ? (
                            <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                          ) : (
                            <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                          )}
                          {editing && <span className="vh-photo-hover-tag">Change</span>}
                        </div>
                      ) : (
                        <div className="vh-vf-text-block is-right-aligned">
                          {renderCommonItemText(item, index)}
                        </div>
                      )}
                    </div>

                    {/* Center Node Dot */}
                    <div className="vh-vf-col vh-vf-center" aria-hidden="true">
                      <span className="vh-vf-node-dot" />
                    </div>

                    {/* Right Column */}
                    <div className="vh-vf-col vh-vf-right">
                      {isEven ? (
                        <div className="vh-vf-text-block is-left-aligned">
                          {renderCommonItemText(item, index)}
                        </div>
                      ) : (
                        <div
                          className={`vh-vf-photo-card${editing ? " is-editable" : ""}`}
                          role={editing ? "button" : undefined}
                          tabIndex={editing ? 0 : undefined}
                          aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
                          onClick={() => handlePhotoClick(index)}
                          onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                        >
                          {displayUrl ? (
                            <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                          ) : (
                            <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                          )}
                          {editing && <span className="vh-photo-hover-tag">Change</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          LAYOUT 2: FLOWING CURVE (Panel 04)
          ========================================================================= */}
      {activeLayout === "flowing-curve" && (
        <div className="vh-flowing-curve">
          {/* Continuous S-Curve Path */}
          <VelvetFlowingWindingCurve itemCount={nodes.length} />

          {/* Botanical Corner Flourishes */}
          <VelvetCurveCornerLeaf side="left" />
          <VelvetCurveCornerLeaf side="right" />

          <div className="vh-fc-list">
            {nodes.map((item, index) => {
              const isEven = index % 2 === 0;
              const displayUrl =
                item.url || DEFAULT_VELVET_STORY[index % DEFAULT_VELVET_STORY.length]?.url || "";
              const tilts = [-3.5, 3.5, -2.5, 3.8, -3];
              const tiltDeg = tilts[index % tilts.length];

              return (
                <Reveal key={`vh-fc-${index}`}>
                  <div className={`vh-fc-row ${isEven ? "is-even" : "is-odd"}`}>
                    {/* Left Column */}
                    <div className="vh-fc-col vh-fc-left">
                      {isEven ? (
                        <div
                          className={`vh-fc-photo-card${editing ? " is-editable" : ""}`}
                          style={{ "--fc-tilt": `${tiltDeg}deg` } as React.CSSProperties}
                          role={editing ? "button" : undefined}
                          tabIndex={editing ? 0 : undefined}
                          aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
                          onClick={() => handlePhotoClick(index)}
                          onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                        >
                          <div className="vh-fc-photo-inner">
                            {displayUrl ? (
                              <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                            ) : (
                              <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                            )}
                          </div>
                          {editing && <span className="vh-photo-hover-tag">Change</span>}
                        </div>
                      ) : (
                        <div className="vh-fc-text-wrap is-left-col">
                          <div className="vh-fc-text-body">{renderCommonItemText(item, index)}</div>
                          <span className="vh-fc-curve-heart" aria-hidden="true">
                            ♥
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="vh-fc-col vh-fc-right">
                      {isEven ? (
                        <div className="vh-fc-text-wrap is-right-col">
                          <span className="vh-fc-curve-heart" aria-hidden="true">
                            ♥
                          </span>
                          <div className="vh-fc-text-body">{renderCommonItemText(item, index)}</div>
                        </div>
                      ) : (
                        <div
                          className={`vh-fc-photo-card${editing ? " is-editable" : ""}`}
                          style={{ "--fc-tilt": `${tiltDeg}deg` } as React.CSSProperties}
                          role={editing ? "button" : undefined}
                          tabIndex={editing ? 0 : undefined}
                          aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
                          onClick={() => handlePhotoClick(index)}
                          onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                        >
                          <div className="vh-fc-photo-inner">
                            {displayUrl ? (
                              <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                            ) : (
                              <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                            )}
                          </div>
                          {editing && <span className="vh-photo-hover-tag">Change</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          LAYOUT 3: MODERN STRIP (Panel 05)
          ========================================================================= */}
      {activeLayout === "modern-strip" && (
        <div className="vh-modern-strip">
          <div
            className="vh-ms-track"
            style={{ "--ms-count": nodes.length } as React.CSSProperties}
          >
            {nodes.map((item, index) => {
              const displayUrl =
                item.url || DEFAULT_VELVET_STORY[index % DEFAULT_VELVET_STORY.length]?.url || "";

              return (
                <Reveal key={`vh-ms-${index}`} className="vh-ms-col-reveal">
                  <div className="vh-ms-col">
                    {/* Tall Vertical Portrait Photo Card */}
                    <div
                      className={`vh-ms-photo-card${editing ? " is-editable" : ""}`}
                      role={editing ? "button" : undefined}
                      tabIndex={editing ? 0 : undefined}
                      aria-label={editing ? `Change photo for ${item.title || "milestone"}` : undefined}
                      onClick={() => handlePhotoClick(index)}
                      onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                    >
                      {displayUrl ? (
                        <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                      ) : (
                        <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                      )}
                      {editing && <span className="vh-photo-hover-tag">Change</span>}
                    </div>

                    {/* Vertical Connector Drop Line */}
                    <div className="vh-ms-drop-line" aria-hidden="true" />

                    {/* Golden Circular Icon Badge */}
                    <div className="vh-ms-icon-badge" aria-hidden="true">
                      <VelvetStoryMilestoneIcon kind={item.icon || item.title} index={index} />
                    </div>

                    {/* Milestone Text Below */}
                    <div className="vh-ms-text-block">
                      {editing ? (
                        <>
                          <EditableField
                            value={item.date}
                            editable
                            className="vh-item-date"
                            maxLength={LOVE_STORY_ITEM_MAX.date}
                            onCommit={(value) => onCommitItem(index, "date", value)}
                          />
                          <EditableField
                            value={item.title}
                            editable
                            className="vh-item-title"
                            maxLength={LOVE_STORY_ITEM_MAX.title}
                            onCommit={(value) => onCommitItem(index, "title", value)}
                          />
                          <EditableField
                            value={item.place}
                            editable
                            multiline
                            className="vh-item-desc"
                            maxLength={LOVE_STORY_ITEM_MAX.place}
                            onCommit={(value) => onCommitItem(index, "place", value)}
                          />
                          {nodes.length > 1 ? (
                            <button
                              type="button"
                              className="vh-cap-title vh-t-remove"
                              onClick={() => onRemoveItem(index)}
                            >
                              Remove
                            </button>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <time className="vh-item-date">{item.date}</time>
                          <h3 className="vh-item-title">{item.title}</h3>
                          <p className="vh-item-desc">{item.place}</p>
                        </>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Ornate Botanical Divider */}
          <Reveal>
            <VelvetModernStripFlourish />
          </Reveal>
        </div>
      )}

      {/* =========================================================================
          LAYOUT 0: RAIL (Original Horizontal Track)
          ========================================================================= */}
      {activeLayout === "rail" && (
        <div className="vh-timeline-track">
          <div className="vh-timeline-rail" aria-hidden="true" />
          {nodes.map((item, index) => {
            const displayUrl =
              item.url || DEFAULT_VELVET_STORY[index % DEFAULT_VELVET_STORY.length]?.url || "";

            return (
              <Reveal key={`vh-tl-${index}`}>
                <div className="vh-t-node">
                  <div
                    className={`vh-t-circle${editing ? " is-editable" : ""}`}
                    role={editing ? "button" : undefined}
                    tabIndex={editing ? 0 : undefined}
                    aria-label={editing ? `Change timeline photo ${index + 1}` : undefined}
                    onClick={() => handlePhotoClick(index)}
                    onKeyDown={(e) => handlePhotoKeyDown(e, index)}
                  >
                    {displayUrl ? (
                      <img src={displayUrl} alt={item.title || `Moment ${index + 1}`} />
                    ) : (
                      <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                    )}
                    {editing && <span className="vh-photo-hover-tag">Change</span>}
                  </div>
                  {editing ? (
                    <>
                      <EditableField
                        value={item.date}
                        editable
                        className="vh-t-time"
                        maxLength={LOVE_STORY_ITEM_MAX.date}
                        onCommit={(value) => onCommitItem(index, "date", value)}
                      />
                      <EditableField
                        value={item.title}
                        editable
                        className="vh-t-title"
                        maxLength={LOVE_STORY_ITEM_MAX.title}
                        onCommit={(value) => onCommitItem(index, "title", value)}
                      />
                      <EditableField
                        value={item.place}
                        editable
                        multiline
                        className="vh-t-desc"
                        maxLength={LOVE_STORY_ITEM_MAX.place}
                        onCommit={(value) => onCommitItem(index, "place", value)}
                      />
                      {nodes.length > 1 ? (
                        <button
                          type="button"
                          className="vh-cap-title vh-t-remove"
                          onClick={() => onRemoveItem(index)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <time className="vh-t-time">{item.date}</time>
                      <h3 className="vh-t-title">{item.title}</h3>
                      <p className="vh-t-desc">{item.place}</p>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      )}

      {/* Editor Controls */}
      {editing && nodes.length < MAX_LOVE_STORY_ITEMS ? (
        <button type="button" className="vh-cap-title vh-t-add" onClick={onAddItem}>
          Add timeline moment
        </button>
      ) : null}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChangeImage(uploadIndex, file);
          event.target.value = "";
        }}
      />
    </section>
  );
}
