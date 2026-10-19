"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { PalaceHeartRule } from "@/components/templates/palace/PalaceDecor";
import {
  PALACE_GALLERY_LAYOUTS,
  type PalaceGalleryLayout,
} from "@/components/templates/palace/palace-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

export default function PalaceGallery({
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
  onLayoutChange: (layout: PalaceGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayout = normalizeLayoutId(layout, PALACE_GALLERY_LAYOUTS, "polaroid");
  const photos = items.length ? items : [];
  const slots: GalleryItem[] = Array.from({ length: 4 }, (_, index) => {
    return photos[index] || { eyebrow: "", title: "", caption: "", url: "", publicId: "" };
  });

  useEffect(() => {
    if (activeIndex === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      else if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? null : (prev - 1 + photos.length) % photos.length));
      } else if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, photos.length]);

  function openPhoto(index: number) {
    if (editing) {
      setUploadIndex(index);
      fileInputRef.current?.click();
      return;
    }
    if (photos[index]?.url) setActiveIndex(index);
  }

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section className="pp-gallery" id="gallery" data-layout={activeLayout} aria-label="Couple photo gallery">
      {editing ? (
        <LayoutPicker
          options={PALACE_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="pp-layout-picker"
        />
      ) : null}

      <div className="pp-section-head">
        <h2 className="pp-script pp-section-script">{field("galleryEyebrow", "pp-script pp-section-script")}</h2>
        <PalaceHeartRule />
        <p className="pp-kicker soft">{field("galleryTitle", "pp-kicker soft")}</p>
      </div>

      <div className="pp-gallery-grid">
        <div className="pp-gal-side is-left" onClick={() => openPhoto(0)} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPhoto(0); } }}>
          <div className="pp-polaroid is-tilt-left">
            {slots[0].url ? <img src={slots[0].url} alt={slots[0].title || "Gallery 1"} /> : <span className="pp-photo-placeholder">Add photo</span>}
            {editing ? (
              <EditableField value={slots[0].title} editable className="pp-polaroid-caption" maxLength={GALLERY_ITEM_MAX.title}
                onCommit={(v) => onCommitItem(0, "title", v)} />
            ) : (
              <p className="pp-polaroid-caption script">{slots[0].title || "Mehendi Glow"}</p>
            )}
          </div>
        </div>

        <div className="pp-gal-center" onClick={() => openPhoto(1)} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPhoto(1); } }}>
          <div className="pp-polaroid is-wide">
            {slots[1].url ? <img src={slots[1].url} alt={slots[1].title || "Gallery 2"} /> : <span className="pp-photo-placeholder">Add photo</span>}
            <div className="pp-wide-meta">
              {editing ? (
                <>
                  <EditableField value={slots[1].eyebrow} editable className="pp-wide-eyebrow" maxLength={GALLERY_ITEM_MAX.eyebrow}
                    onCommit={(v) => onCommitItem(1, "eyebrow", v)} />
                  <EditableField value={slots[1].caption} editable className="pp-wide-caption" maxLength={GALLERY_ITEM_MAX.caption}
                    onCommit={(v) => onCommitItem(1, "caption", v)} />
                </>
              ) : (
                <>
                  <span>{slots[1].eyebrow || "Udaipur Moments"}</span>
                  <span>✦</span>
                  <span className="italic">{slots[1].caption || "Lake Pichola Sunset"}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pp-gal-side is-right">
          {[2, 3].map((index) => (
            <div
              key={`pp-gal-${index}`}
              className={`pp-polaroid ${index === 2 ? "is-tilt-right" : "is-tilt-left"}`}
              onClick={() => openPhoto(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPhoto(index);
                }
              }}
            >
              {slots[index].url ? (
                <img src={slots[index].url} alt={slots[index].title || `Gallery ${index + 1}`} />
              ) : (
                <span className="pp-photo-placeholder">Add photo</span>
              )}
              {editing ? (
                <div className="pp-gal-edit-row">
                  <EditableField
                    value={slots[index].title}
                    editable
                    className="pp-polaroid-caption caps"
                    maxLength={GALLERY_ITEM_MAX.title}
                    onCommit={(v) => onCommitItem(index, "title", v)}
                  />
                  {photos.length > 1 ? (
                    <button
                      type="button"
                      className="pp-chip-btn tiny"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveItem(index);
                      }}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ) : (
                <p className="pp-polaroid-caption caps">{slots[index].title}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {editing && photos.length < MAX_GALLERY_ITEMS ? (
        <button type="button" className="pp-chip-btn" onClick={onAddItem}>
          Add gallery photo
        </button>
      ) : null}

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

      {activePhoto?.url ? (
        <div
          className="pp-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button type="button" className="pp-lb-close" aria-label="Close" onClick={() => setActiveIndex(null)}>
            ×
          </button>
          <div className="pp-lb-frame">
            <img src={activePhoto.url} alt={activePhoto.title || "Gallery photo"} />
            <p className="pp-lb-caption">{activePhoto.title || activePhoto.caption}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
