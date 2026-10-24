"use client";

import { useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaLotus, AureliaSprig, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_GALLERY_LAYOUTS,
  type AureliaGalleryLayout,
} from "@/components/templates/aurelia/aurelia-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const FALLBACK_GRADIENTS = [
  "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-rose) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-art-a),var(--au-rose))",
  "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-champ) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-ink2),var(--au-champ))",
  "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-moon) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-rose),var(--au-moon))",
  "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-ink2) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-bronze),var(--au-ink2))",
  "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-moon) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-art-b),var(--au-moon))",
];

const EMPTY_FRAMES: GalleryItem[] = Array.from({ length: 5 }, () => ({
  eyebrow: "",
  title: "",
  caption: "",
  url: "",
  publicId: "",
}));

function frameNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

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
  const frames = items.length ? items : EMPTY_FRAMES;

  function pickPhoto(index: number) {
    setUploadIndex(index);
    fileRef.current?.click();
  }

  function renderPhoto(item: GalleryItem, index: number, className: string) {
    return (
      <div
        className={`${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change frame ${index + 1}` : item.caption || undefined}
        onClick={() => editing && pickPhoto(index)}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            pickPhoto(index);
          }
        }}
      >
        {item.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt={item.caption || item.title || ""} loading="lazy" />
        ) : (
          <div className="au-art" style={{ background: FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length] }} />
        )}
      </div>
    );
  }

  function renderCaption(item: GalleryItem, index: number, className: string) {
    return (
      <EditableField
        value={item.caption || item.title || ""}
        editable={editing}
        maxLength={GALLERY_ITEM_MAX.caption}
        onCommit={(value) => onCommitItem(index, "caption", value)}
        className={className}
      />
    );
  }

  function renderRemove(index: number) {
    if (!editing || items.length <= 1) return null;
    return (
      <button type="button" className="au-remove" onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    );
  }

  function renderOrnament(className: string) {
    return (
      <span className={className} aria-hidden="true">
        <i />
        <AureliaLotus className="au-sf-lotus" />
        <i />
      </span>
    );
  }

  function renderIntro() {
    return <p className="au-sf-intro">{field("galleryIntro", "", true)}</p>;
  }

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

      {activeLayout === "horizontal-rail" ? (
        <>
          <div className="au-head au-wrap">
            <Reveal>
              <p className="au-eyebrow">{field("galleryEyebrow", "au-eyebrow")}</p>
            </Reveal>
            <Reveal>
              <h2 className="au-h2">{field("galleryTitle", "au-h2")}</h2>
            </Reveal>
          </div>

          <div className="au-rail">
            {frames.map((item, index) => (
              <figure key={`au-gal-${index}`} className="au-frame">
                <Reveal>
                  {renderPhoto(item, index, "au-frame-art")}
                  <figcaption>{renderCaption(item, index, "au-frame-cap")}</figcaption>
                  {renderRemove(index)}
                </Reveal>
              </figure>
            ))}
          </div>
        </>
      ) : null}

      {activeLayout === "framed-row" ? (
        <div className="au-sf au-fr">
          <Reveal className="au-sf-head">
            {renderOrnament("au-sf-orn")}
            <p className="au-eyebrow au-sf-eyebrow">{field("galleryEyebrow", "au-eyebrow")}</p>
            <h2 className="au-sf-title">{field("galleryTitle", "")}</h2>
            {renderIntro()}
          </Reveal>
          <div className="au-sf-row au-fr-row">
            {frames.map((item, index) => (
              <Reveal key={`au-fr-${index}`} className="au-sf-cell au-fr-cell" delay={`${(index % 5) * 0.1}s`}>
                <figure className="au-fr-card">
                  {renderPhoto(item, index, "au-sf-photo au-fr-photo")}
                  <figcaption className="au-sf-capbox">{renderCaption(item, index, "au-sf-cap")}</figcaption>
                  <span className="au-fr-dots" aria-hidden="true">
                    <i />
                  </span>
                  {renderRemove(index)}
                </figure>
              </Reveal>
            ))}
          </div>
          {renderOrnament("au-sf-orn is-foot")}
        </div>
      ) : null}

      {activeLayout === "tagged-frames" ? (
        <div className="au-sf au-tf">
          <Reveal className="au-tf-head">
            <div className="au-tf-heading">
              <p className="au-eyebrow au-sf-eyebrow is-trail">{field("galleryEyebrow", "au-eyebrow")}</p>
              <h2 className="au-tf-title">{field("galleryTitle", "")}</h2>
            </div>
            {renderIntro()}
          </Reveal>
          <div className="au-sf-row au-tf-row">
            {frames.map((item, index) => (
              <Reveal key={`au-tf-${index}`} className="au-sf-cell au-tf-cell" delay={`${(index % 5) * 0.1}s`}>
                <figure className="au-tf-card">
                  <span className="au-tf-outline" aria-hidden="true" />
                  {renderPhoto(item, index, "au-sf-photo au-tf-photo")}
                  <figcaption className="au-tf-tag">{renderCaption(item, index, "au-sf-cap")}</figcaption>
                </figure>
                {renderRemove(index)}
              </Reveal>
            ))}
          </div>
          <AureliaSprig className="au-tf-sprig" />
        </div>
      ) : null}

      {activeLayout === "arch-timeline" ? (
        <div className="au-sf au-at">
          <Reveal className="au-sf-head">
            <p className="au-eyebrow au-sf-eyebrow is-lined">{field("galleryEyebrow", "au-eyebrow")}</p>
            <h2 className="au-sf-title">{field("galleryTitle", "")}</h2>
            {renderIntro()}
          </Reveal>
          <div className="au-sf-row au-at-row">
            {frames.map((item, index) => (
              <Reveal key={`au-at-${index}`} className="au-sf-cell au-at-cell" delay={`${(index % 5) * 0.1}s`}>
                <figure className="au-at-card">
                  <div className="au-at-arch">
                    {renderPhoto(item, index, "au-sf-photo au-at-photo")}
                    <span className="au-at-num" aria-hidden="true">
                      <b>{frameNumber(index)}</b>
                    </span>
                    <span className="au-at-link" aria-hidden="true">
                      <i />
                    </span>
                  </div>
                  <figcaption className="au-sf-capbox au-at-cap">{renderCaption(item, index, "au-sf-cap")}</figcaption>
                  {renderRemove(index)}
                </figure>
              </Reveal>
            ))}
          </div>
          {renderOrnament("au-sf-orn is-foot")}
        </div>
      ) : null}

      {activeLayout === "index-mosaic" ? (
        <div className="au-sf au-im">
          <div className="au-im-side">
            <Reveal>
              <p className="au-eyebrow au-sf-eyebrow is-trail">{field("galleryEyebrow", "au-eyebrow")}</p>
              <h2 className="au-im-title">{field("galleryTitle", "")}</h2>
              {renderIntro()}
            </Reveal>
            <ol className="au-im-list">
              {frames.map((item, index) => (
                <li key={`au-im-li-${index}`} className="au-im-item">
                  <span className="au-im-num" aria-hidden="true">
                    {frameNumber(index)}
                  </span>
                  <span className="au-im-text">{renderCaption(item, index, "au-sf-cap")}</span>
                </li>
              ))}
            </ol>
            <span className="au-im-foot" aria-hidden="true">
              <i />
              <AureliaLotus className="au-sf-lotus" />
              <i />
            </span>
            <AureliaSprig className="au-im-sprig" />
          </div>
          <div className="au-im-media">
            <AureliaSprig className="au-im-sprig-top" />
            <div className="au-im-grid">
              {frames.map((item, index) => (
                <Reveal key={`au-im-${index}`} className="au-im-cell" delay={`${(index % 5) * 0.08}s`}>
                  {renderPhoto(item, index, "au-sf-photo au-im-photo")}
                  {renderRemove(index)}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {editing && items.length < MAX_GALLERY_ITEMS ? (
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
