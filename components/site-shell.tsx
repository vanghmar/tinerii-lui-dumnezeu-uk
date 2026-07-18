import Link from "next/link";
import type { ReactNode } from "react";
import { nav, localePath, type Locale } from "@/lib/i18n";
import { LangToggle } from "./lang-toggle";
import { MobileNav } from "./mobile-nav";
import { CookieConsent } from "./cookie-consent";
import { Analytics } from "./analytics";
import { EventDayBanner } from "./event-day-banner";

function Header({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-stone-200/70 bg-white relative z-50">
      <div className="mx-auto max-w-5xl px-5 py-4 flex items-center gap-x-6">
        <Link href={localePath(locale, "/")} className="mr-auto">
          <span className="font-serif text-lg text-stone-800 leading-tight">
            Tinerii lui Dumnezeu{" "}
            <span className="text-orange-700">UK</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-x-5 text-sm text-stone-600">
          {nav.map((item) => (
            <Link
              key={item.path}
              href={localePath(locale, item.path)}
              className="hover:text-orange-700"
            >
              {item.label[locale]}
            </Link>
          ))}
          <LangToggle locale={locale} />
        </nav>
        <MobileNav locale={locale} />
      </div>
    </header>
  );
}

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-stone-200/70 bg-white mt-auto">
      <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-stone-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} Tinerii lui Dumnezeu UK ·{" "}
          {locale === "ro"
            ? "„Iată ce plăcut și ce dulce este să locuiască frații împreună!” — Psalmul 133:1"
            : "“How good and pleasant it is when God's people live together in unity!” — Psalm 133:1"}
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <EventDayBanner locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CookieConsent locale={locale} />
      <Analytics />
    </div>
  );
}
