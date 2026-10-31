import type { Metadata } from "next";
import LandingHero from "@/components/landing/LandingHero";
import LandingNav from "@/components/landing/LandingNav";
import SiteFooter from "@/components/landing/SiteFooter";
import TemplateGallery from "@/components/landing/TemplateGallery";
import { fetchCategories, fetchTemplates } from "@/lib/api";

export const metadata: Metadata = {
  title: "Save the Kath — Beautiful Invitations for Every Occasion",
  description:
    "From intimate gatherings to grand celebrations, find the perfect invitation template to make your moments unforgettable.",
};

export default async function HomePage() {
  const [templates, categories] = await Promise.all([
    fetchTemplates().then((items) => items.filter((template) => template.isActive)),
    fetchCategories().then((items) => items.filter((category) => category.isActive)),
  ]);

  return (
    <div className="min-h-full bg-[#F7F2E8]">
      <LandingNav templates={templates} />

      <main>
        <LandingHero />
        <TemplateGallery categories={categories} templates={templates} />
      </main>

      <SiteFooter categories={categories} />
    </div>
  );
}
