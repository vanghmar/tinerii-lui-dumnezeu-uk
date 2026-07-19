"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { GlobeIcon, CheckIcon, ChevronIcon } from "@/components/icons";

const LANG_LABELS: Record<Locale, string> = {
  en: "English",
  ro: "Română",
};

function setLangCookie(lang: Locale) {
  document.cookie = `lang=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export function LangToggle({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() ?? "/";
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [open]);

  function switchTo(next: Locale) {
    setLangCookie(next);
    const target =
      next === "ro"
        ? pathname.replace(/^\/en/, "") || "/"
        : `/en${pathname === "/" ? "" : pathname}`;
    setOpen(false);
    router.push(target);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-500 hover:border-orange-300 hover:text-orange-700 transition-colors"
      >
        <GlobeIcon className="w-3.5 h-3.5" />
        {LANG_LABELS[locale]}
        <ChevronIcon className={`w-3 h-3 transition-transform ${open ? "rotate-90" : "-rotate-90"}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute right-0 mt-1.5 w-36 rounded-lg border border-stone-200 bg-white shadow-md py-1 z-50"
        >
          {(["en", "ro"] as Locale[]).map((lang) => (
            <button
              key={lang}
              role="option"
              aria-selected={locale === lang}
              onClick={() => switchTo(lang)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-stone-50 transition-colors ${
                locale === lang ? "text-orange-700 font-medium" : "text-stone-700"
              }`}
            >
              {LANG_LABELS[lang]}
              {locale === lang && <CheckIcon className="w-3.5 h-3.5 text-orange-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
