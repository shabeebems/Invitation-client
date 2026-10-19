import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Cream Editorial.
 * Each section starts with the reference HTML layout only.
 */

export type CreamHeroLayout = "split-arch";
export type CreamWelcomeLayout = "centered-ornament";
export type CreamCoupleLayout = "offset-portraits";
export type CreamStoryLayout = "year-rail";
export type CreamGalleryLayout = "editorial-mosaic";
export type CreamEventsLayout = "trio-schedule";
export type CreamLocationLayout = "split-venue";
export type CreamCountdownLayout = "rose-band";
export type CreamDressLayout = "two-column";
export type CreamFaqLayout = "accordion";
export type CreamRsvpLayout = "outlined-card";
export type CreamFinalLayout = "sage-close";
export type CreamFooterLayout = "minimal";

export const CREAM_HERO_LAYOUTS: LayoutOption<CreamHeroLayout>[] = [
  { id: "split-arch", label: "Split Arch" },
];

export const CREAM_WELCOME_LAYOUTS: LayoutOption<CreamWelcomeLayout>[] = [
  { id: "centered-ornament", label: "Centered Ornament" },
];

export const CREAM_COUPLE_LAYOUTS: LayoutOption<CreamCoupleLayout>[] = [
  { id: "offset-portraits", label: "Offset Portraits" },
];

export const CREAM_STORY_LAYOUTS: LayoutOption<CreamStoryLayout>[] = [
  { id: "year-rail", label: "Year Rail" },
];

export const CREAM_GALLERY_LAYOUTS: LayoutOption<CreamGalleryLayout>[] = [
  { id: "editorial-mosaic", label: "Editorial Mosaic" },
];

export const CREAM_EVENTS_LAYOUTS: LayoutOption<CreamEventsLayout>[] = [
  { id: "trio-schedule", label: "Trio + Schedule" },
];

export const CREAM_LOCATION_LAYOUTS: LayoutOption<CreamLocationLayout>[] = [
  { id: "split-venue", label: "Split Venue" },
];

export const CREAM_COUNTDOWN_LAYOUTS: LayoutOption<CreamCountdownLayout>[] = [
  { id: "rose-band", label: "Rose Band" },
];

export const CREAM_DRESS_LAYOUTS: LayoutOption<CreamDressLayout>[] = [
  { id: "two-column", label: "Two Column" },
];

export const CREAM_FAQ_LAYOUTS: LayoutOption<CreamFaqLayout>[] = [
  { id: "accordion", label: "Accordion" },
];

export const CREAM_RSVP_LAYOUTS: LayoutOption<CreamRsvpLayout>[] = [
  { id: "outlined-card", label: "Outlined Card" },
];

export const CREAM_FINAL_LAYOUTS: LayoutOption<CreamFinalLayout>[] = [
  { id: "sage-close", label: "Sage Close" },
];

export const CREAM_FOOTER_LAYOUTS: LayoutOption<CreamFooterLayout>[] = [
  { id: "minimal", label: "Minimal" },
];
