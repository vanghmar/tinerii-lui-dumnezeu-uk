import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const lang = request.cookies.get("lang")?.value;

  // Saved preference is Romanian — let through to the RO route
  if (lang === "ro") return NextResponse.next();

  // No preference or preference is English → redirect to /en equivalent
  const { pathname } = request.nextUrl;
  const enPath = pathname === "/" ? "/en" : `/en${pathname}`;
  return NextResponse.redirect(new URL(enPath, request.url));
}

export const config = {
  matcher: [
    // Run only on Romanian routes — skip /en/*, /api/*, /_next/*, and static files
    "/((?!en|api|_next|favicon\\.ico|.*\\.).*)",
  ],
};
