import {
  Allura,
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Fraunces,
  Jost,
  Manrope,
  Outfit,
} from "next/font/google";
import "@/styles/templates/royal-reception.css";
import "@/styles/templates/house-warming.css";
import "@/styles/templates/celestial-starlight.css";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
});

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-amiri",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-jost",
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-manrope",
});

export default function InvitationChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${allura.variable} ${amiri.variable} ${cinzel.variable} ${cormorant.variable} ${jost.variable} ${outfit.variable} ${fraunces.variable} ${manrope.variable}`}
    >
      {children}
    </div>
  );
}
