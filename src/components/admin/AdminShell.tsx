"use client";

import { useEffect, useState } from "react";
import type { AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { AdminContext } from "./AdminContext";
import Sidebar from "./Sidebar";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16" strokeLinecap="round" />
          <path d="M4 12h16" strokeLinecap="round" />
          <path d="M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

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

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  return (
    <AdminContext.Provider value={{ user, loading }}>
      <div className="flex h-screen overflow-hidden bg-[#f4f5f7]">
        {navOpen ? (
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/35 lg:hidden"
            onClick={() => setNavOpen(false)}
          />
        ) : null}

        <div
          className={`fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-out lg:static lg:z-auto lg:translate-x-0 ${
            navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar onNavigate={() => setNavOpen(false)} />
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="flex shrink-0 items-center gap-3 border-b border-[#e6e8ec] bg-white px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] lg:hidden">
            <button
              type="button"
              aria-expanded={navOpen}
              aria-controls="admin-sidebar"
              aria-label={navOpen ? "Close menu" : "Open menu"}
              onClick={() => setNavOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e6e8ec] text-[#1c1f24]"
            >
              <MenuIcon open={navOpen} />
            </button>
            <p className="text-sm font-semibold text-[#1c1f24]">Admin</p>
          </header>

          <main className="min-w-0 flex-1 overflow-auto px-4 py-6 sm:px-6 md:px-10 md:py-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
