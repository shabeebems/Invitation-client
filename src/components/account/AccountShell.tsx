import { fetchTemplates } from "@/lib/api";
import LandingNav from "@/components/landing/LandingNav";

export default async function AccountShell({ children }: { children: React.ReactNode }) {
  const templates = await fetchTemplates().then((items) => items.filter((template) => template.isActive));

  return (
    <div className="min-h-full bg-[#F7F2E8]">
      <LandingNav templates={templates} />
      <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
