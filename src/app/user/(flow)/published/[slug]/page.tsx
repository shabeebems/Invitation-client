import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import PublishedInvitation from "@/components/account/PublishedInvitation";
import { fetchTemplates } from "@/lib/api";

export const metadata: Metadata = {
  title: "Invitation published — Save the Kath",
};

export default async function PublishedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const templates = await fetchTemplates().then((items) => items.filter((item) => item.isActive));

  return (
    <div className="min-h-full bg-[#F7F2E8]">
      <LandingNav templates={templates} />
      <main className="mx-auto w-full max-w-3xl px-5 py-8 md:px-8 md:py-10">
        <PublishedInvitation slug={slug} />
      </main>
    </div>
  );
}
