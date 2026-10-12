import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork, invitationTitle } from "@/lib/api";
import WorkPreviewBar from "@/components/landing/WorkPreviewBar";
import InvitationView from "@/components/templates/InvitationView";
import InvitationChrome from "@/components/templates/InvitationChrome";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await fetchWork(slug);

  if (!work) {
    return { title: "Work not found" };
  }

  return {
    title: `Preview · ${invitationTitle(work)}`,
    description: work.description,
  };
}

export default async function UserWorkPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await fetchWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <InvitationChrome>
      <WorkPreviewBar slug={work.slug} name={work.name} />
      <InvitationView template={work} />
    </InvitationChrome>
  );
}
