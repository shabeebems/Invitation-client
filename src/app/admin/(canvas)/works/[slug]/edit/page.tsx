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
  const work = await fetchWork(slug, { fresh: true });

  return {
    title: work ? `Edit · ${work.name}` : "Work not found",
    description: work?.description,
  };
}

export default async function AdminWorkEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await fetchWork(slug, { fresh: true });

  if (!work) {
    notFound();
  }

  return <InvitationView template={work} editable />;
}
