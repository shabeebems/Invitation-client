"use client";

import { useRef, type KeyboardEvent, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, VelvetFoliage } from "@/components/templates/velvet/VelvetDecor";
import {
  VELVET_LOCATION_LAYOUTS,
  VELVET_LOCATION_LAYOUT_ALIASES,
  type VelvetLocationLayout,
} from "@/components/templates/velvet/velvet-layouts";
import {
  VelvetHeritageTempleEmblem,
  VelvetLocationPinIcon,
  VelvetNavArrowIcon,
  VelvetVenueDivider,
  VenueIllustratedMap,
} from "@/components/templates/velvet/VelvetLocationArt";

const DEFAULT_ARCH_PHOTO =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80";

const DEFAULT_PORTRAIT_PHOTO =
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80";

export default function VelvetLocation({
  layout,
  editing,
  venueName,
  mapsUrl,
  venueImageUrl,
  directionsLabel = "Get Directions →",
  field,
  onLayoutChange,
  onChangeVenueImage,
}: {
  layout?: string;
  editing: boolean;
  venueName: string;
  mapsUrl: string;
  venueImageUrl?: string;
  directionsLabel?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange: (layout: VelvetLocationLayout) => void;
  onChangeVenueImage?: (file: File) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(
    layout,
    VELVET_LOCATION_LAYOUTS,
    "atlas",
    VELVET_LOCATION_LAYOUT_ALIASES
  );
  const href = mapsUrl || "#";

  function handlePhotoClick() {
    if (!editing) return;
    fileInputRef.current?.click();
  }

  function handlePhotoKeyDown(e: KeyboardEvent) {
    if (editing && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  return (
    <section className="vh-venue" id="location" data-layout={activeLayout}>
      <VelvetFoliage className="foliage-tl" />
      <VelvetFoliage className="foliage-tr" />
      <VelvetFoliage className="foliage-bl" />
      <VelvetFoliage className="foliage-br" />

      {editing ? (
        <LayoutPicker
          options={VELVET_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="vh-layout-picker"
        />
      ) : null}

      <div className="vh-venue-shell">
        {/* =========================================================================
            LAYOUT 01: ARCH ESTATE (Panel 01)
            ========================================================================= */}
        {activeLayout === "arch-estate" && (
          <div className="vh-venue-card is-arch-estate">
            {/* Left Column: Grand Arch Window Photo */}
            <Reveal className="vh-loc-col vh-loc-col-photo">
              <div
                className={`vh-arch-estate-frame${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? "Change venue photo" : undefined}
                onClick={handlePhotoClick}
                onKeyDown={handlePhotoKeyDown}
              >
                <div className="vh-arch-estate-window">
                  <img
                    src={venueImageUrl || DEFAULT_ARCH_PHOTO}
                    alt={venueName || "Venue"}
                  />
                  {editing && <span className="vh-photo-hover-tag">Change Photo</span>}
                </div>
              </div>
            </Reveal>

            {/* Right Column: Venue Details */}
            <Reveal className="vh-loc-col vh-loc-col-details">
              <div className="vh-loc-eyebrow-wrap">
                <span className="vh-loc-eyebrow-dash" aria-hidden="true" />
                <span className="vh-cap-title vh-loc-eyebrow">
                  {field("locationEyebrow", "vh-cap-title vh-loc-eyebrow")}
                </span>
              </div>

              <h3 className="vh-script vh-loc-name-script">
                {field("venueName", "vh-script vh-loc-name-script")}
              </h3>

              <div className="vh-loc-addr">
                <VelvetLocationPinIcon className="vh-loc-pin-svg" />
                <span>{field("addressFull", "vh-loc-addr-text", true)}</span>
              </div>

              <VelvetVenueDivider />

              <a
                className="vh-loc-btn is-solid-gold vh-cap-title"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VelvetLocationPinIcon className="vh-btn-pin-icon" />
                {field("getDirectionsLabel", "vh-cap-title vh-dir-label")}
              </a>

              {editing ? (
                <p className="vh-venue-maps-edit">
                  Maps URL: {field("mapsUrl", "vh-venue-maps-field")}
                </p>
              ) : null}
            </Reveal>
          </div>
        )}

        {/* =========================================================================
            LAYOUT 02: ATLAS (Panel 02 - Illustrated Map)
            ========================================================================= */}
        {activeLayout === "atlas" && (
          <div className="vh-venue-card is-atlas">
            {/* Left Column: Venue Details */}
            <Reveal className="vh-loc-col vh-loc-col-details">
              <div className="vh-loc-eyebrow-wrap">
                <span className="vh-loc-eyebrow-dash" aria-hidden="true" />
                <span className="vh-cap-title vh-loc-eyebrow">
                  {field("locationEyebrow", "vh-cap-title vh-loc-eyebrow")}
                </span>
              </div>

              <h3 className="vh-loc-name-serif">
                {field("venueName", "vh-loc-name-serif")}
              </h3>

              <div className="vh-loc-addr">
                <VelvetLocationPinIcon className="vh-loc-pin-svg" />
                <span>{field("addressFull", "vh-loc-addr-text", true)}</span>
              </div>

              <a
                className="vh-loc-btn is-outline-gold vh-cap-title"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VelvetNavArrowIcon className="vh-btn-nav-icon" />
                {field("getDirectionsLabel", "vh-cap-title vh-dir-label")}
              </a>

              {editing ? (
                <p className="vh-venue-maps-edit">
                  Maps URL: {field("mapsUrl", "vh-venue-maps-field")}
                </p>
              ) : null}
            </Reveal>

            {/* Right Column: Illustrated Map */}
            <Reveal className="vh-loc-col vh-loc-col-map">
              <div className="vh-venue-map-panel">
                <VenueIllustratedMap venueName={venueName} />
              </div>
            </Reveal>
          </div>
        )}

        {/* =========================================================================
            LAYOUT 03: HERITAGE PORTRAIT (Panel 03)
            ========================================================================= */}
        {activeLayout === "heritage-portrait" && (
          <div className="vh-venue-card is-heritage-portrait">
            {/* Left Column: Tall Vertical Portrait Photo */}
            <Reveal className="vh-loc-col vh-loc-col-photo">
              <div
                className={`vh-portrait-estate-frame${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? "Change venue photo" : undefined}
                onClick={handlePhotoClick}
                onKeyDown={handlePhotoKeyDown}
              >
                <img
                  src={venueImageUrl || DEFAULT_PORTRAIT_PHOTO}
                  alt={venueName || "Venue"}
                />
                {editing && <span className="vh-photo-hover-tag">Change Photo</span>}
              </div>
            </Reveal>

            {/* Right Column: Details + Cultural Emblem */}
            <Reveal className="vh-loc-col vh-loc-col-details">
              <div className="vh-loc-eyebrow-wrap">
                <span className="vh-cap-title vh-loc-eyebrow">
                  {field("locationEyebrow", "vh-cap-title vh-loc-eyebrow")}
                </span>
              </div>

              <h3 className="vh-loc-name-serif">
                {field("venueName", "vh-loc-name-serif")}
              </h3>

              <div className="vh-loc-addr">
                <VelvetLocationPinIcon className="vh-loc-pin-svg" />
                <span>{field("addressFull", "vh-loc-addr-text", true)}</span>
              </div>

              <VelvetVenueDivider />

              <a
                className="vh-loc-btn is-outline-gold vh-cap-title"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VelvetNavArrowIcon className="vh-btn-nav-icon" />
                {field("getDirectionsLabel", "vh-cap-title vh-dir-label")}
              </a>

              {/* Cultural Architectural Emblem Sub-block */}
              <div className="vh-heritage-emblem-block" aria-hidden="true">
                <VelvetHeritageTempleEmblem className="vh-heritage-emblem-svg" />
                <div className="vh-heritage-emblem-text">
                  <span>A BEAUTIFUL VENUE</span>
                  <span>FOR A SPECIAL DAY</span>
                </div>
              </div>

              {editing ? (
                <p className="vh-venue-maps-edit">
                  Maps URL: {field("mapsUrl", "vh-venue-maps-field")}
                </p>
              ) : null}
            </Reveal>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && onChangeVenueImage) {
            onChangeVenueImage(file);
          }
          e.target.value = "";
        }}
      />
    </section>
  );
}
