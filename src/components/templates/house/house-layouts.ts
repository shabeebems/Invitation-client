import type { LayoutOption } from "@/components/templates/shared/LayoutPicker";

export type HouseCountdownLayout = "outline" | "capsule" | "tabs" | "dividers" | "flora";
export type ProgramLayout = "zigzag" | "editorial" | "rail" | "botanical" | "modern";
export type LocationLayout = "portrait" | "atlas" | "pane" | "pill";

/** Maps legacy countdown layout ids saved before the concept-board redesign. */
export const HOUSE_COUNTDOWN_LAYOUT_ALIASES: Record<string, HouseCountdownLayout> = {
  classic: "outline",
  banner: "capsule",
  compact: "tabs",
  rings: "outline",
  minimal: "dividers",
};

export const HOUSE_COUNTDOWN_LAYOUTS: LayoutOption<HouseCountdownLayout>[] = [
  { id: "outline", label: "Outline" },
  { id: "capsule", label: "Capsule" },
  { id: "tabs", label: "Tabs" },
  { id: "dividers", label: "Dividers" },
  { id: "flora", label: "Flora" },
];

/** Maps legacy schedule layout ids to the concept-board set. */
export const SCHEDULE_LAYOUT_ALIASES: Record<string, ProgramLayout> = {
  timeline: "zigzag",
  list: "editorial",
  cards: "rail",
  steps: "modern",
  compact: "botanical",
};

export const SCHEDULE_LAYOUTS: LayoutOption<ProgramLayout>[] = [
  { id: "zigzag", label: "Zigzag" },
  { id: "editorial", label: "Editorial" },
  { id: "rail", label: "Rail" },
  { id: "botanical", label: "Botanical" },
  { id: "modern", label: "Modern" },
];

/** Maps previous location layout ids to the concept-board set. */
export const LOCATION_LAYOUT_ALIASES: Record<string, LocationLayout> = {
  split: "pane",
  stacked: "portrait",
  compact: "pill",
  cards: "atlas",
  folio: "atlas",
};

export const LOCATION_LAYOUTS: LayoutOption<LocationLayout>[] = [
  { id: "portrait", label: "Portrait" },
  { id: "atlas", label: "Atlas" },
  { id: "pane", label: "Pane" },
  { id: "pill", label: "Pill" },
];
