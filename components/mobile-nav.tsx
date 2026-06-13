"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, localePath, type Locale } from "@/lib/i18n";
import { LangToggle } from "./lang-toggle";

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? (locale === "ro" ? "Închide meniul" : "Close menu") : locale === "ro" ? "Deschide meniul" : "Open menu"}
        aria-expanded={open}
        className="flex items-center justify-center w-10 h-10 -mr-2 text-stone-700"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className="w-6 h-6" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 top-[61px] z-40 bg-white animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <nav className="mx-auto max-w-5xl px-5 py-4 flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.path}
                href={localePath(locale, item.path)}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-stone-700 border-b border-stone-100 hover:text-orange-700"
              >
                {item.label[locale]}
              </Link>
            ))}
            <div className="pt-5">
              <LangToggle locale={locale} />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
