import Link from "next/link";
import { Playfair_Display } from "next/font/google";
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
  // Use existing categories or fallback to reference occasions
  const occasionLinks =
    categories.length > 0
      ? categories.slice(0, 4)
      : [
          { id: "iftar", name: "Iftar" },
          { id: "house-warming", name: "House Warming" },
          { id: "wedding", name: "Wedding" },
        ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#031B13] text-[#F7F0DE]">
      {/* Outer container */}
      <div className="mx-auto w-full max-w-[1380px] px-4 py-12 sm:px-8 sm:py-16 lg:px-10">
        {/* ======================================================== */}
        {/* FOUR-COLUMN FOOTER INFORMATION SECTION                   */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_1fr_1fr] lg:gap-0 items-stretch">
          {/* COLUMN 1: BRAND AND DESCRIPTION */}
          <div className="lg:pr-8 xl:pr-10 flex flex-col justify-between">
            <div>
              {/* Circular badge + Brand Name */}
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[17px] font-bold text-[#071B13] shadow-sm">
                  In
                </span>
                <div>
                  <p className={`${display.className} text-[1.45rem] font-medium tracking-tight text-[#F7F0DE]`}>
                    Inviteo
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.24em] text-[#D9C18C] uppercase">
                    Digital Invitations
                  </p>
                </div>
              </div>

              {/* Brand Description */}
              <p className="mt-4 text-[13px] leading-[1.68] text-[#D2D8CE] sm:text-[13.5px]">
                Craft stunning invitations for weddings, housewarmings, and celebrations. Share the joy
                with a single link.
              </p>
            </div>

            {/* Social Media Outlined Circular Icons */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#D2D8CE] transition hover:border-[#F5E6C7] hover:text-[#F5E6C7]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#D2D8CE] transition hover:border-[#F5E6C7] hover:text-[#F5E6C7]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#D2D8CE] transition hover:border-[#F5E6C7] hover:text-[#F5E6C7]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-[#D2D8CE] transition hover:border-[#F5E6C7] hover:text-[#F5E6C7]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div className="lg:border-l lg:border-[#D9C18C]/20 lg:px-8 xl:px-10">
            <h3 className="text-xs font-semibold tracking-[0.24em] text-[#D9C18C] uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#D2D8CE]">
              <li>
                <Link href="/#templates" className="transition hover:text-[#F7F0DE]">
                  Browse Templates
                </Link>
              </li>
              {occasionLinks.map((category) => (
                <li key={category.id}>
                  <Link href="/#templates" className="transition hover:text-[#F7F0DE]">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="transition hover:text-[#F7F0DE]">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/user/invitations" className="transition hover:text-[#F7F0DE]">
                  My Invitations
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: KEY FEATURES */}
          <div className="lg:border-l lg:border-[#D9C18C]/20 lg:px-8 xl:px-10">
            <h3 className="text-xs font-semibold tracking-[0.24em] text-[#D9C18C] uppercase">
              Key Features
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#D2D8CE]">
              {keyFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  {/* Botanical Leaf Sprig Icon in Muted Champagne Gold */}
                  <svg
                    className="h-4 w-4 shrink-0 text-[#D9C18C]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 18c3-4 7-7 12-9-2 5-5 9-10 11l-2-2z" />
                    <path d="M12 11c1.5 2 2.5 3.5 4 4.5-1.5-1-2.8-2.5-4-4.5z" />
                    <path d="M7 14c-1-1.5-1.2-3-1.2-4.5 1.2 1 2.2 2.5 2.7 4.5H7z" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT */}
          <div className="lg:border-l lg:border-[#D9C18C]/20 lg:pl-8 xl:pl-10 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold tracking-[0.24em] text-[#D9C18C] uppercase">
                Support
              </h3>
              <p className="mt-4 text-[13px] leading-[1.68] text-[#D2D8CE] sm:text-[13.5px]">
                Sign in to save drafts, publish invitations, and manage every celebration from your
                account.
              </p>
            </div>
            <div className="mt-5">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-[#D9C18C]/60 bg-transparent px-6 py-2.5 text-[13px] font-semibold text-[#F7F0DE] transition hover:border-[#F5E6C7] hover:bg-white/5 hover:text-[#F5E6C7]"
              >
                Get Support →
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM COPYRIGHT AND TAGLINE STRIP                       */}
        {/* ======================================================== */}
        <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D2D8CE]/75">
          {/* Left: Copyright */}
          <p className="whitespace-nowrap">
            © 2026 Inviteo. All rights reserved.
          </p>

          {/* Center: Thin horizontal divider with central leaf motif */}
          <div className="hidden sm:flex flex-1 items-center gap-4 mx-6" aria-hidden="true">
            <span className="h-px flex-1 bg-[#D9C18C]/25" />
            <svg
              className="h-4 w-4 shrink-0 text-[#D9C18C]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C10.5 5 7 8 3 9c4 1 7.5 4 9 7 1.5-3 5-6 9-7-4-1-7.5-4-9-7z" />
              <path d="M12 16v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="h-px flex-1 bg-[#D9C18C]/25" />
          </div>

          {/* Right: Tagline */}
          <p className="font-semibold tracking-[0.22em] text-[#D9C18C] uppercase whitespace-nowrap">
            One link. Every guest.
          </p>
        </div>
      </div>
    </footer>
  );
}
