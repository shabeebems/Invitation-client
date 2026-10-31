"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { imageUrl, type AdminUser, type InvitationTemplate } from "@/lib/api";
import "./landing.css";
import { homeFor, loadSession } from "@/lib/session";
import { BRAND_NAME } from "@/lib/brand";
import BrandMark from "@/components/brand/BrandMark";
import BrandWordmark from "@/components/brand/BrandWordmark";
import ProfileMenu from "./ProfileMenu";
import VerifyEmailBanner from "./VerifyEmailBanner";

const LINKS = [
  { id: "home", label: "Home", href: "/" },
  { id: "templates", label: "Templates", href: "/#templates" },
] as const;

type LinkId = (typeof LINKS)[number]["id"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

function thumbnailFor(template: InvitationTemplate) {
  const url = imageUrl(template.images, "hero") || template.images?.[0]?.url || "";

  return url.includes("/image/upload/")
    ? url.replace("/image/upload/", "/image/upload/c_fill,g_auto,w_96,h_96,q_auto,f_auto/")
    : url;
}

export default function LandingNav({ templates = [] }: { templates?: InvitationTemplate[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<LinkId | null>(onHome ? "home" : null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await loadSession();

      if (!cancelled) {
        setUser(next);
        setChecked(true);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const templatesSection = document.getElementById("templates");

    if (!onHome || !templatesSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting ? "templates" : "home"),
      { rootMargin: "-40% 0px -55% 0px" }
    );

    observer.observe(templatesSection);
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!searchOpen) {
      return;
    }

    function closeOnOutside(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? templates.filter((template) =>
          [template.name, template.categoryName, template.description].some((value) =>
            value?.toLowerCase().includes(term)
          )
        )
      : templates;

    return matches.slice(0, 6);
  }, [query, templates]);

  const authLinks =
    checked && user ? (
      <>
        <Link
          href={homeFor(user)}
          className={`ld-btn ld-btn--ghost${pathname.startsWith(homeFor(user)) ? " is-current" : ""}`}
        >
          {user.role === "admin" ? "Dashboard" : "My Invitations"}
        </Link>
        {user.role !== "admin" ? (
          <Link
            href="/user/profile"
            className={`ld-btn ld-btn--ghost${pathname.startsWith("/user/profile") ? " is-current" : ""}`}
          >
            Profile
          </Link>
        ) : null}
        <ProfileMenu user={user} variant="brand" />
      </>
    ) : (
      <>
        {pathname === "/login" ? null : (
          <Link href="/login" className="ld-btn ld-btn--ghost">
            Login
          </Link>
        )}
        {pathname === "/signup" ? null : (
          <Link href="/signup" className="ld-btn ld-btn--solid">
            Sign Up
          </Link>
        )}
      </>
    );

  return (
    <header className={`ld-nav${scrolled ? " is-scrolled" : ""}`}>
      {checked && user && user.emailVerified === false ? <VerifyEmailBanner email={user.email} /> : null}

      <div className="ld-nav-bar">
        <Link href="/" className="ld-brand" aria-label={BRAND_NAME}>
          <BrandMark priority className="ld-brand-mark" />
          <BrandWordmark className="text-[1.32rem] sm:text-[1.5rem]" />
        </Link>

        <nav className="ld-links" aria-label="Main navigation">
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "page" : undefined}
              className={`ld-link${active === link.id ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ld-actions">
          <div className="ld-search" ref={searchRef}>
            <button
              type="button"
              className="ld-icon-btn"
              aria-label="Search templates"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((open) => !open);
                setMenuOpen(false);
              }}
            >
              <SearchIcon />
            </button>

            {searchOpen ? (
              <div className="ld-search-panel" role="dialog" aria-label="Search templates">
                <label className="ld-search-field">
                  <SearchIcon />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search templates…"
                    aria-label="Search templates"
                    autoFocus
                  />
                </label>

                {results.length > 0 ? (
                  <ul className="ld-search-results">
                    {results.map((template) => {
                      const thumb = thumbnailFor(template);

                      return (
                        <li key={template.id}>
                          <Link
                            href={`/preview/${template.slug}`}
                            className="ld-search-result"
                            onClick={() => setSearchOpen(false)}
                          >
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={thumb} alt="" loading="lazy" />
                            ) : (
                              <span className="ld-search-thumb" />
                            )}
                            <span>
                              <strong>{template.name}</strong>
                              <small>{template.categoryName || "Invitation"}</small>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="ld-search-empty">No templates match “{query.trim()}”.</p>
                )}
              </div>
            ) : null}
          </div>

          <div className={`ld-auth${checked ? "" : " is-pending"}`}>{authLinks}</div>

          <button
            type="button"
            className="ld-icon-btn ld-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="ld-menu">
          <nav aria-label="Mobile navigation">
            {LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`ld-menu-link${active === link.id ? " is-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="ld-menu-auth">{authLinks}</div>
        </div>
      ) : null}
    </header>
  );
}
