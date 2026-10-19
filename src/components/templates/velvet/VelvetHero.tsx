"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFloralSwag, VelvetFoliage, VelvetGoldOrnament } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_HERO_LAYOUTS,
  type VelvetHeroLayout,
} from "@/components/templates/velvet/velvet-layouts";

export default function VelvetHero({
  editing,
  heroImageUrl,
  layout,
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  heroImageUrl: string;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: VelvetHeroLayout) => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, VELVET_HERO_LAYOUTS, "arch");

  return (
    <section className="vh-hero" id="hero" data-layout={activeLayout}>
      <VelvetFoliage className="foliage-tl" />
      <VelvetFoliage className="foliage-tr" />
      <VelvetFoliage className="foliage-bl" />
      <VelvetFoliage className="foliage-br" />

      {editing && onLayoutChange ? (
        <LayoutPicker
          options={VELVET_HERO_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Hero"
          className="vh-layout-picker"
        />
      ) : null}

      <div className="vh-hero-inner">
        <Reveal className="vh-hero-col-left">
          <span className="vh-cap-title vh-hero-eyebrow">
            {field("hostLabel", "vh-cap-title vh-hero-eyebrow")}
          </span>
          <h1 className="vh-script vh-hero-names">
            {field("groomName", "vh-script vh-hero-names")}
            <span className="vh-hero-amp"> & </span>
            {field("brideName", "vh-script vh-hero-names")}
          </h1>
          <div className="vh-cap-title vh-hero-invite-line">
            {field("introLine", "vh-cap-title vh-hero-invite-line")}
          </div>
          <div className="vh-cap-title vh-hero-event-label">
            {field("inviteLine", "vh-cap-title vh-hero-event-label")}
          </div>
          <VelvetGoldOrnament />
          <p className="vh-poem">{field("storyText", "vh-poem", true)}</p>
        </Reveal>

        <Reveal className="vh-hero-col-center">
          <div
            className={`vh-arch-frame${editing ? " is-editable" : ""}`}
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
            <div className="vh-arch-window">
              {heroImageUrl ? (
                <img src={heroImageUrl} alt="Couple" />
              ) : (
                <span className="vh-cap-title vh-photo-placeholder">Add photo</span>
              )}
            </div>
            <VelvetFloralSwag className="vh-arch-swag-left" />
            <VelvetFloralSwag className="vh-arch-swag-right" />
            {editing ? (
              <span className="vh-cap-title vh-photo-hint">Change photo</span>
            ) : null}
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

        <Reveal className="vh-hero-col-right">
          <div className="vh-quick-detail">
            <div className="vh-qd-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect height="18" rx="3" width="18" x="3" y="4" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div className="vh-qd-body">
              <span className="vh-cap-title vh-qd-label">Save the Date</span>
              <span className="vh-qd-value">
                {field("day", "vh-qd-value")} {field("monthYear", "vh-qd-value")}
              </span>
              <span className="vh-qd-sub">{field("weekday", "vh-qd-sub")}</span>
            </div>
          </div>

          <div className="vh-quick-detail">
            <div className="vh-qd-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="vh-qd-body">
              <span className="vh-cap-title vh-qd-label">
                {field("venueLabel", "vh-cap-title vh-qd-label")}
              </span>
              <span className="vh-qd-value">{field("venueName", "vh-qd-value")}</span>
              <span className="vh-qd-sub">{field("venueCity", "vh-qd-sub")}</span>
            </div>
          </div>

          <div className="vh-quick-detail">
            <div className="vh-qd-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="vh-qd-body">
              <span className="vh-cap-title vh-qd-label">
                {field("presenceLine", "vh-cap-title vh-qd-label")}
              </span>
              <span className="vh-qd-value">
                {field("groomName", "vh-qd-value")}
                <span> & </span>
                {field("brideName", "vh-qd-value")}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
