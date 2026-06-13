import Link from "next/link";
import type { ReactNode } from "react";
import { nav, localePath, type Locale } from "@/lib/i18n";
import { LangToggle } from "./lang-toggle";

function Header({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-stone-200/70 bg-white">
      <div className="mx-auto max-w-5xl px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={localePath(locale, "/")} className="mr-auto">
          <span className="font-serif text-lg text-stone-800 leading-tight">
            Tinerii lui Dumnezeu{" "}
            <span className="text-orange-700">UK</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stone-600">
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
        <p className="text-xs text-stone-400">
          {locale === "ro" ? "Site realizat de" : "Site built by"} Marian V.
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
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
