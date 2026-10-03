import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequireUser } from "@/components/auth/GuestOnly";
import DraftInvitation from "@/components/landing/DraftInvitation";
import { fetchTemplate } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await fetchTemplate(slug);

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
  const template = await fetchTemplate(slug);

  if (!template) {
    notFound();
  }

  return (
    <RequireUser>
      <DraftInvitation template={template} />
    </RequireUser>
  );
}
