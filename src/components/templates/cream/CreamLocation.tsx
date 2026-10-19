"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_LOCATION_LAYOUTS,
  type CreamLocationLayout,
} from "@/components/templates/cream/cream-layouts";

export default function CreamLocation({
  editing,
  layout,
  venueImageUrl,
  mapsUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  venueImageUrl: string;
  mapsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: CreamLocationLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_LOCATION_LAYOUTS, "split-venue");

  return (
    <section className="ce-venue" id="venue" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-w ce-vn">
        <div>
          <p className="ce-eyebrow">{field("locationTitle", "ce-eyebrow")}</p>
          <Reveal>
            <h2 className="ce-h2">{field("venueName", "ce-h2")}</h2>
          </Reveal>
          <Reveal>
            <p className="ce-soft ce-venue-place">{field("venueCity", "ce-soft")}</p>
          </Reveal>
          <Reveal>
            <p className="ce-venue-addr">{field("addressFull", "ce-venue-addr", true)}</p>
          </Reveal>
          <Reveal>
            <a
              className="ce-btn"
              href={mapsUrl || "#"}
              target={mapsUrl ? "_blank" : undefined}
              rel={mapsUrl ? "noopener noreferrer" : undefined}
            >
              {field("getDirectionsLabel", "ce-btn-label")}
            </a>
          </Reveal>
        </div>

        <Reveal>
          <div
            className={`ce-mk ce-venue-ph${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? "Change venue image" : "Venue"}
            onClick={() => editing && fileRef.current?.click()}
            onKeyDown={(e) => {
              if (editing && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                fileRef.current?.click();
              }
            }}
          >
            {venueImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={venueImageUrl} alt="" />
            ) : (
              <CreamPh colors={["#A8AE96", "#E8D9BF"]} label="Venue image" />
            )}
            {editing ? <span className="ce-photo-hint">Change venue photo</span> : null}
          </div>
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
