import { ConfigRoutes } from "@/types/routes";
import { NextRequest, NextResponse } from "next/server";

/**
 * Creates route matchers based on the provided routes configuration and request object.
 * @param {import("@/types/routes").ConfigRoutes} routes - The routes configuration object containing public, protected, auth, and API routes.
 * @param {import("next/server").NextRequest} req - The Next.js request object.
 * @returns {{
 *  isPublicRoute: boolean,
 *  isProtectedRoute: boolean,
 *  isAuthRoute: boolean,
 *  isApiRoute: boolean
 * }} An object containing boolean values indicating whether the current request path matches public, protected, auth, and API routes.
 */
export const createRouteMatchers = (routes: ConfigRoutes, req: NextRequest) => {
  const { publicRoutes, protectedRoutes, authRoutes, apiRoutes } = routes;
  const pathName = req.nextUrl.pathname;

  // Preprocess route collections into sets
  const publicRouteSet = new Set(publicRoutes.flat());
  const protectedRouteSet = new Set(protectedRoutes.flat());
  const authRouteSet = new Set(authRoutes.flat());
  const apiRouteSet = new Set(apiRoutes.flat());

  return {
    isPublicRoute: publicRouteSet.has(pathName),
    isProtectedRoute: protectedRouteSet.has(pathName),
    isAuthRoute: authRouteSet.has(pathName),
    isApiRoute: apiRouteSet.has(pathName),
  };
};
