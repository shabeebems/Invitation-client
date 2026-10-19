"use client";

import { useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_GALLERY_LAYOUTS,
  type AureliaGalleryLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const FALLBACK_GRADIENTS = [
  "radial-gradient(ellipse at 30% 20%,#c9a29b55,transparent 60%),linear-gradient(160deg,#2b3a67,#c9a29b)",
  "radial-gradient(ellipse at 30% 20%,#dcc9a655,transparent 60%),linear-gradient(160deg,#0f1a3a,#dcc9a6)",
  "radial-gradient(ellipse at 30% 20%,#f5efe455,transparent 60%),linear-gradient(160deg,#c9a29b,#f5efe4)",
  "radial-gradient(ellipse at 30% 20%,#121b3655,transparent 60%),linear-gradient(160deg,#a88457,#121b36)",
  "radial-gradient(ellipse at 30% 20%,#f5efe455,transparent 60%),linear-gradient(160deg,#3a4a78,#f5efe4)",
];

export default function AureliaGallery({
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
  onLayoutChange: (layout: AureliaGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const activeLayout = normalizeLayoutId(layout, AURELIA_GALLERY_LAYOUTS, "horizontal-rail");
  const frames = items.length ? items : [];

  return (
    <section className="au-sec au-story-gal" id="gallery" data-layout={activeLayout}>
      {editing ? (
        <LayoutPicker
          options={AURELIA_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-head au-wrap">
        <Reveal>
          <p className="au-eyebrow">{field("galleryEyebrow", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">{field("galleryTitle", "au-h2")}</h2>
        </Reveal>
      </div>

      <div className="au-rail">
        {(frames.length
          ? frames
          : Array.from({ length: 5 }, () => ({
              eyebrow: "",
              title: "",
              caption: "",
              url: "",
              publicId: "",
            }))
        ).map((item, index) => (
          <figure key={`au-gal-${index}`} className="au-frame">
            <Reveal>
              <div
                className={`au-frame-art${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? `Change frame ${index + 1}` : item.caption || undefined}
                onClick={() => {
                  if (!editing) return;
                  setUploadIndex(index);
                  fileRef.current?.click();
                }}
                onKeyDown={(e) => {
                  if (editing && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setUploadIndex(index);
                    fileRef.current?.click();
                  }
                }}
              >
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.caption || item.title || ""} />
                ) : (
                  <div
                    className="au-art"
                    style={{ background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length] }}
                  />
                )}
              </div>
              <figcaption>
                <EditableField
                  value={item.caption || item.title || ""}
                  editable={editing}
                  maxLength={GALLERY_ITEM_MAX.caption}
                  onCommit={(value) => onCommitItem(index, "caption", value)}
                  className="au-frame-cap"
                />
              </figcaption>
              {editing && frames.length > 1 ? (
                <button type="button" className="au-remove" onClick={() => onRemoveItem(index)}>
                  Remove
                </button>
              ) : null}
            </Reveal>
          </figure>
        ))}
      </div>

      {editing && frames.length < MAX_GALLERY_ITEMS ? (
        <button type="button" className="au-add" onClick={onAddItem}>
          Add frame
        </button>
      ) : null}

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
