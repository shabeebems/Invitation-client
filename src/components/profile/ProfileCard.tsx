"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession } from "@/lib/session";

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
    return <p className="text-sm text-zinc-500">Loading profile…</p>;
  }

  const rows = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone || "—"],
    ["Role", user.role === "admin" ? "Admin" : "Customer"],
  ];

  return (
    <section className="rounded-[28px] bg-white px-8 py-10 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19c1.2-3.2 3.5-4.7 6.5-4.7s5.3 1.5 6.5 4.7" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900">{user.name}</h1>
      <p className="mt-1 text-sm text-zinc-500">{user.email}</p>
      <dl className="mt-8 divide-y divide-zinc-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-3">
            <dt className="text-sm font-semibold text-zinc-500">{label}</dt>
            <dd className="text-sm font-semibold text-zinc-900">{value}</dd>
          </div>
        ))}
      </dl>
      {user.role === "admin" ? (
        <Link
          href={homeFor(user)}
          className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Dashboard
        </Link>
      ) : null}
    </section>
  );
}
