import { redirect } from "next/navigation";

export default async function UseTemplateRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/user/use/${slug}`);
}
