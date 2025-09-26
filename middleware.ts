import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// eslint-disable-next-line consistent-return
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // paths
  const adminPages = path.startsWith("/dashboard");
  const requireLogintoVisit =
    path.startsWith("/home") || path === "/api/auth/signout" || adminPages;
  const visitWithoutLogin = path === "/api/auth/signin";
  // get session
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // if you're loggedin you should not visit these pages
  if (session && visitWithoutLogin) return NextResponse.redirect(new URL("/home", request.url));
  // if you're not loggedin you should not visit these pages
  if (!session && requireLogintoVisit)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  // if you're not an admin and want to visit these paths you can't
  if (session?.role !== "ADMIN" && adminPages)
    return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/home/:path*", "/api/auth/signin", "/api/auth/signout"],
};
