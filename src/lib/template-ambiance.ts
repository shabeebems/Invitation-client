import {
  normalizeLayoutId,
  type LayoutOption,
} from "@/components/templates/shared/LayoutPicker";

export type AmbianceEffect =
  | "starry-glow"
  | "butterflies"
  | "floral-bloom"
  | "floating-lights"
  | "petals"
  | "stars"
  | "sparkles"
  | "hearts"
  | "leaves"
  | "dust"
  | "none";

export type AmbianceFamily =
  | "royal"
  | "house"
  | "velvet"
  | "palace"
  | "botanical"
  | "ruby"
  | "aurelia"
  | "cream";

export const ROYAL_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "petals", label: "Petals" },
  { id: "stars", label: "Stars" },
  { id: "butterflies", label: "Butterflies" },
  { id: "sparkles", label: "Sparkles" },
  { id: "hearts", label: "Hearts" },
  { id: "none", label: "None" },
];

export const HOUSE_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "starry-glow", label: "Starry Glow" },
  { id: "butterflies", label: "Butterflies" },
  { id: "floral-bloom", label: "Floral Bloom" },
  { id: "floating-lights", label: "Floating Lights" },
  { id: "none", label: "None" },
];

/** Velvet Heritage defaults to falling petals (reference intro effect). */
export const VELVET_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "petals", label: "Petals" },
  { id: "hearts", label: "Hearts" },
  { id: "sparkles", label: "Sparkles" },
  { id: "stars", label: "Stars" },
  { id: "butterflies", label: "Butterflies" },
  { id: "none", label: "None" },
];

/** Palace Parchment — rose petals + golden sparkles from the reference. */
export const PALACE_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "petals", label: "Petals" },
  { id: "sparkles", label: "Sparkles" },
  { id: "hearts", label: "Hearts" },
  { id: "stars", label: "Stars" },
  { id: "butterflies", label: "Butterflies" },
  { id: "none", label: "None" },
];

/** Botanical Script — soft leaves / hearts for paper botanical atmosphere. */
export const BOTANICAL_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "leaves", label: "Leaves" },
  { id: "hearts", label: "Hearts" },
  { id: "petals", label: "Petals" },
  { id: "sparkles", label: "Sparkles" },
  { id: "none", label: "None" },
];

/** Royal Ruby — marigold gold petals matching the reference canvas effect. */
export const RUBY_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "petals", label: "Marigold Petals" },
  { id: "sparkles", label: "Sparkles" },
  { id: "hearts", label: "Hearts" },
  { id: "stars", label: "Stars" },
  { id: "none", label: "None" },
];

/** Aurelia Nocturne — subtle sparkles over cinematic grain. */
export const AURELIA_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "sparkles", label: "Sparkles" },
  { id: "stars", label: "Stars" },
  { id: "petals", label: "Petals" },
  { id: "none", label: "None" },
];

/** Cream Editorial — soft petals over paper grain (optional). */
export const CREAM_AMBIANCE_EFFECTS: LayoutOption<AmbianceEffect>[] = [
  { id: "none", label: "None" },
  { id: "petals", label: "Petals" },
  { id: "sparkles", label: "Sparkles" },
  { id: "hearts", label: "Hearts" },
];

const ROYAL_ALIASES: Record<string, AmbianceEffect> = {
  leaves: "petals",
  dust: "sparkles",
  "starry-glow": "stars",
  "floral-bloom": "petals",
  "floating-lights": "stars",
};

const HOUSE_ALIASES: Record<string, AmbianceEffect> = {
  leaves: "floral-bloom",
  petals: "floral-bloom",
  bloom: "floral-bloom",
  "floral-bloom": "floral-bloom",
  stars: "starry-glow",
  starry: "starry-glow",
  "starry-glow": "starry-glow",
  butterflies: "butterflies",
  butterfly: "butterflies",
  dust: "starry-glow",
  sparkles: "starry-glow",
  lanterns: "floating-lights",
  "floating-lights": "floating-lights",
};

export function ambianceEffectsForFamily(family: AmbianceFamily): LayoutOption<AmbianceEffect>[] {
  if (family === "house") return HOUSE_AMBIANCE_EFFECTS;
  if (family === "velvet") return VELVET_AMBIANCE_EFFECTS;
  if (family === "palace") return PALACE_AMBIANCE_EFFECTS;
  if (family === "botanical") return BOTANICAL_AMBIANCE_EFFECTS;
  if (family === "ruby") return RUBY_AMBIANCE_EFFECTS;
  if (family === "aurelia") return AURELIA_AMBIANCE_EFFECTS;
  if (family === "cream") return CREAM_AMBIANCE_EFFECTS;
  return ROYAL_AMBIANCE_EFFECTS;
}

export function normalizeAmbianceEffect(
  value: string | undefined,
  family: AmbianceFamily = "royal"
): AmbianceEffect {
  const options = ambianceEffectsForFamily(family);
  const fallback =
    family === "house"
      ? "starry-glow"
      : family === "botanical"
        ? "leaves"
        : family === "aurelia"
          ? "sparkles"
          : family === "cream"
            ? "none"
            : "petals";
  return normalizeLayoutId(
    value,
    options,
    fallback,
    family === "house" ? HOUSE_ALIASES : ROYAL_ALIASES
  );
}
