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

  return {
    title: template ? `Edit ${template.name}` : "Work not found",
    description: template?.description,
  };
}

export default async function WorkEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await fetchWork(slug);

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} editable />;
}
