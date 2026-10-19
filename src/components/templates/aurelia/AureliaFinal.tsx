"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { AureliaScene, Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_FINAL_LAYOUTS,
  type AureliaFinalLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaFinal({
  editing,
  layout,
  imageUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  imageUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: AureliaFinalLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, AURELIA_FINAL_LAYOUTS, "scene-closing");

  return (
    <section className="au-final" id="final" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_FINAL_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Closing"
          className="au-layout-picker"
        />
      ) : null}

      <div
        className={`au-scene-wrap${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? "Change closing image" : undefined}
        onClick={() => editing && fileRef.current?.click()}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="au-scene-img" src={imageUrl} alt="" />
        ) : (
          <AureliaScene id="f" />
        )}
        {editing ? <span className="au-photo-hint">Change closing photo</span> : null}
      </div>

      <div className="au-final-in">
        <Reveal>
          <h2 className="au-h2">{field("closingBlessing", "au-h2", true)}</h2>
        </Reveal>
        <Reveal>
          <p className="au-eyebrow">
            {field("brideName", "au-eyebrow")}
            <span> &amp; </span>
            {field("groomName", "au-eyebrow")}
            <span> · </span>
            {field("day", "au-eyebrow")} {field("monthYear", "au-eyebrow")}
          </p>
        </Reveal>
        <Reveal>
          <p className="au-thanks">{field("closingPresence", "au-thanks")}</p>
        </Reveal>
        <Reveal>
          <button
            type="button"
            className="au-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {field("replayLabel", "au-btn-label")}
          </button>
        </Reveal>
      </div>

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
