import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSessions";

export default async function middleware(req: any) {
  const isIndexpage = req.nextUrl.pathname === "/";
  const isAuthRoute = authRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isVerifyRoute = verifyRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );
  const isGuestRoute = guestRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  const session = await getSession();

  if (session?.token) {
    if (!session?.token && (isAuthRoute || isVerifyRoute)) {
      const redirectUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    if ( isGuestRoute || isVerifyRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }
}

const authRoutes = ["/dashboard"];
const verifyRoutes = ["/request-email-verification", "/verify-email"];
const guestRoutes = [
  "/forgot-password",
  "/login",
  "/password-reset",
  "/register",
];
