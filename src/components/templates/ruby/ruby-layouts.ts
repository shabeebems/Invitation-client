import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Royal Ruby.
 * Each section starts with the reference HTML layout only.
 */

export type RubyHeroLayout = "mandala-foil";
export type RubyCoupleLayout =
  | "arch-story"
  | "floral-arch"
  | "keepsake-prints"
  | "icon-rail"
  | "parchment-scroll";
export type RubyBlessingsLayout =
  | "dual-folio"
  | "side-portraits"
  | "arch-panels"
  | "framed-duet"
  | "photo-cards";
export type RubyCountdownLayout =
  | "gold-rings"
  | "arch-laurel"
  | "halo-rings"
  | "ornate-plaque"
  | "hanging-tags";
export type RubyEventsLayout =
  | "flip-cards"
  | "timeline-rail"
  | "ticket-stubs"
  | "medallion-row"
  | "royal-programme";
export type RubyLocationLayout = "centered-venue" | "map-frame" | "palace-arch" | "venue-details";
export type RubyGalleryLayout =
  | "arch-gallery"
  | "framed-trio"
  | "arch-windows"
  | "keepsake-cards"
  | "gallery-carousel";
export type RubyFooterLayout = "diya-signature";

export const RUBY_HERO_LAYOUTS: LayoutOption<RubyHeroLayout>[] = [
  { id: "mandala-foil", label: "Mandala Foil" },
];

export const RUBY_COUPLE_LAYOUTS: LayoutOption<RubyCoupleLayout>[] = [
  { id: "arch-story", label: "Arch Story" },
  { id: "floral-arch", label: "Floral Arch" },
  { id: "keepsake-prints", label: "Keepsake Prints" },
  { id: "icon-rail", label: "Icon Rail" },
  { id: "parchment-scroll", label: "Parchment Scroll" },
];

export const RUBY_BLESSINGS_LAYOUTS: LayoutOption<RubyBlessingsLayout>[] = [
  { id: "dual-folio", label: "Dual Folio" },
  { id: "side-portraits", label: "Side Portraits" },
  { id: "arch-panels", label: "Arch Panels" },
  { id: "framed-duet", label: "Framed Duet" },
  { id: "photo-cards", label: "Photo Cards" },
];

export const RUBY_COUNTDOWN_LAYOUTS: LayoutOption<RubyCountdownLayout>[] = [
  { id: "gold-rings", label: "Gold Rings" },
  { id: "arch-laurel", label: "Arch Laurel" },
  { id: "halo-rings", label: "Halo Rings" },
  { id: "ornate-plaque", label: "Ornate Plaque" },
  { id: "hanging-tags", label: "Hanging Tags" },
];

export const RUBY_EVENTS_LAYOUTS: LayoutOption<RubyEventsLayout>[] = [
  { id: "flip-cards", label: "Flip Cards" },
  { id: "timeline-rail", label: "Timeline Rail" },
  { id: "ticket-stubs", label: "Ticket Stubs" },
  { id: "medallion-row", label: "Medallion Row" },
  { id: "royal-programme", label: "Royal Programme" },
];

export const RUBY_LOCATION_LAYOUTS: LayoutOption<RubyLocationLayout>[] = [
  { id: "centered-venue", label: "Centered Venue" },
  { id: "map-frame", label: "Map Frame" },
  { id: "palace-arch", label: "Palace Arch" },
  { id: "venue-details", label: "Venue Details" },
];

export const RUBY_GALLERY_LAYOUTS: LayoutOption<RubyGalleryLayout>[] = [
  { id: "arch-gallery", label: "Arch Gallery" },
  { id: "framed-trio", label: "Framed Trio" },
  { id: "arch-windows", label: "Arch Windows" },
  { id: "keepsake-cards", label: "Keepsake Cards" },
  { id: "gallery-carousel", label: "Gallery Carousel" },
];

export const RUBY_FOOTER_LAYOUTS: LayoutOption<RubyFooterLayout>[] = [
  { id: "diya-signature", label: "Diya Signature" },
];
