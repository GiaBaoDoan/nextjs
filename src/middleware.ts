import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/signup" || path === "/login" || path === "/verify";
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/profile", "/", "/verify"], // Middleware chỉ chạy trên `/dashboard`
};
