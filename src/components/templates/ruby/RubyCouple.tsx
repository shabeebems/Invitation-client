"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_COUPLE_LAYOUTS,
  type RubyCoupleLayout,
} from "@/components/templates/ruby/ruby-layouts";

function Crown() {
  return (
    <svg className="rb-st-crown" viewBox="0 0 120 34" fill="none" aria-hidden="true">
      <path d="M60 30 C 50 30, 44 22, 36 22 C 28 22, 24 28, 16 28 C 10 28, 6 24, 4 20" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M60 30 C 70 30, 76 22, 84 22 C 92 22, 96 28, 104 28 C 110 28, 114 24, 116 20" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M36 22 C 34 16, 40 12, 44 16" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M84 22 C 86 16, 80 12, 76 16" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M60 4 C 54 10, 54 18, 60 24 C 66 18, 66 10, 60 4 Z" className="is-fill" strokeWidth="1.1" />
      <path d="M60 24 C 52 22, 48 14, 50 10 C 56 12, 58 18, 60 24 Z" className="is-fill" strokeWidth="1" />
      <path d="M60 24 C 68 22, 72 14, 70 10 C 64 12, 62 18, 60 24 Z" className="is-fill" strokeWidth="1" />
      <circle cx="60" cy="2.6" r="1.8" className="is-dot" />
      <circle cx="4" cy="19" r="1.6" className="is-dot" />
      <circle cx="116" cy="19" r="1.6" className="is-dot" />
    </svg>
  );
}

function Rose({ x, y, r, tone }: { x: number; y: number; r: number; tone: "deep" | "cream" | "soft" }) {
  return (
    <g transform={`translate(${x} ${y})`} className={`rb-st-rose is-${tone}`}>
      <circle r={r} />
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="0"
          cy={-r * 0.62}
          rx={r * 0.52}
          ry={r * 0.5}
          transform={`rotate(${angle})`}
          className="is-petal"
        />
      ))}
      <circle r={r * 0.42} className="is-core" />
      <path d={`M${-r * 0.22} 0 a ${r * 0.22} ${r * 0.22} 0 1 1 ${r * 0.44} 0`} className="is-swirl" />
    </g>
  );
}

function Bouquet() {
  return (
    <svg className="rb-st-bouquet" viewBox="0 0 160 130" aria-hidden="true">
      <g className="rb-st-leaves">
        <path d="M16 112 C 0 96, -2 74, 8 58 C 20 72, 24 94, 16 112 Z" />
        <path d="M26 98 C 12 74, 16 48, 32 34 C 40 54, 38 80, 26 98 Z" />
        <path d="M54 120 C 68 106, 92 100, 114 104 C 100 118, 78 126, 54 120 Z" />
        <path d="M86 100 C 104 86, 128 86, 144 94 C 128 106, 104 108, 86 100 Z" />
        <path d="M42 66 C 46 48, 60 36, 78 34 C 74 52, 60 64, 42 66 Z" />
        <path d="M104 76 C 114 62, 130 58, 142 62 C 134 74, 120 80, 104 76 Z" />
        <path d="M6 92 C -2 84, -4 72, 2 62 C 8 70, 10 82, 6 92 Z" />
      </g>
      <g className="rb-st-stems" fill="none">
        <path d="M12 44 C 20 30, 28 20, 40 14" />
        <path d="M116 116 C 130 116, 142 110, 154 100" />
        <path d="M4 80 C 0 68, 2 54, 8 46" />
        <path d="M100 60 C 110 48, 122 42, 134 40" />
      </g>
      <circle cx="40" cy="14" r="3.2" className="rb-st-bud" />
      <circle cx="154" cy="100" r="3.2" className="rb-st-bud" />
      <circle cx="8" cy="46" r="2.8" className="rb-st-bud" />
      <circle cx="134" cy="40" r="2.8" className="rb-st-bud" />
      <Rose x={26} y={58} r={12} tone="soft" />
      <Rose x={118} y={80} r={11} tone="cream" />
      <Rose x={40} y={90} r={22} tone="deep" />
      <Rose x={76} y={74} r={19} tone="cream" />
      <Rose x={100} y={100} r={16} tone="deep" />
      <Rose x={64} y={110} r={11} tone="soft" />
      <Rose x={130} y={108} r={9} tone="cream" />
    </svg>
  );
}

function PrintSprig({ className }: { className: string }) {
  return (
    <svg className={`rb-st-sprig ${className}`} viewBox="0 0 40 110" fill="none" aria-hidden="true">
      <path d="M20 108 C 18 80, 22 50, 20 6" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M20 74 C 12 68, 8 58, 10 50" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 54 C 28 48, 32 40, 30 32" strokeWidth="1" strokeLinecap="round" />
      {[
        [20, 6],
        [10, 50],
        [30, 32],
        [14, 24],
        [26, 16],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse key={angle} cx="0" cy="-2.6" rx="1.6" ry="2.6" transform={`rotate(${angle})`} className="is-fill" />
          ))}
          <circle r="1.2" className="is-dot" />
        </g>
      ))}
      <path d="M20 90 C 12 86, 8 80, 8 74 C 14 76, 18 82, 20 90 Z" className="is-leaf" />
      <path d="M20 84 C 28 80, 32 72, 32 66 C 26 68, 22 76, 20 84 Z" className="is-leaf" />
    </svg>
  );
}

function SealSprig() {
  return (
    <svg className="rb-st-seal-sprig" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M12 28 V10" fill="none" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M12 12 C 7 9, 6 4, 9 1 C 12 4, 13 9, 12 12 Z" />
      <path d="M12 16 C 16 12, 21 12, 22 16 C 18 19, 14 19, 12 16 Z" />
      <path d="M12 21 C 8 17, 3 17, 2 21 C 6 24, 10 24, 12 21 Z" />
    </svg>
  );
}

function RailIcon({ kind }: { kind: "heart" | "rings" | "home" }) {
  return (
    <span className="rb-st-rail-icon">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {kind === "heart" ? (
          <path
            d="M12 20.2 4.6 13a4.3 4.3 0 0 1 6.1-6.1L12 8.2l1.3-1.3a4.3 4.3 0 0 1 6.1 6.1Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "rings" ? (
          <>
            <circle cx="9.2" cy="13.6" r="5" strokeWidth="1.5" />
            <circle cx="14.8" cy="13.6" r="5" strokeWidth="1.5" />
            <path d="M9.2 8.6 10.6 6l1.4 2.6" strokeWidth="1.2" strokeLinejoin="round" />
          </>
        ) : null}
        {kind === "home" ? (
          <>
            <path d="M4 11.2 12 4.6l8 6.6" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M6.2 10v9.4h11.6V10" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M10.2 19.4v-4.6h3.6v4.6" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M12 13.2 10.9 12.1a.9.9 0 0 1 1.1-1.3.9.9 0 0 1 1.1 1.3Z" className="is-fill" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

function ScrollFlourish({ className }: { className: string }) {
  return (
    <svg className={`rb-st-flourish ${className}`} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M4 4 C 18 6, 26 14, 30 28" strokeWidth="1" strokeLinecap="round" />
      <path d="M4 4 C 6 18, 14 26, 28 30" strokeWidth="1" strokeLinecap="round" />
      <path d="M14 8 C 18 2, 26 4, 26 10 C 20 12, 16 12, 14 8 Z" className="is-fill" />
      <path d="M8 14 C 2 18, 4 26, 10 26 C 12 20, 12 16, 8 14 Z" className="is-fill" />
      <circle cx="18" cy="18" r="3.4" strokeWidth="1" />
      <circle cx="18" cy="18" r="1.3" className="is-dot" />
      <path d="M30 28 C 36 30, 40 28, 44 24" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M28 30 C 30 36, 28 40, 24 44" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export default function RubyCouple({
  editing,
  layout,
  photoUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  photoUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: RubyCoupleLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, RUBY_COUPLE_LAYOUTS, "arch-story");

  function openPicker() {
    if (editing) fileRef.current?.click();
  }

  function Photo({ className, placeholder = "Add couple photo" }: { className: string; placeholder?: string }) {
    return (
      <div
        className={`${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? "Change couple photo" : undefined}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (editing && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            openPicker();
          }
        }}
      >
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="The couple" />
        ) : (
          <span className="rb-st-ph">
            <span aria-hidden="true">❖</span>
            {editing ? placeholder : ""}
          </span>
        )}
        {editing ? <span className="rb-gal-hint">Change photo</span> : null}
      </div>
    );
  }

  function StoryCopy() {
    return (
      <div className="rb-st-copy">
        <Reveal>
          <h2 className="rb-mc rb-st-title">{field("storyTitle", "rb-mc rb-st-title")}</h2>
          <span className="rb-st-rule" aria-hidden="true">
            <span>♥</span>
          </span>
        </Reveal>
        <Reveal delay="0.1s">
          <p className="rb-st-text">{field("storyText", "rb-st-text", true)}</p>
        </Reveal>
        <Reveal delay="0.2s">
          <p className="rb-gv rb-st-sign">{field("presenceLine", "rb-gv rb-st-sign")}</p>
        </Reveal>
      </div>
    );
  }

  return (
    <section className="rb-sec rb-couple" id="story" data-layout={activeLayout} aria-label="Our story">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_COUPLE_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Our Story"
          className="rb-layout-picker"
        />
      ) : null}

      {activeLayout === "arch-story" ? (
        <div className="rb-wrap rb-couple-wrap">
          <Reveal className="rb-couple-media">
            <Photo className="rb-couple-frame" />
            <span className="rb-couple-orbit" aria-hidden="true" />
            <span className="rb-couple-badge" aria-hidden="true">
              ♥
            </span>
          </Reveal>

          <div className="rb-couple-copy">
            <SectionTitle>{field("storyTitle", "rb-h2 rb-mc")}</SectionTitle>
            <Reveal delay="0.1s">
              <p className="rb-couple-text">{field("storyText", "rb-couple-text", true)}</p>
            </Reveal>
            <Reveal delay="0.2s">
              <p className="rb-gv rb-couple-sign">{field("presenceLine", "rb-gv rb-couple-sign")}</p>
            </Reveal>
          </div>
        </div>
      ) : null}

      {activeLayout === "floral-arch" ? (
        <div className="rb-st rb-st--floral">
          <Reveal className="rb-st-media">
            <div className="rb-st-arch">
              <Photo className="rb-st-photo" />
            </div>
            <Crown />
            <Bouquet />
          </Reveal>
          <StoryCopy />
        </div>
      ) : null}

      {activeLayout === "keepsake-prints" ? (
        <div className="rb-st rb-st--prints">
          <Reveal className="rb-st-media">
            <span className="rb-st-print-back" aria-hidden="true" />
            <div className="rb-st-print">
              <Photo className="rb-st-photo" />
            </div>
            <PrintSprig className="is-top" />
            <PrintSprig className="is-left" />
            <span className="rb-st-seal" aria-hidden="true">
              <SealSprig />
            </span>
          </Reveal>
          <StoryCopy />
        </div>
      ) : null}

      {activeLayout === "icon-rail" ? (
        <Reveal className="rb-st rb-st--rail">
          <div className="rb-st-media">
            <div className="rb-st-ornate">
              <Photo className="rb-st-photo" />
            </div>
          </div>
          <div className="rb-st-rail" aria-hidden="true">
            <span className="rb-st-rail-end is-start" />
            <RailIcon kind="heart" />
            <RailIcon kind="rings" />
            <RailIcon kind="home" />
            <span className="rb-st-rail-end is-end" />
          </div>
          <StoryCopy />
        </Reveal>
      ) : null}

      {activeLayout === "parchment-scroll" ? (
        <Reveal className="rb-st rb-st--scroll">
          <span className="rb-st-rod is-a" aria-hidden="true" />
          <span className="rb-st-rod is-b" aria-hidden="true" />
          <div className="rb-st-sheet">
            <ScrollFlourish className="is-tl" />
            <ScrollFlourish className="is-tr" />
            <ScrollFlourish className="is-bl" />
            <ScrollFlourish className="is-br" />
            <div className="rb-st-sheet-grid">
              <div className="rb-st-media">
                <div className="rb-st-arch is-paper">
                  <Photo className="rb-st-photo" />
                </div>
              </div>
              <StoryCopy />
            </div>
          </div>
        </Reveal>
      ) : null}

      {editing ? (
        <input
          ref={fileRef}
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
    </section>
  );
}
