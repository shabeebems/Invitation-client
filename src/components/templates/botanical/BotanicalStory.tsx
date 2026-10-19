"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { LeafTwig, Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_STORY_LAYOUTS,
  type BotanicalStoryLayout,
} from "@/components/templates/botanical/botanical-layouts";

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

  return (
    <section className="bs-story" id="story" data-layout={activeLayout} aria-label="Our story">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={BOTANICAL_STORY_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Story"
          className="bs-layout-picker"
        />
      ) : null}

      <div className="bs-story-grid">
        <Reveal className="bs-story-photo-col">
          <div
            className={`bs-story-arch${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? "Change story photo" : undefined}
            onClick={() => editing && imageRef.current?.click()}
            onKeyDown={(event) => {
              if (editing && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                imageRef.current?.click();
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
            <div className="bs-story-twig" aria-hidden="true">
              <LeafTwig className="bs-leaf-twig" />
            </div>
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

        <Reveal className="bs-story-copy">
          <p className="bs-kicker">{field("meetCoupleTitle", "bs-kicker")}</p>
          <h2 className="bs-serif-title">{field("storyTitle", "bs-serif-title")}</h2>
          <div className="bs-story-body">
            <p>{field("storyText", "bs-story-para", true)}</p>
            <p>{field("meetCoupleIntro", "bs-story-para", true)}</p>
          </div>
          <p className="bs-script bs-story-continue">
            {field("presenceLine", "bs-script bs-story-continue")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
