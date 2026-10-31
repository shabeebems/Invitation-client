import localFont from "next/font/local";

export const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  display: "swap",
});

export const allura = localFont({
  src: "../fonts/allura-latin.woff2",
  weight: "400",
  display: "swap",
});
