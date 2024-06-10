import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { configRoutes } from "./config/routes";
import { createRouteMatchers } from "./lib/route";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } =
    createRouteMatchers(configRoutes, req);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log(`Public: ${isPublicRoute}`);
  console.log(`Protected: ${isProtectedRoute}`);
  console.log(`Api: ${isApiRoute}`);
  console.log(`Auth: ${isAuthRoute}`);
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // console.log(`Middleware: ${req.nextUrl.pathname}`);
});

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
