"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  CarIcon,
  ExpandIcon,
  Flower,
  LeafFlourish,
  MapFoldIcon,
  NavArrowIcon,
  PinIcon,
  ShareIcon,
} from "@/components/templates/house/HouseIcons";
import {
  LOCATION_LAYOUT_ALIASES,
  LOCATION_LAYOUTS,
  type LocationLayout,
} from "@/components/templates/house/house-layouts";
import LayoutPicker, { normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";

function mapsEmbed(url: string) {
  const pair = url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
  if (pair) {
    return `https://maps.google.com/maps?q=${pair[1]},${pair[2]}&z=16&output=embed`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
}

function directionsUrl(googleMapsUrl?: string, addressFull?: string) {
  if (googleMapsUrl) {
    const pair = googleMapsUrl.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);
    if (pair) {
      return `https://www.google.com/maps/dir/?api=1&destination=${pair[1]},${pair[2]}`;
    }
    return googleMapsUrl;
  }
  if (addressFull) {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressFull)}`;
  }
  return "#";
}

function ChevronRight({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationLabel({
  field,
  centered = false,
  withFlower = false,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  centered?: boolean;
  withFlower?: boolean;
}) {
  return (
    <div
      className={`hw-loc-muted mb-3 flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.2em] uppercase ${
        centered ? "justify-center" : ""
      }`}
    >
      {withFlower ? (
        <Flower className="hw-loc-leaf text-[0.85rem]" />
      ) : (
        <PinIcon className="hw-loc-accent h-3.5 w-3.5" />
      )}
      {centered ? (
        <>
          <span className="h-px w-6 bg-[color-mix(in_srgb,var(--loc-muted)_45%,transparent)]" />
          <span>{field("destinationLabel") || "Destination"}</span>
          <span className="h-px w-6 bg-[color-mix(in_srgb,var(--loc-muted)_45%,transparent)]" />
        </>
      ) : (
        <span>{field("destinationLabel") || "Destination"}</span>
      )}
    </div>
  );
}

function AddressLine({
  field,
  className = "",
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  className?: string;
}) {
  return (
    <p className={`hw-loc-muted flex items-start gap-2 text-[0.9rem] leading-[1.55] ${className}`.trim()}>
      <PinIcon className="hw-loc-accent mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{field("addressFull", "", true)}</span>
    </p>
  );
}

function MapFrame({
  src,
  className = "",
  showExpand = false,
  expandHref,
}: {
  src: string;
  className?: string;
  showExpand?: boolean;
  expandHref?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-[var(--loc-ivory-deep)] ${className}`.trim()}>
      <iframe
        title="Venue map"
        className="absolute inset-0 h-full w-full border-0"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {showExpand && expandHref ? (
        <a
          href={expandHref}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2.5 bottom-2.5 z-[2] flex h-8 w-8 items-center justify-center rounded-full border border-[var(--loc-border)] bg-[var(--color-linen-bg)] text-[var(--loc-accent-deep)] shadow-sm"
          aria-label="Open map fullscreen"
        >
          <ExpandIcon className="h-3.5 w-3.5" />
        </a>
      ) : null}
    </div>
  );
}

function EditUrls({
  field,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
}) {
  return (
    <div className="mt-4 space-y-2 rounded-2xl border border-dashed border-[var(--loc-border)] bg-[color-mix(in_srgb,var(--color-linen-surface)_55%,transparent)] p-3 text-left">
      <p className="hw-loc-muted text-[0.68rem] font-semibold tracking-[0.12em] uppercase">Google Maps link (edit)</p>
      {field("googleMapsUrl", "block break-all text-[11px] text-[var(--loc-ink)]", true)}
    </div>
  );
}

/** Layout 1 — Portrait vertical card */
function PortraitLocation({
  field,
  editing,
  embedSrc,
  googleHref,
  directionsHref,
  onShare,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  embedSrc: string;
  googleHref: string;
  directionsHref: string;
  onShare: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[380px]">
      <div className="hw-loc-accent mb-2 flex justify-center">
        <PinIcon className="h-5 w-5" />
      </div>
      <LocationLabel field={field} centered />
      <h3 className="hw-font-serif hw-loc-title mb-3 text-center text-[clamp(1.7rem,4vw,2.15rem)] font-semibold">
        {field("houseName")}
      </h3>
      <AddressLine field={field} className="mb-5 justify-center text-center [&>span]:text-left" />

      {editing ? (
        <span className="hw-loc-btn-line mb-5 flex w-full items-center justify-between gap-2 rounded-full px-4 py-3 text-[0.84rem] font-semibold">
          <span className="inline-flex items-center gap-2">
            <MapFoldIcon className="h-4 w-4" />
            <span>Open in Google Maps</span>
          </span>
          <ChevronRight />
        </span>
      ) : (
        <a
          href={googleHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hw-loc-btn-line mb-5 flex w-full items-center justify-between gap-2 rounded-full px-4 py-3 text-[0.84rem] font-semibold no-underline transition"
        >
          <span className="inline-flex items-center gap-2">
            <MapFoldIcon className="h-4 w-4" />
            <span>Open in Google Maps</span>
          </span>
          <ChevronRight />
        </a>
      )}

      <div className="mb-5 flex items-start justify-center gap-5 sm:gap-6">
        {[
          {
            key: "directions",
            label: "Get Directions",
            icon: <CarIcon className="h-4 w-4" />,
            href: directionsHref,
            onClick: undefined as (() => void) | undefined,
          },
          {
            key: "maps",
            label: "Open Maps",
            icon: <MapFoldIcon className="h-4 w-4" />,
            href: googleHref,
            onClick: undefined,
          },
          {
            key: "share",
            label: "Share Location",
            icon: <ShareIcon className="h-4 w-4" />,
            href: undefined,
            onClick: onShare,
          },
        ].map((action) => {
          const className =
            "hw-loc-muted flex flex-col items-center gap-1.5 text-[0.68rem] font-medium no-underline";
          if (action.onClick) {
            return (
              <button key={action.key} type="button" onClick={action.onClick} className={className}>
                <span className="hw-loc-circle flex h-11 w-11 items-center justify-center rounded-full shadow-sm">{action.icon}</span>
                {action.label}
              </button>
            );
          }
          return (
            <a
              key={action.key}
              href={editing ? undefined : action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              onClick={editing ? (e) => e.preventDefault() : undefined}
            >
              <span className="hw-loc-circle flex h-11 w-11 items-center justify-center rounded-full shadow-sm">{action.icon}</span>
              {action.label}
            </a>
          );
        })}
      </div>

      <div className="relative">
        <MapFrame src={embedSrc} className="aspect-[5/4] rounded-2xl" />
        <LeafFlourish className="hw-loc-leaf pointer-events-none absolute -right-1 -bottom-1 h-5 w-12 opacity-80" />
      </div>
      {editing ? <EditUrls field={field} /> : null}
    </div>
  );
}

/** Layout 2 — Atlas wide card with organic map */
function AtlasLocation({
  field,
  editing,
  embedSrc,
  googleHref,
  directionsHref,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  embedSrc: string;
  googleHref: string;
  directionsHref: string;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-8">
        <div className="min-w-0 text-left">
          <LocationLabel field={field} />
          <h3 className="hw-font-serif hw-loc-title mb-3 text-[clamp(1.9rem,3.5vw,2.6rem)] font-semibold">
            {field("houseName")}
          </h3>
          <AddressLine field={field} className="mb-6 max-w-[340px]" />

          <div className="mb-7 flex flex-wrap items-center gap-3">
            {editing ? (
              <>
                <span className="hw-loc-btn-fill inline-flex h-14 w-14 items-center justify-center rounded-full">
                  <NavArrowIcon className="h-5 w-5" />
                </span>
                <span className="hw-loc-circle inline-flex h-14 w-14 items-center justify-center rounded-full">
                  <MapFoldIcon className="h-5 w-5" />
                </span>
              </>
            ) : (
              <>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get directions"
                  className="hw-loc-btn-fill inline-flex h-14 w-14 items-center justify-center rounded-full transition"
                >
                  <NavArrowIcon className="h-5 w-5" />
                </a>
                <a
                  href={googleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in maps"
                  className="hw-loc-circle inline-flex h-14 w-14 items-center justify-center rounded-full transition hover:bg-[var(--loc-accent-soft)]"
                >
                  <MapFoldIcon className="h-5 w-5" />
                </a>
              </>
            )}
            <div className="hw-loc-muted ml-1 text-[0.72rem] leading-snug">
              <p className="hw-loc-accent font-semibold">Get Directions</p>
              <p>Open in Maps</p>
            </div>
          </div>

          <div className="mb-3 flex items-center gap-3">
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--loc-accent)_25%,transparent)]" />
            <Flower className="hw-loc-leaf text-[0.9rem]" />
            <span className="h-px flex-1 bg-[color-mix(in_srgb,var(--loc-accent)_25%,transparent)]" />
          </div>
          <p className="hw-font-script hw-loc-accent text-[1.45rem]">See you there...</p>
          {editing ? <EditUrls field={field} /> : null}
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:max-w-none">
          <LeafFlourish className="hw-loc-leaf pointer-events-none absolute -top-1 left-4 z-[2] h-6 w-14 rotate-[-20deg] opacity-85 lg:left-8" />
          <MapFrame src={embedSrc} className="hw-location-blob aspect-square w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]" />
          <p className="hw-loc-muted mt-3 flex items-center justify-end gap-1.5 text-[0.78rem]">
            <PinIcon className="hw-loc-accent h-3 w-3" />
            {field("addressShort")}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Layout 3 — Compact split pane */
function PaneLocation({
  field,
  editing,
  embedSrc,
  googleHref,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  embedSrc: string;
  googleHref: string;
}) {
  return (
    <div className="mx-auto w-full max-w-[820px]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-stretch md:gap-8">
        <div className="relative flex flex-col justify-center">
          <LocationLabel field={field} withFlower />
          <h3 className="hw-font-serif hw-loc-title mb-2.5 text-[clamp(1.65rem,3.2vw,2.1rem)] font-semibold">
            {field("houseName")}
          </h3>
          <AddressLine field={field} className="mb-5" />
          {editing ? (
            <span className="hw-loc-btn-fill inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[0.84rem] font-semibold">
              <NavArrowIcon className="h-4 w-4" />
              <span>Open in Google Maps</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-90" />
            </span>
          ) : (
            <a
              href={googleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-loc-btn-fill inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-[0.84rem] font-semibold no-underline transition"
            >
              <NavArrowIcon className="h-4 w-4" />
              <span>Open in Google Maps</span>
              <ChevronRight className="h-3.5 w-3.5 opacity-90" />
            </a>
          )}
          <LeafFlourish className="hw-loc-leaf pointer-events-none absolute bottom-0 left-1/2 hidden h-4 w-10 -translate-x-1/2 opacity-80 md:block" />
          {editing ? <EditUrls field={field} /> : null}
        </div>
        <div className="overflow-hidden rounded-2xl">
          <MapFrame
            src={embedSrc}
            className="aspect-[5/4] w-full min-h-[240px] md:aspect-auto md:h-full md:min-h-[320px]"
            showExpand
            expandHref={googleHref}
          />
        </div>
      </div>
    </div>
  );
}

/** Layout 4 — Minimal pill bar */
function PillLocation({
  field,
  editing,
  googleHref,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  googleHref: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[920px]">
      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5 md:gap-6">
        <span className="hw-loc-btn-fill mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-16 sm:w-16">
          <PinIcon className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="hw-font-serif hw-loc-title text-[clamp(1.25rem,2.5vw,1.55rem)] font-semibold">
            {field("houseName")}
          </h3>
          <p className="hw-loc-muted mt-0.5 truncate text-[0.84rem] sm:whitespace-normal sm:overflow-visible">
            {field("addressFull", "", true)}
          </p>
        </div>

        <span className="mx-auto hidden h-10 w-px shrink-0 bg-[color-mix(in_srgb,var(--loc-accent)_22%,transparent)] sm:mx-0 sm:block" />

        {editing ? (
          <span className="hw-loc-btn-line mx-auto inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold sm:mx-0">
            <MapFoldIcon className="h-4 w-4" />
            <span>Open in Google Maps</span>
            <ChevronRight />
          </span>
        ) : (
          <a
            href={googleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hw-loc-btn-line mx-auto inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold no-underline transition sm:mx-0"
          >
            <MapFoldIcon className="h-4 w-4" />
            <span>Open in Google Maps</span>
            <ChevronRight />
          </a>
        )}

        <LeafFlourish className="hw-loc-leaf pointer-events-none absolute top-1/2 right-3 hidden h-5 w-12 -translate-y-1/2 opacity-80 md:block" />
      </div>
      {editing ? (
        <div className="mx-auto mt-3 max-w-[520px]">
          <EditUrls field={field} />
        </div>
      ) : null}
    </div>
  );
}

export default function HouseLocation({
  field,
  editing,
  layout,
  onLayoutChange,
  googleMapsUrl,
  addressFull,
}: {
  field: (key: string, className?: string, multiline?: boolean) => ReactNode;
  editing: boolean;
  layout?: string;
  onLayoutChange?: (layout: LocationLayout) => void;
  googleMapsUrl?: string;
  addressFull?: string;
}) {
  const [toast, setToast] = useState<string | null>(null);
  const activeLayout = normalizeLayoutId(
    layout,
    LOCATION_LAYOUTS,
    "portrait",
    LOCATION_LAYOUT_ALIASES
  );

  const embedSrc = useMemo(
    () => mapsEmbed(googleMapsUrl || addressFull || ""),
    [googleMapsUrl, addressFull]
  );
  const googleHref = googleMapsUrl || directionsUrl(undefined, addressFull);
  const directionsHref = directionsUrl(googleMapsUrl, addressFull);

  async function shareLocation() {
    const url = googleMapsUrl || addressFull || "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Venue location", text: addressFull || "", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast("Location link copied!");
      window.setTimeout(() => setToast(null), 2200);
    } catch {
      setToast(null);
    }
  }

  const body =
    activeLayout === "atlas" ? (
      <AtlasLocation
        field={field}
        editing={editing}
        embedSrc={embedSrc}
        googleHref={googleHref}
        directionsHref={directionsHref}
      />
    ) : activeLayout === "pane" ? (
      <PaneLocation field={field} editing={editing} embedSrc={embedSrc} googleHref={googleHref} />
    ) : activeLayout === "pill" ? (
      <PillLocation field={field} editing={editing} googleHref={googleHref} />
    ) : (
      <PortraitLocation
        field={field}
        editing={editing}
        embedSrc={embedSrc}
        googleHref={googleHref}
        directionsHref={directionsHref}
        onShare={() => void shareLocation()}
      />
    );

  return (
    <>
      <section
        id="location"
        className={`relative z-[2] mx-auto max-w-[980px] px-4 py-16 sm:px-6 sm:py-[80px] is-layout-${activeLayout}`}
      >
        <header className="mb-10 text-center sm:mb-12">
          <h2 className="hw-font-serif hw-loc-title mb-3 text-[clamp(2rem,4vw,2.8rem)] font-semibold">
            {field("locationTitle")}
          </h2>
          <p className="hw-loc-muted mx-auto max-w-[560px] text-[0.95rem] leading-[1.65]">
            {field("locationIntro", "", true)}
          </p>
        </header>

        {editing && onLayoutChange ? (
          <LayoutPicker
            className="hw-layout-picker mb-10"
            options={LOCATION_LAYOUTS}
            value={activeLayout}
            onChange={onLayoutChange}
            section="Location"
          />
        ) : null}

        {body}
      </section>

      {toast ? (
        <p className="fixed bottom-8 left-1/2 z-[100000] -translate-x-1/2 rounded-full bg-[#1e1916] px-6 py-3 text-[0.92rem] text-white">
          {toast}
        </p>
      ) : null}
    </>
  );
}
