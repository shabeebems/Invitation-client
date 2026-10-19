import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Aurelia Nocturne.
 * Each section starts with the reference HTML layout only.
 */

export type AureliaHeroLayout = "cinematic-scene";
export type AureliaCoupleLayout = "staggered-duo";
export type AureliaGalleryLayout = "horizontal-rail";
export type AureliaStoryLayout = "journey-timeline";
export type AureliaEventsLayout = "ivory-cards";
export type AureliaLocationLayout = "stylized-map";
export type AureliaCountdownLayout = "tabular-quartet";
export type AureliaDressLayout = "palette-swatches";
export type AureliaRsvpLayout = "formal-form";
export type AureliaFinalLayout = "scene-closing";
export type AureliaFooterLayout = "minimal-bar";

export const AURELIA_HERO_LAYOUTS: LayoutOption<AureliaHeroLayout>[] = [
  { id: "cinematic-scene", label: "Cinematic Scene" },
];

export const AURELIA_COUPLE_LAYOUTS: LayoutOption<AureliaCoupleLayout>[] = [
  { id: "staggered-duo", label: "Staggered Duo" },
];

export const AURELIA_GALLERY_LAYOUTS: LayoutOption<AureliaGalleryLayout>[] = [
  { id: "horizontal-rail", label: "Horizontal Rail" },
];

export const AURELIA_STORY_LAYOUTS: LayoutOption<AureliaStoryLayout>[] = [
  { id: "journey-timeline", label: "Journey Timeline" },
];

export const AURELIA_EVENTS_LAYOUTS: LayoutOption<AureliaEventsLayout>[] = [
  { id: "ivory-cards", label: "Ivory Cards" },
];

export const AURELIA_LOCATION_LAYOUTS: LayoutOption<AureliaLocationLayout>[] = [
  { id: "stylized-map", label: "Stylized Map" },
];

export const AURELIA_COUNTDOWN_LAYOUTS: LayoutOption<AureliaCountdownLayout>[] = [
  { id: "tabular-quartet", label: "Tabular Quartet" },
];

export const AURELIA_DRESS_LAYOUTS: LayoutOption<AureliaDressLayout>[] = [
  { id: "palette-swatches", label: "Palette Swatches" },
];

export const AURELIA_RSVP_LAYOUTS: LayoutOption<AureliaRsvpLayout>[] = [
  { id: "formal-form", label: "Formal Form" },
];

export const AURELIA_FINAL_LAYOUTS: LayoutOption<AureliaFinalLayout>[] = [
  { id: "scene-closing", label: "Scene Closing" },
];

export const AURELIA_FOOTER_LAYOUTS: LayoutOption<AureliaFooterLayout>[] = [
  { id: "minimal-bar", label: "Minimal Bar" },
];
