"use client";

import { useEffect, useState } from "react";
import { API_URL, type AdminUser } from "@/lib/api";
import { AdminContext } from "./AdminContext";
import Sidebar from "./Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAdmin() {
      try {
        const response = await fetch(`${API_URL}/api/dashboard`);
        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = (await response.json()) as { user?: AdminUser };
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ user, loading }}>
      <div className="flex h-screen overflow-hidden bg-page">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto p-8">{children}</main>
      </div>
    </AdminContext.Provider>
  );
}
