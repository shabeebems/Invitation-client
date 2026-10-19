"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaScene, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_HERO_LAYOUTS,
  type AureliaHeroLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaHero({
  editing,
  layout,
  heroImageUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  heroImageUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: AureliaHeroLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, AURELIA_HERO_LAYOUTS, "cinematic-scene");

  return (
    <section className="au-hero" id="hero" data-layout={activeLayout} aria-label="Wedding hero">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="au-layout-picker"
        />
      ) : null}

      <div
        className={`au-scene-wrap${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? "Change hero image" : undefined}
        onClick={() => editing && fileRef.current?.click()}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
      >
        {heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="au-scene-img" src={heroImageUrl} alt="" />
        ) : (
          <AureliaScene id="h" />
        )}
        {editing ? <span className="au-photo-hint">Change hero photo</span> : null}
      </div>

      <div className="au-hero-in">
        <Reveal delay="0.4s">
          <p className="au-sub">{field("introLine", "au-sub")}</p>
        </Reveal>
        <h1 className="au-names">
          <span>{field("brideName", "au-names")}</span>
          <span className="au-amp">&amp;</span>
          <span>{field("groomName", "au-names")}</span>
        </h1>
        <Reveal delay="1.2s">
          <p className="au-sub">{field("inviteLine", "au-sub")}</p>
        </Reveal>
        <Reveal delay="1.5s">
          <p className="au-date">
            {field("day", "au-date")} {field("monthYear", "au-date")}
            <br />
            <span className="au-date-place">{field("venueCity", "au-date-place")}</span>
          </p>
        </Reveal>
      </div>
      <div className="au-scroll" aria-hidden="true" />

      {editing ? (
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChangeImage(file);
            e.target.value = "";
          }}
        />
      ) : null}
    </section>
  );
}
