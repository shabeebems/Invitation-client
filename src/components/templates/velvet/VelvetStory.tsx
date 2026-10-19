"use client";

import { useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_STORY_LAYOUTS,
  type VelvetStoryLayout,
} from "@/components/templates/velvet/velvet-layouts";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import type { LoveStoryItem } from "@/lib/api";

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
  const activeLayout = normalizeLayoutId(layout, VELVET_STORY_LAYOUTS, "rail");
  const nodes = items.length ? items : [];

  return (
    <section className="vh-timeline" id="story" data-layout={activeLayout}>
      {editing ? (
        <LayoutPicker
          options={VELVET_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Timeline"
          className="vh-layout-picker is-dark"
        />
      ) : null}

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
        <p className="vh-tl-sub">{field("meetCoupleIntro", "vh-tl-sub", true)}</p>
      </Reveal>

      <div className="vh-timeline-track">
        <div className="vh-timeline-rail" aria-hidden="true" />
        {nodes.map((item, index) => (
          <Reveal key={`vh-tl-${index}`}>
            <div className="vh-t-node">
              <div
                className={`vh-t-circle${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? `Change timeline photo ${index + 1}` : undefined}
                onClick={() => {
                  if (!editing) return;
                  setUploadIndex(index);
                  fileRef.current?.click();
                }}
                onKeyDown={(event) => {
                  if (editing && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault();
                    setUploadIndex(index);
                    fileRef.current?.click();
                  }
                }}
              >
                {item.url ? (
                  <img src={item.url} alt={item.title || `Moment ${index + 1}`} />
                ) : (
                  <span className="vh-cap-title vh-photo-placeholder">Photo</span>
                )}
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
        ))}
      </div>

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
