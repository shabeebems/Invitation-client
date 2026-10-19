"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal } from "@/components/templates/botanical/BotanicalDecor";
import {
  BOTANICAL_HERO_LAYOUTS,
  type BotanicalHeroLayout,
} from "@/components/templates/botanical/botanical-layouts";

export default function BotanicalHero({
  editing,
  heroImageUrl,
  layout,
  eyebrowText,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  heroImageUrl: string;
  layout?: string;
  eyebrowText: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: BotanicalHeroLayout) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, BOTANICAL_HERO_LAYOUTS, "split-cta");

  return (
    <>
      <section className="bs-hero" id="home" data-layout={activeLayout} aria-label="Wedding couple">
        {editing && onLayoutChange ? (
          <LayoutPicker
            options={BOTANICAL_HERO_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Hero"
            className="bs-layout-picker"
          />
        ) : null}

        <div className="bs-hero-grid">
          <Reveal className="bs-hero-copy">
            <div className="bs-hero-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <rect height="18" rx="2" strokeWidth="1.8" width="18" x="3" y="4" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.8" />
              </svg>
              <span>{eyebrowText}</span>
            </div>
            <h1 className="bs-script bs-hero-names">
              {field("groomName", "bs-script bs-hero-names")}
              <span className="bs-hero-amp"> & </span>
              {field("brideName", "bs-script bs-hero-names")}
            </h1>
            <p className="bs-hero-poem">{field("introLine", "bs-hero-poem", true)}</p>
            <div className="bs-hero-cta">
              <a className="bs-btn-outline" href="#rsvp">
                <span>{field("openHint", "bs-btn-outline-label")}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>

          <Reveal className="bs-hero-photo-wrap">
            <div
              className={`bs-arch-frame${editing ? " is-editable" : ""}`}
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
              <div className="bs-arch-window">
                {heroImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={heroImageUrl} alt="Couple" />
                ) : (
                  <span className="bs-photo-placeholder">Add photo</span>
                )}
              </div>
              <span className="bs-arch-badge" aria-hidden="true" />
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
        </div>
      </section>

      <section className="bs-details" aria-label="Event details">
        <div className="bs-details-card">
          <div className="bs-details-col">
            <div className="bs-details-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect height="18" rx="2" strokeWidth="1.8" width="18" x="3" y="4" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.8" />
              </svg>
            </div>
            <h2 className="bs-details-title">
              {field("day", "bs-details-title")} {field("monthYear", "bs-details-title")}
            </h2>
            <p className="bs-details-sub">{field("weekday", "bs-details-sub")}</p>
          </div>
          <div className="bs-details-col">
            <div className="bs-details-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="2.5" strokeWidth="1.8" />
              </svg>
            </div>
            <h2 className="bs-details-title">{field("venueName", "bs-details-title")}</h2>
            <p className="bs-details-sub">{field("venueCity", "bs-details-sub")}</p>
          </div>
          <div className="bs-details-col">
            <div className="bs-details-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 4a3 3 0 0 1 2.8 2h-5.6A3 3 0 0 1 12 4z" strokeWidth="1.8" />
                <path d="M12 6v3m0 0l-9 8h18l-9-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </div>
            <h2 className="bs-details-title">{field("venueLabel", "bs-details-title")}</h2>
            <p className="bs-details-sub">{field("dressCode", "bs-details-sub")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
