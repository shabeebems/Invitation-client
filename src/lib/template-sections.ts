export type TemplateSectionFamily = "royal" | "house";

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

export const SECTION_CATALOGS: Record<TemplateSectionFamily, SectionDef[]> = {
  royal: ROYAL_SECTIONS,
  house: HOUSE_SECTIONS,
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

  const enabled = new Set(saved.filter((id) => allowed.has(id)));
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
