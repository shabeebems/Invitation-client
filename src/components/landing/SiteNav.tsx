"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL, type AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

export default function SiteNav({
  variant = "default",
}: {
  variant?: "default" | "sage";
}) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [resendNote, setResendNote] = useState("");
  const [resending, setResending] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  async function resendVerification() {
    if (!user?.email || resending) {
      return;
    }

    setResending(true);
    setResendNote("");

    try {
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Could not send the email");
      }

      setResendNote("Verification email sent. The link expires in 1 hour.");
    } catch (error) {
      setResendNote(error instanceof Error ? error.message : "Could not send the email");
    } finally {
      setResending(false);
    }
  }

  const isSage = variant === "sage";

  return (
    <header
      className={
        isSage
          ? "sticky top-0 z-30 w-full bg-[#E7EBDD]/90 backdrop-blur-md transition-colors"
          : "sticky top-0 z-20 border-b border-[#e8dfd0]/90 bg-[#f5efe4]/90 backdrop-blur"
      }
    >
      {checked && user && user.emailVerified === false ? (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="flex w-full items-center justify-between gap-3 px-6 py-2 md:px-10">
            <p className="text-xs font-medium text-amber-950">
              {resendNote || "Verify your email to finish setting up your account."}
            </p>
            <button
              type="button"
              onClick={() => void resendVerification()}
              disabled={resending}
              className="shrink-0 rounded-full bg-amber-950 px-3 py-1 text-xs font-semibold text-white disabled:opacity-60"
            >
              {resending ? "Sending…" : "Verify email"}
            </button>
          </div>
        </div>
      ) : null}

      <div
        className={
          isSage
            ? "mx-auto flex h-18 w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16"
            : "flex h-16 w-full items-center justify-between px-6 md:px-10"
        }
      >
        {isSage ? (
          <Link href="/" className="group flex items-center gap-2.5 text-[#183C2C] no-underline">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#183C2C] transition-transform group-hover:scale-105"
              aria-hidden="true"
            >
              <path
                d="M4 14c3-5 8-8 14-8-1 6-4 11-9 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M4 14c2-1 5 0 7 2s3 5 2 7c-2 1-5 0-7-2s-3-5-2-7Z" fill="currentColor" />
              <path
                d="M11 6c1.5-2 4.5-2.5 6.5-1s2.5 4.5 1 6.5-4.5 2.5-6.5 1-2.5-4.5-1-6.5Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-[1.35rem] font-bold tracking-tight text-[#183C2C]">Inviteo</span>
          </Link>
        ) : (
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-logo">
            Inviteo
          </Link>
        )}

        {isSage ? (
          <nav className="flex items-center gap-6 sm:gap-9" aria-label="Main Navigation">
            <div className="hidden items-center gap-7 sm:flex md:gap-9">
              <Link
                href="/#templates"
                className="text-[13.5px] font-medium text-[#294836] transition-colors hover:text-[#183C2C]"
              >
                Templates
              </Link>
              <Link
                href="/#features"
                className="text-[13.5px] font-medium text-[#294836] transition-colors hover:text-[#183C2C]"
              >
                Features
              </Link>
              <Link
                href={user ? homeFor(user) : "/login"}
                className="text-[13.5px] font-medium text-[#294836] transition-colors hover:text-[#183C2C]"
              >
                My Invitations
              </Link>
            </div>

            {/* Profile Avatar / Auth */}
            {checked && user ? (
              <ProfileMenu user={user} variant="sage" />
            ) : (
              <Link
                href="/login"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#183C2C] text-white transition-all hover:bg-[#224C38] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183C2C]"
                aria-label="Account or sign in"
                title="Account"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="3.4" />
                  <path d="M5.5 19c1.2-3.2 3.5-4.7 6.5-4.7s5.3 1.5 6.5 4.7" />
                </svg>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#183C2C] sm:hidden"
              aria-label="Toggle mobile menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </nav>
        ) : (
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
                <ProfileMenu user={user} />
              </>
            ) : null}
          </nav>
        )}
      </div>

      {/* Mobile menu dropdown for Sage */}
      {isSage && mobileOpen ? (
        <div className="border-t border-[#c6d3bc]/60 bg-[#E7EBDD] px-6 py-4 sm:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/#templates"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-[#183C2C]"
            >
              Templates
            </Link>
            <Link
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-[#183C2C]"
            >
              Features
            </Link>
            <Link
              href={user ? homeFor(user) : "/login"}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-[#183C2C]"
            >
              My Invitations
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
