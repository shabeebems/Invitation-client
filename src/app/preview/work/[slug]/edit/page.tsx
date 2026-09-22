import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_URL, type InvitationTemplate } from "@/lib/api";
import InvitationView from "@/components/templates/InvitationView";

async function getWork(slug: string): Promise<InvitationTemplate | null> {
  try {
    const response = await fetch(`${API_URL}/api/works/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as {
      success?: boolean;
      template?: InvitationTemplate;
      work?: InvitationTemplate;
    };

    const invitation = data.template || data.work;
    return data.success && invitation ? invitation : null;
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
  const template = await getWork(slug);

  if (!template) {
    return { title: "Work not found" };
  }

  return {
    title: `Edit ${template.name}`,
    description: template.description,
  };
}

export default async function WorkEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getWork(slug);

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} editable />;
}
