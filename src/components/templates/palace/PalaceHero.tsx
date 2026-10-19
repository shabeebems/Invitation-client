"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { PalaceHeartRule } from "@/components/templates/palace/PalaceDecor";
import {
  PALACE_HERO_LAYOUTS,
  type PalaceHeroLayout,
} from "@/components/templates/palace/palace-layouts";

export default function PalaceHero({
  editing,
  heroImageUrl,
  layout,
  badgeText,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  heroImageUrl: string;
  layout?: string;
  badgeText: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: PalaceHeroLayout) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, PALACE_HERO_LAYOUTS, "split-arch");

  return (
    <section className="pp-hero" id="hero" data-layout={activeLayout} aria-label="Wedding couple and details">
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={PALACE_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="pp-layout-picker"
        />
      ) : null}

      <div className="pp-hero-grid">
        <div className="pp-hero-copy">
          <p className="pp-kicker">{field("hostLabel", "pp-kicker")}</p>
          <h1 className="pp-script pp-hero-names">
            {field("groomName", "pp-script pp-hero-names")}
            <span className="pp-hero-amp"> & </span>
            {field("brideName", "pp-script pp-hero-names")}
          </h1>
          <p className="pp-kicker soft">{field("introLine", "pp-kicker soft")}</p>
          <h2 className="pp-wedding-label">{field("inviteLine", "pp-wedding-label")}</h2>
          <PalaceHeartRule />
          <blockquote className="pp-quote">{field("storyText", "pp-quote", true)}</blockquote>

          <div className="pp-meta-list">
            <div className="pp-meta-row">
              <div className="pp-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect height="18" rx="2" width="18" x="3" y="4" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <p className="pp-meta-label">Save The Date</p>
                <p className="pp-meta-value">
                  {field("day", "pp-meta-value")} {field("monthYear", "pp-meta-value")}
                </p>
                <p className="pp-meta-sub">{field("weekday", "pp-meta-sub")}</p>
              </div>
            </div>

            <div className="pp-meta-row">
              <div className="pp-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z" />
                  <circle cx="12" cy="9" r="3" />
                </svg>
              </div>
              <div>
                <p className="pp-meta-label">{field("venueLabel", "pp-meta-label")}</p>
                <p className="pp-meta-value">{field("venueName", "pp-meta-value")}</p>
                <p className="pp-meta-sub">{field("venueCity", "pp-meta-sub")}</p>
              </div>
            </div>

            <div className="pp-meta-row">
              <div className="pp-meta-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <div>
                <p className="pp-meta-label">{field("presenceLine", "pp-meta-label")}</p>
                <p className="pp-meta-value">
                  {field("groomName", "pp-meta-value")}
                  <span> & </span>
                  {field("brideName", "pp-meta-value")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pp-hero-portrait">
          <div className="pp-portrait-glow" aria-hidden="true" />
          <div
            className={`pp-arch-shell${editing ? " is-editable" : ""}`}
            role={editing ? "button" : undefined}
            tabIndex={editing ? 0 : undefined}
            aria-label={editing ? "Change couple photo" : undefined}
            onClick={() => editing && imageRef.current?.click()}
            onKeyDown={(event) => {
              if (editing && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                imageRef.current?.click();
              }
            }}
          >
            <div className="pp-arch-window">
              {heroImageUrl ? (
                <img src={heroImageUrl} alt="Couple" />
              ) : (
                <span className="pp-photo-placeholder">Add photo</span>
              )}
              <div className="pp-arch-shade" aria-hidden="true" />
            </div>
            <div className="pp-arch-badge">
              <span>❦</span>
              <span>{badgeText}</span>
              <span>❦</span>
            </div>
            {editing ? <span className="pp-photo-hint">Change photo</span> : null}
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
        </div>
      </div>
    </section>
  );
}
