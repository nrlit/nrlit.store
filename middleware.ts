import { NextResponse } from "next/server";
import auth from "./auth";

export async function middleware(request: Request) {
  const user = await auth.getUser();
  if (!user) {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("session");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/", "/account/"],
};
