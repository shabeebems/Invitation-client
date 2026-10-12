import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchTemplate, invitationTitle } from "@/lib/api";
import AdminPreviewBar from "@/components/admin/AdminPreviewBar";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchTemplate(slug);

  if (!template) {
    return { title: "Template not found" };
  }

  return {
    title: `Preview · ${invitationTitle(template)}`,
    description: template.description,
  };
}

export default async function AdminTemplatePreviewPage({
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
    <>
      <AdminPreviewBar
        name={template.name}
        backHref="/admin/templates"
        editHref={`/admin/templates/${template.slug}/edit`}
      />
      <InvitationView template={template} />
    </>
  );
}
