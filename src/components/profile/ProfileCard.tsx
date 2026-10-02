"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
});

export default function ProfileCard() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await loadSession();

      if (cancelled) {
        return;
      }

      if (!next) {
        router.replace("/login");
        return;
      }

      setUser(next);
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!user) {
    return (
      <section className="rounded-[32px] border border-[#e8dfd0] bg-[#faf6ee] px-8 py-10">
        <p className="text-sm text-zinc-500">Loading profile…</p>
      </section>
    );
  }

  const rows = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone || "—"],
    ["Role", user.role === "admin" ? "Admin" : "Customer"],
  ];

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <section className="overflow-hidden rounded-[32px] border border-[#e8dfd0] bg-[#faf6ee] shadow-[0_16px_40px_rgba(20,48,39,0.06)]">
      <div className="bg-[#143027] px-6 py-8 text-white sm:px-8">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#d6c4a2] uppercase">Profile</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d6c4a2] text-lg font-bold text-[#143027]">
            {initials}
          </span>
          <div className="min-w-0">
            <h1 className={`${display.className} truncate text-3xl font-medium tracking-tight`}>
              {user.name}
            </h1>
            <p className="mt-1 truncate text-sm text-white/60">{user.email}</p>
          </div>
        </div>
      </div>
      <dl className="divide-y divide-[#ebe3d6] px-6 sm:px-8">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-4">
            <dt className="text-sm font-semibold text-zinc-500">{label}</dt>
            <dd className="text-sm font-semibold text-zinc-900">{value}</dd>
          </div>
        ))}
      </dl>
      {user.role === "admin" ? (
        <div className="px-6 pb-8 sm:px-8">
          <Link
            href={homeFor(user)}
            className="inline-flex rounded-full bg-[#143027] px-5 py-3 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
          >
            Admin dashboard
          </Link>
        </div>
      ) : null}
    </section>
  );
}
