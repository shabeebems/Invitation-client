import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_URL, type InvitationTemplate } from "@/lib/api";
import InvitationView from "@/components/templates/InvitationView";

async function getTemplate(slug: string): Promise<InvitationTemplate | null> {
  try {
    const response = await fetch(`${API_URL}/api/templates/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      success?: boolean;
      template?: InvitationTemplate;
    };

    return data.success && data.template ? data.template : null;
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

  if (!template) {
    return { title: "Template not found" };
  }

  return {
    title: `Edit ${template.name}`,
    description: template.description,
  };
}

export default async function TemplateEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getTemplate(slug);

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} editable />;
}
