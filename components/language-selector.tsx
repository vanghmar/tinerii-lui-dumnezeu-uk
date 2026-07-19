"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { localePath, saveLocalePreference, type Locale } from "@/lib/i18n";
import { GlobeIcon, ChevronDownIcon } from "./icons";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ro", label: "Română" },
];

export function LanguageSelector({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(next: Locale) {
    setOpen(false);
    if (next === locale) return;

    saveLocalePreference(next);

    const bare = locale === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
    router.push(localePath(next, bare));
  }

  const current = LOCALES.find((l) => l.value === locale)!;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:border-orange-300 hover:text-orange-700 transition-colors duration-200"
      >
        <GlobeIcon className="w-3.5 h-3.5" />
        {current.label}
        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[9rem] rounded-xl border border-stone-200/70 bg-white py-1.5 shadow-lg z-50"
        >
          {LOCALES.map((l) => (
            <li key={l.value} role="option" aria-selected={l.value === locale}>
              <button
                type="button"
                onClick={() => select(l.value)}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2 text-sm text-left transition-colors duration-150 ${
                  l.value === locale ? "text-orange-700 font-medium" : "text-stone-600 hover:bg-stone-50"
                }`}
              >
                {l.label}
                {l.value === locale && <span aria-hidden>✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
