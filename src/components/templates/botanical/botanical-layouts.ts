import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Botanical Script.
 * Each section starts with the reference HTML layout only —
 * additional layouts can be registered here later without changing section data models.
 */

export type BotanicalHeroLayout = "split-cta";
export type BotanicalStoryLayout = "arch-narrative";
export type BotanicalEventsLayout = "trio-cards";
export type BotanicalQuoteLayout = "burgundy-banner";
export type BotanicalGalleryLayout = "mosaic-five";
export type BotanicalItineraryLayout = "rail-three";
export type BotanicalFamilyLayout = "party-row";
export type BotanicalTravelLayout = "map-rsvp";
export type BotanicalFooterLayout = "grove";

export const BOTANICAL_HERO_LAYOUTS: LayoutOption<BotanicalHeroLayout>[] = [
  { id: "split-cta", label: "Split CTA" },
];

export const BOTANICAL_STORY_LAYOUTS: LayoutOption<BotanicalStoryLayout>[] = [
  { id: "arch-narrative", label: "Arch Narrative" },
];

export const BOTANICAL_EVENTS_LAYOUTS: LayoutOption<BotanicalEventsLayout>[] = [
  { id: "trio-cards", label: "Trio Cards" },
];

export const BOTANICAL_QUOTE_LAYOUTS: LayoutOption<BotanicalQuoteLayout>[] = [
  { id: "burgundy-banner", label: "Burgundy Banner" },
];

export const BOTANICAL_GALLERY_LAYOUTS: LayoutOption<BotanicalGalleryLayout>[] = [
  { id: "mosaic-five", label: "Mosaic Five" },
];

export const BOTANICAL_ITINERARY_LAYOUTS: LayoutOption<BotanicalItineraryLayout>[] = [
  { id: "rail-three", label: "Rail Three" },
];

export const BOTANICAL_FAMILY_LAYOUTS: LayoutOption<BotanicalFamilyLayout>[] = [
  { id: "party-row", label: "Party Row" },
];

export const BOTANICAL_TRAVEL_LAYOUTS: LayoutOption<BotanicalTravelLayout>[] = [
  { id: "map-rsvp", label: "Map & RSVP" },
];

export const BOTANICAL_FOOTER_LAYOUTS: LayoutOption<BotanicalFooterLayout>[] = [
  { id: "grove", label: "Grove" },
];
