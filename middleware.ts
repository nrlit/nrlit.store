import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import auth from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const user = await auth.getUser();
  const { pathname } = request.nextUrl;

  const sensitiveRoutes = ["/account", "/admin", "/api/v1/users"];
  const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (user && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (!user && isAccessingSensitiveRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && user?.labels[0] !== "admin") {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (pathname.startsWith("/api/v1/users")) {
    if (!user || user.labels[0] !== "admin") {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Authentication failed" }),
        { status: 403, headers: { "content-type": "application/json" } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/api/v1/admin/users/:path*",
  ],
};
