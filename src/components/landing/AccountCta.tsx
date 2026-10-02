"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";

export default function AccountCta() {
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await loadSession();

      if (!cancelled) {
        setUser(next);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!user) {
    if (user === undefined) {
      return null;
    }

    return (
      <Link
        href="/signup"
        className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:border-white"
      >
        Create an account
      </Link>
    );
  }

  return (
    <Link
      href={homeFor(user)}
      className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:border-white"
    >
      {user.role === "admin" ? "Dashboard" : "My invitations"}
    </Link>
  );
}
