"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { loadSession } from "@/lib/session";

type SessionRow = {
  id: string;
  userAgent: string;
  ip: string;
  lastUsedAt: string | null;
  current: boolean;
};

function deviceLabel(session: SessionRow): string {
  const agent = session.userAgent;
  const browser = /Edg\//.test(agent)
    ? "Edge"
    : /Chrome\//.test(agent)
      ? "Chrome"
      : /Firefox\//.test(agent)
        ? "Firefox"
        : /Safari\//.test(agent)
          ? "Safari"
          : "Browser";

  return session.current ? `${browser} on this device` : browser;
}

export default function AccountSecurity() {
  const router = useRouter();
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [hasPassword, setHasPassword] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function load() {
    const user = await loadSession();
    setHasPassword(user?.hasPassword !== false);
    const response = await fetch(`${API_URL}/api/auth/sessions`, { credentials: "include" });

    if (response.status === 401) {
      router.replace("/login");
      return;
    }

    const data = (await response.json()) as { sessions?: SessionRow[] };
    setSessions(data.sessions || []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/change-password`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, password }),
    });
    const data = (await response.json()) as { message?: string; signedOut?: boolean };

    if (!response.ok) {
      setMessage(data.message || "Could not change password");
      return;
    }

    if (data.signedOut) {
      router.replace("/login");
      return;
    }

    setHasPassword(true);
    setPassword("");
    setMessage("Password added. You can use it the next time you sign in.");
  }

  async function revoke(id: string) {
    await fetch(`${API_URL}/api/auth/sessions/${id}`, { method: "DELETE", credentials: "include" });
    if (sessions.find((session) => session.id === id)?.current) {
      router.replace("/login");
      return;
    }
    await load();
  }

  async function revokeAll() {
    await fetch(`${API_URL}/api/auth/sessions`, { method: "DELETE", credentials: "include" });
    router.replace("/login");
  }

  return (
    <section className="rounded-[32px] border border-[#e8dfd0] bg-[#faf6ee] px-6 py-8 shadow-[0_16px_40px_rgba(20,48,39,0.06)] sm:px-8">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#8a7048] uppercase">Security</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900">Password & sessions</h2>
      <form onSubmit={changePassword} className="mt-5 flex flex-col gap-3">
        {hasPassword ? (
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="rounded-2xl border border-[#e0d5c6] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#c4a574]"
          />
        ) : null}
        <input
          type="password"
          placeholder={hasPassword ? "New password" : "Password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-[#e0d5c6] bg-white/70 px-4 py-3 text-sm outline-none focus:border-[#c4a574]"
        />
        <button
          type="submit"
          className="rounded-full bg-[#143027] py-3 text-sm font-semibold text-[#f3ead8] hover:bg-[#1c4034]"
        >
          {hasPassword ? "Change password" : "Add password"}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm font-medium text-[#143027]">{message}</p> : null}
      <ul className="mt-8 flex flex-col gap-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[#ebe3d6] bg-white/60 px-4 py-3 text-sm"
          >
            <span className="font-medium text-zinc-800">{deviceLabel(session)}</span>
            <button
              type="button"
              onClick={() => void revoke(session.id)}
              className="font-semibold text-[#87361b] hover:underline"
            >
              Revoke
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => void revokeAll()}
        className="mt-4 text-sm font-semibold text-zinc-600 hover:text-zinc-900"
      >
        Sign out of all devices
      </button>
    </section>
  );
}
