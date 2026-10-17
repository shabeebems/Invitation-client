"use client";

export type { LayoutOption } from "@/components/templates/shared/LayoutPicker";
export { default, normalizeLayoutId } from "@/components/templates/shared/LayoutPicker";

import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

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
