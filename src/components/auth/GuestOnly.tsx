"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { homeFor, loadSession, loginHref, safeNextPath } from "@/lib/session";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function gate() {
      const user = await loadSession();

      if (cancelled) {
        return;
      }

      if (user) {
        const next = safeNextPath(new URLSearchParams(window.location.search).get("next"));
        router.replace(next || homeFor(user));
        return;
      }

      setReady(true);
    }

    void gate();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center bg-page text-sm">
        Checking access…
      </div>
    );
  }

  return children;
}

export function RequireUser({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function gate() {
      const user = await loadSession();

      if (cancelled) {
        return;
      }

      if (!user) {
        router.replace(loginHref(`${pathname}${window.location.search}`));
        return;
      }

      setReady(true);
    }

    void gate();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-full items-center justify-center bg-page text-sm text-zinc-500">
        Checking access…
      </div>
    );
  }

  return children;
}
