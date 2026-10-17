import type { Metadata } from "next";
import { Cormorant_Garamond, Allura } from "next/font/google";
import HeroCtas from "@/components/landing/HeroCtas";
import HeroPhone from "@/components/landing/HeroPhone";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteNav from "@/components/landing/SiteNav";
import TemplateGallery from "@/components/landing/TemplateGallery";
import { fetchCategories, fetchTemplates } from "@/lib/api";

const cormorant = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inviteo — Elegant Digital Invitations",
  description:
    "Beautiful designs, thoughtful details and powerful features — create digital invitations that bring people closer.",
};

const features = [
  {
    icon: "edit",
    title: "Live Editor",
    text: "Design in real time",
  },
  {
    icon: "watermark",
    title: "No Watermark",
    text: "Clean & ready",
  },
  {
    icon: "link",
    title: "One Link",
    text: "Share with guests",
  },
  {
    icon: "management",
    title: "Guest Management",
    text: "Track responses",
  },
] as const;

export default async function HomePage() {
  const [templates, categories] = await Promise.all([
    fetchTemplates().then((items) => items.filter((template) => template.isActive)),
    fetchCategories().then((items) => items.filter((category) => category.isActive)),
  ]);

  return (
    <div className="min-h-full bg-[#E7EBDD]">
      <SiteNav variant="sage" />

      <main>
        {/* HERO SECTION — Third Reference Design */}
        <section className="relative w-full overflow-hidden bg-[#E7EBDD] text-[#183C2C]">
          <div className="mx-auto flex w-full max-w-[1440px] flex-col px-6 pt-8 pb-8 sm:px-10 sm:pt-12 sm:pb-10 lg:px-16">
            {/* Two-Column Hero Grid */}
            <div className="grid w-full items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
              {/* Left Column: Eyebrow, Editorial Headline, Description, Features, CTAs */}
              <div className="flex flex-col justify-center">
                {/* Eyebrow */}
                <p className="text-[11.5px] font-semibold tracking-[0.24em] text-[#183C2C]/85 uppercase sm:text-xs">
                  More than just an invitation
                </p>

                {/* Main Headline */}
                <h1 className="mt-4">
                  <span
                    className={`${cormorant.className} block text-[3.15rem] leading-[1.02] font-semibold tracking-[-0.015em] text-[#183C2C] sm:text-[4.2rem] lg:text-[4.75rem]`}
                  >
                    Create Invitations
                    <br />
                    That Bring People
                  </span>
                  <span
                    className={`${allura.className} -mt-1 block text-[4.15rem] leading-[0.88] font-normal text-[#4A6E53] sm:text-[5.1rem] lg:text-[5.75rem]`}
                  >
                    Closer
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-[16px] leading-[1.65] text-[#344E3E] sm:text-[17px]">
                  Beautiful designs, thoughtful details and powerful features — everything you need
                  for a memorable wedding celebration.
                </p>

                {/* 4 Feature Cards */}
                <div
                  id="features"
                  className="mt-8 grid grid-cols-2 gap-3 scroll-mt-28 sm:grid-cols-4 sm:gap-3.5"
                >
                  {features.map((feature) => (
                    <FeatureCard
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                      text={feature.text}
                    />
                  ))}
                </div>

                {/* Call-to-action buttons */}
                <div className="mt-8">
                  <HeroCtas />
                </div>
              </div>

              {/* Right Column: Hero Video in phone frame with decorative sage arch & botanicals */}
              <div className="w-full">
                <HeroPhone />
              </div>
            </div>
          </div>
        </section>

        {/* Templates Gallery */}
        <TemplateGallery categories={categories} templates={templates} />
      </main>

      <SiteFooter categories={categories} />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: (typeof features)[number]["icon"];
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[20px] border border-[#BAC7B2]/45 bg-[#DDE4D4]/75 p-3.5 backdrop-blur-[2px] transition-all hover:border-[#A2B499] hover:bg-[#DDE4D4]/95 sm:p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg text-[#183C2C]">
        <FeatureIcon name={icon} />
      </div>
      <p className="mt-2.5 text-[13.5px] font-semibold text-[#183C2C]">{title}</p>
      <p className="mt-0.5 text-[11.5px] leading-snug text-[#43604F]">{text}</p>
    </div>
  );
}

function FeatureIcon({ name }: { name: (typeof features)[number]["icon"] }) {
  const common = "h-5 w-5 text-[#183C2C]";

  if (name === "edit") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    );
  }

  if (name === "watermark") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    );
  }

  if (name === "link") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    );
  }

  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
