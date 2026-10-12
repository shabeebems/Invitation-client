import { redirect } from "next/navigation";

export default async function PublishedRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/user/published/${slug}`);
}
