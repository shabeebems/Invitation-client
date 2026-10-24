import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Botanical Script.
 * Each section starts with the reference HTML layout only —
 * additional layouts can be registered here later without changing section data models.
 */

export type BotanicalHeroLayout = "split-cta";
export type BotanicalStoryLayout =
  | "portrait-split"
  | "arch-narrative"
  | "ink-edge"
  | "diamond-panel"
  | "dusk-banner";
export type BotanicalEventsLayout =
  | "trio-cards"
  | "soft-cards"
  | "icon-rail"
  | "rule-columns"
  | "arch-caps"
  | "detail-pills";
export type BotanicalQuoteLayout = "burgundy-banner";
export type BotanicalGalleryLayout =
  | "mosaic-five"
  | "even-grid"
  | "feature-board"
  | "film-strip"
  | "pebble-mosaic";
export type BotanicalItineraryLayout =
  | "rail-three"
  | "cap-cards"
  | "icon-line"
  | "step-cards"
  | "chevron-flow";
export type BotanicalFamilyLayout =
  | "party-row"
  | "arch-cards"
  | "numbered-circles"
  | "polaroid-cluster"
  | "hex-portraits";
export type BotanicalLocationLayout =
  | "map-only"
  | "lotus-split"
  | "circle-atlas"
  | "open-lotus"
  | "framed-folio";
export type BotanicalFooterLayout = "grove";

export const BOTANICAL_HERO_LAYOUTS: LayoutOption<BotanicalHeroLayout>[] = [
  { id: "split-cta", label: "Split CTA" },
];

export const BOTANICAL_STORY_LAYOUTS: LayoutOption<BotanicalStoryLayout>[] = [
  { id: "portrait-split", label: "Portrait Split" },
  { id: "arch-narrative", label: "Arch Narrative" },
  { id: "ink-edge", label: "Ink Edge" },
  { id: "diamond-panel", label: "Diamond Panel" },
  { id: "dusk-banner", label: "Dusk Banner" },
];

export const BOTANICAL_EVENTS_LAYOUTS: LayoutOption<BotanicalEventsLayout>[] = [
  { id: "trio-cards", label: "Trio Cards" },
  { id: "soft-cards", label: "Soft Cards" },
  { id: "icon-rail", label: "Icon Rail" },
  { id: "rule-columns", label: "Rule Columns" },
  { id: "arch-caps", label: "Arch Caps" },
  { id: "detail-pills", label: "Detail Pills" },
];

export const BOTANICAL_QUOTE_LAYOUTS: LayoutOption<BotanicalQuoteLayout>[] = [
  { id: "burgundy-banner", label: "Burgundy Banner" },
];

export const BOTANICAL_GALLERY_LAYOUTS: LayoutOption<BotanicalGalleryLayout>[] = [
  { id: "mosaic-five", label: "Mosaic Five" },
  { id: "even-grid", label: "Even Grid" },
  { id: "feature-board", label: "Feature Board" },
  { id: "film-strip", label: "Film Strip" },
  { id: "pebble-mosaic", label: "Pebble Mosaic" },
];

export const BOTANICAL_ITINERARY_LAYOUTS: LayoutOption<BotanicalItineraryLayout>[] = [
  { id: "rail-three", label: "Rail Three" },
  { id: "cap-cards", label: "Cap Cards" },
  { id: "icon-line", label: "Icon Line" },
  { id: "step-cards", label: "Step Cards" },
  { id: "chevron-flow", label: "Chevron Flow" },
];

export const BOTANICAL_FAMILY_LAYOUTS: LayoutOption<BotanicalFamilyLayout>[] = [
  { id: "party-row", label: "Party Row" },
  { id: "arch-cards", label: "Arch Cards" },
  { id: "numbered-circles", label: "Numbered Circles" },
  { id: "polaroid-cluster", label: "Polaroid Cluster" },
  { id: "hex-portraits", label: "Hex Portraits" },
];

export const BOTANICAL_LOCATION_LAYOUTS: LayoutOption<BotanicalLocationLayout>[] = [
  { id: "map-only", label: "Map Card" },
  { id: "lotus-split", label: "Lotus Split" },
  { id: "circle-atlas", label: "Circle Atlas" },
  { id: "open-lotus", label: "Open Lotus" },
  { id: "framed-folio", label: "Framed Folio" },
];

export const BOTANICAL_FOOTER_LAYOUTS: LayoutOption<BotanicalFooterLayout>[] = [
  { id: "grove", label: "Grove" },
];
