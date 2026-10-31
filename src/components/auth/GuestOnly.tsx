"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { homeFor, loadSession, loginHref, safeNextPath } from "@/lib/session";
import type { AdminUser } from "@/lib/api";

function resolvePostAuthPath(user: AdminUser, next: string) {
  if (!next) {
    return homeFor(user);
  }

  if (user.role === "admin" && (next === "/user" || next.startsWith("/user/"))) {
    return homeFor(user);
  }

  if (user.role !== "admin" && (next === "/admin" || next.startsWith("/admin/"))) {
    return homeFor(user);
  }

  return next;
}

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
        router.replace(resolvePostAuthPath(user, next));
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
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[#5A5F57]">
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

/** Customer-only area: blocks guests and admins. */
export function RequireCustomer({ children }: { children: React.ReactNode }) {
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

      if (user.role === "admin") {
        router.replace(homeFor(user));
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

export function RequireAdmin({ children }: { children: React.ReactNode }) {
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

      if (user.role !== "admin") {
        router.replace(homeFor(user));
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
