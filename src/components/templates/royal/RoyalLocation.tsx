"use client";

import { useMemo, useState, type ReactNode } from "react";
import EditableField from "@/components/templates/EditableField";
import LayoutPicker, {
  LOCATION_LAYOUTS,
  normalizeLayoutId,
  type LocationLayout,
} from "@/components/templates/royal/LayoutPicker";
import { LOCATION_ITEM_MAX, MAX_LOCATION_ITEMS } from "@/lib/content-limits";
import type { LocationItem } from "@/lib/api";

export type { LocationLayout };

function mapsEmbed(url: string, fallbackQuery: string) {
  const source = (url || fallbackQuery || "").trim();
  const pair = source.match(/(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=16&output=embed`;
  }

  let query = fallbackQuery;
  try {
    if (/^https?:\/\//i.test(source)) {
      const parsed = new URL(source);
      query =
        parsed.searchParams.get("query") ||
        parsed.searchParams.get("q") ||
        parsed.searchParams.get("daddr") ||
        parsed.searchParams.get("destination") ||
        fallbackQuery;
    } else if (source) {
      query = source;
    }
  } catch {
    query = fallbackQuery || source;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(query || "Kozhikode")}&z=16&output=embed`;
}

function googleDirectionsUrl(item: LocationItem) {
  if (item.mapsUrl) return item.mapsUrl;
  const query = encodeURIComponent([item.title, item.address].filter(Boolean).join(", "));
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}

function shareTextFor(item: LocationItem) {
  const link = item.mapsUrl || googleDirectionsUrl(item);
  return [`📍 ${item.label || "Venue"}`, item.title, item.address, link].filter(Boolean).join("\n");
}

function MapFrame({ title, src }: { title: string; src: string }) {
  return (
    <div className="rr-location-map">
      <iframe title={`${title || "Venue"} map`} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <div className="rr-location-map-frame" aria-hidden="true" />
    </div>
  );
}

function ActionButtons({
  item,
  editing,
  copied,
  onCopy,
}: {
  item: LocationItem;
  editing: boolean;
  copied: "link" | "address" | null;
  onCopy: (kind: "link" | "address", value: string) => void;
}) {
  const waShare = `https://wa.me/?text=${encodeURIComponent(shareTextFor(item))}`;

  return (
    <div className="rr-location-actions">
      {editing ? (
        <span className="rr-location-btn is-primary font-caps">Get directions</span>
      ) : (
        <a
          className="rr-location-btn is-primary font-caps"
          href={googleDirectionsUrl(item)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions
        </a>
      )}

      <button
        type="button"
        className="rr-location-btn font-caps"
        onClick={() => onCopy("address", [item.title, item.address].filter(Boolean).join(" — "))}
      >
        {copied === "address" ? "Address copied" : "Copy address"}
      </button>

      <button
        type="button"
        className="rr-location-btn font-caps"
        onClick={() => onCopy("link", item.mapsUrl || googleDirectionsUrl(item))}
      >
        {copied === "link" ? "Link copied" : "Copy map link"}
      </button>

      {editing ? (
        <span className="rr-location-btn font-caps">Share location</span>
      ) : (
        <a className="rr-location-btn font-caps" href={waShare} target="_blank" rel="noopener noreferrer">
          Share location
        </a>
      )}
    </div>
  );
}

export default function RoyalLocation({
  items,
  fallback,
  editing,
  layout,
  field,
  onCommitItem,
  onAddItem,
  onRemoveItem,
  onLayoutChange,
}: {
  items: LocationItem[];
  fallback: LocationItem;
  editing: boolean;
  layout?: string;
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  onCommitItem: (index: number, key: keyof LocationItem, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onLayoutChange?: (layout: LocationLayout) => void;
}) {
  const locations = items.length ? items : [fallback];
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState<"link" | "address" | null>(null);
  const activeLayout = normalizeLayoutId(layout, LOCATION_LAYOUTS, "split", {
    stacked: "palace",
    mapfirst: "palace",
  });
  const safeIndex = Math.min(activeIndex, Math.max(locations.length - 1, 0));
  const active = locations[safeIndex] || fallback;

  const embedSrc = useMemo(
    () =>
      mapsEmbed(
        active.mapsUrl || "",
        [active.title, active.address].filter(Boolean).join(", ")
      ),
    [active]
  );

  async function copyValue(kind: "link" | "address", value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  function renderEditFields(index: number, item: LocationItem) {
    if (!editing) return null;
    return (
      <div className="rr-location-edit-links">
        <p className="font-caps">Google Maps URL</p>
        <EditableField
          value={item.mapsUrl}
          editable
          multiline
          className="rr-location-url"
          maxLength={LOCATION_ITEM_MAX.mapsUrl}
          onCommit={(value) => onCommitItem(index, "mapsUrl", value)}
        />
        {locations.length > 1 ? (
          <button
            type="button"
            className="rr-location-remove font-caps"
            onClick={() => {
              onRemoveItem(index);
              setActiveIndex(0);
            }}
          >
            Remove this venue
          </button>
        ) : null}
      </div>
    );
  }

  function renderInfo(index: number, item: LocationItem, showKicker = true) {
    return (
      <div className="rr-location-info">
        {showKicker ? (
          <p className="rr-location-kicker font-caps">{field("destinationLabel", "rr-location-kicker font-caps")}</p>
        ) : null}

        {editing ? (
          <EditableField
            value={item.title}
            editable
            className="rr-location-title font-invite-serif"
            maxLength={LOCATION_ITEM_MAX.title}
            onCommit={(value) => onCommitItem(index, "title", value)}
          />
        ) : (
          <h3 className="rr-location-title font-invite-serif">{item.title}</h3>
        )}

        {editing ? (
          <EditableField
            value={item.address}
            editable
            multiline
            className="rr-location-address font-invite-serif"
            maxLength={LOCATION_ITEM_MAX.address}
            onCommit={(value) => onCommitItem(index, "address", value)}
          />
        ) : (
          <p className="rr-location-address font-invite-serif">{item.address}</p>
        )}

        {renderEditFields(index, item)}
        <ActionButtons item={item} editing={editing} copied={copied} onCopy={copyValue} />
      </div>
    );
  }

  return (
    <section
      id="location"
      className={`rr-section rr-location is-layout-${activeLayout}`}
      style={{ color: "#e7d3a4" }}
    >
      <div className="rr-section-inner rr-location-inner">
        <p className="rr-eyebrow font-caps" style={{ color: "#b9893e", WebkitTextFillColor: "#b9893e" }}>
          {field("locationEyebrow", "rr-eyebrow font-caps text-[#b9893e]")}
        </p>
        <h2 className="rr-script-title font-names" style={{ color: "#e7d3a4", WebkitTextFillColor: "#e7d3a4" }}>
          {field("locationTitle", "rr-script-title font-names text-[#e7d3a4]")}
        </h2>
        <p className="rr-section-intro font-invite-serif" style={{ color: "#f3e8cd", WebkitTextFillColor: "#f3e8cd" }}>
          {field("locationIntro", "rr-section-intro font-invite-serif text-[#f3e8cd]", true)}
        </p>

        {editing && onLayoutChange ? (
          <LayoutPicker
            options={LOCATION_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Location"
          />
        ) : null}

        {activeLayout !== "cards" && (locations.length > 1 || editing) ? (
          <div className="rr-location-tabs" role="tablist" aria-label="Venue functions">
            {locations.map((item, index) => (
              <button
                key={`${item.label}-${index}`}
                type="button"
                role="tab"
                aria-selected={safeIndex === index}
                className={`rr-location-tab font-caps ${safeIndex === index ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                {editing ? (
                  <EditableField
                    value={item.label}
                    editable
                    className="rr-location-tab-edit"
                    maxLength={LOCATION_ITEM_MAX.label}
                    onCommit={(value) => onCommitItem(index, "label", value)}
                  />
                ) : (
                  item.label || `Venue ${index + 1}`
                )}
              </button>
            ))}
            {editing && locations.length < MAX_LOCATION_ITEMS ? (
              <button type="button" className="rr-location-tab rr-location-tab-add font-caps" onClick={onAddItem}>
                + Add
              </button>
            ) : null}
            {editing && locations.length >= MAX_LOCATION_ITEMS ? (
              <span className="rr-location-tab-limit font-caps">Max {MAX_LOCATION_ITEMS}</span>
            ) : null}
          </div>
        ) : null}

        {activeLayout === "cards" ? (
          <>
            {editing && locations.length < MAX_LOCATION_ITEMS ? (
              <div className="rr-location-tabs">
                <button type="button" className="rr-location-tab rr-location-tab-add font-caps" onClick={onAddItem}>
                  + Add venue
                </button>
              </div>
            ) : null}
            {editing && locations.length >= MAX_LOCATION_ITEMS ? (
              <p className="rr-timeline-add-limit font-caps">Maximum {MAX_LOCATION_ITEMS} venues</p>
            ) : null}
            <div className="rr-location-cards">
              {locations.map((item, index) => {
                const src = mapsEmbed(
                  item.mapsUrl || "",
                  [item.title, item.address].filter(Boolean).join(", ")
                );
                return (
                  <article key={`${item.label}-${index}`} className="rr-location-card">
                    <p className="rr-location-card-label font-caps">{item.label || `Venue ${index + 1}`}</p>
                    {editing ? (
                      <EditableField
                        value={item.label}
                        editable
                        className="rr-location-tab-edit font-caps"
                        maxLength={LOCATION_ITEM_MAX.label}
                        onCommit={(value) => onCommitItem(index, "label", value)}
                      />
                    ) : null}
                    <MapFrame title={item.title} src={src} />
                    {renderInfo(index, item, false)}
                  </article>
                );
              })}
            </div>
          </>
        ) : null}

        {activeLayout === "palace" ? (
          <div className="rr-location-palace">
            <span className="rr-location-palace-corner is-tl" aria-hidden="true" />
            <span className="rr-location-palace-corner is-tr" aria-hidden="true" />
            <span className="rr-location-palace-corner is-bl" aria-hidden="true" />
            <span className="rr-location-palace-corner is-br" aria-hidden="true" />
            <div className="rr-location-palace-seal" aria-hidden="true">
              ❦
            </div>
            <div className="rr-location-palace-ornament" aria-hidden="true">
              <span />
              <em>✦</em>
              <span />
            </div>
            <div className="rr-location-palace-body">
              {renderInfo(safeIndex, active)}
              <div className="rr-location-palace-map">
                <MapFrame title={active.title} src={embedSrc} />
              </div>
            </div>
          </div>
        ) : null}

        {activeLayout === "folio" ? (
          <div className="rr-location-folio">
            <div className="rr-location-folio-map">
              <span className="rr-location-folio-pin" aria-hidden="true">
                ✦
              </span>
              <MapFrame title={active.title} src={embedSrc} />
            </div>
            <div className="rr-location-folio-sheet">
              <p className="rr-location-folio-mark font-caps">Wayfinding</p>
              {renderInfo(safeIndex, active, false)}
            </div>
          </div>
        ) : null}

        {activeLayout === "split" || activeLayout === "compact" ? (
          <div className={`rr-location-panel is-${activeLayout}`}>
            {renderInfo(safeIndex, active)}
            <MapFrame title={active.title} src={embedSrc} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
