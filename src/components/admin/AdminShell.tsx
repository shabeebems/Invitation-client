"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { AdminUser } from "@/lib/api";
import { homeFor, loadSession, loginHref } from "@/lib/session";
import { AdminContext } from "./AdminContext";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function gate() {
      const session = await loadSession();

      if (cancelled) {
        return;
      }

      if (!session) {
        router.replace(loginHref(`${pathname}${window.location.search}`));
        return;
      }

      if (session.role !== "admin") {
        router.replace(homeFor(session));
        return;
      }

      setUser(session);
      setAllowed(true);
    }

    void gate();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!allowed || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f4f5f7] text-sm text-[#1c1f24]">
        Checking access…
      </div>
    );
  }

  return (
    <AdminContext.Provider value={{ user, loading: false }}>
      <div className="flex h-screen overflow-hidden bg-[#f4f5f7]">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto px-6 py-8 md:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </AdminContext.Provider>
  );
}
