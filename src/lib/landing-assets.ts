const CLOUDINARY_UPLOAD = "https://res.cloudinary.com/dndevmlpo/image/upload";
const HERO_IMAGE_PATH = "v1793291256/invitation/site/mpn3c3ufvyrw1xcx37lr.jpg";

export const HERO_IMAGE_WIDTHS = [640, 960, 1280, 1600, 2048, 2560, 3200];

/** The hero source is 1024px wide, so Cloudinary's AI upscale keeps large and retina renditions sharp. */
export function heroImageUrl(width: number) {
  return `${CLOUDINARY_UPLOAD}/e_upscale/c_limit,w_${width}/f_auto,q_auto/${HERO_IMAGE_PATH}`;
}