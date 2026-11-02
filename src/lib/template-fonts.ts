import localFont from "next/font/local";
import { allura, cormorant } from "@/lib/fonts";
import "@/fonts/template-font-vars.css";

const amiriArabic = localFont({
  src: [
    { path: "../fonts/amiri-arabic-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/amiri-arabic-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-amiri-arabic",
});

const amiriLatin = localFont({
  src: [
    { path: "../fonts/amiri-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/amiri-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-amiri-latin",
});

const cinzel = localFont({
  src: "../fonts/cinzel-latin-wght-normal.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-cinzel",
});

const jost = localFont({
  src: "../fonts/jost-latin-wght-normal.woff2",
  weight: "300 500",
  display: "swap",
  variable: "--font-jost",
});

const outfit = localFont({
  src: "../fonts/outfit-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-outfit",
});

const pinyon = localFont({
  src: "../fonts/pinyon-script-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-pinyon",
});

const greatVibes = localFont({
  src: "../fonts/great-vibes-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-great-vibes",
});

const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "300 600",
  display: "swap",
  variable: "--font-montserrat",
});

const marcellus = localFont({
  src: "../fonts/marcellus-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-marcellus",
});

const lato = localFont({
  src: [
    { path: "../fonts/lato-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/lato-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
  display: "swap",
  variable: "--font-lato",
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "300 500",
  display: "swap",
  variable: "--font-inter",
});

const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-wght-normal.woff2", weight: "300 400", style: "normal" },
    { path: "../fonts/fraunces-latin-wght-italic.woff2", weight: "300 400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-fraunces",
});

export const invitationFontsClassName = [
  "invitation-fonts",
  allura.variable,
  amiriArabic.variable,
  amiriLatin.variable,
  cinzel.variable,
  cormorant.variable,
  jost.variable,
  outfit.variable,
  pinyon.variable,
  greatVibes.variable,
  montserrat.variable,
  marcellus.variable,
  lato.variable,
  inter.variable,
  fraunces.variable,
].join(" ");
