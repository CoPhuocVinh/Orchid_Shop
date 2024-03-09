import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  dashboardRoute,
  DEFAULT_REDIRECT,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  //change to ADMIN later
  const isAdminRole =
    req.auth?.user.role === "CUSTOMER" || req.auth?.user.role === "STAFF";

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  function hasMatchingPattern(routeUrl: string, routes: string[]) {
    return routes.some((route) => {
      const regex = new RegExp(route);
      return regex.test(routeUrl);
    });
  }

  const isAuthWithRoute = hasMatchingPattern(nextUrl.pathname, dashboardRoute);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isAuthRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  if (isAuthWithRoute && !isAdminRole) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
