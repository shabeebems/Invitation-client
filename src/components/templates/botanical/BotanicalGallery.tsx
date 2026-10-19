"use client";

import { useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_GALLERY_LAYOUTS,
  type BotanicalGalleryLayout,
} from "@/components/templates/botanical/botanical-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const SLOT_CLASS = [
  "bs-gal-tall",
  "bs-gal-stack-top",
  "bs-gal-stack-bottom",
  "bs-gal-tall",
  "bs-gal-stack-top",
  "bs-gal-stack-bottom",
  "bs-gal-tall",
];

const MOSAIC_SLOTS = 7;

export default function BotanicalGallery({
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
  items: GalleryItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: BotanicalGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_GALLERY_LAYOUTS, "mosaic-five");
  const photos = items.length ? items : [];
  const slots: GalleryItem[] = Array.from({ length: MOSAIC_SLOTS }, (_, index) => {
    return photos[index] || { eyebrow: "", title: "", caption: "", url: "", publicId: "" };
  });

  function openPhoto(index: number) {
    if (editing) {
      setUploadIndex(index);
      fileInputRef.current?.click();
    }
  }

  return (
    <section className="bs-gallery" id="gallery" data-layout={activeLayout} aria-label="Photo gallery">
      {editing ? (
        <LayoutPicker
          options={BOTANICAL_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="bs-layout-picker"
        />
      ) : null}

      <Reveal>
        <FlourishRule>
          <h2 className="bs-section-eyebrow">{field("galleryEyebrow", "bs-section-eyebrow")}</h2>
        </FlourishRule>
      </Reveal>

      <div className="bs-gallery-mosaic">
        {/* Col 1 tall */}
        <GalleryCell
          item={slots[0]}
          index={0}
          className={SLOT_CLASS[0]}
          editing={editing}
          onOpen={openPhoto}
          onCommitItem={onCommitItem}
          onRemoveItem={onRemoveItem}
          canRemove={photos.length > 1}
        />
        {/* Col 2 stack */}
        <div className="bs-gal-stack">
          <GalleryCell
            item={slots[1]}
            index={1}
            className={SLOT_CLASS[1]}
            editing={editing}
            onOpen={openPhoto}
            onCommitItem={onCommitItem}
            onRemoveItem={onRemoveItem}
            canRemove={photos.length > 1}
          />
          <GalleryCell
            item={slots[2]}
            index={2}
            className={SLOT_CLASS[2]}
            editing={editing}
            onOpen={openPhoto}
            onCommitItem={onCommitItem}
            onRemoveItem={onRemoveItem}
            canRemove={photos.length > 1}
          />
        </div>
        {/* Col 3 tall center */}
        <GalleryCell
          item={slots[3]}
          index={3}
          className={SLOT_CLASS[3]}
          editing={editing}
          onOpen={openPhoto}
          onCommitItem={onCommitItem}
          onRemoveItem={onRemoveItem}
          canRemove={photos.length > 1}
        />
        {/* Col 4 stack */}
        <div className="bs-gal-stack">
          <GalleryCell
            item={slots[4]}
            index={4}
            className={SLOT_CLASS[4]}
            editing={editing}
            onOpen={openPhoto}
            onCommitItem={onCommitItem}
            onRemoveItem={onRemoveItem}
            canRemove={photos.length > 1}
          />
          <GalleryCell
            item={slots[5]}
            index={5}
            className={SLOT_CLASS[5]}
            editing={editing}
            onOpen={openPhoto}
            onCommitItem={onCommitItem}
            onRemoveItem={onRemoveItem}
            canRemove={photos.length > 1}
          />
        </div>
        {/* Col 5 tall */}
        <GalleryCell
          item={slots[6]}
          index={6}
          className={SLOT_CLASS[6]}
          editing={editing}
          onOpen={openPhoto}
          onCommitItem={onCommitItem}
          onRemoveItem={onRemoveItem}
          canRemove={photos.length > 1}
        />
      </div>

      {editing && photos.length < MAX_GALLERY_ITEMS ? (
        <button type="button" className="bs-add-btn" onClick={onAddItem}>
          Add gallery photo
        </button>
      ) : null}

      {editing ? (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onChangeImage(uploadIndex, file);
            event.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}

function GalleryCell({
  item,
  index,
  className,
  editing,
  onOpen,
  onCommitItem,
  onRemoveItem,
  canRemove,
}: {
  item: GalleryItem;
  index: number;
  className: string;
  editing: boolean;
  onOpen: (index: number) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onRemoveItem: (index: number) => void;
  canRemove: boolean;
}) {
  return (
    <div
      className={`bs-gal-cell ${className}`}
      role="button"
      tabIndex={0}
      aria-label={editing ? `Change gallery photo ${index + 1}` : item.title || `Gallery ${index + 1}`}
      onClick={() => onOpen(index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(index);
        }
      }}
    >
      {item.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.url} alt={item.title || `Gallery ${index + 1}`} />
      ) : (
        <span className="bs-photo-placeholder">Add photo</span>
      )}
      {editing ? (
        <div className="bs-gal-edit" onClick={(e) => e.stopPropagation()}>
          <EditableField
            value={item.title}
            editable
            className="bs-gal-edit-title"
            maxLength={GALLERY_ITEM_MAX.title}
            onCommit={(value) => onCommitItem(index, "title", value)}
          />
          {canRemove ? (
            <button type="button" className="bs-item-remove" onClick={() => onRemoveItem(index)}>
              Remove
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
