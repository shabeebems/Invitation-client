"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import {
  AureliaLotus as LotusIcon,
  AureliaSprig as Sprig,
  Reveal,
} from "@/components/templates/aurelia/AureliaDecor";
import {
  AURELIA_COUPLE_LAYOUTS,
  type AureliaCoupleLayout,
} from "@/components/templates/aurelia/aurelia-layouts";

type Slot = "bride" | "groom";

const ART: Record<Slot, string> = {
  bride:
    "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-art-a) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-rose),var(--au-art-a))",
  groom:
    "radial-gradient(ellipse at 30% 20%,color-mix(in srgb,var(--au-rose) 33%,transparent),transparent 60%),linear-gradient(160deg,var(--au-ink2),var(--au-rose))",
};

const PEOPLE: { slot: Slot; nameKey: string; bioKey: string }[] = [
  { slot: "bride", nameKey: "brideName", bioKey: "brideBio" },
  { slot: "groom", nameKey: "groomName", bioKey: "groomBio" },
];

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="au-cp-arrow" viewBox="0 0 34 10" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d={dir === "right" ? "M1 5h31M27 1.5L32 5l-5 3.5" : "M33 5H2M7 1.5L2 5l5 3.5"}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="au-cp-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 20s-7.4-4.6-7.4-10.2A4.1 4.1 0 0112 7.4a4.1 4.1 0 017.4 2.4C19.4 15.4 12 20 12 20z" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={`au-fs-flourish ${className}`} viewBox="0 0 30 30" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M3 27C3 14.4 14.4 3 27 3" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M27 3c-4 0-6 3.2-4 5.6 1.6 2 4.6.6 4-1.8" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M3 27c0-4 3.2-6 5.6-4 2 1.6.6 4.6-1.8 4" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M10.5 13.5c2.2-4 6.2-5.4 9.4-4.4-1.6 3.6-5.4 5.4-9.4 4.4z" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function HeartSquiggle() {
  return (
    <svg className="au-pn-squiggle" viewBox="0 0 100 32" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        d="M2 24c16 4 30 2 40-4 8-5 8-13 2-12-6 1-4 8 6 14 10-6 12-13 6-14-6-1-6 7 2 12 10 6 24 8 40 4"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  onChangeImage: (slot: Slot, file: File) => void;
  onLayoutChange?: (layout: AureliaCoupleLayout) => void;
}) {
  const brideRef = useRef<HTMLInputElement>(null);
  const groomRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, AURELIA_COUPLE_LAYOUTS, "staggered-duo");
  const urls: Record<Slot, string> = { bride: brideUrl, groom: groomUrl };
  const inputs: Record<Slot, typeof brideRef> = { bride: brideRef, groom: groomRef };

  function renderPhoto(slot: Slot, className: string) {
    const url = urls[slot];
    return (
      <div
        className={`${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? `Change ${slot} photo` : undefined}
        onClick={() => editing && inputs[slot].current?.click()}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            inputs[slot].current?.click();
          }
        }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" />
        ) : (
          <div className="au-art" style={{ background: ART[slot] }} />
        )}
        {editing ? <span className="au-photo-hint">Change photo</span> : null}
      </div>
    );
  }

  function renderEyebrow(className: string) {
    return <p className={`au-eyebrow ${className}`}>{field("meetCoupleTitle", "au-eyebrow")}</p>;
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

      {activeLayout === "staggered-duo" ? (
        <div className="au-wrap">
          <Reveal>{renderEyebrow("")}</Reveal>
          <Reveal>
            <h2 className="au-h2">{field("storyTitle", "au-h2")}</h2>
          </Reveal>
          <div className="au-duo">
            {PEOPLE.map((person) => (
              <div key={person.slot}>
                {renderPhoto(person.slot, "au-portrait")}
                <Reveal>
                  <h3 className="au-person-name">{field(person.nameKey, "au-person-name")}</h3>
                </Reveal>
                <Reveal>
                  <p className="au-person-bio">{field(person.bioKey, "au-person-bio", true)}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {activeLayout === "arch-nameplates" ? (
        <div className="au-wrap au-an">
          <Reveal className="au-cp-head">
            <span className="au-an-orn" aria-hidden="true">
              <ArrowIcon dir="left" />
              <LotusIcon />
              <ArrowIcon dir="right" />
            </span>
            {renderEyebrow("au-cp-eyebrow")}
            <h2 className="au-cp-sub">{field("storyTitle", "")}</h2>
          </Reveal>
          <div className="au-an-grid">
            {PEOPLE.map((person, index) => (
              <div key={person.slot} className="au-an-col">
                {index === 1 ? (
                  <span className="au-an-divider" aria-hidden="true">
                    <HeartIcon />
                  </span>
                ) : null}
                <Reveal className="au-an-person" delay={`${index * 0.15}s`}>
                  <div className="au-an-arch">
                    {renderPhoto(person.slot, "au-cp-photo au-an-photo")}
                    <span className="au-an-badge" aria-hidden="true">
                      <LotusIcon />
                    </span>
                  </div>
                  <div className="au-an-plate-row">
                    <ArrowIcon dir="right" />
                    <h3 className="au-an-plate">{field(person.nameKey, "")}</h3>
                    <ArrowIcon dir="left" />
                  </div>
                  <p className="au-cp-bio au-an-bio">{field(person.bioKey, "", true)}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {activeLayout === "framed-split" ? (
        <div className="au-wrap au-fs">
          <div className="au-fs-copy">
            <Reveal>
              {renderEyebrow("au-cp-eyebrow is-start")}
              <h2 className="au-cp-title">{field("storyTitle", "")}</h2>
              <span className="au-cp-rule" aria-hidden="true">
                <i />
              </span>
            </Reveal>
            <ol className="au-fs-list">
              {PEOPLE.map((person, index) => (
                <li key={person.slot} className="au-fs-item">
                  <Reveal className="au-fs-entry" delay={`${index * 0.12}s`}>
                    <span className="au-cp-icon" aria-hidden="true">
                      <LotusIcon />
                    </span>
                    <div>
                      <h3 className="au-fs-name">{field(person.nameKey, "")}</h3>
                      <p className="au-cp-bio au-fs-bio">{field(person.bioKey, "", true)}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <div className="au-fs-photos">
            {PEOPLE.map((person, index) => (
              <Reveal key={person.slot} className="au-fs-fig" delay={`${index * 0.15}s`}>
                <div className="au-fs-frame">
                  {renderPhoto(person.slot, "au-cp-photo au-fs-photo")}
                  <CornerFlourish className="is-tr" />
                  <CornerFlourish className="is-bl" />
                </div>
                <p className="au-fs-cap">{field(person.nameKey, "")}</p>
                <span className="au-cp-rule is-center" aria-hidden="true">
                  <i />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {activeLayout === "polaroid-notes" ? (
        <div className="au-wrap au-pn">
          <Reveal className="au-pn-copy">
            {renderEyebrow("au-cp-eyebrow is-start")}
            <h2 className="au-cp-title">{field("storyTitle", "")}</h2>
            <span className="au-cp-rule" aria-hidden="true">
              <i />
            </span>
            <Sprig className="au-pn-sprig-a" />
          </Reveal>
          <div className="au-pn-photos">
            <Sprig className="au-pn-sprig-b" />
            {PEOPLE.map((person, index) => (
              <Reveal key={person.slot} className={`au-pn-shot is-${person.slot}`} delay={`${index * 0.15}s`}>
                <div className="au-pn-polaroid">{renderPhoto(person.slot, "au-cp-photo au-pn-photo")}</div>
              </Reveal>
            ))}
          </div>
          {PEOPLE.map((person, index) => (
            <div key={person.slot} className={`au-pn-note-cell is-${person.slot}`}>
              {index === 1 ? <HeartSquiggle /> : null}
              <Reveal className="au-pn-note" delay={`${index * 0.12}s`}>
                <div className="au-pn-note-head">
                  <span className="au-cp-icon is-sm" aria-hidden="true">
                    <LotusIcon />
                  </span>
                  <h3 className="au-pn-name">{field(person.nameKey, "")}</h3>
                </div>
                <p className="au-cp-bio au-pn-bio">{field(person.bioKey, "", true)}</p>
              </Reveal>
            </div>
          ))}
        </div>
      ) : null}

      {activeLayout === "oval-medallion" ? (
        <div className="au-wrap au-om">
          <Sprig className="au-om-sprig is-left" />
          <Sprig className="au-om-sprig is-right" />
          <Reveal className="au-cp-head">
            {renderEyebrow("au-cp-eyebrow is-wide")}
            <h2 className="au-cp-sub">{field("storyTitle", "")}</h2>
          </Reveal>
          <div className="au-om-grid">
            <div className="au-om-center">
              <span className="au-om-line" aria-hidden="true" />
              <Reveal className="au-om-pair">
                {renderPhoto("bride", "au-cp-photo au-om-oval")}
                {renderPhoto("groom", "au-cp-photo au-om-oval")}
                <span className="au-om-medal" aria-hidden="true">
                  <LotusIcon />
                </span>
              </Reveal>
            </div>
            {PEOPLE.map((person, index) => (
              <Reveal key={person.slot} className={`au-om-text is-${person.slot}`} delay={`${index * 0.15}s`}>
                <h3 className="au-om-name">{field(person.nameKey, "")}</h3>
                <p className="au-cp-bio au-om-bio">{field(person.bioKey, "", true)}</p>
                <span className="au-om-tail" aria-hidden="true">
                  <ArrowIcon dir={index === 0 ? "left" : "right"} />
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}

      {editing
        ? PEOPLE.map((person) => (
            <input
              key={person.slot}
              ref={inputs[person.slot]}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChangeImage(person.slot, file);
                e.target.value = "";
              }}
            />
          ))
        : null}
    </section>
  );
}
