import { NextResponse, type NextRequest } from "next/server";
import { ROLE_COOKIE, parseRole, redirectFor } from "@/lib/auth-routes";

/**
 * Next.js 16 Proxy (formerly middleware) — edge gate for auth areas.
 * Relies on `stk_role` cookie set after login; API still enforces real auth.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const role = parseRole(request.cookies.get(ROLE_COOKIE)?.value);
  const target = redirectFor(pathname, role, searchParams.get("next"));

  if (!target) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(target, request.url));
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    // `/reset-password` intentionally omitted — email token links must work while signed in.
    "/user/:path*",
    "/admin/:path*",
    // Only gated preview edit routes — public `/preview/[slug]` skips this proxy.
    "/preview/:slug/edit",
    "/preview/work/:slug/edit",
  ],
};
