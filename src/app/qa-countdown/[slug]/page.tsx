import { notFound } from "next/navigation";
import { fetchTemplate } from "@/lib/api";
import InvitationChrome from "@/components/templates/InvitationChrome";
import InvitationView from "@/components/templates/InvitationView";

export default async function QaCountdownPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ layout?: string }>;
}) {
  const { slug } = await params;
  const { layout } = await searchParams;
  const template = await fetchTemplate(slug);

  if (!template) {
    notFound();
  }

  const content = layout ? { ...template.content, countdownLayout: layout } : template.content;

  return (
    <InvitationChrome>
      <InvitationView template={{ ...template, content }} />
    </InvitationChrome>
  );
}
