import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchWork, imageUrl, invitationTitle } from "@/lib/api";
import { listingPhotos } from "@/lib/listing-photos";
import InvitationView from "@/components/templates/InvitationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // No Data Cache — unpaid drafts must 404 as soon as the API does.
  const template = await fetchWork(slug, { fresh: true });

  if (!template) {
    return { title: "Invitation not found", robots: { index: false, follow: false } };
  }

  const title = `${invitationTitle(template)} — ${template.name}`;
  const description =
    template.description?.trim() ||
    `You're invited. Open this link for ${invitationTitle(template)}.`;
  const { front } = listingPhotos(template.images);
  const ogImage = front || imageUrl(template.images, "hero") || template.images?.[0]?.url || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${template.slug}`,
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt: invitationTitle(template),
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function WorkLivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // No Data Cache — unpaid drafts must 404 as soon as the API does.
  const template = await fetchWork(slug, { fresh: true });

  if (!template) {
    notFound();
  }

  return <InvitationView template={template} />;
}
