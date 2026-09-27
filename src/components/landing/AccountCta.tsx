"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";

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
        className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-800 hover:border-zinc-800"
      >
        Create an account
      </Link>
    );
  }

  return null;
}
