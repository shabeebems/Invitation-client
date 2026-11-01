import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork } from "@/lib/api";
import RequireVerifiedEmail from "@/components/auth/RequireVerifiedEmail";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = await fetchWork(slug);

  return {
    title: work ? `Edit · ${work.name}` : "Work not found",
    description: work?.description,
  };
}

export default async function UserWorkEditPage({
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
    <RequireVerifiedEmail>
      <InvitationView template={work} editable />
    </RequireVerifiedEmail>
  );
}
