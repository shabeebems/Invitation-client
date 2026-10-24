export type TemplateSectionFamily =
  | "royal"
  | "house"
  | "velvet"
  | "palace"
  | "botanical"
  | "ruby"
  | "aurelia"
  | "cream";

export type SectionDef = {
  id: string;
  label: string;
  /** Always on — cannot be removed in the editor */
  required?: boolean;
};

export const ROYAL_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "countdown", label: "Countdown" },
  { id: "couple", label: "Meet Couple" },
  { id: "story", label: "Love Story" },
  { id: "gallery", label: "Gallery" },
  { id: "location", label: "Location" },
  { id: "footer", label: "Footer" },
];

export const HOUSE_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "countdown", label: "Countdown" },
  { id: "schedule", label: "Schedule" },
  { id: "location", label: "Location" },
  { id: "footer", label: "Footer" },
];

/** Velvet Heritage — burgundy/ivory cinematic wedding (reference envelope design). */
export const VELVET_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "countdown", label: "Countdown" },
  { id: "gallery", label: "Gallery" },
  { id: "story", label: "Timeline" },
  { id: "location", label: "Venue" },
  { id: "footer", label: "Footer" },
];

/** Palace Parchment — parchment sage wedding with royal palace double-door intro. */
export const PALACE_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "countdown", label: "Countdown" },
  { id: "gallery", label: "Gallery" },
  { id: "story", label: "Timeline" },
  { id: "location", label: "Venue" },
  { id: "footer", label: "Footer" },
];

/** Botanical Script — paper-texture elegant wedding with story, events, family and location. */
export const BOTANICAL_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "quote", label: "Quote" },
  { id: "gallery", label: "Gallery" },
  { id: "itinerary", label: "Itinerary" },
  { id: "family", label: "Family" },
  { id: "location", label: "Location" },
  { id: "footer", label: "Footer" },
];

/** Royal Ruby — deep ruby & gold foil wedding with envelope seal, mandala hero, flip events. */
export const RUBY_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "blessings", label: "Blessings" },
  { id: "countdown", label: "Countdown" },
  { id: "events", label: "Celebrations" },
  { id: "location", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
  { id: "footer", label: "Footer" },
];

/** Aurelia Nocturne — midnight navy & champagne cinematic wedding (Lake Como reference). */
export const AURELIA_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "couple", label: "The Couple" },
  { id: "gallery", label: "Story Frames" },
  { id: "story", label: "Journey" },
  { id: "events", label: "Celebration" },
  { id: "location", label: "Venue" },
  { id: "countdown", label: "Countdown" },
  { id: "dress", label: "Dress Code" },
  { id: "rsvp", label: "RSVP" },
  { id: "final", label: "Closing" },
  { id: "footer", label: "Footer" },
];

/** Cream Editorial — ivory/cream garden wedding with split cover, arch hero, mosaic gallery. */
export const CREAM_SECTIONS: SectionDef[] = [
  { id: "hero", label: "Hero", required: true },
  { id: "welcome", label: "Welcome" },
  { id: "couple", label: "The Couple" },
  { id: "story", label: "Our Story" },
  { id: "gallery", label: "Gallery" },
  { id: "events", label: "Events" },
  { id: "location", label: "Venue" },
  { id: "countdown", label: "Countdown" },
  { id: "dress", label: "Dress & Travel" },
  { id: "faq", label: "FAQ" },
  { id: "rsvp", label: "RSVP" },
  { id: "final", label: "Closing" },
  { id: "footer", label: "Footer" },
];

export const SECTION_CATALOGS: Record<TemplateSectionFamily, SectionDef[]> = {
  royal: ROYAL_SECTIONS,
  house: HOUSE_SECTIONS,
  velvet: VELVET_SECTIONS,
  palace: PALACE_SECTIONS,
  botanical: BOTANICAL_SECTIONS,
  ruby: RUBY_SECTIONS,
  aurelia: AURELIA_SECTIONS,
  cream: CREAM_SECTIONS,
};

export function sectionsForFamily(family: TemplateSectionFamily): SectionDef[] {
  return SECTION_CATALOGS[family];
}

export function defaultEnabledSections(family: TemplateSectionFamily): string[] {
  return sectionsForFamily(family).map((section) => section.id);
}

/** Normalize saved list; missing/invalid → all defaults. Preserves catalog order. */
export function resolveEnabledSections(
  family: TemplateSectionFamily,
  saved: string[] | undefined | null
): string[] {
  const catalog = sectionsForFamily(family);
  const allowed = new Set(catalog.map((section) => section.id));

  if (!Array.isArray(saved)) {
    return defaultEnabledSections(family);
  }

  const remapped =
    family === "botanical" ? saved.map((id) => (id === "travel" ? "location" : id)) : saved;
  const enabled = new Set(remapped.filter((id) => allowed.has(id)));
  for (const section of catalog) {
    if (section.required) {
      enabled.add(section.id);
    }
  }

  return catalog.filter((section) => enabled.has(section.id)).map((section) => section.id);
}

export function isSectionEnabled(enabled: string[], sectionId: string): boolean {
  return enabled.includes(sectionId);
}

export function toggleSection(
  family: TemplateSectionFamily,
  current: string[],
  sectionId: string,
  on: boolean
): string[] {
  const catalog = sectionsForFamily(family);
  const def = catalog.find((section) => section.id === sectionId);
  if (!def || def.required) {
    return resolveEnabledSections(family, current);
  }

  const set = new Set(resolveEnabledSections(family, current));
  if (on) {
    set.add(sectionId);
  } else {
    set.delete(sectionId);
  }
  return catalog.filter((section) => set.has(section.id)).map((section) => section.id);
}
