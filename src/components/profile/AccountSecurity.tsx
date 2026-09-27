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
    <section className="mt-6 rounded-[28px] bg-white px-8 py-10 shadow-sm">
      <h2 className="text-xl font-extrabold">Security</h2>
      <form onSubmit={changePassword} className="mt-4 flex flex-col gap-3">
        {hasPassword ? (
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
          />
        ) : null}
        <input
          type="password"
          placeholder={hasPassword ? "New password" : "Password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-2xl border border-zinc-200 px-4 py-3 text-sm"
        />
        <button type="submit" className="rounded-full bg-accent py-3 text-sm font-semibold text-white">
          {hasPassword ? "Change password" : "Add password"}
        </button>
      </form>
      {message ? <p className="mt-3 text-sm text-accent">{message}</p> : null}
      <ul className="mt-8 flex flex-col gap-3">
        {sessions.map((session) => (
          <li key={session.id} className="flex items-center justify-between gap-3 text-sm">
            <span>{deviceLabel(session)}</span>
            <button type="button" onClick={() => void revoke(session.id)} className="font-semibold text-accent">
              Revoke
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => void revokeAll()} className="mt-4 text-sm font-semibold text-zinc-700">
        Sign out of all devices
      </button>
    </section>
  );
}
