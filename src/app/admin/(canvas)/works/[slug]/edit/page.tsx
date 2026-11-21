import type { Metadata } from "next";
import UserWorkEditor from "@/components/account/UserWorkEditor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit · ${slug}`,
  };
}

export default async function AdminWorkEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <UserWorkEditor slug={slug} mode="admin" />;
}
