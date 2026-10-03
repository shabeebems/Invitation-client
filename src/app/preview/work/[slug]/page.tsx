import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork, invitationTitle } from "@/lib/api";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchWork(slug);

  if (!template) {
    return { title: "Work not found" };
  }

  return {
    title: `${invitationTitle(template)} — ${template.name}`,
    description: template.description,
  };
}

export default async function WorkPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await fetchWork(slug);

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} />;
}
