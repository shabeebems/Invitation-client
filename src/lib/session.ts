import { API_URL, type AdminUser } from "@/lib/api";

async function readMe(): Promise<AdminUser | null> {
  const response = await fetch(`${API_URL}/api/auth/me`, { credentials: "include" });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { user?: AdminUser };
  return data.user || null;
}

async function resolveSession(): Promise<AdminUser | null> {
  const current = await readMe();

  if (current) {
    return current;
  }

  const refreshed = await fetch(`${API_URL}/api/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!refreshed.ok) {
    return null;
  }

  const data = (await refreshed.json()) as { success?: boolean };

  if (!data.success) {
    return null;
  }

  return readMe();
}

let pendingSession: Promise<AdminUser | null> | null = null;

export function loadSession(): Promise<AdminUser | null> {
  if (!pendingSession) {
    pendingSession = resolveSession().finally(() => {
      pendingSession = null;
    });
  }

  return pendingSession;
}

export function homeFor(user: AdminUser): string {
  return user.role === "admin" ? "/admin/dashboard" : "/account";
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "";
  }

  return value;
}

export function loginHref(next?: string) {
  const path = safeNextPath(next);
  return path ? `/login?next=${encodeURIComponent(path)}` : "/login";
}

export function signupHref(next?: string) {
  const path = safeNextPath(next);
  return path ? `/signup?next=${encodeURIComponent(path)}` : "/signup";
}
