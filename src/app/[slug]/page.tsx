import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork } from "@/lib/api";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchWork(slug);

  if (!template) {
    return { title: "Invitation not found" };
  }

  const names =
    template.content.hostNames ||
    [template.content.groomName, template.content.brideName].filter(Boolean).join(" & ") ||
    template.name;

  return {
    title: `${names} — ${template.name}`,
    description: template.description,
  };
}

export default async function WorkLivePage({
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
