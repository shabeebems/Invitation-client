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
  const template = await fetchTemplate(slug, { fresh: true, credentials: "include" });

  return {
    title: template ? `Edit · ${template.name}` : "Template not found",
    description: template?.description,
  };
}

export default async function AdminTemplateEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await fetchTemplate(slug, { fresh: true, credentials: "include" });

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} editable />;
}
