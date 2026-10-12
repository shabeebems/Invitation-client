"use client";

export type LayoutOption<T extends string = string> = {
  id: T;
  label: string;
};

export type CountdownLayout = "classic" | "ornate" | "rings" | "ribbon" | "minimal";
export type MeetCoupleLayout = "classic" | "oval" | "framed" | "stacked" | "cards";
export type LoveStoryLayout = "journey" | "magazine" | "cards" | "path" | "album";
export type GalleryLayout = "grid" | "masonry" | "polaroid" | "carousel" | "scrapbook";
export type LocationLayout = "split" | "palace" | "folio" | "cards" | "compact";

export const COUNTDOWN_LAYOUTS: LayoutOption<CountdownLayout>[] = [
  { id: "classic", label: "Classic" },
  { id: "ornate", label: "Ornate" },
  { id: "rings", label: "Rings" },
  { id: "ribbon", label: "Ribbon" },
  { id: "minimal", label: "Minimal" },
];

export const MEET_COUPLE_LAYOUTS: LayoutOption<MeetCoupleLayout>[] = [
  { id: "classic", label: "Classic" },
  { id: "oval", label: "Oval" },
  { id: "framed", label: "Framed" },
  { id: "stacked", label: "Stacked" },
  { id: "cards", label: "Cards" },
];

export const LOVE_STORY_LAYOUTS: LayoutOption<LoveStoryLayout>[] = [
  { id: "journey", label: "Journey" },
  { id: "magazine", label: "Magazine" },
  { id: "cards", label: "Cards" },
  { id: "path", label: "Path" },
  { id: "album", label: "Album" },
];

export const GALLERY_LAYOUTS: LayoutOption<GalleryLayout>[] = [
  { id: "grid", label: "Grid" },
  { id: "masonry", label: "Masonry" },
  { id: "polaroid", label: "Polaroid" },
  { id: "carousel", label: "Carousel" },
  { id: "scrapbook", label: "Scrapbook" },
];

export const LOCATION_LAYOUTS: LayoutOption<LocationLayout>[] = [
  { id: "split", label: "Split" },
  { id: "palace", label: "Palace" },
  { id: "folio", label: "Folio" },
  { id: "cards", label: "Cards" },
  { id: "compact", label: "Compact" },
];

export function normalizeLayoutId<T extends string>(
  value: string | undefined,
  options: LayoutOption<T>[],
  fallback: T,
  aliases?: Record<string, T>
): T {
  const next = (value || fallback).toLowerCase();
  if (aliases?.[next]) {
    return aliases[next];
  }
  if (options.some((item) => item.id === next)) {
    return next as T;
  }
  return fallback;
}

export default function LayoutPicker<T extends string>({
  options,
  value,
  onChange,
  section,
  title,
  className = "",
}: {
  options: LayoutOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Section name shown in “Choose {section} layout” (e.g. Location, Journey). */
  section: string;
  /** Optional full title override (e.g. “Choose ambient effect”). */
  title?: string;
  className?: string;
}) {
  const heading = title || `Choose ${section} layout`;

  return (
    <div className={`rr-layout-picker ${className}`.trim()} role="group" aria-label={heading}>
      <p className="rr-layout-picker-title font-caps">{heading}</p>
      <div className="rr-layout-picker-options">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`rr-layout-picker-btn font-caps ${value === option.id ? "is-active" : ""}`}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
