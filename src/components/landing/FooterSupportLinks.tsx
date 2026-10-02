"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";

export default function FooterSupportLinks() {
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

  if (user === undefined || user) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-col gap-3">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-[#16382d] px-4 py-3 text-sm font-semibold text-white hover:border-[#d6c4a2]/40"
      >
        Get started free
      </Link>
      <Link
        href="/login"
        className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:text-white"
      >
        Already have an account?
      </Link>
    </div>
  );
}
