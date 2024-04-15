import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSessions";
import { pathnames, locales, localePrefix } from "./config";

import createMiddleware from "next-intl/middleware";


//middleware for multi languages <ar-en>
 const NextIntlMiddleware = createMiddleware({
   locales,
   pathnames,
   localePrefix,
   defaultLocale: "ar",
 });

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
  const isSuperAdminRoute = authRoutesSuperAdmin.some((route) =>
    req.nextUrl.pathname.endsWith(route)
  );
    const isAssociationRoute = authRoutesAssociation.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );
//get session <data user auth>
  const session = await getSession();

    if (!session?.token && (isAuthRoute || isVerifyRoute)) {
      const redirectUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  if (session?.token) {
 

if (session.role === 2 &&  isSuperAdminRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
}


if (session.role === 1 && isAssociationRoute) {
  return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
}

  if (isGuestRoute || isVerifyRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
  }
  return NextIntlMiddleware(req);

}

const authRoutes = ["/dashboard"];
const authRoutesSuperAdmin = [
  "/(ar|fr)dashboard/illnesses",
  "/(ar|fr)dashboard/illnesses/*",
  "/(ar|fr)dashboard/associations/*",
];
const authRoutesAssociation = ["/(ar|fr)dashboard/patients"];
const verifyRoutes = [
  "/(ar|fr)/request-email-verification",
  "/(ar|fr)/verify-email",
];
const guestRoutes = [
  "/(ar|fr)/forgot-password",
  "/(ar|fr)/login",
  "/login",
  "/(ar|fr)/password-reset",
  "/(ar|fr)/register",
];



 export const config = {
   // Match only internationalized pathnames
   matcher: "/((?!api|static|.*\\..*|_next).*)",
 };
