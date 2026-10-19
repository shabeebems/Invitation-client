import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

/**
 * Layout registries for Royal Ruby.
 * Each section starts with the reference HTML layout only.
 */

export type RubyHeroLayout = "mandala-foil";
export type RubyBlessingsLayout = "dual-folio";
export type RubyCountdownLayout = "gold-rings";
export type RubyEventsLayout = "flip-cards";
export type RubyLocationLayout = "centered-venue";
export type RubyRsvpLayout = "formal-reply";
export type RubyFooterLayout = "diya-signature";

export const RUBY_HERO_LAYOUTS: LayoutOption<RubyHeroLayout>[] = [
  { id: "mandala-foil", label: "Mandala Foil" },
];

export const RUBY_BLESSINGS_LAYOUTS: LayoutOption<RubyBlessingsLayout>[] = [
  { id: "dual-folio", label: "Dual Folio" },
];

export const RUBY_COUNTDOWN_LAYOUTS: LayoutOption<RubyCountdownLayout>[] = [
  { id: "gold-rings", label: "Gold Rings" },
];

export const RUBY_EVENTS_LAYOUTS: LayoutOption<RubyEventsLayout>[] = [
  { id: "flip-cards", label: "Flip Cards" },
];

export const RUBY_LOCATION_LAYOUTS: LayoutOption<RubyLocationLayout>[] = [
  { id: "centered-venue", label: "Centered Venue" },
];

export const RUBY_RSVP_LAYOUTS: LayoutOption<RubyRsvpLayout>[] = [
  { id: "formal-reply", label: "Formal Reply" },
];

export const RUBY_FOOTER_LAYOUTS: LayoutOption<RubyFooterLayout>[] = [
  { id: "diya-signature", label: "Diya Signature" },
];
