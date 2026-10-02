import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import AccountCta from "@/components/landing/AccountCta";
import FooterSupportLinks from "@/components/landing/FooterSupportLinks";
import type { Category } from "@/lib/api";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const keyFeatures = [
  "Live text editor",
  "One shareable guest link",
  "Live countdown timer",
  "Maps & venue details",
  "No watermarks",
];

export default function SiteFooter({ categories = [] }: { categories?: Category[] }) {
  const occasionLinks = categories.slice(0, 4);

  return (
    <footer className="w-full bg-[#0c1f18] text-white">
      <div className="w-full px-6 pt-12 pb-10 md:px-10 md:pt-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#16382d] to-[#102820] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:px-10 md:py-10">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#d6c4a2] uppercase">
            Ready to invite your guests?
          </p>
          <h2
            className={`${display.className} mt-3 max-w-3xl text-3xl leading-tight font-medium tracking-tight uppercase md:text-4xl`}
          >
            Start customizing your invitation today
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Pick a template, edit every detail in the live editor, and share one elegant link with
            every guest.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#templates"
              className="rounded-full bg-[#d6c4a2] px-5 py-3 text-sm font-semibold text-[#0c1f18] hover:bg-[#e6d7bb]"
            >
              Browse templates
            </a>
            <AccountCta />
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-extrabold text-[#0c1f18]">
                In
              </span>
              <div>
                <p className={`${display.className} text-xl font-semibold tracking-wide`}>Inviteo</p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[0.18em] text-[#d6c4a2] uppercase">
                  Digital invitations
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
              Weddings, housewarmings, and celebrations — craft a guest-ready invitation and share
              it as a single link.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
                Live editor
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
                No watermarks
              </span>
            </div>
          </div>

          <div>
            <h3 className={`${display.className} text-sm tracking-[0.2em] text-[#d6c4a2] uppercase`}>
              Navigation
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>
                <Link href="/#templates" className="hover:text-white">
                  Browse designs
                </Link>
              </li>
              {occasionLinks.map((category) => (
                <li key={category.id}>
                  <Link href="/#templates" className="hover:text-white">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="hover:text-white">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white">
                  My invitations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${display.className} text-sm tracking-[0.2em] text-[#d6c4a2] uppercase`}>
              Key features
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              {keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6c4a2]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${display.className} text-sm tracking-[0.2em] text-[#d6c4a2] uppercase`}>
              Support
            </h3>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Sign in to save drafts, publish invitations, and manage every celebration from your
              account.
            </p>
            <FooterSupportLinks />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Inviteo. All rights reserved.</p>
          <p className="tracking-[0.14em] uppercase">One link. Every guest.</p>
        </div>
      </div>
    </footer>
  );
}
