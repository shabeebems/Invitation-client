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

export type AmbianceFamily = "royal" | "house";

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
  return family === "house" ? HOUSE_AMBIANCE_EFFECTS : ROYAL_AMBIANCE_EFFECTS;
}

export function normalizeAmbianceEffect(
  value: string | undefined,
  family: AmbianceFamily = "royal"
): AmbianceEffect {
  const options = ambianceEffectsForFamily(family);
  const fallback = family === "house" ? "starry-glow" : "petals";
  return normalizeLayoutId(
    value,
    options,
    fallback,
    family === "house" ? HOUSE_ALIASES : ROYAL_ALIASES
  );
}
