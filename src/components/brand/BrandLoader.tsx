import BrandMark from "@/components/brand/BrandMark";
import BrandWordmark from "@/components/brand/BrandWordmark";
import "./brand-loader.css";

type BrandLoaderProps = {
  /** Full viewport page placeholder (route `loading.tsx`). */
  variant?: "page" | "inline" | "overlay";
  label?: string;
  tone?: "dark" | "light";
};

/** Branded wait state for route switches and invitation chunk loads. */
export default function BrandLoader({
  variant = "page",
  label = "Loading",
  tone = "dark",
}: BrandLoaderProps) {
  return (
    <div
      className={`bl bl--${variant}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      <div className="bl-mark">
        <BrandMark priority className="bl-logo" />
      </div>
      <BrandWordmark tone={tone} className="text-[1.35rem]" />
      <span className="bl-bar" aria-hidden="true" />
      <p className="bl-label">{label}</p>
    </div>
  );
}
