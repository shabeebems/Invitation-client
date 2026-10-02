import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequireUser } from "@/components/auth/GuestOnly";
import DraftInvitation from "@/components/landing/DraftInvitation";
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
    title: template ? `Edit ${template.name}` : "Edit invitation",
  };
}

export default async function UseEditPage({
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
      <DraftInvitation template={template} />
    </RequireUser>
  );
}
