import {
  Allura,
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  Fraunces,
  Great_Vibes,
  Inter,
  Jost,
  Lato,
  Marcellus,
  Montserrat,
  Outfit,
  Pinyon_Script,
} from "next/font/google";
import "@/styles/templates/royal-reception.css";
import "@/styles/templates/house-warming.css";
import "@/styles/templates/velvet-heritage.css";
import "@/styles/templates/botanical-script.css";
import "@/styles/templates/royal-ruby.css";
import "@/styles/templates/aurelia-nocturne.css";
import "@/styles/templates/cream-editorial.css";

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

const pinyon = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pinyon",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

const lato = Lato({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const inter = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  weight: ["300", "400"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export default function InvitationChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${allura.variable} ${amiri.variable} ${cinzel.variable} ${cormorant.variable} ${jost.variable} ${outfit.variable} ${pinyon.variable} ${greatVibes.variable} ${montserrat.variable} ${marcellus.variable} ${lato.variable} ${inter.variable} ${fraunces.variable}`}
    >
      {children}
    </div>
  );
}
