"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { AdminContext } from "./AdminContext";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function gate() {
      const user = await loadSession();

      if (cancelled) {
        return;
      }

      if (!user || user.role !== "admin") {
        router.replace("/login");
        return;
      }

      setUser(user);
      setAllowed(true);
    }

    void gate();

    return () => {
      cancelled = true;
    };
  }, [router]);

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
