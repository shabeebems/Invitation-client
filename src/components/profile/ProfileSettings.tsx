"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, type AdminUser } from "@/lib/api";
import { loadSession } from "@/lib/session";
import { cormorant } from "@/lib/fonts";
import "./profile.css";

type SessionRow = {
  id: string;
  userAgent: string;
  ip: string;
  lastUsedAt: string | null;
  current: boolean;
};

type Notice = { tone: "ok" | "error"; text: string } | null;

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function deviceName(agent: string) {
  const browser = /Edg\//.test(agent)
    ? "Edge"
    : /Chrome\//.test(agent)
      ? "Chrome"
      : /Firefox\//.test(agent)
        ? "Firefox"
        : /Safari\//.test(agent)
          ? "Safari"
          : "Browser";
  const system = /Windows/.test(agent)
    ? "Windows"
    : /Android/.test(agent)
      ? "Android"
      : /iPhone|iPad/.test(agent)
        ? "iOS"
        : /Mac OS X/.test(agent)
          ? "macOS"
          : /Linux/.test(agent)
            ? "Linux"
            : "";

  return system ? `${browser} on ${system}` : browser;
}

function lastActive(session: SessionRow) {
  if (session.current) {
    return "Active now";
  }

  const date = session.lastUsedAt ? new Date(session.lastUsedAt) : null;
  return date && !Number.isNaN(date.getTime()) ? `Last active ${DATE_FORMAT.format(date)}` : "";
}

export default function ProfileSettings() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const fetchSessions = useCallback(async (): Promise<SessionRow[] | null> => {
    const response = await fetch(`${API_URL}/api/auth/sessions`, { credentials: "include" });

    if (response.status === 401) {
      router.replace("/login");
      return null;
    }

    const data = (await response.json()) as { sessions?: SessionRow[] };
    return data.sessions || [];
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    void loadSession().then((next) => {
      if (cancelled) {
        return;
      }

      if (!next) {
        router.replace("/login");
        return;
      }

      setUser(next);
    });

    void fetchSessions().then((list) => {
      if (!cancelled && list) {
        setSessions(list);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [fetchSessions, router]);

  const hasPassword = user?.hasPassword !== false;

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    setNotice(null);

    if (password.length < 8) {
      setNotice({ tone: "error", text: "Use at least 8 characters." });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, password }),
      });
      const data = (await response.json()) as { message?: string; signedOut?: boolean };

      if (!response.ok) {
        setNotice({ tone: "error", text: data.message || "Could not change password." });
        return;
      }

      if (data.signedOut) {
        router.replace("/login");
        return;
      }

      setUser((current) => (current ? { ...current, hasPassword: true } : current));
      setCurrentPassword("");
      setPassword("");
      setNotice({ tone: "ok", text: "Password added. Use it next time you sign in." });
    } finally {
      setSaving(false);
    }
  }

  async function revoke(session: SessionRow) {
    await fetch(`${API_URL}/api/auth/sessions/${session.id}`, { method: "DELETE", credentials: "include" });

    if (session.current) {
      router.replace("/login");
      return;
    }

    const list = await fetchSessions();
    if (list) {
      setSessions(list);
    }
  }

  async function revokeAll() {
    await fetch(`${API_URL}/api/auth/sessions`, { method: "DELETE", credentials: "include" });
    router.replace("/login");
  }

  return (
    <div className="pf">
      <h1 className={`pf-title ${cormorant.className}`}>Profile</h1>

      <section className="pf-section" aria-labelledby="pf-account">
        <div className="pf-aside">
          <h2 id="pf-account">Account</h2>
          <p>Your name and how we reach you.</p>
        </div>

        <dl className="pf-details">
          <div>
            <dt>Name</dt>
            <dd>{user ? user.name : <span className="pf-bone" />}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              {user ? (
                <>
                  {user.email}
                  {user.emailVerified === false ? <span className="pf-flag">Not verified</span> : null}
                </>
              ) : (
                <span className="pf-bone" />
              )}
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd className={user && !user.phone ? "is-empty" : ""}>
              {user ? user.phone || "Not added" : <span className="pf-bone" />}
            </dd>
          </div>
        </dl>
      </section>

      <section className="pf-section" aria-labelledby="pf-password">
        <div className="pf-aside">
          <h2 id="pf-password">Password</h2>
          <p>
            {hasPassword
              ? "Changing it signs you out on every device."
              : "You sign in with Google. Add a password to also sign in by email."}
          </p>
        </div>

        <form onSubmit={changePassword} className="pf-form" noValidate>
          {hasPassword ? (
            <label className="pf-field">
              Current password
              <input
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
              />
            </label>
          ) : null}
          <label className="pf-field">
            {hasPassword ? "New password" : "Password"}
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className="pf-hint">At least 8 characters.</span>
          </label>

          {notice ? (
            <p className={`pf-notice is-${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}>
              {notice.text}
            </p>
          ) : null}

          <div>
            <button type="submit" className="pf-button" disabled={saving || !password}>
              {saving ? "Saving…" : hasPassword ? "Change password" : "Add password"}
            </button>
          </div>
        </form>
      </section>

      <section className="pf-section" aria-labelledby="pf-devices">
        <div className="pf-aside">
          <h2 id="pf-devices">Signed-in devices</h2>
          <p>Sign out anywhere you no longer use.</p>
        </div>

        <div>
          <ul className="pf-devices">
            {sessions.map((session) => (
              <li key={session.id}>
                <div className="pf-device">
                  <span className="pf-device-name">
                    {deviceName(session.userAgent)}
                    {session.current ? <span className="pf-tag">This device</span> : null}
                  </span>
                  <span className="pf-device-meta">{lastActive(session)}</span>
                </div>
                <button type="button" className="pf-link" onClick={() => void revoke(session)}>
                  Sign out
                </button>
              </li>
            ))}
          </ul>

          {sessions.length > 1 ? (
            <button type="button" className="pf-link pf-link--danger" onClick={() => void revokeAll()}>
              Sign out of all devices
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
