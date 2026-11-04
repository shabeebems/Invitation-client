"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { invitationEditHref } from "@/lib/api";
import { loadSession } from "@/lib/session";

export default function WorkEditRedirectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((user) => {
      if (cancelled || !user) {
        return;
      }

      if (user.role === "admin") {
        router.replace(invitationEditHref({ slug: params.slug, source: "work" }, "admin"));
        return;
      }

      router.replace(invitationEditHref({ slug: params.slug, source: "work" }, "customer"));
    });

    return () => {
      cancelled = true;
    };
  }, [params.slug, router]);

  return (
    <div className="flex min-h-full items-center justify-center bg-page text-sm text-zinc-500">
      Opening editor…
    </div>
  );
}
