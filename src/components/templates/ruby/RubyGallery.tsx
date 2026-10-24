"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_GALLERY_LAYOUTS,
  type RubyGalleryLayout,
} from "@/components/templates/ruby/ruby-layouts";
import { GALLERY_ITEM_MAX, MAX_GALLERY_ITEMS } from "@/lib/content-limits";
import type { GalleryItem } from "@/lib/api";

const PLACEHOLDER_SLOTS = 6;

function emptySlots(): GalleryItem[] {
  return Array.from({ length: PLACEHOLDER_SLOTS }, () => ({
    eyebrow: "",
    title: "",
    caption: "",
    url: "",
    publicId: "",
  }));
}

type TrackEdges = { start: boolean; end: boolean };

function readTrackEdges(track: HTMLElement): TrackEdges {
  return {
    start: track.scrollLeft <= 4,
    end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
  };
}

function LotusMark() {
  return (
    <svg className="rb-gh-lotus" viewBox="0 0 40 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M20 3c4 4.6 4.2 10.4 0 15.6C15.8 13.4 16 7.6 20 3z" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M19 19c-5.6-.6-9.4-5-9.8-10.6 4.6.8 8.2 4.4 9.8 10.6z" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M21 19c5.6-.6 9.4-5 9.8-10.6-4.6.8-8.2 4.4-9.8 10.6z" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M18 20.2c-5.8.8-11.2-1.6-14.6-6.6 5.2-.4 10.4 2 14.6 6.6z" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M22 20.2c5.8.8 11.2-1.6 14.6-6.6-5.2-.4-10.4 2-14.6 6.6z" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M11 22h18" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function KeepsakeIcon({ kind }: { kind: number }) {
  if (kind === 1) {
    return (
      <svg className="rb-kc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M9.4 19.2C5 16.2 3.2 13.6 3.2 11.2c0-2 1.5-3.4 3.2-3.4 1.3 0 2.4.7 3 1.8.6-1.1 1.7-1.8 3-1.8 1.7 0 3.2 1.4 3.2 3.4 0 2.4-1.8 5-6.2 8z"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path
          d="M14.6 16.4c-4.4-3-6.2-5.6-6.2-8 0-2 1.5-3.4 3.2-3.4 1.3 0 2.4.7 3 1.8.6-1.1 1.7-1.8 3-1.8 1.7 0 3.2 1.4 3.2 3.4 0 2.4-1.8 5-6.2 8z"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg className="rb-kc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="9.4" cy="14" r="4.8" strokeWidth="1.2" />
        <circle cx="14.6" cy="14" r="4.8" strokeWidth="1.2" />
        <path d="M14.6 5.2l1.6 1.8-1.6 1.6-1.6-1.6z" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="rb-kc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="12" cy="6.4" rx="1.9" ry="3.3" strokeWidth="1.05" transform={`rotate(${angle} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="2.2" strokeWidth="1.1" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d={dir === "prev" ? "M14.5 6.5L9 12l5.5 5.5" : "M9.5 6.5L15 12l-5.5 5.5"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function RubyGallery({
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
  onLayoutChange?: (layout: RubyGalleryLayout) => void;
  onCommitItem: (index: number, key: "eyebrow" | "title" | "caption", value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onChangeImage: (index: number, file: File) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_GALLERY_LAYOUTS, "arch-gallery");
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [lightIndex, setLightIndex] = useState(0);
  const [edges, setEdges] = useState<TrackEdges>({ start: true, end: true });
  const frames = items.length ? items : emptySlots();
  const viewable = frames.filter((item) => item.url);
  const trio = editing ? frames : frames.slice(0, 3);

  function openFrame(index: number) {
    if (editing) {
      setUploadIndex(index);
      fileRef.current?.click();
      return;
    }
    const item = frames[index];
    if (!item?.url) return;
    setLightIndex(Math.max(0, viewable.indexOf(item)));
    dialogRef.current?.showModal();
  }

  function openAll() {
    if (!viewable.length) return;
    setLightIndex(0);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    if (!viewable.length) return;
    setLightIndex((prev) => (prev + delta + viewable.length) % viewable.length);
  }

  function syncEdges() {
    const track = trackRef.current;
    if (!track) return;
    const next = readTrackEdges(track);
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }

  function slide(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const slideEl = track.querySelector<HTMLElement>(".rb-gc-slide");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = slideEl ? slideEl.offsetWidth + gap : track.clientWidth;
    track.scrollBy({ left: dir * distance, behavior: "smooth" });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onKey(event: KeyboardEvent) {
      if (!dialog?.open) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      const next = readTrackEdges(track);
      setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeLayout, frames.length]);

  const lightItem = viewable[lightIndex];

  function renderHead(variant: "center" | "wide" | "side") {
    return (
      <Reveal className={`rb-gh is-${variant}`}>
        <span className="rb-gh-orn" aria-hidden="true">
          <i className="rb-gh-line" />
          <LotusMark />
          <i className="rb-gh-line is-end" />
        </span>
        {variant === "side" ? (
          <h2 className="rb-gv rb-gh-script">{field("galleryTitle", "rb-gv")}</h2>
        ) : (
          <h2 className="rb-mc rb-gh-title">{field("galleryTitle", "rb-mc")}</h2>
        )}
        <p className="rb-gh-intro">{field("galleryIntro", "", true)}</p>
        {variant === "side" ? (
          <span className="rb-gh-foot" aria-hidden="true">
            <i />
          </span>
        ) : null}
      </Reveal>
    );
  }

  function renderPhoto(item: GalleryItem, index: number, className: string) {
    return (
      <button
        type="button"
        className={`rb-gx-photo ${className}${editing ? " is-editable" : ""}`}
        aria-label={
          editing ? `Change photo ${index + 1}` : `View photo: ${item.title || item.caption || index + 1}`
        }
        onClick={() => openFrame(index)}
      >
        {item.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt={item.title || item.caption || ""} loading="lazy" />
        ) : (
          <span className="rb-gx-ph">
            <span className="rb-gal-ph-mark" aria-hidden="true">
              ❖
            </span>
            {editing ? "Add photo" : ""}
          </span>
        )}
        {editing ? <span className="rb-gal-hint">Change photo</span> : null}
      </button>
    );
  }

  function renderCaption(item: GalleryItem, index: number, prefix: string) {
    return (
      <>
        <EditableField
          value={item.title || ""}
          editable={editing}
          maxLength={GALLERY_ITEM_MAX.title}
          onCommit={(value) => onCommitItem(index, "title", value)}
          className={`rb-gv ${prefix}-title`}
        />
        <EditableField
          value={item.caption || ""}
          editable={editing}
          maxLength={GALLERY_ITEM_MAX.caption}
          onCommit={(value) => onCommitItem(index, "caption", value)}
          className={`rb-mc ${prefix}-sub`}
        />
      </>
    );
  }

  function renderRemove(index: number) {
    if (!editing || items.length <= 1) return null;
    return (
      <button type="button" className="rb-remove rb-gal-remove" onClick={() => onRemoveItem(index)}>
        Remove
      </button>
    );
  }

  function renderCta() {
    if (!editing && !viewable.length) return null;
    const label = (
      <>
        {field("galleryCtaLabel", "rb-gx-cta-label")}
        <span className="rb-gx-cta-arrow" aria-hidden="true">
          →
        </span>
      </>
    );
    return (
      <Reveal className="rb-gx-cta-row">
        {editing ? (
          <span className="rb-mc rb-gx-cta">{label}</span>
        ) : (
          <button type="button" className="rb-mc rb-gx-cta" onClick={openAll}>
            {label}
          </button>
        )}
      </Reveal>
    );
  }

  return (
    <section className="rb-sec rb-sec-alt rb-gallery" id="gallery" data-layout={activeLayout} aria-label="Our gallery">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_GALLERY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Gallery"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap rb-gal-wrap">
        {activeLayout === "arch-gallery" ? (
          <>
            <SectionTitle>{field("galleryTitle", "rb-h2 rb-mc")}</SectionTitle>
            <Reveal>
              <p className="rb-lead">{field("galleryIntro", "rb-lead", true)}</p>
            </Reveal>

            <div className="rb-gal">
              {frames.map((item, index) => (
                <Reveal key={`rb-gal-${index}`} className="rb-gal-cell" delay={`${(index % 3) * 0.12}s`}>
                  <figure className="rb-gal-card">
                    <button
                      type="button"
                      className={`rb-gal-frame${editing ? " is-editable" : ""}`}
                      aria-label={
                        editing
                          ? `Change photo ${index + 1}`
                          : `View photo: ${item.title || item.caption || index + 1}`
                      }
                      onClick={() => openFrame(index)}
                    >
                      {item.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.url} alt={item.title || item.caption || ""} loading="lazy" />
                      ) : (
                        <span className="rb-gal-ph">
                          <span className="rb-gal-ph-mark" aria-hidden="true">
                            ❖
                          </span>
                          {editing ? "Add photo" : ""}
                        </span>
                      )}
                      <span className="rb-gal-sheen" aria-hidden="true" />
                      {editing ? <span className="rb-gal-hint">Change photo</span> : null}
                    </button>
                    <figcaption className="rb-gal-cap">
                      <EditableField
                        value={item.title || ""}
                        editable={editing}
                        maxLength={GALLERY_ITEM_MAX.title}
                        onCommit={(value) => onCommitItem(index, "title", value)}
                        className="rb-gv rb-gal-title"
                      />
                      <EditableField
                        value={item.caption || ""}
                        editable={editing}
                        maxLength={GALLERY_ITEM_MAX.caption}
                        onCommit={(value) => onCommitItem(index, "caption", value)}
                        className="rb-gal-sub"
                      />
                    </figcaption>
                    {renderRemove(index)}
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        {activeLayout === "framed-trio" ? (
          <>
            {renderHead("center")}
            <div className="rb-ft">
              {trio.map((item, index) => (
                <Reveal key={`rb-ft-${index}`} className="rb-ft-cell" delay={`${(index % 3) * 0.12}s`}>
                  <figure className="rb-ft-card">
                    {renderPhoto(item, index, "rb-ft-photo")}
                    <figcaption className="rb-ft-cap">{renderCaption(item, index, "rb-ft")}</figcaption>
                    {renderRemove(index)}
                  </figure>
                </Reveal>
              ))}
            </div>
            {renderCta()}
          </>
        ) : null}

        {activeLayout === "arch-windows" ? (
          <>
            {renderHead("wide")}
            <div className="rb-aw">
              {frames.map((item, index) => (
                <Reveal key={`rb-aw-${index}`} className="rb-aw-cell" delay={`${(index % 3) * 0.12}s`}>
                  <figure className="rb-aw-card">
                    <div className="rb-aw-arch">{renderPhoto(item, index, "rb-aw-photo")}</div>
                    <span className="rb-aw-pendant" aria-hidden="true">
                      <i />
                    </span>
                    <figcaption className="rb-aw-cap">{renderCaption(item, index, "rb-aw")}</figcaption>
                    {renderRemove(index)}
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        {activeLayout === "keepsake-cards" ? (
          <div className="rb-kc">
            <div className="rb-kc-side">{renderHead("side")}</div>
            <div className="rb-kc-grid">
              {frames.map((item, index) => (
                <Reveal key={`rb-kc-${index}`} className="rb-kc-cell" delay={`${(index % 3) * 0.12}s`}>
                  <figure className="rb-kc-card">
                    {renderPhoto(item, index, "rb-kc-photo")}
                    <figcaption className="rb-kc-note">
                      <KeepsakeIcon kind={index % 3} />
                      {renderCaption(item, index, "rb-kc")}
                    </figcaption>
                  </figure>
                  {renderRemove(index)}
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {activeLayout === "gallery-carousel" ? (
          <>
            {renderHead("center")}
            <Reveal className="rb-gc">
              <button
                type="button"
                className="rb-gc-arrow is-prev"
                onClick={() => slide(-1)}
                disabled={edges.start}
                aria-label="Previous photos"
              >
                <ChevronIcon dir="prev" />
              </button>
              <div className="rb-gc-track" ref={trackRef} onScroll={syncEdges}>
                {frames.map((item, index) => (
                  <figure key={`rb-gc-${index}`} className="rb-gc-slide">
                    {renderPhoto(item, index, "rb-gc-photo")}
                    <span className="rb-gc-pin" aria-hidden="true">
                      <svg viewBox="0 0 10 22" fill="none" stroke="currentColor">
                        <path d="M5 1v18M1.6 15.6L5 19l3.4-3.4" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <figcaption className="rb-gc-cap">{renderCaption(item, index, "rb-gc")}</figcaption>
                    {renderRemove(index)}
                  </figure>
                ))}
              </div>
              <button
                type="button"
                className="rb-gc-arrow is-next"
                onClick={() => slide(1)}
                disabled={edges.end}
                aria-label="Next photos"
              >
                <ChevronIcon dir="next" />
              </button>
            </Reveal>
            {renderCta()}
          </>
        ) : null}

        {editing && items.length < MAX_GALLERY_ITEMS ? (
          <button type="button" className="rb-add" onClick={onAddItem}>
            + Add photo
          </button>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className="rb-lb"
        aria-label="Photo viewer"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {lightItem ? (
          <div className="rb-lb-inner">
            <div className="rb-lb-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lightItem.url} alt={lightItem.title || lightItem.caption || ""} />
            </div>
            {lightItem.title ? <p className="rb-gv rb-lb-title">{lightItem.title}</p> : null}
            {lightItem.caption ? <p className="rb-lb-sub">{lightItem.caption}</p> : null}
            <div className="rb-lb-controls">
              <button type="button" className="rb-lb-btn" onClick={() => step(-1)} aria-label="Previous photo">
                ←
              </button>
              <span className="rb-lb-count">
                {lightIndex + 1} / {viewable.length}
              </span>
              <button type="button" className="rb-lb-btn" onClick={() => step(1)} aria-label="Next photo">
                →
              </button>
            </div>
            <button
              type="button"
              className="rb-lb-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close photo viewer"
            >
              ×
            </button>
          </div>
        ) : null}
      </dialog>

      {editing ? (
        <input
          ref={fileRef}
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
