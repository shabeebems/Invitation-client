"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { useAdmin } from "./AdminContext";
import {
  CategoriesIcon,
  DashboardIcon,
  LogoutIcon,
  TemplatesIcon,
  UsersIcon,
  WorksIcon,
} from "./icons";

const groups = [
  {
    label: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: DashboardIcon }],
  },
  {
    label: "Catalog",
    items: [
      { href: "/admin/categories", label: "Categories", icon: CategoriesIcon },
      { href: "/admin/templates", label: "Templates", icon: TemplatesIcon },
    ],
  },
  {
    label: "Studio",
    items: [
      { href: "/admin/works", label: "Works", icon: WorksIcon },
      { href: "/admin/users", label: "Users", icon: UsersIcon },
    ],
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAdmin();
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const name = user?.name || (loading ? "" : "Admin");

  async function logout() {
    setLoggingOut(true);
    setLogoutError("");

    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Could not log out");
      }

      router.replace("/login");
    } catch {
      setLogoutError("Could not log out");
      setLoggingOut(false);
    }
  }

  return (
    <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-[#e6e8ec] bg-white px-4 py-6 text-[#1c1f24]">
      <Link href="/admin/dashboard" className="px-2">
        <p className="text-[22px] font-semibold tracking-[0.16em] text-[#111827] uppercase">Inviteo</p>
        <p className="mt-1 text-[11px] font-medium tracking-[0.18em] text-zinc-400 uppercase">Admin</p>
      </Link>

      <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#f4f5f7] px-3 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111827] text-xs font-bold text-white">
          {loading ? "" : initials(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="truncate text-xs text-zinc-500">{user?.email || "Studio"}</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-6 overflow-auto">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              {group.label}
            </p>
            <div className="mt-2 flex flex-col gap-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-[#111827] text-white"
                        : "text-[#3f4550] hover:bg-[#f4f5f7] hover:text-[#111827]"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="pt-4">
        {logoutError ? <p className="mb-2 px-3 text-xs text-[#f3b4b4]">{logoutError}</p> : null}
        <Link
          href="/"
          className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-500 hover:bg-[#f4f5f7] hover:text-[#111827]"
        >
          View site
        </Link>
        <button
          type="button"
          onClick={() => void logout()}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-500 transition hover:bg-[#f4f5f7] hover:text-[#111827] disabled:opacity-60"
        >
          <LogoutIcon className="h-[18px] w-[18px]" />
          {loggingOut ? "Logging out…" : "Log out"}
        </button>
      </div>
    </aside>
  );
}
