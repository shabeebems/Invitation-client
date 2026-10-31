"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";
import VerifyEmailBanner from "./VerifyEmailBanner";
import BrandMark from "@/components/brand/BrandMark";
import BrandWordmark from "@/components/brand/BrandWordmark";
import { BRAND_NAME } from "@/lib/brand";

export default function SiteNav() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await loadSession();

      if (cancelled) {
        return;
      }

      setUser(next);
      setChecked(true);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8dfd0]/90 bg-[#f5efe4]/90 backdrop-blur">
      {checked && user && user.emailVerified === false ? <VerifyEmailBanner email={user.email} /> : null}

      <div className="flex h-16 w-full items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label={BRAND_NAME}
          className="group flex shrink-0 items-center gap-2.5 no-underline sm:gap-3"
        >
          <BrandMark priority className="h-7 w-auto transition-transform group-hover:scale-105 sm:h-8" />
          <BrandWordmark className="text-[1.35rem] sm:text-[1.65rem]" />
        </Link>

        <nav className="flex items-center gap-2" aria-label="Account">
          <Link
            href="/#templates"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 sm:inline-flex"
          >
            Templates
          </Link>
          {checked && !user ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Signup
              </Link>
            </>
          ) : null}
          {checked && user ? (
            <>
              <Link
                href={homeFor(user)}
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 sm:inline-flex"
              >
                {user.role === "admin" ? "Dashboard" : "My invitations"}
              </Link>
              {user.role !== "admin" ? (
                <Link
                  href="/user/profile"
                  className="hidden rounded-full px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 sm:inline-flex"
                >
                  Profile
                </Link>
              ) : null}
              <ProfileMenu user={user} />
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
