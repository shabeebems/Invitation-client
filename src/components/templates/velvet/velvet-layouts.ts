import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Velvet Heritage.
 * Each section starts with the reference HTML layout only;
 * additional layouts can be registered here later without changing section data models.
 */

export type VelvetHeroLayout = "arch";
export type VelvetCountdownLayout = "scallop";
export type VelvetGalleryLayout = "mosaic";
export type VelvetStoryLayout = "rail";
export type VelvetLocationLayout = "atlas";
export type VelvetFooterLayout = "signature";

export const VELVET_HERO_LAYOUTS: LayoutOption<VelvetHeroLayout>[] = [
  { id: "arch", label: "Arch" },
];

export const VELVET_COUNTDOWN_LAYOUTS: LayoutOption<VelvetCountdownLayout>[] = [
  { id: "scallop", label: "Scallop" },
];

export const VELVET_GALLERY_LAYOUTS: LayoutOption<VelvetGalleryLayout>[] = [
  { id: "mosaic", label: "Mosaic" },
];

export const VELVET_STORY_LAYOUTS: LayoutOption<VelvetStoryLayout>[] = [
  { id: "rail", label: "Rail" },
];

export const VELVET_LOCATION_LAYOUTS: LayoutOption<VelvetLocationLayout>[] = [
  { id: "atlas", label: "Atlas" },
];

export const VELVET_FOOTER_LAYOUTS: LayoutOption<VelvetFooterLayout>[] = [
  { id: "signature", label: "Signature" },
];
