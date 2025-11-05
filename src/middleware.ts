import { auth } from "@/../auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (req.headers.get("Accept") == "text/x-component") {
    return NextResponse.next();
  }

  const isServerAction = req.headers.get("next-action");

  if (isServerAction) {
    return NextResponse.next();
  }

  const isLoggedIn = !!req.auth;

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/app");

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/app/:path*"],
};
