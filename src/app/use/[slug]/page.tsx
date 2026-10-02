import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequireUser } from "@/components/auth/GuestOnly";
import SiteNav from "@/components/landing/SiteNav";
import UseTemplateForm from "@/components/landing/UseTemplateForm";
import { API_URL, type InvitationTemplate } from "@/lib/api";

async function getTemplate(slug: string): Promise<InvitationTemplate | null> {
  try {
    const response = await fetch(`${API_URL}/api/templates/${slug}`, { cache: "no-store" });
    const data = (await response.json()) as {
      success?: boolean;
      template?: InvitationTemplate;
    };

    if (!response.ok || !data.success) {
      return null;
    }

    return data.template || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await getTemplate(slug);

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
  const template = await getTemplate(slug);

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
