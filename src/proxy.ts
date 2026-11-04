import { NextResponse, type NextRequest } from "next/server";
import { ROLE_COOKIE, parseRole, redirectFor } from "@/lib/auth-routes";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const role = parseRole(request.cookies.get(ROLE_COOKIE)?.value);
  const target = redirectFor(pathname, role, searchParams.get("next"));

  return target ? NextResponse.redirect(new URL(target, request.url)) : NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/user/:path*",
    "/admin/:path*",
    "/preview/:path*",
  ],
};
