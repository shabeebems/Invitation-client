import { Allura, Amiri, Cinzel, Cormorant_Garamond, Great_Vibes, Jost, Outfit } from "next/font/google";
import "@/app/preview/[slug]/royal-reception.css";
import "@/app/preview/[slug]/house-warming.css";

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

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
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

export default function InvitationChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${allura.variable} ${amiri.variable} ${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} ${jost.variable} ${outfit.variable}`}
    >
      {children}
    </div>
  );
}
