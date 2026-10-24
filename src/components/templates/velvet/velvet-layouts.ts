import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Velvet Heritage.
 * Each section starts with the reference HTML layout only;
 * additional layouts can be registered here later without changing section data models.
 */

export type VelvetHeroLayout = "arch";
export type VelvetCountdownLayout = "gilded-rings" | "lantern-hex" | "ivory-card";
export type VelvetGalleryLayout =
  | "view-strip"
  | "arch-rail"
  | "polaroids"
  | "gold-quad"
  | "mosaic";
export type VelvetStoryLayout =
  | "rail"
  | "vertical-flow"
  | "flowing-curve"
  | "modern-strip";
export type VelvetLocationLayout =
  | "arch-estate"
  | "atlas"
  | "heritage-portrait";
export type VelvetFooterLayout = "signature";

/** Maps retired countdown ids onto Gilded Rings. */
export const VELVET_COUNTDOWN_LAYOUT_ALIASES: Record<string, VelvetCountdownLayout> = {
  scallop: "gilded-rings",
};

export const VELVET_STORY_LAYOUT_ALIASES: Record<string, VelvetStoryLayout> = {
  "vertical": "vertical-flow",
  "verticalflow": "vertical-flow",
  "curve": "flowing-curve",
  "flowing": "flowing-curve",
  "strip": "modern-strip",
  "modern": "modern-strip",
};

export const VELVET_LOCATION_LAYOUT_ALIASES: Record<string, VelvetLocationLayout> = {
  "arch": "arch-estate",
  "estate": "arch-estate",
  "manor": "arch-estate",
  "01": "arch-estate",
  "map": "atlas",
  "illustrated-map": "atlas",
  "02": "atlas",
  "portrait": "heritage-portrait",
  "heritage": "heritage-portrait",
  "pavilion": "heritage-portrait",
  "03": "heritage-portrait",
};

export const VELVET_HERO_LAYOUTS: LayoutOption<VelvetHeroLayout>[] = [
  { id: "arch", label: "Arch" },
];

export const VELVET_COUNTDOWN_LAYOUTS: LayoutOption<VelvetCountdownLayout>[] = [
  { id: "gilded-rings", label: "Gilded Rings" },
  { id: "lantern-hex", label: "Lantern Hex" },
  { id: "ivory-card", label: "Ivory Card" },
];

export const VELVET_GALLERY_LAYOUTS: LayoutOption<VelvetGalleryLayout>[] = [
  { id: "view-strip", label: "View Strip" },
  { id: "arch-rail", label: "Arch Rail" },
  { id: "polaroids", label: "Polaroids" },
  { id: "gold-quad", label: "Gold Quad" },
  { id: "mosaic", label: "Mosaic" },
];

export const VELVET_STORY_LAYOUTS: LayoutOption<VelvetStoryLayout>[] = [
  { id: "rail", label: "Rail" },
  { id: "vertical-flow", label: "Vertical Flow" },
  { id: "flowing-curve", label: "Flowing Curve" },
  { id: "modern-strip", label: "Modern Strip" },
];

export const VELVET_LOCATION_LAYOUTS: LayoutOption<VelvetLocationLayout>[] = [
  { id: "arch-estate", label: "Arch Estate" },
  { id: "atlas", label: "Illustrated Map" },
  { id: "heritage-portrait", label: "Heritage Portrait" },
];

export const VELVET_FOOTER_LAYOUTS: LayoutOption<VelvetFooterLayout>[] = [
  { id: "signature", label: "Signature" },
];
