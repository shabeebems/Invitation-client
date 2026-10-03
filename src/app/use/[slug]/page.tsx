import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequireUser } from "@/components/auth/GuestOnly";
import SiteNav from "@/components/landing/SiteNav";
import UseTemplateForm from "@/components/landing/UseTemplateForm";
import { fetchTemplate } from "@/lib/api";

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
  const template = await fetchTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <RequireUser>
      <div className="min-h-full bg-[#f5efe4]">
        <SiteNav />
        <main className="mx-auto w-full max-w-2xl px-5 py-10 md:py-14">
          <UseTemplateForm template={template} />
        </main>
      </div>
    </RequireUser>
  );
}
