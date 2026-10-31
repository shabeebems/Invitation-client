import Image from "next/image";
import { BRAND_MARK_HEIGHT, BRAND_MARK_SRC, BRAND_MARK_WIDTH, BRAND_NAME } from "@/lib/brand";

/** The K monogram; size it with a height class, width follows the artwork ratio. */
export default function BrandMark({
  className = "h-8 w-auto",
  decorative = true,
  priority = false,
}: {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Image
      src={BRAND_MARK_SRC}
      width={BRAND_MARK_WIDTH}
      height={BRAND_MARK_HEIGHT}
      alt={decorative ? "" : `${BRAND_NAME} logo`}
      priority={priority}
      className={className}
    />
  );
}
