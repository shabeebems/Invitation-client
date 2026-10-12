"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSession } from "@/lib/session";

export default function UseTemplateBar({ slug, name }: { slug: string; name: string }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((user) => {
      if (!cancelled) {
        setIsAdmin(user?.role === "admin");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="sticky top-0 z-[10050] border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-3 md:px-10">
        <p className="truncate text-sm font-semibold text-zinc-800">{name}</p>
        <div className="flex shrink-0 items-center gap-2">
          {isAdmin ? (
            <>
              <Link
                href="/admin/templates"
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-400"
              >
                Back to templates
              </Link>
              <Link
                href={`/admin/templates/${slug}/edit`}
                className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
              >
                Edit
              </Link>
            </>
          ) : (
            <Link
              href={`/user/use/${slug}`}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Use this template
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
