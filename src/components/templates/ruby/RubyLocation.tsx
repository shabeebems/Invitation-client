"use client";

import type { ReactNode } from "react";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";
import { Reveal, SectionTitle } from "@/components/templates/ruby/RubyDecor";
import {
  RUBY_LOCATION_LAYOUTS,
  type RubyLocationLayout,
} from "@/components/templates/ruby/ruby-layouts";

function toHref(url: string) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Builds an embeddable map from a Maps link; short share links fall back to the venue text. */
function mapsEmbed(url: string, fallbackQuery: string) {
  const pair = url.match(/(-?\d{1,3}\.\d{3,}),\s*(-?\d{1,3}\.\d{3,})/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=15&output=embed`;
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
  return query ? `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed` : "";
}

function PinIcon() {
  return (
    <svg className="rb-lc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 21s-7-7.2-7-12a7 7 0 1114 0c0 4.8-7 12-7 12z" strokeLinejoin="round" strokeWidth="1.4" />
      <circle cx="12" cy="9.2" r="2.4" strokeWidth="1.4" />
    </svg>
  );
}

function PalaceIcon() {
  return (
    <svg className="rb-lc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M12 2.8v2.4M8.2 9.6C8.2 7 10 5.6 12 5.2c2 .4 3.8 1.8 3.8 4.4" strokeLinecap="round" strokeWidth="1.4" />
      <path d="M4 20.6h16M5.4 20.6V12h13.2v8.6M4.4 12h15.2l-1.2-2.4H5.6z" strokeLinejoin="round" strokeWidth="1.4" />
      <path d="M10 20.6v-4.4a2 2 0 014 0v4.4" strokeWidth="1.4" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="rb-lc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" strokeWidth="1.4" />
      <path d="M15.6 8.4l-2.2 5-5 2.2 2.2-5z" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="rb-lc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1.2 1.2" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1.2-1.2" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function MapArt() {
  return (
    <svg className="rb-lc-art" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="600" className="rb-lc-art-wash" />
      <g className="rb-lc-art-roads" fill="none">
        <path d="M0 120 H800M0 250 H800M0 400 H800M0 520 H800" strokeWidth="9" />
        <path d="M110 0 V600M260 0 V600M430 0 V600M590 0 V600M720 0 V600" strokeWidth="9" />
        <path d="M-20 600 L820 20" strokeWidth="16" />
      </g>
      <path className="rb-lc-art-river" d="M-20 330 C 150 280, 280 380, 420 330 S 660 270, 820 340" fill="none" strokeWidth="26" />
    </svg>
  );
}

export default function RubyLocation({
  editing,
  layout,
  mapsUrl,
  venueName = "",
  venueCity = "",
  addressFull = "",
  field,
  onLayoutChange,
}: {
  editing: boolean;
  layout?: string;
  mapsUrl: string;
  venueName?: string;
  venueCity?: string;
  addressFull?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onLayoutChange?: (layout: RubyLocationLayout) => void;
}) {
  const activeLayout = normalizeLayoutId(layout, RUBY_LOCATION_LAYOUTS, "centered-venue");
  const href = toHref(mapsUrl);
  const showCity = editing || Boolean(venueCity.trim());
  const embed = activeLayout === "map-frame"
    ? mapsEmbed(mapsUrl, [venueName, addressFull].filter(Boolean).join(", "))
    : "";

  function renderButton(className = "") {
    const classes = `rb-btn ${className}`.trim();
    if (editing) {
      return <span className={classes}>{field("getDirectionsLabel", "rb-btn-label")}</span>;
    }
    return (
      <a
        className={classes}
        href={href || "#"}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
      >
        {field("getDirectionsLabel", "rb-btn-label")}
      </a>
    );
  }

  function renderLinkEditor() {
    if (!editing) return null;
    return (
      <div className="rb-lc-url">
        <span className="rb-lc-url-head">
          <LinkIcon />
          <span className="rb-mc">Google Maps link</span>
        </span>
        <span className="rb-lc-url-value">{field("mapsUrl", "rb-lc-url-field")}</span>
        <span className="rb-lc-url-hint">
          Paste the share link from Google Maps. The directions button opens this link.
        </span>
      </div>
    );
  }

  function renderOrnament() {
    return (
      <span className="rb-lc-rule" aria-hidden="true">
        <i />
      </span>
    );
  }

  return (
    <section
      className="rb-sec"
      id="location"
      data-layout={activeLayout}
      aria-label="Venue"
    >
      {editing && onLayoutChange ? (
        <LayoutPicker
          options={RUBY_LOCATION_LAYOUTS}
          value={activeLayout}
          onChange={onLayoutChange}
          section="Venue"
          className="rb-layout-picker"
        />
      ) : null}

      <div className={`rb-wrap${activeLayout === "centered-venue" ? "" : " rb-lc-wrap"}`}>
        <SectionTitle>{field("locationTitle", "rb-h2 rb-mc")}</SectionTitle>

        {activeLayout === "centered-venue" ? (
          <>
            <Reveal>
              <p className="rb-gv rb-venue-name">{field("venueName", "rb-gv")}</p>
            </Reveal>
            <Reveal>
              <p className="rb-lead rb-venue-addr">{field("addressFull", "", true)}</p>
            </Reveal>
            <Reveal>{renderButton()}</Reveal>
            <Reveal>{renderLinkEditor()}</Reveal>
          </>
        ) : null}

        {activeLayout === "map-frame" ? (
          <div className="rb-mf">
            <Reveal className="rb-mf-map">
              <span className="rb-mf-corner is-tl" aria-hidden="true" />
              <span className="rb-mf-corner is-tr" aria-hidden="true" />
              <span className="rb-mf-corner is-bl" aria-hidden="true" />
              <span className="rb-mf-corner is-br" aria-hidden="true" />
              <div className="rb-mf-screen">
                <MapArt />
                {embed ? (
                  <iframe
                    className="rb-mf-embed"
                    src={embed}
                    title="Venue map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : null}
              </div>
            </Reveal>
            <Reveal className="rb-mf-panel" delay="0.12s">
              {showCity ? (
                <p className="rb-mc rb-mf-city">
                  <PinIcon />
                  <span>{field("venueCity", "")}</span>
                </p>
              ) : null}
              <h3 className="rb-gv rb-mf-name">{field("venueName", "rb-gv")}</h3>
              {renderOrnament()}
              <p className="rb-mf-addr">{field("addressFull", "", true)}</p>
              {renderButton("rb-btn-solid rb-mf-btn")}
              {renderLinkEditor()}
            </Reveal>
          </div>
        ) : null}

        {activeLayout === "palace-arch" ? (
          <Reveal className="rb-pa">
            <div className="rb-pa-arch">
              <span className="rb-pa-medal" aria-hidden="true">
                <PinIcon />
              </span>
              <p className="rb-mc rb-pa-eyebrow">Celebrating at</p>
              <h3 className="rb-gv rb-pa-name">{field("venueName", "rb-gv")}</h3>
              {showCity ? <p className="rb-mc rb-pa-city">{field("venueCity", "")}</p> : null}
              {renderOrnament()}
              <p className="rb-pa-addr">{field("addressFull", "", true)}</p>
              {renderButton("rb-pa-btn")}
              {renderLinkEditor()}
            </div>
            <span className="rb-pa-step" aria-hidden="true" />
          </Reveal>
        ) : null}

        {activeLayout === "venue-details" ? (
          <div className="rb-vd">
            <Reveal>
              <h3 className="rb-gv rb-vd-name">{field("venueName", "rb-gv")}</h3>
            </Reveal>
            <div className={`rb-vd-grid${showCity ? "" : " is-pair"}`}>
              <Reveal className="rb-vd-tile">
                <span className="rb-vd-ico">
                  <PalaceIcon />
                </span>
                <p className="rb-mc rb-vd-label">Address</p>
                <p className="rb-vd-text">{field("addressFull", "", true)}</p>
              </Reveal>
              {showCity ? (
                <Reveal className="rb-vd-tile" delay="0.1s">
                  <span className="rb-vd-ico">
                    <PinIcon />
                  </span>
                  <p className="rb-mc rb-vd-label">City</p>
                  <p className="rb-vd-text">{field("venueCity", "")}</p>
                </Reveal>
              ) : null}
              <Reveal className="rb-vd-tile is-cta" delay="0.2s">
                <span className="rb-vd-ico">
                  <CompassIcon />
                </span>
                <p className="rb-mc rb-vd-label">Directions</p>
                {renderButton("rb-btn-solid rb-vd-btn")}
              </Reveal>
            </div>
            <Reveal>{renderLinkEditor()}</Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}
