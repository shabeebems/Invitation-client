"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminUser } from "@/lib/api";
import { invitationEditHref } from "@/lib/api";
import { loadSession } from "@/lib/session";

export default function WorkPreviewBar({ slug, name }: { slug: string; name: string }) {
  const [user, setUser] = useState<AdminUser | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((session) => {
      if (!cancelled) {
        setUser(session);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (user === undefined || !user) {
    return null;
  }

  const isAdmin = user.role === "admin";
  const role = user.role;
  const backHref = isAdmin ? "/admin/works" : "/user/invitations";
  const editHref = invitationEditHref({ slug, source: "work" }, role);

  return (
    <div className="sticky top-0 z-[10050] border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-6 py-3 md:px-10">
        <p className="truncate text-sm font-semibold text-zinc-800">{name}</p>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={backHref}
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:border-zinc-400"
          >
            {isAdmin ? "Back to works" : "My invitations"}
          </Link>
          <Link
            href={editHref}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
