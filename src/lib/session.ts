import { API_URL, type AdminUser } from "@/lib/api";
import { ROLE_COOKIE, redirectFor, safeNextPath, type Role } from "@/lib/auth-routes";

const ROLE_MAX_AGE = 7 * 24 * 60 * 60;

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

function writeRoleCookie(value: string, maxAge: number) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ROLE_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

/** Call before navigating after a successful login or signup. */
export function markSignedIn(role: Role) {
  writeRoleCookie(role, ROLE_MAX_AGE);
}

/** Call before navigating after logout or any server-side sign-out. */
export function markSignedOut() {
  writeRoleCookie("", 0);
}

function settle(user: AdminUser | null) {
  if (user) {
    markSignedIn(user.role);
  } else {
    markSignedOut();
  }

  const next = new URLSearchParams(window.location.search).get("next");
  const target = redirectFor(window.location.pathname, user?.role ?? null, next);

  if (target) {
    window.location.replace(target);
  }

  return user;
}

let pendingSession: Promise<AdminUser | null> | null = null;

export function loadSession(): Promise<AdminUser | null> {
  if (!pendingSession) {
    pendingSession = resolveSession()
      .then(settle)
      .finally(() => {
        pendingSession = null;
      });
  }

  return pendingSession;
}

export function homeFor(user: AdminUser): string {
  return user.role === "admin" ? "/admin/dashboard" : "/user/invitations";
}

export function loginHref(next?: string) {
  const path = safeNextPath(next);
  return path ? `/login?next=${encodeURIComponent(path)}` : "/login";
}

export function signupHref(next?: string) {
  const path = safeNextPath(next);
  return path ? `/signup?next=${encodeURIComponent(path)}` : "/signup";
}
