import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

// Create a custom middleware function that combines Clerk and CORS
const customMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent
) => {
  // Handle CORS for Tawk.to
  const response = NextResponse.next();

  // Add CORS headers specifically for Tawk.to
  response.headers.set("Access-Control-Allow-Origin", "https://embed.tawk.to");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: response.headers,
    });
  }

  // Run Clerk middleware
  const clerkResponse = await clerkMiddleware()(request, event);

  // Merge headers from Clerk response with our CORS headers
  if (clerkResponse && clerkResponse instanceof NextResponse) {
    clerkResponse.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
  }

  return response;
};

export default customMiddleware;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
