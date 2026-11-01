import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RequireVerifiedEmail from "@/components/auth/RequireVerifiedEmail";
import LandingNav from "@/components/landing/LandingNav";
import UseTemplateForm from "@/components/landing/UseTemplateForm";
import { fetchTemplate, fetchTemplates } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchTemplate(slug);

  return {
    title: template ? `Use ${template.name}` : "Use template",
  };
}

export default async function UseTemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [template, templates] = await Promise.all([
    fetchTemplate(slug),
    fetchTemplates().then((items) => items.filter((item) => item.isActive)),
  ]);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-full bg-[#F7F2E8]">
      <LandingNav templates={templates} />
      <RequireVerifiedEmail>
        <main className="mx-auto w-full max-w-xl px-5 py-10 md:py-14">
          <UseTemplateForm template={template} />
        </main>
      </RequireVerifiedEmail>
    </div>
  );
}
