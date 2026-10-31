"use client";

import { useRef, type ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { CreamPh, DiamondRule, Reveal } from "@/components/templates/cream/CreamDecor";
import {
  CreamBlossomCluster,
  CreamBlossomTwig,
  CreamLeafSprig,
} from "@/components/templates/cream/CreamWelcomeArt";
import {
  CREAM_LOCATION_LAYOUTS,
  type CreamLocationLayout,
} from "@/components/templates/cream/cream-layouts";

function toHref(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Builds an embeddable map from a Maps link; short share links fall back to the venue text. */
function mapsEmbed(url: string, fallbackQuery: string) {
  const pair = url.match(/(-?\d{1,3}\.\d{3,}),\s*(-?\d{1,3}\.\d{3,})/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=14&output=embed`;
  }
  let query = "";
  if (url) {
    try {
      const parsed = new URL(toHref(url));
      query = parsed.searchParams.get("q") || parsed.searchParams.get("query") || "";
      if (!query) {
        const place = parsed.pathname.match(/\/place\/([^/]+)/);
        if (place) query = decodeURIComponent(place[1].replace(/\+/g, " "));
      }
    } catch {
      query = "";
    }
  }
  query = query || fallbackQuery;
  return query ? `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed` : "";
}

function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 21s-7-7.2-7-12a7 7 0 1114 0c0 4.8-7 12-7 12z" strokeLinejoin="round" strokeWidth="1.3" />
      <circle cx="12" cy="9.2" r="2.4" strokeWidth="1.3" />
    </svg>
  );
}

function VillaGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M3.5 20.5h17M5.5 20.5V10.8L12 5l6.5 5.8v9.7" strokeLinejoin="round" strokeWidth="1.3" />
      <path d="M10 20.5v-4.6a2 2 0 014 0v4.6" strokeWidth="1.3" />
    </svg>
  );
}

function LinkGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1.2 1.2" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1.2-1.2" strokeLinecap="round" strokeWidth="1.4" />
    </svg>
  );
}

export default function CreamLocation({
  editing,
  layout,
  venueImageUrl,
  mapsUrl,
  mapQuery = "",
  field,
  onChangeImage,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  venueImageUrl: string;
  mapsUrl: string;
  mapQuery?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onChangeImage: (file: File) => void;
  onLayoutChange?: (layout: CreamLocationLayout) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const activeLayout = normalizeLayoutId(layout, CREAM_LOCATION_LAYOUTS, "split-venue");
  const href = toHref(mapsUrl);

  function pickImage() {
    if (editing) fileRef.current?.click();
  }

  function renderPhoto(className: string) {
    return (
      <div
        className={`ce-vx-ph ${className}${editing ? " is-editable" : ""}`}
        role={editing ? "button" : undefined}
        tabIndex={editing ? 0 : undefined}
        aria-label={editing ? "Change venue image" : undefined}
        onClick={pickImage}
        onKeyDown={(e) => {
          if (editing && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            pickImage();
          }
        }}
      >
        {venueImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={venueImageUrl} alt="" loading="lazy" />
        ) : (
          <CreamPh colors={["#A8AE96", "#E8D9BF"]} label="" />
        )}
        {editing ? <span className="ce-photo-hint">Change venue photo</span> : null}
      </div>
    );
  }

  function renderHead(className = "", stacked = false) {
    return (
      <Reveal className={`ce-vx-head ${className}`.trim()}>
        <p className="ce-vx-eyebrow">{field("locationTitle")}</p>
        <h2 className={`ce-vx-title${stacked ? " is-stacked" : ""}`}>{field("venueName")}</h2>
        <DiamondRule className="ce-vx-rule" />
      </Reveal>
    );
  }

  function renderButton(className = "ce-vx-btn") {
    const classes = `ce-btn ${className}`.trim();
    if (editing) {
      return <span className={classes}>{field("getDirectionsLabel", "ce-btn-label")}</span>;
    }
    return (
      <a
        className={classes}
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
      >
        {field("getDirectionsLabel", "ce-btn-label")}
      </a>
    );
  }

  function renderLinkEditor() {
    if (!editing) return null;
    return (
      <div className="ce-vx-url">
        <span className="ce-vx-url-head">
          <LinkGlyph />
          Google Maps link
        </span>
        <span className="ce-vx-url-value">{field("mapsUrl", "ce-vx-url-field")}</span>
        <span className="ce-vx-url-hint">
          Paste the share link from Google Maps. The directions button and map use this link.
        </span>
      </div>
    );
  }

  function renderBody() {
    switch (activeLayout) {
      case "arch-postcard":
        return (
          <div className="ce-w ce-vx ce-vx-ap">
            {renderHead("is-center")}
            <div className="ce-vx-ap-stage">
              <Reveal className="ce-vx-ap-arch">
                {renderPhoto("ce-vx-ap-ph")}
                <CreamBlossomCluster className="ce-vx-ap-bloom is-left" />
                <CreamBlossomCluster className="ce-vx-ap-bloom is-right" />
              </Reveal>
              <Reveal className="ce-vx-ap-card" delay="0.12s">
                <span className="ce-vx-badge" aria-hidden="true">
                  <PinGlyph />
                </span>
                <p className="ce-vx-city">{field("venueCity")}</p>
                <span className="ce-vx-sep" aria-hidden="true" />
                <p className="ce-vx-addr">{field("addressFull", undefined, true)}</p>
                {renderButton()}
                {renderLinkEditor()}
              </Reveal>
            </div>
          </div>
        );
      case "panorama-card":
        return (
          <div className="ce-vx ce-vx-pc">
            <Reveal className="ce-vx-pc-media">{renderPhoto("ce-vx-pc-ph")}</Reveal>
            <Reveal className="ce-vx-pc-card" delay="0.1s">
              <CreamLeafSprig className="ce-vx-pc-sprig" />
              <p className="ce-vx-eyebrow">{field("locationTitle")}</p>
              <h2 className="ce-vx-title">{field("venueName")}</h2>
              <DiamondRule className="ce-vx-rule" />
              <p className="ce-vx-city">{field("venueCity")}</p>
              <p className="ce-vx-addr">{field("addressFull", undefined, true)}</p>
              {renderButton()}
              {renderLinkEditor()}
            </Reveal>
          </div>
        );
      case "map-details": {
        const embed = mapsEmbed(mapsUrl, mapQuery);
        return (
          <div className="ce-w ce-vx ce-vx-md">
            <div className="ce-vx-md-info">
              {renderHead("", true)}
              <Reveal className="ce-vx-md-rows" delay="0.08s">
                <div className="ce-vx-md-row">
                  <span className="ce-vx-badge" aria-hidden="true">
                    <VillaGlyph />
                  </span>
                  <p className="ce-vx-city">{field("venueCity")}</p>
                </div>
                <div className="ce-vx-md-row">
                  <span className="ce-vx-badge" aria-hidden="true">
                    <PinGlyph />
                  </span>
                  <p className="ce-vx-addr">{field("addressFull", undefined, true)}</p>
                </div>
              </Reveal>
              <Reveal className="ce-vx-md-cta" delay="0.14s">
                {renderButton()}
                {renderLinkEditor()}
              </Reveal>
            </div>
            <Reveal className="ce-vx-md-visual" delay="0.1s">
              <div className="ce-vx-md-map">
                {embed ? (
                  <iframe
                    src={embed}
                    title="Venue map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <CreamPh colors={["#E8D9BF", "#A8AE96"]} label="" />
                )}
              </div>
              {renderPhoto("ce-vx-md-medal")}
              <CreamBlossomTwig className="ce-vx-md-twig" />
            </Reveal>
          </div>
        );
      }
      default:
        return (
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
                {renderButton("")}
                {renderLinkEditor()}
              </Reveal>
            </div>

            <Reveal>
              <div
                className={`ce-mk ce-venue-ph${editing ? " is-editable" : ""}`}
                role={editing ? "button" : undefined}
                tabIndex={editing ? 0 : undefined}
                aria-label={editing ? "Change venue image" : "Venue"}
                onClick={pickImage}
                onKeyDown={(e) => {
                  if (editing && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    pickImage();
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
        );
    }
  }

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

      {renderBody()}

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
