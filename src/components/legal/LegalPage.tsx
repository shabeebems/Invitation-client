import type { ReactNode } from "react";
import Link from "next/link";
import LandingNav from "@/components/landing/LandingNav";
import SiteFooter from "@/components/landing/SiteFooter";
import { fetchTemplates } from "@/lib/api";
import { cormorant } from "@/lib/fonts";
import { LEGAL_LINKS, LEGAL_UPDATED, SUPPORT_EMAIL } from "@/lib/legal";
import "./legal.css";

export default async function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  const templates = await fetchTemplates().then((items) => items.filter((item) => item.isActive));

  return (
    <div className="min-h-full bg-[#F7F2E8]">
      <LandingNav templates={templates} />

      <main className="lg-main">
        <article className="lg">
          <header className="lg-head">
            <h1 className={`lg-title ${cormorant.className}`}>{title}</h1>
            <p className="lg-updated">Last updated: {LEGAL_UPDATED}</p>
            <div className="lg-intro">{intro}</div>
          </header>

          <div className="lg-body">{children}</div>

          <footer className="lg-foot">
            <p>
              Questions about this page? Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
            </p>
            <nav aria-label="Legal" className="lg-links">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
