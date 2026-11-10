import { imageUrl, type ListingImageSlot, type TemplateImage } from "@/lib/api";

export const LISTING_IMAGE_SLOTS: ListingImageSlot[] = ["listingFront", "listingBack"];

/** Width ÷ height of both photo frames on the template listing card. */
export const LISTING_PHOTO_RATIO = 5 / 4;

const BACK_SLOTS = ["heroAlt", "couple", "story", "storyFeature", "bride", "groom", "envelope"];

/** Dedicated listing photos win; templates without them fall back to their invitation photos. */
export function listingPhotos(allImages: TemplateImage[] | undefined) {
  const images = (allImages || []).filter(
    (image) => !(LISTING_IMAGE_SLOTS as string[]).includes(image.slot)
  );
  const front = imageUrl(allImages, "listingFront") || imageUrl(images, "hero") || images[0]?.url || "";
  const back =
    imageUrl(allImages, "listingBack") ||
    BACK_SLOTS.map((slot) => imageUrl(images, slot)).find((url) => url && url !== front) ||
    images.find((image) => image.url && image.url !== front)?.url ||
    "";

  return { front, back };
}
