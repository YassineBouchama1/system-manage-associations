import { usePathname } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getSessions";
import { pathnames, locales, localePrefix } from "./config";

import createMiddleware from "next-intl/middleware";

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
    if (!session?.token && (isAuthRoute || isVerifyRoute)) {
      const redirectUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  if (session?.token) {
 

    if ( isGuestRoute || isVerifyRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
  }

  return NextIntlMiddleware(req);
}

const authRoutes = ["/(ar|en)/dashboard"];
const verifyRoutes = [
  "/(ar|en)/request-email-verification",
  "/(ar|en)/verify-email",
];
const guestRoutes = [
  "/(ar|en)/forgot-password",
  "*/login",
  "/(ar|en)/password-reset",
  "/(ar|en)/register",
];


 const NextIntlMiddleware = createMiddleware({
   defaultLocale: "ar",
   locales,
   pathnames,
   localePrefix,
 });

 export const config = {
   // Match only internationalized pathnames
   matcher: ["/", "/(ar|en)/:path*"],
 };
