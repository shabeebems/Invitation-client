"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_BLESSINGS_LAYOUTS,
  type RubyBlessingsLayout,
} from "@/components/templates/ruby/ruby-layouts";

type ParentSlot = "parentsLeft" | "parentsRight";
type Side = "bride" | "groom";

const FIELDS: Record<Side, { label: string; name: string; note: string }> = {
  bride: { label: "brideParentsLabel", name: "brideParents", note: "brideDetail" },
  groom: { label: "groomLabel", name: "hostNames", note: "groomDetail" },
};

function PanelOrnament() {
  return (
    <svg className="rb-bl-orn" viewBox="0 0 60 18" fill="none" aria-hidden="true">
      <path d="M30 2 C 26 6, 26 11, 30 15 C 34 11, 34 6, 30 2 Z" className="is-fill" />
      <path d="M30 15 C 24 14, 20 10, 20 7 C 25 8, 28 11, 30 15 Z" className="is-fill" />
      <path d="M30 15 C 36 14, 40 10, 40 7 C 35 8, 32 11, 30 15 Z" className="is-fill" />
      <path d="M2 15 H 22 M38 15 H 58" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function RubyBlessings({
  editing,
  layout,
  brideParentsUrl,
  groomParentsUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  brideParentsUrl: string;
  groomParentsUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: ParentSlot, file: File) => void;
  onLayoutChange?: (layout: RubyBlessingsLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_BLESSINGS_LAYOUTS, "dual-folio");
  const brideRef = useRef<HTMLInputElement>(null);
  const groomRef = useRef<HTMLInputElement>(null);

  const sides: Record<Side, { url: string; label: string; inputRef: RefObject<HTMLInputElement | null> }> = {
    bride: { url: brideParentsUrl, label: "bride's parents", inputRef: brideRef },
    groom: { url: groomParentsUrl, label: "groom's parents", inputRef: groomRef },
  };

  function Portrait({ side, className = "rb-fc-photo" }: { side: Side; className?: string }) {
    const { url, label, inputRef } = sides[side];
    return (
      <div
        className={`${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change ${label} photo` : undefined}
        onClick={() => editing && inputRef.current?.click()}
        onKeyDown={(event) => {
          if (editing && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={label} />
        ) : (
          <span className="rb-fc-photo-ph">{editing ? "Add photo" : "❖"}</span>
        )}
        {editing ? <span className="rb-fc-photo-hint">Change</span> : null}
      </div>
    );
  }

  function Names({ side }: { side: Side }) {
    const keys = FIELDS[side];
    return (
      <div className="rb-bl-text">
        <small className="rb-bl-label">{field(keys.label, "rb-fc-label")}</small>
        <span className="rb-bl-rule" aria-hidden="true">
          <i />
        </span>
        <h3 className="rb-gv rb-bl-name">{field(keys.name, "rb-gv rb-bl-name")}</h3>
        <p className="rb-bl-note">{field(keys.note, "rb-bl-note", true)}</p>
      </div>
    );
  }

  function FileInput({ slot, inputRef }: { slot: ParentSlot; inputRef: RefObject<HTMLInputElement | null> }) {
    if (!editing) return null;
    return (
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChangeImage(slot, file);
          event.target.value = "";
        }}
      />
    );
  }

  const intro = (
    <Reveal>
      <p className="rb-lead">{field("meetCoupleIntro", "rb-lead", true)}</p>
    </Reveal>
  );

  return (
    <section className="rb-sec rb-bl" id="blessings" data-layout={activeLayout} aria-label="With blessings">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_BLESSINGS_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Blessings"
          className="rb-layout-picker"
        />
      ) : null}

      <div className="rb-wrap rb-bl-wrap">
        <SectionTitle>{field("meetCoupleTitle", "rb-h2 rb-mc")}</SectionTitle>
        {activeLayout !== "framed-duet" ? intro : null}

        {activeLayout === "dual-folio" ? (
          <div className="rb-fam">
            <Reveal className="rb-fc">
              <Portrait side="bride" />
              <small>{field("brideParentsLabel", "rb-fc-label")}</small>
              <h3 className="rb-gv rb-fc-name">{field("brideParents", "rb-gv rb-fc-name")}</h3>
              <p className="rb-fc-note">{field("brideDetail", "rb-fc-note", true)}</p>
            </Reveal>
            <Reveal className="rb-fc" delay="0.15s">
              <Portrait side="groom" />
              <small>{field("groomLabel", "rb-fc-label")}</small>
              <h3 className="rb-gv rb-fc-name">{field("hostNames", "rb-gv rb-fc-name")}</h3>
              <p className="rb-fc-note">{field("groomDetail", "rb-fc-note", true)}</p>
            </Reveal>
          </div>
        ) : null}

        {activeLayout === "side-portraits" || activeLayout === "photo-cards" ? (
          <div className="rb-bl-duo">
            {(["bride", "groom"] as const).map((side, index) => (
              <Reveal key={side} className="rb-bl-item" delay={index ? "0.15s" : undefined}>
                <Portrait
                  side={side}
                  className={activeLayout === "photo-cards" ? "rb-bl-card-photo" : "rb-fc-photo rb-bl-round"}
                />
                <Names side={side} />
              </Reveal>
            ))}
            <span className="rb-bl-divider" aria-hidden="true" />
          </div>
        ) : null}

        {activeLayout === "arch-panels" ? (
          <div className="rb-bl-panels">
            {(["bride", "groom"] as const).map((side, index) => (
              <Reveal key={side} className="rb-bl-panel" delay={index ? "0.15s" : undefined}>
                <Portrait side={side} className="rb-bl-arch-photo" />
                <Names side={side} />
                <PanelOrnament />
              </Reveal>
            ))}
          </div>
        ) : null}

        {activeLayout === "framed-duet" ? (
          <Reveal className="rb-bl-frame">
            <span className="rb-bl-corner is-tl" aria-hidden="true" />
            <span className="rb-bl-corner is-tr" aria-hidden="true" />
            <span className="rb-bl-corner is-bl" aria-hidden="true" />
            <span className="rb-bl-corner is-br" aria-hidden="true" />
            <p className="rb-lead rb-bl-frame-lead">{field("meetCoupleIntro", "rb-lead", true)}</p>
            <div className="rb-bl-duet">
              <Names side="bride" />
              <div className="rb-bl-pair">
                <Portrait side="bride" className="rb-fc-photo rb-bl-round" />
                <span className="rb-bl-arrow" aria-hidden="true" />
                <Portrait side="groom" className="rb-fc-photo rb-bl-round" />
              </div>
              <Names side="groom" />
            </div>
          </Reveal>
        ) : null}
      </div>

      <FileInput slot="parentsLeft" inputRef={brideRef} />
      <FileInput slot="parentsRight" inputRef={groomRef} />
    </section>
  );
}
