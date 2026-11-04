"use client";

import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { AdminContext } from "./AdminContext";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((session) => {
      if (!cancelled) {
        setUser(session);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AdminContext.Provider value={{ user, loading }}>
      <div className="flex h-screen overflow-hidden bg-[#f4f5f7]">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto px-6 py-8 md:px-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </AdminContext.Provider>
  );
}
