import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Aurelia Nocturne.
 * Each section starts with the reference HTML layout only.
 */

export type AureliaHeroLayout = "cinematic-scene";
export type AureliaCoupleLayout =
  | "staggered-duo"
  | "arch-nameplates"
  | "framed-split"
  | "polaroid-notes"
  | "oval-medallion";
export type AureliaGalleryLayout =
  | "horizontal-rail"
  | "framed-row"
  | "tagged-frames"
  | "arch-timeline"
  | "index-mosaic";
export type AureliaStoryLayout =
  | "journey-timeline"
  | "milestone-cards"
  | "center-spine"
  | "numbered-track";
export type AureliaVenueLayout =
  | "ivory-cards"
  | "notched-frames"
  | "date-divider"
  | "linked-icons"
  | "tilted-tickets";
export type AureliaCountdownLayout =
  | "tabular-quartet"
  | "arched-pills"
  | "linked-rings"
  | "framed-panel";
export type AureliaDressLayout =
  | "ringed-swatches"
  | "palette-legend"
  | "framed-tiles"
  | "linked-strand";
export type AureliaFinalLayout = "scene-closing";
export type AureliaFooterLayout = "minimal-bar";

export const AURELIA_HERO_LAYOUTS: LayoutOption<AureliaHeroLayout>[] = [
  { id: "cinematic-scene", label: "Cinematic Scene" },
];

export const AURELIA_COUPLE_LAYOUTS: LayoutOption<AureliaCoupleLayout>[] = [
  { id: "staggered-duo", label: "Staggered Duo" },
  { id: "arch-nameplates", label: "Arch Nameplates" },
  { id: "framed-split", label: "Framed Split" },
  { id: "polaroid-notes", label: "Polaroid Notes" },
  { id: "oval-medallion", label: "Oval Medallion" },
];

export const AURELIA_GALLERY_LAYOUTS: LayoutOption<AureliaGalleryLayout>[] = [
  { id: "horizontal-rail", label: "Horizontal Rail" },
  { id: "framed-row", label: "Framed Row" },
  { id: "tagged-frames", label: "Tagged Frames" },
  { id: "arch-timeline", label: "Arch Timeline" },
  { id: "index-mosaic", label: "Index Mosaic" },
];

export const AURELIA_STORY_LAYOUTS: LayoutOption<AureliaStoryLayout>[] = [
  { id: "journey-timeline", label: "Journey Timeline" },
  { id: "milestone-cards", label: "Milestone Cards" },
  { id: "center-spine", label: "Center Spine" },
  { id: "numbered-track", label: "Numbered Track" },
];

export const AURELIA_VENUE_LAYOUTS: LayoutOption<AureliaVenueLayout>[] = [
  { id: "ivory-cards", label: "Ivory Cards" },
  { id: "notched-frames", label: "Notched Frames" },
  { id: "date-divider", label: "Date Divider" },
  { id: "linked-icons", label: "Linked Icons" },
  { id: "tilted-tickets", label: "Tilted Tickets" },
];

export const AURELIA_COUNTDOWN_LAYOUTS: LayoutOption<AureliaCountdownLayout>[] = [
  { id: "tabular-quartet", label: "Tabular Quartet" },
  { id: "arched-pills", label: "Arched Pills" },
  { id: "linked-rings", label: "Linked Rings" },
  { id: "framed-panel", label: "Framed Panel" },
];

export const AURELIA_DRESS_LAYOUTS: LayoutOption<AureliaDressLayout>[] = [
  { id: "ringed-swatches", label: "Ringed Swatches" },
  { id: "palette-legend", label: "Palette Legend" },
  { id: "framed-tiles", label: "Framed Tiles" },
  { id: "linked-strand", label: "Linked Strand" },
];

export const AURELIA_FINAL_LAYOUTS: LayoutOption<AureliaFinalLayout>[] = [
  { id: "scene-closing", label: "Scene Closing" },
];

export const AURELIA_FOOTER_LAYOUTS: LayoutOption<AureliaFooterLayout>[] = [
  { id: "minimal-bar", label: "Minimal Bar" },
];
