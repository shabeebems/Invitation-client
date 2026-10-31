"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CREAM_HERO_LAYOUTS,
  type CreamHeroLayout,
} from "@/components/templates/cream/cream-layouts";

type HeroSlot = "hero" | "heroAlt";

const EYEBROW_SPLIT = /\s*[◆♦·•|]\s*/;

function Flourish({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c1.2 3.4 2.4 5.6 4.4 7.6C14.4 9.4 13 10.6 12 12c-1-1.4-2.4-2.6-4.4-2.4C9.6 7.6 10.8 5.4 12 2Z" />
      <path d="M12 22c-1.2-3.4-2.4-5.6-4.4-7.6 2 .2 3.4-1 4.4-2.4 1 1.4 2.4 2.6 4.4 2.4-2 2-3.2 4.2-4.4 7.6Z" />
      <path d="M2 12c3.4-1.2 5.6-2.4 7.6-4.4-.2 2 1 3.4 2.4 4.4-1.4 1-2.6 2.4-2.4 4.4C7.6 14.4 5.4 13.2 2 12Z" />
      <path d="M22 12c-3.4 1.2-5.6 2.4-7.6 4.4.2-2-1-3.4-2.4-4.4 1.4-1 2.6-2.4 2.4-4.4 2 2 4.2 3.2 7.6 4.4Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="ce-hx-ico" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="ce-hx-ico" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export default function CreamHero({
  editing,
  layout,
  introLine,
  heroImageUrl,
  heroAltImageUrl,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  introLine?: string;
  heroImageUrl: string;
  heroAltImageUrl: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (slot: HeroSlot, file: File) => void;
  onLayoutChange?: (layout: CreamHeroLayout) => void;
}) {
  const heroRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_HERO_LAYOUTS, "twin-arch");

  const eyebrowParts = (introLine || "").split(EYEBROW_SPLIT).filter(Boolean);

  function renderEyebrow() {
    if (editing || eyebrowParts.length < 2) {
      return field("introLine", "ce-hx-eyebrow-text");
    }
    return eyebrowParts.map((part, index) => (
      <span key={`${index}-${part}`} className="ce-hx-eyebrow-part">
        {index > 0 ? <i className="ce-hx-dia" aria-hidden="true" /> : null}
        {part}
      </span>
    ));
  }

  function renderArch(slot: HeroSlot, url: string, label: string, delay: string) {
    const input = slot === "hero" ? heroRef : altRef;
    return (
      <Reveal className="ce-hx-arch" delay={delay}>
        <div
          className={`ce-hx-photo${editing ? " is-editable" : ""}`}
          role={editing ? "button" : "img"}
          tabIndex={editing ? 0 : undefined}
          aria-label={editing ? `Change ${label}` : label}
          onClick={() => editing && input.current?.click()}
          onKeyDown={(e) => {
            if (editing && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              input.current?.click();
            }
          }}
          style={url ? { backgroundImage: `url(${url})` } : undefined}
        >
          {!url ? <CreamPh colors={["#E8D9BF", "#D8B8AD"]} label="Add photo" /> : null}
          {editing ? <span className="ce-hx-hint">Change photo</span> : null}
        </div>
      </Reveal>
    );
  }

  return (
    <section className="ce-hero" id="hero" data-layout={activeLayout} aria-label="Wedding hero">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={CREAM_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="ce-layout-picker"
        />
      ) : null}

      <div className="ce-hx">
        <div className="ce-hx-copy">
          <Reveal>
            <p className="ce-hx-eyebrow">{renderEyebrow()}</p>
          </Reveal>
          <Reveal delay="0.1s">
            <h1 className="ce-hx-names">
              <span>{field("brideName", "ce-hx-name")}</span>
              <span>
                <em>&amp;</em> {field("groomName", "ce-hx-name")}
              </span>
            </h1>
          </Reveal>
          <Reveal delay="0.2s">
            <p className="ce-hx-script">{field("heroScript", "ce-hx-script-text")}</p>
          </Reveal>
          <Reveal delay="0.28s">
            <ul className="ce-hx-meta">
              <li>
                <CalendarIcon />
                <span>
                  {field("weekday", "ce-hx-meta-text")}
                  {", "}
                  {field("day", "ce-hx-meta-text")} {field("monthYear", "ce-hx-meta-text")}
                </span>
              </li>
              <li>
                <PinIcon />
                <span>{field("venueCity", "ce-hx-meta-text")}</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay="0.36s">
            {editing ? (
              <span className="ce-hx-cta">
                {field("heroCtaLabel", "ce-hx-cta-text")}
                <span aria-hidden="true">→</span>
              </span>
            ) : (
              <a className="ce-hx-cta" href="#welcome">
                {field("heroCtaLabel", "ce-hx-cta-text")}
                <span aria-hidden="true">→</span>
              </a>
            )}
          </Reveal>
        </div>

        <div className="ce-hx-arches">
          <Flourish className="ce-hx-flourish is-top" />
          {renderArch("hero", heroImageUrl, "couple portrait", "0.15s")}
          {renderArch("heroAlt", heroAltImageUrl, "second couple portrait", "0.3s")}
          <Flourish className="ce-hx-flourish is-bottom" />
        </div>

        <Reveal className="ce-hx-side" delay="0.45s">
          <p className="ce-hx-note">{field("heroSideNote", "ce-hx-note-text")}</p>
          <span className="ce-hx-rule" aria-hidden="true">
            <i />
            <b />
          </span>
        </Reveal>
      </div>

      {editing
        ? (["hero", "heroAlt"] as const).map((slot) => (
            <input
              key={slot}
              ref={slot === "hero" ? heroRef : altRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onChangeImage(slot, file);
                e.target.value = "";
              }}
            />
          ))
        : null}
    </section>
  );
}
