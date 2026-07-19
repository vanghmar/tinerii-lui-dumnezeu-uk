import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, localeOfPath, localePath, type Locale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathLocale = localeOfPath(pathname);

  const cookieValue = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred: Locale = cookieValue === "ro" || cookieValue === "en" ? cookieValue : "en";

  if (preferred === pathLocale) {
    return NextResponse.next();
  }

  const bare = pathLocale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
  const url = request.nextUrl.clone();
  url.pathname = localePath(preferred, bare);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
