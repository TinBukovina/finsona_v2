import { auth } from "@/../auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  console.log("RUTA:", req.nextUrl.pathname);
  console.log("PRIJAVLJEN:", isLoggedIn);

  const isProtectedRoute = req.nextUrl.pathname.startsWith("/app");

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/app/:path*"],
};
