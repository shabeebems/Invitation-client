import { fetchTemplates } from "@/lib/api";
import LandingBotanical from "@/components/landing/LandingBotanical";
import LandingNav from "@/components/landing/LandingNav";

export default async function AuthShell({ children }: { children: React.ReactNode }) {
  const templates = await fetchTemplates().then((items) => items.filter((template) => template.isActive));

  return (
    <div className="auth-page">
      <LandingNav templates={templates} />
      <main className="auth-main">
        <LandingBotanical className="ld-botanical auth-sprig auth-sprig--top" />
        <LandingBotanical className="ld-botanical auth-sprig auth-sprig--bottom" />
        {children}
      </main>
    </div>
  );
}
