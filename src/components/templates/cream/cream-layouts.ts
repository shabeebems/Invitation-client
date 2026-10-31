import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Cream Editorial.
 * Each section starts with the reference HTML layout only.
 */

export type CreamHeroLayout = "twin-arch";
export type CreamWelcomeLayout = "centered-ornament" | "ring-frame" | "twin-doves" | "sealed-letter";
export type CreamCoupleLayout =
  | "offset-portraits"
  | "arch-frame"
  | "together-arch"
  | "oval-portraits"
  | "polaroid-pair";
export type CreamStoryLayout =
  | "year-rail"
  | "floral-rail"
  | "arch-cards"
  | "polaroid-ledger"
  | "arch-journey";
export type CreamGalleryLayout =
  | "editorial-mosaic"
  | "arch-row"
  | "polaroid-scatter"
  | "framed-grid"
  | "oval-carousel";
export type CreamEventsLayout =
  | "trio-schedule"
  | "icon-timeline"
  | "arch-photo-cards"
  | "portrait-list"
  | "arch-windows";
export type CreamLocationLayout = "split-venue" | "arch-postcard" | "panorama-card" | "map-details";
export type CreamCountdownLayout = "rose-band" | "progress-rings" | "arch-portrait" | "calendar-card";
export type CreamDressLayout = "two-column" | "palette-card" | "arch-ticket" | "paint-strip";
export type CreamFaqLayout = "accordion" | "side-index" | "question-cards" | "tabbed-answers";
export type CreamFinalLayout = "sage-close";
export type CreamFooterLayout = "minimal";

export const CREAM_HERO_LAYOUTS: LayoutOption<CreamHeroLayout>[] = [
  { id: "twin-arch", label: "Twin Arches" },
];

export const CREAM_WELCOME_LAYOUTS: LayoutOption<CreamWelcomeLayout>[] = [
  { id: "centered-ornament", label: "Centered Ornament" },
  { id: "ring-frame", label: "Ring Frame" },
  { id: "twin-doves", label: "Twin Doves" },
  { id: "sealed-letter", label: "Sealed Letter" },
];

export const CREAM_COUPLE_LAYOUTS: LayoutOption<CreamCoupleLayout>[] = [
  { id: "offset-portraits", label: "Offset Portraits" },
  { id: "arch-frame", label: "Arch & Frame" },
  { id: "together-arch", label: "Together Arch" },
  { id: "oval-portraits", label: "Oval Portraits" },
  { id: "polaroid-pair", label: "Polaroid Pair" },
];

export const CREAM_STORY_LAYOUTS: LayoutOption<CreamStoryLayout>[] = [
  { id: "year-rail", label: "Year Rail" },
  { id: "floral-rail", label: "Floral Rail" },
  { id: "arch-cards", label: "Arch Cards" },
  { id: "polaroid-ledger", label: "Polaroid Ledger" },
  { id: "arch-journey", label: "Arch Journey" },
];

export const CREAM_GALLERY_LAYOUTS: LayoutOption<CreamGalleryLayout>[] = [
  { id: "editorial-mosaic", label: "Editorial Mosaic" },
  { id: "arch-row", label: "Arch Row" },
  { id: "polaroid-scatter", label: "Polaroid Scatter" },
  { id: "framed-grid", label: "Framed Grid" },
  { id: "oval-carousel", label: "Oval Carousel" },
];

export const CREAM_EVENTS_LAYOUTS: LayoutOption<CreamEventsLayout>[] = [
  { id: "trio-schedule", label: "Event Trio" },
  { id: "icon-timeline", label: "Icon Timeline" },
  { id: "arch-photo-cards", label: "Arch Photo Cards" },
  { id: "portrait-list", label: "Portrait List" },
  { id: "arch-windows", label: "Arch Windows" },
];

export const CREAM_LOCATION_LAYOUTS: LayoutOption<CreamLocationLayout>[] = [
  { id: "split-venue", label: "Split Venue" },
  { id: "arch-postcard", label: "Arch Postcard" },
  { id: "panorama-card", label: "Panorama Card" },
  { id: "map-details", label: "Map & Details" },
];

export const CREAM_COUNTDOWN_LAYOUTS: LayoutOption<CreamCountdownLayout>[] = [
  { id: "rose-band", label: "Rose Band" },
  { id: "progress-rings", label: "Progress Rings" },
  { id: "arch-portrait", label: "Arch Portrait" },
  { id: "calendar-card", label: "Calendar Card" },
];

export const CREAM_DRESS_LAYOUTS: LayoutOption<CreamDressLayout>[] = [
  { id: "two-column", label: "Two Column" },
  { id: "palette-card", label: "Palette Card" },
  { id: "arch-ticket", label: "Arches & Ticket" },
  { id: "paint-strip", label: "Paint Strip" },
];

export const CREAM_FAQ_LAYOUTS: LayoutOption<CreamFaqLayout>[] = [
  { id: "accordion", label: "Accordion" },
  { id: "side-index", label: "Side Index" },
  { id: "question-cards", label: "Question Cards" },
  { id: "tabbed-answers", label: "Tabbed Answers" },
];

export const CREAM_FINAL_LAYOUTS: LayoutOption<CreamFinalLayout>[] = [
  { id: "sage-close", label: "Sage Close" },
];

export const CREAM_FOOTER_LAYOUTS: LayoutOption<CreamFooterLayout>[] = [
  { id: "minimal", label: "Minimal" },
];
