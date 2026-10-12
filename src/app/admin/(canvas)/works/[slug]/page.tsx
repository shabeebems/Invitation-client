import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork, invitationLiveHref, invitationTitle } from "@/lib/api";
import AdminPreviewBar from "@/components/admin/AdminPreviewBar";
import InvitationView from "@/components/templates/InvitationView";

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

export default async function AdminWorkPreviewPage({
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
    <>
      <AdminPreviewBar
        name={work.name}
        backHref="/admin/works"
        editHref={`/admin/works/${work.slug}/edit`}
        liveHref={invitationLiveHref(work)}
      />
      <InvitationView template={work} />
    </>
  );
}
