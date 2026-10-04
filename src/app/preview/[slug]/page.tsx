import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchTemplate, invitationTitle } from "@/lib/api";
import UseTemplateBar from "@/components/landing/UseTemplateBar";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lookupSlug =
    slug === "aysha-basim"
      ? "burgundy-bloom"
      : slug === "riza-nizamudheen"
      ? "crimson-scroll"
      : slug;
  const template = await fetchTemplate(lookupSlug);

  if (!template) {
    return { title: "Template not found" };
  }

  return {
    title: `${invitationTitle(template)} — ${template.name}`,
    description: template.description,
  };
}

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lookupSlug =
    slug === "aysha-basim"
      ? "burgundy-bloom"
      : slug === "riza-nizamudheen"
      ? "crimson-scroll"
      : slug;
  const template = await fetchTemplate(lookupSlug);

  if (!template) {
    notFound();
  }

  return (
    <>
      <UseTemplateBar slug={template.slug} name={template.name} />
      <InvitationView template={template} />
    </>
  );
}
