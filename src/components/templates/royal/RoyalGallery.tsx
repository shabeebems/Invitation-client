"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, {
  GALLERY_LAYOUTS,
  normalizeLayoutId,
  type GalleryLayout,
} from "@/components/templates/royal/LayoutPicker";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

export type { GalleryLayout };

const POLAROID_TILTS = [-6, 4, -3, 5, -5, 3, -4, 6];
const SCRAPBOOK_STYLES = [
  { rotate: -8, x: "4%", y: "6%", z: 3, w: "42%" },
  { rotate: 5, x: "48%", y: "2%", z: 5, w: "40%" },
  { rotate: -3, x: "22%", y: "38%", z: 4, w: "38%" },
  { rotate: 7, x: "58%", y: "34%", z: 6, w: "36%" },
  { rotate: -5, x: "8%", y: "62%", z: 2, w: "40%" },
  { rotate: 4, x: "50%", y: "58%", z: 7, w: "42%" },
  { rotate: -6, x: "30%", y: "78%", z: 5, w: "34%" },
  { rotate: 3, x: "62%", y: "80%", z: 3, w: "32%" },
];

export default function RoyalGallery({
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
  onLayoutChange: (layout: GalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayout = normalizeLayoutId(layout, GALLERY_LAYOUTS, "masonry");
  const photos = items.length ? items : [];

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, photos.length]);

  function pickPhoto(index: number) {
    setUploadIndex(index);
    fileInputRef.current?.click();
  }

  function openPhoto(index: number) {
    if (editing) {
      pickPhoto(index);
      return;
    }
    if (photos[index]?.url) {
      setActiveIndex(index);
    }
  }

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section id="gallery" className="rr-section rr-gallery" style={{ color: "#e7d3a4" }}>
      <div className="rr-section-inner rr-gallery-inner">
        <p className="rr-eyebrow font-caps" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
          {field("galleryEyebrow", "rr-eyebrow font-caps text-[#b9893e]")}
        </p>
        <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
          {field("galleryTitle", "rr-script-title font-names text-[#e7d3a4]")}
        </h2>
        <p className="rr-section-intro font-invite-serif" style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}>
          {field("galleryIntro", "rr-section-intro font-invite-serif text-[#f3e8cd]", true)}
        </p>

        {editing ? (
          <LayoutPicker
            options={GALLERY_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Gallery"
          />
        ) : null}

        {photos.length === 0 && !editing ? (
          <p className="rr-gallery-empty font-caps">Photos coming soon</p>
        ) : null}

        {activeLayout === "grid" ? (
          <div className="rr-gal-grid">
            {photos.map((item, index) => (
              <GalleryTile
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                editing={editing}
                className="rr-gal-tile"
                onOpen={() => openPhoto(index)}
                onRemove={() => onRemoveItem(index)}
                onCommit={onCommitItem}
              />
            ))}
          </div>
        ) : null}

        {activeLayout === "masonry" ? (
          <div className="rr-gal-masonry">
            {photos.map((item, index) => (
              <GalleryTile
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                editing={editing}
                className={`rr-gal-tile rr-gal-masonry-item is-${(index % 5) + 1}`}
                onOpen={() => openPhoto(index)}
                onRemove={() => onRemoveItem(index)}
                onCommit={onCommitItem}
              />
            ))}
          </div>
        ) : null}

        {activeLayout === "polaroid" ? (
          <div className="rr-gal-polaroid">
            {photos.map((item, index) => (
              <GalleryTile
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                editing={editing}
                className="rr-gal-tile rr-gal-polaroid-item"
                style={{ transform: `rotate(${POLAROID_TILTS[index % POLAROID_TILTS.length]}deg)` }}
                onOpen={() => openPhoto(index)}
                onRemove={() => onRemoveItem(index)}
                onCommit={onCommitItem}
                showCaption
              />
            ))}
          </div>
        ) : null}

        {activeLayout === "carousel" ? (
          <div className="rr-gal-carousel" role="region" aria-label="Photo carousel">
            {photos.map((item, index) => (
              <GalleryTile
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                editing={editing}
                className="rr-gal-tile rr-gal-carousel-item"
                onOpen={() => openPhoto(index)}
                onRemove={() => onRemoveItem(index)}
                onCommit={onCommitItem}
              />
            ))}
          </div>
        ) : null}

        {activeLayout === "scrapbook" ? (
          <div className="rr-gal-scrapbook">
            <span className="rr-gal-scrap-seal" aria-hidden="true">
              ❦
            </span>
            {photos.map((item, index) => {
              const pose = SCRAPBOOK_STYLES[index % SCRAPBOOK_STYLES.length];
              return (
                <GalleryTile
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  editing={editing}
                  className="rr-gal-tile rr-gal-scrap-item"
                  style={{
                    left: pose.x,
                    top: pose.y,
                    width: pose.w,
                    zIndex: pose.z,
                    transform: `rotate(${pose.rotate}deg)`,
                  }}
                  onOpen={() => openPhoto(index)}
                  onRemove={() => onRemoveItem(index)}
                  onCommit={onCommitItem}
                  showCaption
                />
              );
            })}
          </div>
        ) : null}

        {editing && items.length < MAX_GALLERY_ITEMS ? (
          <div className="rr-timeline-add-wrap">
            <button type="button" className="rr-timeline-add" onClick={onAddItem} aria-label="Add gallery photo">
              +
            </button>
            <p className="rr-timeline-add-label font-caps">Add photo</p>
          </div>
        ) : null}
        {editing && items.length >= MAX_GALLERY_ITEMS ? (
          <p className="rr-timeline-add-limit font-caps">Maximum {MAX_GALLERY_ITEMS} photos</p>
        ) : null}

        {editing ? (
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                onChangeImage(uploadIndex, file);
              }
              event.target.value = "";
            }}
          />
        ) : null}
      </div>

      {activePhoto ? (
        <div className="rr-lightbox" role="dialog" aria-modal="true" onClick={() => setActiveIndex(null)}>
          <div className="rr-lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="rr-lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close">
              ×
            </button>
            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  className="rr-lightbox-nav is-prev"
                  onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length))}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="rr-lightbox-nav is-next"
                  onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length))}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            ) : null}
            <img src={activePhoto.url} alt={activePhoto.title || "Gallery photo"} />
            <div className="rr-lightbox-meta">
              <p className="font-caps">{activePhoto.eyebrow}</p>
              <h3 className="font-invite-serif">{activePhoto.title}</h3>
              <p className="font-invite-serif">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryTile({
  item,
  index,
  editing,
  className,
  style,
  onOpen,
  onRemove,
  onCommit,
  showCaption,
}: {
  item: GalleryItem;
  index: number;
  editing: boolean;
  className: string;
  style?: CSSProperties;
  onOpen: () => void;
  onRemove: () => void;
  onCommit: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  showCaption?: boolean;
}) {
  return (
    <article className={className} style={style}>
      <button type="button" className="rr-gal-shot" onClick={onOpen} aria-label={item.title || `Photo ${index + 1}`}>
        {item.url ? (
          <img src={item.url} alt={item.title || `Photo ${index + 1}`} />
        ) : (
          <span className="rr-gal-empty font-caps">Add photo</span>
        )}
      </button>

      {editing ? (
        <button type="button" className="rr-timeline-remove" onClick={onRemove} aria-label="Remove photo">
          ×
        </button>
      ) : null}

      {showCaption || editing ? (
        <div className="rr-gal-caption">
          {editing ? (
            <>
              <EditableField
                value={item.eyebrow}
                editable
                className="rr-gal-eyebrow font-caps"
                maxLength={GALLERY_ITEM_MAX.eyebrow}
                onCommit={(value) => onCommit(index, "eyebrow", value)}
              />
              <EditableField
                value={item.title}
                editable
                className="rr-gal-title font-invite-serif"
                maxLength={GALLERY_ITEM_MAX.title}
                onCommit={(value) => onCommit(index, "title", value)}
              />
              <EditableField
                value={item.caption}
                editable
                multiline
                className="rr-gal-text font-invite-serif"
                maxLength={GALLERY_ITEM_MAX.caption}
                onCommit={(value) => onCommit(index, "caption", value)}
              />
            </>
          ) : (
            <>
              {item.title ? <p className="rr-gal-title font-names">{item.title}</p> : null}
              {item.caption ? <p className="rr-gal-text font-invite-serif">{item.caption}</p> : null}
            </>
          )}
        </div>
      ) : null}
    </article>
  );
}
