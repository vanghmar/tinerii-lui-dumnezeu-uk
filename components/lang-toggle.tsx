"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? "/";
  const target =
    locale === "ro"
      ? `/en${pathname === "/" ? "" : pathname}` || "/en"
      : pathname.replace(/^\/en/, "") || "/";

  return (
    <Link
      href={target}
      className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-500 hover:border-orange-300 hover:text-orange-700"
    >
      {locale === "ro" ? "EN" : "RO"}
    </Link>
  );
}
