"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFoliage, VelvetGoldOrnament } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_GALLERY_LAYOUTS,
  type VelvetGalleryLayout,
} from "@/components/templates/velvet/velvet-layouts";
import { GALLERY_ITEM_MAX } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const SLOT_CLASS = ["gal-left-tall", "gal-center-wide", "gal-right-top", "gal-right-bottom"] as const;
const VELVET_GALLERY_MAX = 4;

function stopCardClick(event: MouseEvent) {
  event.stopPropagation();
}

export default function VelvetGallery({
  items,
  layout,
  editing,
  field,
  onLayoutChange,
  onCommitItem,
  onRemoveItem,
  onChangeImage,
}: {
  items: GalleryItem[];
  layout?: string;
  editing: boolean;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: VelvetGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeLayout = normalizeLayoutId(layout, VELVET_GALLERY_LAYOUTS, "mosaic");
  const photos = items.slice(0, VELVET_GALLERY_MAX);
  const mosaic: GalleryItem[] = Array.from({ length: VELVET_GALLERY_MAX }, (_, index) => {
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
  const showQuote = activeLayout === "arch-rail" || activeLayout === "mosaic";
  const showView = activeLayout !== "mosaic";

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

  function openView(event: MouseEvent, index: number) {
    event.preventDefault();
    event.stopPropagation();
    if (photos[index]?.url) setActiveIndex(index);
    else if (editing) pickPhoto(index);
  }

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  const heading = (
    <div className="vh-gal-head">
      <Reveal>
        <div className="vh-cap-title vh-gal-eyebrow">
          {field("galleryEyebrow", "vh-cap-title vh-gal-eyebrow")}
        </div>
      </Reveal>
      {activeLayout === "mosaic" ? (
        <Reveal>
          <VelvetGoldOrnament />
        </Reveal>
      ) : null}
      <Reveal>
        <h2 className="vh-script vh-gal-title">{field("galleryTitle", "vh-script vh-gal-title")}</h2>
      </Reveal>
      {showQuote ? (
        <Reveal>
          <p className="vh-gal-quote">{field("galleryIntro", "vh-gal-quote", true)}</p>
        </Reveal>
      ) : null}
    </div>
  );

  const stage = (
    <div className={`vh-gallery-stage is-${activeLayout}`}>
      {mosaic.map((item, index) => (
        <article
          key={`vh-gal-${index}`}
          className={`vh-gal-item is-${activeLayout}${
            activeLayout === "mosaic" ? ` ${SLOT_CLASS[index]}` : ""
          } tilt-${index}`}
        >
          <button
            type="button"
            className="vh-gal-photo"
            aria-label={editing ? `Change gallery photo ${index + 1}` : `View photo ${index + 1}`}
            onClick={() => openPhoto(index)}
          >
            {item.url ? (
              <img src={item.url} alt={item.title || `Gallery ${index + 1}`} />
            ) : (
              <span className="vh-cap-title vh-photo-placeholder">Add photo</span>
            )}
          </button>

          {showView && !editing ? (
            <button
              type="button"
              className="vh-cap-title vh-gal-view"
              onClick={(event) => openView(event, index)}
            >
              View <span aria-hidden="true">→</span>
            </button>
          ) : null}

          {editing ? (
            <div className="vh-gal-edit-meta" onClick={stopCardClick} onPointerDown={stopCardClick}>
              <EditableField
                value={item.title}
                editable
                className="vh-gal-edit-title"
                maxLength={GALLERY_ITEM_MAX.title}
                onCommit={(value) => onCommitItem(index, "title", value)}
              />
              {item.url || item.title ? (
                <button
                  type="button"
                  className="vh-cap-title vh-gal-remove"
                  onClick={() => onRemoveItem(index)}
                >
                  Remove
                </button>
              ) : null}
            </div>
          ) : activeLayout === "mosaic" && item.title ? (
            <p className="vh-gal-caption">{item.title}</p>
          ) : null}
        </article>
      ))}
    </div>
  );

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

      {activeLayout === "arch-rail" ? (
        <div className="vh-gal-split">
          {heading}
          <Reveal>{stage}</Reveal>
        </div>
      ) : (
        <>
          {heading}
          <Reveal>{stage}</Reveal>
          {activeLayout === "view-strip" || activeLayout === "polaroids" ? (
            <Reveal>
              <VelvetGoldOrnament />
            </Reveal>
          ) : null}
        </>
      )}

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
