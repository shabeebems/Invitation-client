export type Role = "customer" | "admin";

/** Readable copy of the signed-in role, kept on the site's own domain so `proxy.ts` can see it. */
export const ROLE_COOKIE = "stk_role";

/** Signed-in users are redirected away from these. Reset-password stays open (email token links). */
const GUEST_PAGES = ["/login", "/signup", "/forgot-password"];

type Audience = "guest" | "member" | Role;

function within(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

function audience(pathname: string): Audience | null {
  if (GUEST_PAGES.some((base) => within(pathname, base))) {
    return "guest";
  }

  if (within(pathname, "/admin")) {
    return "admin";
  }

  if (within(pathname, "/user")) {
    return "customer";
  }

  const [first, second, third, fourth] = pathname.split("/").filter(Boolean);

  if (first === "preview" && second === "work" && fourth === "edit") {
    return "member";
  }

  if (first === "preview" && third === "edit") {
    return "admin";
  }

  return null;
}

export function parseRole(value: string | null | undefined): Role | null {
  return value === "admin" || value === "customer" ? value : null;
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "";
  }

  const { pathname } = new URL(value, "http://local");
  return audience(pathname) === "guest" ? "" : value;
}

function homeForRole(role: Role) {
  return role === "admin" ? "/admin/dashboard" : "/user/invitations";
}

/** Where a visitor on `pathname` must be sent instead, or null when they may stay. */
export function redirectFor(pathname: string, role: Role | null, next?: string | null): string | null {
  const area = audience(pathname);

  if (!area) {
    return null;
  }

  if (area === "guest") {
    return role ? safeNextPath(next) || homeForRole(role) : null;
  }

  if (!role) {
    return `/login?next=${encodeURIComponent(pathname)}`;
  }

  return area === "member" || area === role ? null : homeForRole(role);
}
