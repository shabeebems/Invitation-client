import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import AccountCta from "@/components/landing/AccountCta";
import HeroPhone from "@/components/landing/HeroPhone";
import SiteFooter from "@/components/landing/SiteFooter";
import SiteNav from "@/components/landing/SiteNav";
import TemplateGallery from "@/components/landing/TemplateGallery";
import { API_URL, type Category, type InvitationTemplate } from "@/lib/api";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Inviteo",
  description: "Digital invitations for weddings, housewarmings, and celebrations.",
};

async function getTemplates(): Promise<InvitationTemplate[]> {
  try {
    const response = await fetch(`${API_URL}/api/templates`, { cache: "no-store" });
    const data = (await response.json()) as {
      success?: boolean;
      templates?: InvitationTemplate[];
    };

    if (!response.ok || !data.success) {
      return [];
    }

    return (data.templates || []).filter((template) => template.isActive);
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/api/categories`, { cache: "no-store" });
    const data = (await response.json()) as {
      success?: boolean;
      categories?: Category[];
    };

    if (!response.ok || !data.success) {
      return [];
    }

    return (data.categories || []).filter((category) => category.isActive);
  } catch {
    return [];
  }
}

const features = [
  { icon: "edit", title: "Live Editor", text: "Tap text to edit" },
  { icon: "check", title: "No Watermark", text: "Clean & ready" },
  { icon: "clock", title: "Live Countdown", text: "Auto-updating" },
  { icon: "link", title: "One Link", text: "Share with guests" },
] as const;

export default async function HomePage() {
  const [templates, categories] = await Promise.all([getTemplates(), getCategories()]);

  return (
    <div className="min-h-full bg-page">
      <SiteNav />

      <main>
        <section className="w-full bg-[#143027] text-white">
          <div className="grid w-full items-center gap-12 px-6 py-14 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-20">
            <div>
              <h1
                className={`${display.className} text-[2.6rem] leading-[0.95] font-medium tracking-tight text-balance uppercase sm:text-5xl lg:text-[4.15rem]`}
              >
                Create elegant
                <br />
                digital wedding
                <br />
                invitations
                <br />
                <span className="text-[#d6c4a2]">that impress every</span>
                <br />
                <span className="text-[#d6c4a2]">guest.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
                Create digital wedding invitations online, then share one link with every guest.
              </p>
              <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 lg:grid-cols-4">
                {features.map((feature) => (
                  <Feature key={feature.title} icon={feature.icon} title={feature.title} text={feature.text} />
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#templates"
                  className="rounded-full bg-[#d6c4a2] px-5 py-3 text-sm font-semibold text-[#143027] hover:bg-[#e6d7bb]"
                >
                  Browse templates
                </a>
                <AccountCta />
              </div>
            </div>
            <HeroPhone />
          </div>
        </section>

        <TemplateGallery categories={categories} templates={templates} />
      </main>

      <SiteFooter categories={categories} />
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: (typeof features)[number]["icon"];
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-3 py-4">
      <FeatureIcon name={icon} />
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-white/65">{text}</p>
    </div>
  );
}

function FeatureIcon({ name }: { name: (typeof features)[number]["icon"] }) {
  const common = "h-5 w-5 text-[#d6c4a2]";

  if (name === "edit") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 20h4l10-10-4-4L4 16v4Z" />
        <path d="m12 6 4 4" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12.2 2.3 2.3 4.7-5" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 2" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2" />
    </svg>
  );
}
