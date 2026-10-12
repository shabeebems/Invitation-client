"use client";

import { useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, {
  LOVE_STORY_LAYOUTS,
  normalizeLayoutId,
  type LoveStoryLayout,
} from "@/components/templates/royal/LayoutPicker";
import { LOVE_STORY_ITEM_MAX, MAX_LOVE_STORY_ITEMS } from "@/lib/content-limits";
import ImageCropModal from "@/components/templates/shared/ImageCropModal";
import type { LoveStoryItem } from "@/lib/api";

export type { LoveStoryLayout };

const DEFAULT_STORY: LoveStoryItem[] = [
  { icon: "", date: "", place: "", title: "How we met", url: "", publicId: "" },
  { icon: "", date: "", place: "", title: "First conversation", url: "", publicId: "" },
  { icon: "", date: "", place: "", title: "First date", url: "", publicId: "" },
  { icon: "", date: "", place: "", title: "The proposal", url: "", publicId: "" },
  { icon: "", date: "", place: "", title: "Engagement day", url: "", publicId: "" },
  { icon: "", date: "", place: "", title: "Wedding announcement", url: "", publicId: "" },
];

function HeartNode() {
  return (
    <span className="rr-story-node" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="12" height="12">
        <path
          d="M12 20s-7-4.4-9.5-8.6C.4 8.2 2.2 4.5 6 4.5c2.2 0 3.6 1.3 4.4 2.6.8-1.3 2.2-2.6 4.4-2.6 3.8 0 5.6 3.7 3.5 6.9C19 15.6 12 20 12 20z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ChapterCopy({
  item,
  index,
  editing,
  onCommitItem,
}: {
  item: LoveStoryItem;
  index: number;
  editing: boolean;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
}) {
  return (
    <div className="rr-story-copy">
      {editing ? (
        <EditableField
          value={item.title}
          editable
          className="rr-timeline-title font-caps"
          maxLength={LOVE_STORY_ITEM_MAX.title}
          onCommit={(value) => onCommitItem(index, "title", value)}
        />
      ) : (
        <p className="rr-timeline-title font-caps">{item.title}</p>
      )}
      {editing ? (
        <EditableField
          value={item.date}
          editable
          className="rr-timeline-date font-caps"
          maxLength={LOVE_STORY_ITEM_MAX.date}
          onCommit={(value) => onCommitItem(index, "date", value)}
        />
      ) : item.date ? (
        <p className="rr-timeline-date font-caps">{item.date}</p>
      ) : null}
      {editing ? (
        <EditableField
          value={item.place}
          editable
          className="rr-timeline-place font-caps"
          maxLength={LOVE_STORY_ITEM_MAX.place}
          onCommit={(value) => onCommitItem(index, "place", value)}
        />
      ) : item.place ? (
        <p className="rr-timeline-place font-caps">{item.place}</p>
      ) : null}
    </div>
  );
}

function ChapterShot({
  item,
  index,
  editing,
  onRemove,
  onPick,
}: {
  item: LoveStoryItem;
  index: number;
  editing: boolean;
  onRemove: () => void;
  onPick: () => void;
}) {
  return (
    <div className="rr-story-shot">
      {item.url ? (
        <img src={item.url} alt={item.title || `Chapter ${index + 1}`} />
      ) : (
        <span className="rr-story-shot-empty font-caps">Add photo</span>
      )}
      {editing ? (
        <>
          <button type="button" className="rr-timeline-remove" onClick={onRemove} aria-label={`Remove ${item.title || "chapter"}`}>
            ×
          </button>
          <button type="button" className="rr-story-shot-btn font-caps" onClick={onPick}>
            {item.url ? "Crop / change" : "Add & crop"}
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function RoyalLoveStory({
  groomName,
  brideName,
  items,
  editing,
  layout,
  field,
  onCommitItem,
  onAddItem,
  onRemoveItem,
  onChangeImage,
  onLayoutChange,
}: {
  groomName: string;
  brideName: string;
  items: LoveStoryItem[];
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onCommitItem: (index: number, key: keyof LoveStoryItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
  onLayoutChange?: (layout: LoveStoryLayout) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState("");
  const [cropIndex, setCropIndex] = useState<number | null>(null);
  const story = items.length ? items : DEFAULT_STORY;
  const activeLayout = normalizeLayoutId(layout, LOVE_STORY_LAYOUTS, "journey");
  const cropAspect =
    activeLayout === "magazine" || activeLayout === "album" || activeLayout === "path" ? 3 / 2 : 4 / 5;

  function beginCrop(index: number, file: File) {
    const preview = URL.createObjectURL(file);
    setCropIndex(index);
    setCropSrc(preview);
  }

  function closeCrop() {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc("");
    setCropIndex(null);
  }

  async function saveCrop(file: File) {
    if (cropIndex === null) return;
    onChangeImage(cropIndex, file);
    closeCrop();
  }

  function pickPhoto(index: number) {
    setCropIndex(index);
    fileInputRef.current?.click();
  }

  return (
    <section
      id="love-story"
      className={`rr-section rr-story is-layout-${activeLayout}`}
      style={{ color: "#e7d3a4" }}
    >
      <div className="rr-section-inner rr-story-inner">
        <p className="rr-eyebrow font-caps" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
          Our story
        </p>
        <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
          {field("loveStoryTitle", "rr-script-title font-names text-[#e7d3a4]")}
        </h2>
        <p className="rr-story-names font-caps" style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}>
          <span>{groomName}</span>
          <span className="font-names rr-story-and" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
            and
          </span>
          <span>{brideName}</span>
        </p>

        {editing && onLayoutChange ? (
          <LayoutPicker
            options={LOVE_STORY_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Journey"
          />
        ) : null}

        {activeLayout === "journey" ? (
          <ol className="rr-timeline is-journey">
            {story.map((item, index) => {
              const side = index % 2 === 0 ? "left" : "right";
              return (
                <li key={`${item.title}-${index}`} className={`rr-timeline-item is-${side}`}>
                  <div className="rr-timeline-rail">
                    <HeartNode />
                  </div>
                  <article className="rr-timeline-card">
                    <ChapterShot
                      item={item}
                      index={index}
                      editing={editing}
                      onRemove={() => onRemoveItem(index)}
                      onPick={() => pickPhoto(index)}
                    />
                    <ChapterCopy item={item} index={index} editing={editing} onCommitItem={onCommitItem} />
                  </article>
                </li>
              );
            })}
          </ol>
        ) : null}

        {activeLayout === "magazine" ? (
          <ol className="rr-story-magazine">
            {story.map((item, index) => (
              <li key={`${item.title}-${index}`} className={`rr-story-mag-row is-${index % 2 === 0 ? "odd" : "even"}`}>
                <ChapterShot
                  item={item}
                  index={index}
                  editing={editing}
                  onRemove={() => onRemoveItem(index)}
                  onPick={() => pickPhoto(index)}
                />
                <div className="rr-story-mag-body">
                  <span className="rr-story-index font-caps">{String(index + 1).padStart(2, "0")}</span>
                  <ChapterCopy item={item} index={index} editing={editing} onCommitItem={onCommitItem} />
                </div>
              </li>
            ))}
          </ol>
        ) : null}

        {activeLayout === "cards" ? (
          <ol className="rr-story-cards">
            {story.map((item, index) => (
              <li key={`${item.title}-${index}`} className="rr-story-card">
                <ChapterShot
                  item={item}
                  index={index}
                  editing={editing}
                  onRemove={() => onRemoveItem(index)}
                  onPick={() => pickPhoto(index)}
                />
                <ChapterCopy item={item} index={index} editing={editing} onCommitItem={onCommitItem} />
              </li>
            ))}
          </ol>
        ) : null}

        {activeLayout === "path" ? (
          <ol className="rr-story-path">
            {story.map((item, index) => (
              <li key={`${item.title}-${index}`} className="rr-story-path-item">
                <div className="rr-story-path-rail" aria-hidden="true">
                  <HeartNode />
                </div>
                <article className="rr-story-path-card">
                  <ChapterShot
                    item={item}
                    index={index}
                    editing={editing}
                    onRemove={() => onRemoveItem(index)}
                    onPick={() => pickPhoto(index)}
                  />
                  <ChapterCopy item={item} index={index} editing={editing} onCommitItem={onCommitItem} />
                </article>
              </li>
            ))}
          </ol>
        ) : null}

        {activeLayout === "album" ? (
          <div className="rr-story-album" role="region" aria-label="Journey album">
            {story.map((item, index) => (
              <article key={`${item.title}-${index}`} className="rr-story-album-item">
                <ChapterShot
                  item={item}
                  index={index}
                  editing={editing}
                  onRemove={() => onRemoveItem(index)}
                  onPick={() => pickPhoto(index)}
                />
                <ChapterCopy item={item} index={index} editing={editing} onCommitItem={onCommitItem} />
              </article>
            ))}
          </div>
        ) : null}

        {editing && story.length < MAX_LOVE_STORY_ITEMS ? (
          <div className="rr-timeline-add-wrap">
            <button type="button" className="rr-timeline-add" onClick={onAddItem} aria-label="Add love story chapter">
              +
            </button>
            <p className="rr-timeline-add-label font-caps">Add chapter</p>
          </div>
        ) : null}
        {editing && story.length >= MAX_LOVE_STORY_ITEMS ? (
          <p className="rr-timeline-add-limit font-caps">Maximum {MAX_LOVE_STORY_ITEMS} chapters</p>
        ) : null}

        {editing ? (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file && cropIndex !== null) {
                beginCrop(cropIndex, file);
              }
              event.target.value = "";
            }}
          />
        ) : null}

        <ImageCropModal
          open={Boolean(cropSrc && cropIndex !== null)}
          imageSrc={cropSrc}
          aspect={cropAspect}
          title="Crop chapter photo"
          confirmLabel="Save & upload"
          onCancel={closeCrop}
          onConfirm={saveCrop}
        />
      </div>
    </section>
  );
}
