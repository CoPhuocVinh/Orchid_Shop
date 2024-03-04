import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // console.log(isAuthRoute)
  // console.log(isPublicRoute);
  // console.log(nextUrl.pathname)

  // console.log(isLoggedIn)


  // if (isApiAuthRoute) {
  //   return NextResponse.next();
  // }

  // if ( !isLoggedIn) {

  //   return NextResponse.redirect(new URL("/singin", nextUrl));

  // }

  // if (!isPublicRoute && !isLoggedIn) {
  //   let callBackUrl = nextUrl.pathname;
  //   if (nextUrl.search) {
  //     callBackUrl += nextUrl.search;
  //   }

  //   const encodedCallbackUrl = encodeURIComponent(callBackUrl);
  //   return Response.redirect(
  //     new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
  //   );
  // }

  // return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
