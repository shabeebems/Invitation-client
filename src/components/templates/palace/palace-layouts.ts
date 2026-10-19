import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Palace Parchment.
 * Each section starts with the reference HTML layout only.
 */

export type PalaceHeroLayout = "split-arch";
export type PalaceCountdownLayout = "watercolor";
export type PalaceGalleryLayout = "polaroid";
export type PalaceStoryLayout = "icons";
export type PalaceLocationLayout = "card";
export type PalaceFooterLayout = "duet";

export const PALACE_HERO_LAYOUTS: LayoutOption<PalaceHeroLayout>[] = [
  { id: "split-arch", label: "Split Arch" },
];

export const PALACE_COUNTDOWN_LAYOUTS: LayoutOption<PalaceCountdownLayout>[] = [
  { id: "watercolor", label: "Watercolor" },
];

export const PALACE_GALLERY_LAYOUTS: LayoutOption<PalaceGalleryLayout>[] = [
  { id: "polaroid", label: "Polaroid" },
];

export const PALACE_STORY_LAYOUTS: LayoutOption<PalaceStoryLayout>[] = [
  { id: "icons", label: "Icons" },
];

export const PALACE_LOCATION_LAYOUTS: LayoutOption<PalaceLocationLayout>[] = [
  { id: "card", label: "Card" },
];

export const PALACE_FOOTER_LAYOUTS: LayoutOption<PalaceFooterLayout>[] = [
  { id: "duet", label: "Duet" },
];
