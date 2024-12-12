import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getLoggedInUser from "@/appwrite/getCurrentUser";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the logged-in user
  const user = await getLoggedInUser();

  // Authentication routes
  if (pathname.match(/^\/(login|register|reset-password|forgot-password)$/)) {
    // Redirect authenticated users to the dashboard
    if (user) {
      return NextResponse.redirect(new URL("/account", request.url));
    }
  }

  // API routes handling
  if (pathname.startsWith("/api/")) {
    // For API routes, we'll use headers instead of redirects
    if (pathname.startsWith("/api/v1/admin")) {
      if (!user || !user.labels.includes("admin")) {
        return new NextResponse(
          JSON.stringify({ success: false, message: "Admin access required" }),
          { status: 403, headers: { "content-type": "application/json" } }
        );
      }
    } else if (pathname.startsWith("/api/v1/auth")) {
      if (user) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            message: "Already Authenticated",
          }),
          { status: 403, headers: { "content-type": "application/json" } }
        );
      }
    }
    // If checks pass, allow the API request to proceed
    return NextResponse.next();
  }

  // Protected routes (non-API)
  if (pathname.match(/^\/(checkout|account|admin)$/)) {
    // Redirect unauthenticated users to login
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // For /admin, also check if the user is an admin
    if (pathname === "/admin" && !user.labels.includes("admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Continue with the request if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/checkout",
    "/admin/:path*",
    "/account",
    "/api/v1/auth/:path*",
  ],
};
