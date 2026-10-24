"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { LeafTwig, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_STORY_LAYOUTS,
  type BotanicalStoryLayout,
} from "@/components/templates/botanical/botanical-layouts";

function InkEdgeClip() {
  return (
    <svg className="bs-story-clip-svg" aria-hidden="true" width="0" height="0">
      <defs>
        <clipPath id="bs-ink-clip-right" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H0.78 C0.86,0.03 0.84,0.1 0.89,0.16 C0.96,0.26 0.83,0.34 0.9,0.44 C0.98,0.54 0.85,0.62 0.91,0.72 C0.97,0.82 0.86,0.9 0.8,1 H0 Z" />
        </clipPath>
        <clipPath id="bs-ink-clip-bottom" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H1 V0.78 C0.94,0.86 0.86,0.82 0.78,0.88 C0.68,0.96 0.58,0.84 0.48,0.9 C0.38,0.97 0.28,0.86 0.2,0.9 C0.1,0.96 0.06,0.86 0,0.8 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function BotanicalStory({
  editing,
  storyImageUrl,
  layout,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  storyImageUrl: string;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: BotanicalStoryLayout) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_STORY_LAYOUTS, "arch-narrative");

  function openPhoto() {
    if (editing) imageRef.current?.click();
  }

  return (
    <section className="bs-story" id="story" data-layout={activeLayout} aria-label="Our story">
      {activeLayout === "ink-edge" ? <InkEdgeClip /> : null}

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Story"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-story-stage">
        <Reveal className="bs-story-photo-col">
          <div
            className={`bs-story-frame${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? "Change story photo" : undefined}
            onClick={openPhoto}
            onKeyDown={(event) => {
              if (editing && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                openPhoto();
              }
            }}
          >
            <div className="bs-story-window">
              {storyImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={storyImageUrl} alt="Our story" />
              ) : (
                <span className="bs-photo-placeholder">Add photo</span>
              )}
            </div>
            {activeLayout === "arch-narrative" ? (
              <div className="bs-story-twig" aria-hidden="true">
                <LeafTwig className="bs-leaf-twig" />
              </div>
            ) : null}
            {editing ? <span className="bs-photo-hint">Change photo</span> : null}
          </div>
          {editing ? (
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onChangeImage(file);
                event.target.value = "";
              }}
            />
          ) : null}
        </Reveal>

        {activeLayout === "diamond-panel" ? (
          <span className="bs-story-diamond" aria-hidden="true" />
        ) : null}

        <Reveal className="bs-story-copy">
          <div className="bs-story-lead">
            <p className="bs-kicker bs-story-kicker">{field("meetCoupleTitle", "bs-kicker")}</p>
            <h2 className="bs-serif-title bs-story-title">{field("storyTitle", "bs-serif-title")}</h2>
          </div>
          <div className="bs-story-main">
            <div className="bs-story-body">
              <p>{field("storyText", "bs-story-para", true)}</p>
              <p>{field("meetCoupleIntro", "bs-story-para", true)}</p>
            </div>
            <p className="bs-script bs-story-continue">
              {field("presenceLine", "bs-script bs-story-continue")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
