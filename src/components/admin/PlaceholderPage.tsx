"use client";

import { useAdmin } from "./AdminContext";

export default function PlaceholderPage() {
  const { user, loading } = useAdmin();
  const name = user?.name;

  return (
    <section className="flex h-full items-start">
      <div className="w-full rounded-[28px] bg-white px-10 py-12 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          {loading ? "Welcome" : `Welcome ${name || ""}`.trim()}
        </h1>
        <p className="mt-3 text-lg text-zinc-500">Feature is updating...</p>
      </div>
    </section>
  );
}
