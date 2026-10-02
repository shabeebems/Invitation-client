"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { API_URL, type AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

export default function SiteNav() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [resendNote, setResendNote] = useState("");
  const [resending, setResending] = useState(false);

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

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8dfd0]/90 bg-[#f5efe4]/90 backdrop-blur">
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
      <div className="flex h-16 w-full items-center justify-between px-6 md:px-10">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-logo">
          Inviteo
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
              <ProfileMenu user={user} />
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
