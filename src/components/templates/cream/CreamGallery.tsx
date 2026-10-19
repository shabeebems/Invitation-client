"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_GALLERY_LAYOUTS,
  type CreamGalleryLayout,
} from "@/components/templates/cream/cream-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const FALLBACK: [string, string][] = [
  ["#D8B8AD", "#8b6f5e"],
  ["#E8D9BF", "#A8AE96"],
  ["#A8AE96", "#514137"],
  ["#C6A779", "#D8B8AD"],
  ["#F3EBDD", "#C6A779"],
  ["#D8B8AD", "#A8AE96"],
];

function sizeClass(eyebrow?: string) {
  const v = (eyebrow || "").trim().toLowerCase();
  if (v === "t" || v === "tall") return "t";
  if (v === "w2" || v === "wide") return "w2";
  return "";
}

export default function CreamGallery({
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
  onLayoutChange: (layout: CreamGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [lightIndex, setLightIndex] = useState(0);
  const activeLayout = normalizeLayoutId(layout, CREAM_GALLERY_LAYOUTS, "editorial-mosaic");
  const frames = items.length ? items : [];

  function openLight(index: number) {
    if (editing) return;
    setLightIndex(index);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    if (!frames.length) return;
    setLightIndex((prev) => (prev + delta + frames.length) % frames.length);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onKey(e: KeyboardEvent) {
      if (!dialog?.open) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  });

  const lightItem = frames[lightIndex];
  const lightColors = FALLBACK[lightIndex % FALLBACK.length];

  return (
    <section className="ce-gallery" id="gallery" data-layout={activeLayout}>
      {editing ? (
        <LayoutPicker
          options={CREAM_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w">
        <p className="ce-eyebrow">{field("galleryEyebrow", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">{field("galleryTitle", "ce-h2")}</h2>
        </Reveal>

        <div className="ce-gal">
          {(frames.length
            ? frames
            : Array.from({ length: 6 }, () => ({
                eyebrow: "",
                title: "",
                caption: "",
                url: "",
                publicId: "",
              }))
          ).map((item, index) => {
            const colors = FALLBACK[index % FALLBACK.length];
            const cls = sizeClass(item.eyebrow);
            return (
              <button
                key={`ce-gal-${index}`}
                type="button"
                className={`ce-gal-item ${cls}`.trim()}
                aria-label={`Open photo: ${item.caption || item.title || index + 1}`}
                onClick={() => {
                  if (editing) {
                    setUploadIndex(index);
                    fileRef.current?.click();
                    return;
                  }
                  openLight(index);
                }}
              >
                <Reveal>
                  <div className="ce-gal-media">
                    {item.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.url} alt={item.caption || item.title || ""} />
                    ) : (
                      <CreamPh colors={colors} label={item.caption || item.title || ""} />
                    )}
                  </div>
                  <figcaption>
                    <EditableField
                      value={item.caption || item.title || ""}
                      editable={editing}
                      maxLength={GALLERY_ITEM_MAX.caption}
                      onCommit={(value) => onCommitItem(index, "caption", value)}
                      className="ce-gal-cap"
                    />
                  </figcaption>
                </Reveal>
                {editing && frames.length > 1 ? (
                  <span
                    className="ce-remove"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveItem(index);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemoveItem(index);
                      }
                    }}
                  >
                    Remove
                  </span>
                ) : null}
                {editing ? (
                  <span className="ce-gal-size-hint">
                    Size:{" "}
                    <EditableField
                      value={item.eyebrow || ""}
                      editable
                      maxLength={8}
                      onCommit={(value) => onCommitItem(index, "eyebrow", value)}
                      className="ce-gal-size"
                    />{" "}
                    (t / w2)
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {editing && frames.length < MAX_GALLERY_ITEMS ? (
          <button type="button" className="ce-add" onClick={onAddItem}>
            Add photo
          </button>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="ce-lb"
        aria-label="Photo viewer"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {lightItem ? (
          <>
            <div className="ce-lb-media">
              {lightItem.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lightItem.url} alt={lightItem.caption || ""} />
              ) : (
                <CreamPh colors={lightColors} label={lightItem.caption || ""} />
              )}
            </div>
            <div className="ce-lb-controls">
              <button type="button" className="ce-btn" onClick={() => step(-1)} aria-label="Previous">
                ←
              </button>
              <span>{lightItem.caption || lightItem.title}</span>
              <button type="button" className="ce-btn" onClick={() => step(1)} aria-label="Next">
                →
              </button>
              <button type="button" className="ce-btn" onClick={() => dialogRef.current?.close()}>
                Close
              </button>
            </div>
          </>
        ) : null}
      </dialog>

      {editing ? (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChangeImage(uploadIndex, file);
            e.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}
