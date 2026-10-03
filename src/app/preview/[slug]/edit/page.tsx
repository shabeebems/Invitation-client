import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchTemplate } from "@/lib/api";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchTemplate(slug);

  return {
    title: template ? `Edit ${template.name}` : "Template not found",
    description: template?.description,
  };
}

export default async function TemplateEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await fetchTemplate(slug);

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} editable />;
}
