"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFoliage, VelvetGoldOrnament } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_GALLERY_LAYOUTS,
  type VelvetGalleryLayout,
} from "@/components/templates/velvet/velvet-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const SLOT_CLASS = ["gal-left-tall", "gal-center-wide", "gal-right-top", "gal-right-bottom"] as const;

export default function VelvetGallery({
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
  onLayoutChange: (layout: VelvetGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayout = normalizeLayoutId(layout, VELVET_GALLERY_LAYOUTS, "mosaic");
  const photos = items.length ? items : [];
  const mosaic: GalleryItem[] = Array.from({ length: 4 }, (_, index) => {
    return (
      photos[index] || {
        eyebrow: "",
        title: "",
        caption: "",
        url: "",
        publicId: "",
      }
    );
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

  function pickPhoto(index: number) {
    setUploadIndex(index);
    fileInputRef.current?.click();
  }

  function openPhoto(index: number) {
    if (editing) {
      pickPhoto(index);
      return;
    }
    if (photos[index]?.url) setActiveIndex(index);
  }

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section className="vh-gallery" id="gallery" data-layout={activeLayout}>
      <VelvetFoliage className="foliage-tl" />
      <VelvetFoliage className="foliage-tr" />
      <VelvetFoliage className="foliage-bl" />
      <VelvetFoliage className="foliage-br" />

      {editing ? (
        <LayoutPicker
          options={VELVET_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="vh-layout-picker"
        />
      ) : null}

      <Reveal>
        <div className="vh-cap-title vh-gal-eyebrow">
          {field("galleryEyebrow", "vh-cap-title vh-gal-eyebrow")}
        </div>
      </Reveal>
      <Reveal>
        <VelvetGoldOrnament />
      </Reveal>
      <Reveal>
        <h2 className="vh-script vh-gal-title">
          {field("galleryTitle", "vh-script vh-gal-title")}
        </h2>
      </Reveal>
      <Reveal>
        <p className="vh-gal-quote">{field("galleryIntro", "vh-gal-quote", true)}</p>
      </Reveal>

      <Reveal>
        <div className="vh-gallery-grid-4">
          {mosaic.map((item, index) => (
            <div
              key={`vh-gal-${index}`}
              className={`vh-gal-item ${SLOT_CLASS[index]}`}
              role="button"
              tabIndex={0}
              aria-label={editing ? `Change gallery photo ${index + 1}` : `View photo ${index + 1}`}
              onClick={() => openPhoto(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openPhoto(index);
                }
              }}
            >
              {item.url ? (
                <img src={item.url} alt={item.title || `Gallery ${index + 1}`} />
              ) : (
                <span className="vh-cap-title vh-photo-placeholder">Add photo</span>
              )}
              {editing ? (
                <div className="vh-gal-edit-meta">
                  <EditableField
                    value={item.title}
                    editable
                    className="vh-gal-edit-title"
                    maxLength={GALLERY_ITEM_MAX.title}
                    onCommit={(value) => onCommitItem(index, "title", value)}
                  />
                  {photos.length > 1 ? (
                    <button
                      type="button"
                      className="vh-cap-title vh-gal-remove"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveItem(index);
                      }}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Reveal>

      <div className="vh-gallery-bullets" aria-hidden="true">
        <span className="is-active" />
        <span />
        <span />
      </div>

      {editing && photos.length < MAX_GALLERY_ITEMS ? (
        <button type="button" className="vh-cap-title vh-gal-add" onClick={onAddItem}>
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
          className="vh-lightbox open"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <button
            type="button"
            className="vh-lb-btn vh-lb-close"
            aria-label="Close"
            onClick={() => setActiveIndex(null)}
          >
            ×
          </button>
          <button
            type="button"
            className="vh-lb-btn vh-lb-prev"
            aria-label="Previous"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === null ? null : (prev - 1 + photos.length) % photos.length
              )
            }
          >
            ‹
          </button>
          <div className="vh-lb-frame">
            <img src={activePhoto.url} alt={activePhoto.title || "Wedding photograph"} />
          </div>
          <button
            type="button"
            className="vh-lb-btn vh-lb-next"
            aria-label="Next"
            onClick={() =>
              setActiveIndex((prev) => (prev === null ? null : (prev + 1) % photos.length))
            }
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
