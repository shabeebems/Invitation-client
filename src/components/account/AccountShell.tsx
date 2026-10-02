"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { API_URL, type AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { RequireUser } from "@/components/auth/GuestOnly";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function initials(name?: string) {
  return (name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void loadSession().then(setUser);
  }, []);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  async function logout() {
    setLoggingOut(true);
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    router.replace("/login");
  }

  const tabs = [
    { href: "/account", label: "My invitations" },
    { href: "/account/profile", label: "Profile" },
  ];

  return (
    <RequireUser>
      <div className="min-h-full bg-[#f7f6f3]">
        <header className="sticky top-0 z-30 border-b border-[#e8e4dc] bg-white/90 backdrop-blur">
          <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#143027] text-sm font-bold text-[#f3ead8]">
                  In
                </span>
                <span className={`${display.className} text-lg font-semibold tracking-[0.04em] text-[#143027] uppercase`}>
                  Inviteo
                </span>
              </Link>
              <nav className="hidden items-center gap-1 md:flex">
                {tabs.map((tab) => {
                  const active = pathname === tab.href;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-[#143027] text-[#f3ead8]"
                          : "text-zinc-600 hover:bg-[#f0ece4] hover:text-[#143027]"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/#templates"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-zinc-600 hover:bg-[#f0ece4] hover:text-[#143027]"
              >
                ← Templates
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-[#e8e4dc] bg-white py-1.5 pr-3 pl-1.5 hover:border-[#cfc7b8]"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d6c4a2] text-xs font-bold text-[#143027]">
                    {initials(user?.name)}
                  </span>
                  <span className="hidden max-w-[120px] truncate text-sm font-semibold text-[#143027] sm:block">
                    {user?.name?.split(" ")[0] || "Account"}
                  </span>
                </button>
                {menuOpen ? (
                  <div
                    role="menu"
                    className="absolute top-12 right-0 z-40 w-56 overflow-hidden rounded-2xl border border-[#e8e4dc] bg-white py-1.5 shadow-[0_18px_40px_rgba(20,48,39,0.12)]"
                  >
                    <div className="border-b border-[#f0ece4] px-4 py-3">
                      <p className="truncate text-sm font-semibold text-zinc-900">{user?.name || "…"}</p>
                      <p className="truncate text-xs text-zinc-500">{user?.email || ""}</p>
                    </div>
                    <Link
                      href="/account"
                      className="block px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-[#f7f6f3] md:hidden"
                      onClick={() => setMenuOpen(false)}
                    >
                      My invitations
                    </Link>
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-[#f7f6f3]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile & security
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => void logout()}
                      disabled={loggingOut}
                      className="block w-full px-4 py-2.5 text-left text-sm font-medium text-zinc-700 hover:bg-[#f7f6f3] disabled:opacity-60"
                    >
                      {loggingOut ? "Logging out…" : "Logout"}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </RequireUser>
  );
}
