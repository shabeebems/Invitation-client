"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { FlourishRule, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_GALLERY_LAYOUTS,
  type BotanicalGalleryLayout,
} from "@/components/templates/botanical/botanical-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const EMPTY_ITEM: GalleryItem = { eyebrow: "", title: "", caption: "", url: "", publicId: "" };

const MOSAIC_SLOT_CLASS = [
  "bs-gal-tall",
  "bs-gal-stack-top",
  "bs-gal-stack-bottom",
  "bs-gal-tall",
  "bs-gal-stack-top",
  "bs-gal-stack-bottom",
  "bs-gal-tall",
];

const PEBBLE_SLOT_CLASS = [
  "is-hero",
  "is-couple",
  "is-rings",
  "is-lake",
  "is-bloom",
  "is-henna",
  "is-dusk",
];

function padSlots(photos: GalleryItem[], count: number) {
  return Array.from({ length: count }, (_, index) => photos[index] || EMPTY_ITEM);
}

function stopMetaClick(event: MouseEvent) {
  event.stopPropagation();
}

function GalleryDiamond() {
  return <span className="bs-gal-diamond" aria-hidden="true" />;
}

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
  const stripRef = useRef<HTMLDivElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [stripPage, setStripPage] = useState(0);
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_GALLERY_LAYOUTS, "mosaic-five");
  const photos = items.length ? items : [];
  const mosaicSlots = padSlots(photos, 7);
  const evenSlots = editing ? padSlots(photos, Math.max(photos.length, 8)) : photos;
  const featureSlots = padSlots(photos, 7);
  const pebbleSlots = padSlots(photos, 7);
  const stripItems = photos.length ? photos : editing ? [EMPTY_ITEM] : [];

  function openPhoto(index: number) {
    if (editing) {
      setUploadIndex(index);
      fileInputRef.current?.click();
    }
  }

  function stripStep() {
    const el = stripRef.current;
    const card = el?.querySelector<HTMLElement>(".bs-gal-tile");
    if (!el || !card) return 0;
    const styles = window.getComputedStyle(el);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
    return card.offsetWidth + gap;
  }

  function scrollStrip(direction: -1 | 1) {
    const el = stripRef.current;
    const step = stripStep();
    if (!el || !step) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function onStripScroll() {
    const el = stripRef.current;
    const step = stripStep();
    if (!el || !step) return;
    setStripPage(Math.round(el.scrollLeft / step));
  }

  const tileProps = {
    editing,
    onOpen: openPhoto,
    onCommitItem,
    onRemoveItem,
    canRemove: photos.length > 1,
  };

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

      <div className="bs-gallery-head">
        <Reveal>
          <FlourishRule>
            <h2 className="bs-section-eyebrow">{field("galleryEyebrow", "bs-section-eyebrow")}</h2>
          </FlourishRule>
        </Reveal>
        <p className="bs-gallery-lead">{field("galleryIntro", "bs-gallery-lead", true)}</p>
      </div>

      {activeLayout === "mosaic-five" ? (
        <div className="bs-gallery-mosaic">
          <GalleryCell item={mosaicSlots[0]} index={0} className={MOSAIC_SLOT_CLASS[0]} {...tileProps} />
          <div className="bs-gal-stack">
            <GalleryCell item={mosaicSlots[1]} index={1} className={MOSAIC_SLOT_CLASS[1]} {...tileProps} />
            <GalleryCell item={mosaicSlots[2]} index={2} className={MOSAIC_SLOT_CLASS[2]} {...tileProps} />
          </div>
          <GalleryCell item={mosaicSlots[3]} index={3} className={MOSAIC_SLOT_CLASS[3]} {...tileProps} />
          <div className="bs-gal-stack">
            <GalleryCell item={mosaicSlots[4]} index={4} className={MOSAIC_SLOT_CLASS[4]} {...tileProps} />
            <GalleryCell item={mosaicSlots[5]} index={5} className={MOSAIC_SLOT_CLASS[5]} {...tileProps} />
          </div>
          <GalleryCell item={mosaicSlots[6]} index={6} className={MOSAIC_SLOT_CLASS[6]} {...tileProps} />
        </div>
      ) : null}

      {activeLayout === "even-grid" ? (
        <div className="bs-gal-even">
          {evenSlots.map((item, index) => (
            <GalleryTile key={`even-${index}`} item={item} index={index} caption="below" {...tileProps} />
          ))}
        </div>
      ) : null}

      {activeLayout === "feature-board" ? (
        <div className="bs-gal-feature">
          <GalleryTile
            item={featureSlots[0]}
            index={0}
            caption="overlay"
            className="bs-gal-feature-hero"
            {...tileProps}
          />
          <div className="bs-gal-feature-grid">
            {featureSlots.slice(1).map((item, index) => (
              <GalleryTile
                key={`feat-${index + 1}`}
                item={item}
                index={index + 1}
                caption="below"
                {...tileProps}
              />
            ))}
          </div>
        </div>
      ) : null}

      {activeLayout === "film-strip" ? (
        <div className="bs-gal-strip-stage">
          <button
            type="button"
            className="bs-gal-arrow is-prev"
            aria-label="Previous photos"
            onClick={() => scrollStrip(-1)}
          >
            ‹
          </button>
          <div className="bs-gal-strip" ref={stripRef} onScroll={onStripScroll}>
            {stripItems.map((item, index) => (
              <GalleryTile
                key={`strip-${index}`}
                item={item}
                index={index}
                caption="below"
                diamond
                className="bs-gal-strip-card"
                {...tileProps}
              />
            ))}
          </div>
          <button
            type="button"
            className="bs-gal-arrow is-next"
            aria-label="Next photos"
            onClick={() => scrollStrip(1)}
          >
            ›
          </button>
          {stripItems.length > 1 ? (
            <div className="bs-gal-dots" role="tablist" aria-label="Gallery pages">
              {stripItems.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  className={`bs-gal-dot${index === stripPage ? " is-active" : ""}`}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === stripPage ? "true" : undefined}
                  onClick={() => {
                    const el = stripRef.current;
                    const step = stripStep();
                    if (!el || !step) return;
                    el.scrollTo({ left: index * step, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {activeLayout === "pebble-mosaic" ? (
        <div className="bs-gal-pebbles">
          {pebbleSlots.map((item, index) => (
            <GalleryTile
              key={`pebble-${index}`}
              item={item}
              index={index}
              caption={index === 0 ? "both" : "below"}
              diamond={index === 0}
              className={PEBBLE_SLOT_CLASS[index]}
              {...tileProps}
            />
          ))}
        </div>
      ) : null}

      {editing && photos.length < MAX_GALLERY_ITEMS ? (
        <button type="button" className="bs-add-btn" onClick={onAddItem}>
          Add gallery photo →
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
  const empty = !item.url && !item.title;
  return (
    <div
      className={`bs-gal-cell ${className}${empty && !editing ? " is-empty" : ""}`}
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
        <div className="bs-gal-edit" onClick={stopMetaClick} onPointerDown={stopMetaClick}>
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

function GalleryTile({
  item,
  index,
  className = "",
  caption,
  diamond = false,
  editing,
  onOpen,
  onCommitItem,
  onRemoveItem,
  canRemove,
}: {
  item: GalleryItem;
  index: number;
  className?: string;
  caption: "below" | "overlay" | "both";
  diamond?: boolean;
  editing: boolean;
  onOpen: (index: number) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onRemoveItem: (index: number) => void;
  canRemove: boolean;
}) {
  const empty = !item.url && !item.title && !item.eyebrow;
  const showOverlay = caption === "overlay" || caption === "both";
  const showBelow = caption === "below" || caption === "both";

  return (
    <figure className={`bs-gal-tile ${className}${empty && !editing ? " is-empty" : ""}`.trim()}>
      <div
        className="bs-gal-shot"
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
        {showOverlay ? (
          <div className="bs-gal-overlay" onClick={stopMetaClick} onPointerDown={stopMetaClick}>
            <p className="bs-gal-kicker">
              {editing ? (
                <EditableField
                  value={item.eyebrow}
                  editable
                  className="bs-gal-kicker"
                  maxLength={GALLERY_ITEM_MAX.eyebrow}
                  onCommit={(value) => onCommitItem(index, "eyebrow", value)}
                />
              ) : (
                item.eyebrow
              )}
            </p>
            <div className="bs-gal-overlay-row">
              <p className="bs-gal-overlay-title">
                {editing ? (
                  <EditableField
                    value={item.title}
                    editable
                    className="bs-gal-overlay-title"
                    maxLength={GALLERY_ITEM_MAX.title}
                    onCommit={(value) => onCommitItem(index, "title", value)}
                  />
                ) : (
                  item.title
                )}
              </p>
              <span className="bs-gal-go" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        ) : null}
      </div>
      {showBelow ? (
        <figcaption className="bs-gal-name" onClick={stopMetaClick} onPointerDown={stopMetaClick}>
          {editing ? (
            <EditableField
              value={item.title}
              editable
              className="bs-gal-name"
              maxLength={GALLERY_ITEM_MAX.title}
              onCommit={(value) => onCommitItem(index, "title", value)}
            />
          ) : (
            item.title
          )}
          {diamond ? <GalleryDiamond /> : null}
          {editing && canRemove ? (
            <button type="button" className="bs-item-remove" onClick={() => onRemoveItem(index)}>
              Remove
            </button>
          ) : null}
        </figcaption>
      ) : editing && canRemove ? (
        <button
          type="button"
          className="bs-item-remove"
          onClick={(event) => {
            event.stopPropagation();
            onRemoveItem(index);
          }}
        >
          Remove
        </button>
      ) : null}
    </figure>
  );
}
