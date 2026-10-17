"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";

export default function HeroCtas() {
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

  const getStartedHref = user ? homeFor(user) : "/signup";

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <Link
        href={getStartedHref}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#183C2C] px-7 py-3.5 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#234F3A] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183C2C]"
      >
        <span>{user ? (user.role === "admin" ? "Dashboard" : "My Invitations") : "Get Started"}</span>
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>

      <a
        href="#templates"
        className="inline-flex items-center justify-center rounded-full border border-[#234735]/45 bg-transparent px-7 py-3.5 text-[14px] font-semibold text-[#183C2C] transition-all hover:border-[#183C2C] hover:bg-[#183C2C]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183C2C]"
      >
        View Templates
      </a>
    </div>
  );
}
