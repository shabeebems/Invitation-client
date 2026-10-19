"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_COUPLE_LAYOUTS,
  type AureliaCoupleLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

export default function AureliaCouple({
  editing,
  layout,
  brideUrl,
  groomUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  brideUrl: string;
  groomUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: "bride" | "groom", file: File) => void;
  onLayoutChange?: (layout: AureliaCoupleLayout) => void;
}) {
  const brideRef = useRef<HTMLInputElement>(null);
  const groomRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, AURELIA_COUPLE_LAYOUTS, "staggered-duo");

  function Portrait({
    slot,
    url,
    nameKey,
    bioKey,
    gradient,
    inputRef,
  }: {
    slot: "bride" | "groom";
    url: string;
    nameKey: string;
    bioKey: string;
    gradient: string;
    inputRef: RefObject<HTMLInputElement | null>;
  }) {
    return (
      <div>
        <div
          className={`au-portrait${editing ? " is-editable" : ""}`}
          role={editing ? "button" : undefined}
          tabIndex={editing ? 0 : undefined}
          aria-label={editing ? `Change ${slot} photo` : undefined}
          onClick={() => editing && inputRef.current?.click()}
          onKeyDown={(e) => {
            if (editing && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" />
          ) : (
            <div className="au-art" style={{ background: gradient }} />
          )}
        </div>
        <Reveal>
          <h3 className="au-person-name">{field(nameKey, "au-person-name")}</h3>
        </Reveal>
        <Reveal>
          <p className="au-person-bio">{field(bioKey, "au-person-bio", true)}</p>
        </Reveal>
        {editing ? (
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChangeImage(slot, file);
              e.target.value = "";
            }}
          />
        ) : null}
      </div>
    );
  }

  return (
    <section className="au-sec au-couple" id="couple" data-layout={activeLayout}>
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={AURELIA_COUPLE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Couple"
          className="au-layout-picker"
        />
      ) : null}

      <div className="au-wrap">
        <Reveal>
          <p className="au-eyebrow">{field("meetCoupleTitle", "au-eyebrow")}</p>
        </Reveal>
        <Reveal>
          <h2 className="au-h2">{field("storyTitle", "au-h2")}</h2>
        </Reveal>
        <div className="au-duo">
          <Portrait
            slot="bride"
            url={brideUrl}
            nameKey="brideName"
            bioKey="brideBio"
            gradient="radial-gradient(ellipse at 30% 20%,#2b3a6755,transparent 60%),linear-gradient(160deg,#c9a29b,#2b3a67)"
            inputRef={brideRef}
          />
          <Portrait
            slot="groom"
            url={groomUrl}
            nameKey="groomName"
            bioKey="groomBio"
            gradient="radial-gradient(ellipse at 30% 20%,#c9a29b55,transparent 60%),linear-gradient(160deg,#121b36,#c9a29b)"
            inputRef={groomRef}
          />
        </div>
      </div>
    </section>
  );
}
