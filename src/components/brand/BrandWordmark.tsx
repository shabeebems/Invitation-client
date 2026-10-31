import { cormorant } from "@/lib/fonts";

const TONES = {
  dark: { ink: "text-[#143027]", accent: "text-[#a8844f]" },
  light: { ink: "text-[#F7F0DE]", accent: "text-[#D9C18C]" },
} as const;

/** "Save the Kath" set in Cormorant, with a gold italic "the" echoing the monogram's gold wedge. */
export default function BrandWordmark({
  tone = "dark",
  className = "text-[1.6rem]",
}: {
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const colors = TONES[tone];
  return (
    <span
      className={`${cormorant.className} inline-flex items-baseline leading-none font-bold tracking-[0.015em] whitespace-nowrap ${colors.ink} ${className}`}
    >
      <span>Save</span>
      <span className={`mx-[0.22em] text-[0.82em] font-medium italic ${colors.accent}`}>the</span>
      <span>Kath</span>
    </span>
  );
}
