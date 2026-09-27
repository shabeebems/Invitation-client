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

const menus = [
  { href: "/admin/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/admin/categories", label: "Categories", icon: CategoriesIcon },
  { href: "/admin/templates", label: "Templates", icon: TemplatesIcon },
  { href: "/admin/works", label: "Works", icon: WorksIcon },
  { href: "/admin/users", label: "Users", icon: UsersIcon },
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
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar px-5 py-6 text-white">
      <div>
        <p className="text-[28px] font-extrabold tracking-tight text-logo">Inviteo</p>
        <span className="mt-2 inline-flex rounded-full border border-[#c49a5c]/80 px-3 py-0.5 text-[10px] font-semibold tracking-[0.18em] text-[#e8c48a]">
          ADMIN
        </span>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl bg-sidebar-chip px-3 py-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7b7d2] text-sm font-bold text-[#8a2458]">
          {loading ? "" : initials(name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs text-white/55">Admin</p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {menus.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        {logoutError ? <p className="mb-2 px-4 text-xs text-[#ffb4d2]">{logoutError}</p> : null}
        <button
          type="button"
          onClick={() => void logout()}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-[15px] font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
        >
          <LogoutIcon className="h-5 w-5" />
          {loggingOut ? "Logging out…" : "Logout"}
        </button>
      </div>
    </aside>
  );
}
