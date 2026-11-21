export const BRAND_NAME = "Save the Kath";
export const BRAND_MARK_SRC = "/brand/save-the-kath-mark.png";
export const BRAND_MARK_WIDTH = 735;
export const BRAND_MARK_HEIGHT = 512;

/** Only show footer icons when a real profile URL is configured. */
export const SOCIAL_LINKS = [
  { label: "Instagram", href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "" },
  { label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "" },
].filter((link) => /^https:\/\//i.test(link.href));
