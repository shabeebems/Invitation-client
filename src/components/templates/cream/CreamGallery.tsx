"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CreamBlossomCluster,
  CreamBlossomTwig,
  CreamHeart,
} from "@/components/templates/cream/CreamWelcomeArt";
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

const SIZE_HELP = "Size: 1:2 tall · 1:1 square · 2:1 wide · 3:2 landscape";

const EMPTY_ITEM: GalleryItem = { eyebrow: "", title: "", caption: "", url: "", publicId: "" };

/** Mosaic tile span from the size tag; accepts legacy t / w2 and ratio tags. */
function sizeClass(eyebrow?: string) {
  const v = (eyebrow || "").trim().toLowerCase();
  if (v === "t" || v === "tall" || v === "1:2") return "t";
  if (v === "w2" || v === "wide" || v === "2:1") return "w2";
  return "";
}

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden="true">
      <path d="M6 0l1.3 4.7L12 6 7.3 7.3 6 12 4.7 7.3 0 6l4.7-1.3z" fill="currentColor" />
    </svg>
  );
}

function DiamondRule({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 64 10" aria-hidden="true">
      <path d="M0 5h24M40 5h24" stroke="currentColor" strokeWidth="1" />
      <path d="M32 1.4L35.6 5 32 8.6 28.4 5Z" fill="currentColor" />
    </svg>
  );
}

function TitleSwirl() {
  return (
    <svg className="ce-gx-swirl" viewBox="0 0 220 70" aria-hidden="true">
      <path
        d="M2 62C46 60 96 50 128 34c22-11 36-24 28-30-8-6-26 8-22 22 4 15 30 14 50 4 14-7 24-16 34-28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
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
  const trackRef = useRef<HTMLOListElement>(null);
  const [uploadIndex, setUploadIndex] = useState(0);
  const [lightIndex, setLightIndex] = useState(0);
  const activeLayout = normalizeLayoutId(layout, CREAM_GALLERY_LAYOUTS, "editorial-mosaic");
  const frames = items.length ? items : [];
  const shots = frames.length ? frames : Array.from({ length: 4 }, () => EMPTY_ITEM);

  function openLight(index: number) {
    if (editing || !frames.length) return;
    setLightIndex(index);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    if (!frames.length) return;
    setLightIndex((prev) => (prev + delta + frames.length) % frames.length);
  }

  function slide(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".ce-gx-ov-card");
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * ((card?.offsetWidth || track.clientWidth / 2) + gap), behavior: "smooth" });
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

  function onTileClick(index: number) {
    if (editing) {
      setUploadIndex(index);
      fileRef.current?.click();
      return;
    }
    openLight(index);
  }

  function renderEditChips(item: GalleryItem, index: number) {
    if (!editing) return null;
    return (
      <>
        {frames.length > 1 ? (
          <span
            className="ce-gal-remove"
            role="button"
            tabIndex={0}
            aria-label="Remove photo"
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
            <span className="ce-gal-remove-x" aria-hidden="true">
              ×
            </span>
            <span className="ce-gal-remove-label">Remove</span>
          </span>
        ) : null}
        <span className="ce-gal-size-hint" title={SIZE_HELP}>
          Size:{" "}
          <EditableField
            value={item.eyebrow || ""}
            editable
            maxLength={8}
            onCommit={(value) => onCommitItem(index, "eyebrow", value)}
            className="ce-gal-size"
          />
        </span>
      </>
    );
  }

  function renderMedia(item: GalleryItem, index: number) {
    return item.url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={item.url} alt={item.caption || item.title || ""} loading="lazy" />
    ) : (
      <CreamPh colors={FALLBACK[index % FALLBACK.length]} label="" />
    );
  }

  function renderTile(item: GalleryItem, index: number, className: string) {
    return (
      <button
        type="button"
        className={`ce-gx-tile ${className}`}
        aria-label={`Open photo: ${item.caption || item.title || index + 1}`}
        onClick={() => onTileClick(index)}
      >
        <span className="ce-gx-media">{renderMedia(item, index)}</span>
        {renderEditChips(item, index)}
      </button>
    );
  }

  function renderCaption(item: GalleryItem, index: number, className: string) {
    return (
      <p className={className}>
        <EditableField
          value={item.caption || item.title || ""}
          editable={editing}
          maxLength={GALLERY_ITEM_MAX.caption}
          onCommit={(value) => onCommitItem(index, "caption", value)}
        />
      </p>
    );
  }

  function renderEyebrow(variant: "trail" | "center") {
    return <p className={`ce-gx-eyebrow is-${variant}`}>{field("galleryEyebrow")}</p>;
  }

  function renderTitle(className = "") {
    return <h2 className={`ce-gx-title ${className}`.trim()}>{field("galleryTitle")}</h2>;
  }

  function renderLead(className = "") {
    return <p className={`ce-gx-lead ${className}`.trim()}>{field("galleryLead", "", true)}</p>;
  }

  function renderAdd(variant: "pill" | "solid" = "pill") {
    if (!editing || frames.length >= MAX_GALLERY_ITEMS) return null;
    return (
      <button type="button" className={`ce-gx-add is-${variant}`} onClick={onAddItem}>
        <span aria-hidden="true">+</span> Add photo
      </button>
    );
  }

  function renderMosaic() {
    return (
      <div className="ce-w">
        <p className="ce-eyebrow">{field("galleryEyebrow", "ce-eyebrow")}</p>
        <Reveal>
          <h2 className="ce-h2">{field("galleryTitle", "ce-h2")}</h2>
        </Reveal>

        <div className="ce-gal">
          {(frames.length ? frames : Array.from({ length: 6 }, () => EMPTY_ITEM)).map((item, index) => {
            const colors = FALLBACK[index % FALLBACK.length];
            const cls = sizeClass(item.eyebrow);
            return (
              <button
                key={`ce-gal-${index}`}
                type="button"
                className={`ce-gal-item ${cls}`.trim()}
                aria-label={`Open photo: ${item.caption || item.title || index + 1}`}
                onClick={() => onTileClick(index)}
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
                {renderEditChips(item, index)}
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
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "arch-row":
        return (
          <div className="ce-w ce-gx ce-gx-ar">
            <Reveal className="ce-gx-head">
              {renderEyebrow("trail")}
              {renderTitle()}
              {renderLead()}
            </Reveal>
            <ol className="ce-gx-ar-grid">
              {shots.map((item, index) => (
                <li key={`ar-${index}`} className="ce-gx-ar-item">
                  <Reveal className="ce-gx-ar-frame" delay={`${(index % 4) * 0.08}s`}>
                    <Sparkle className="ce-gx-ar-spark" />
                    {renderTile(item, index, "ce-gx-ar-tile")}
                  </Reveal>
                </li>
              ))}
            </ol>
            <div className="ce-gx-foot">{renderAdd()}</div>
            <CreamBlossomTwig className="ce-gx-corner is-left is-gold" />
            <CreamBlossomTwig className="ce-gx-corner is-right is-gold" />
          </div>
        );
      case "polaroid-scatter":
        return (
          <div className="ce-w ce-gx ce-gx-ps">
            <div className="ce-gx-ps-top">
              <Reveal className="ce-gx-head ce-gx-ps-head">
                {renderEyebrow("trail")}
                <div className="ce-gx-ps-titlewrap">
                  {renderTitle()}
                  <TitleSwirl />
                </div>
              </Reveal>
              <p className="ce-gx-ps-script">
                <i aria-hidden="true" />
                {field("galleryScript")}
                <CreamHeart className="ce-gx-heart" />
              </p>
            </div>
            <div className="ce-gx-ps-body">
              <div className="ce-gx-ps-stack">
                {chunk(shots, 5).map((group, groupIndex) => (
                  <div
                    key={`ps-${groupIndex}`}
                    className={`ce-gx-ps-group${group.length < 5 ? " is-loose" : ""}`}
                  >
                    {group.map((item, k) => {
                      const index = groupIndex * 5 + k;
                      return (
                        <Reveal
                          key={`ps-${index}`}
                          className={`ce-gx-ps-card is-n${k + 1}`}
                          delay={`${k * 0.07}s`}
                        >
                          {renderTile(item, index, "ce-gx-ps-tile")}
                        </Reveal>
                      );
                    })}
                    {groupIndex === 0 ? <CreamBlossomCluster className="ce-gx-ps-floral" /> : null}
                  </div>
                ))}
              </div>
              <aside className="ce-gx-ps-note">
                <p className="ce-gx-script">{field("gallerySideNote", "", true)}</p>
                <span className="ce-gx-ps-line" aria-hidden="true" />
              </aside>
            </div>
            <div className="ce-gx-foot">{renderAdd()}</div>
          </div>
        );
      case "framed-grid":
        return (
          <div className="ce-w ce-gx ce-gx-fg">
            <Reveal className="ce-gx-head ce-gx-fg-intro">
              {renderEyebrow("trail")}
              {renderTitle("is-stacked")}
              <span className="ce-gx-fg-mark" aria-hidden="true">
                <i />
                <b />
                <i />
              </span>
              {renderLead()}
              {renderAdd("solid")}
            </Reveal>
            <div className="ce-gx-fg-frames">
              {chunk(shots, 4).map((group, groupIndex) => (
                <Reveal key={`fg-${groupIndex}`} className="ce-gx-fg-frame" delay=".1s">
                  {group.map((item, k) => (
                    <div key={`fg-${groupIndex}-${k}`} className="ce-gx-fg-cell">
                      {renderTile(item, groupIndex * 4 + k, "ce-gx-fg-tile")}
                    </div>
                  ))}
                  {group.length > 2 ? (
                    <>
                      <span className="ce-gx-fg-notch is-left" aria-hidden="true" />
                      <span className="ce-gx-fg-notch is-right" aria-hidden="true" />
                      <span className="ce-gx-fg-diamond" aria-hidden="true" />
                    </>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        );
      case "oval-carousel":
        return (
          <div className="ce-w ce-gx ce-gx-ov">
            <Reveal className="ce-gx-head ce-gx-ov-head">
              {renderEyebrow("center")}
              {renderTitle("is-center")}
              <DiamondRule className="ce-gx-ov-rule" />
              {renderLead("is-center")}
            </Reveal>
            <div className="ce-gx-ov-stage">
              <button
                type="button"
                className="ce-gx-ov-arrow is-prev"
                aria-label="Previous photos"
                onClick={() => slide(-1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              <ol ref={trackRef} className="ce-gx-ov-track">
                {shots.map((item, index) => (
                  <li key={`ov-${index}`} className="ce-gx-ov-card">
                    <div className="ce-gx-ov-frame">{renderTile(item, index, "ce-gx-ov-tile")}</div>
                    {renderCaption(item, index, "ce-gx-ov-cap")}
                    <DiamondRule className="ce-gx-ov-orn" />
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="ce-gx-ov-arrow is-next"
                aria-label="Next photos"
                onClick={() => slide(1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
            <div className="ce-gx-foot">{renderAdd()}</div>
            <CreamBlossomTwig className="ce-gx-corner is-left is-gold" />
            <CreamBlossomTwig className="ce-gx-corner is-right is-gold" />
          </div>
        );
      default:
        return renderMosaic();
    }
  }

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

      {renderBody()}

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
