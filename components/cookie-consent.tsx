"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

export const CONSENT_STORAGE_KEY = "cookie-consent-v1";
export const CONSENT_EVENT = "cookie-consent-changed";

export type ConsentValue = "granted" | "denied";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function setStoredConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

const text = {
  message: {
    ro: "Folosim cookie-uri pentru a înțelege cum este folosit site-ul și pentru a-l îmbunătăți. Poți accepta toate cookie-urile sau doar pe cele strict necesare.",
    en: "We use cookies to understand how the site is used and to improve it. You can accept all cookies or only the strictly necessary ones.",
  },
  acceptAll: { ro: "Accept toate", en: "Accept all" },
  essentialOnly: { ro: "Doar necesare", en: "Essential only" },
} as const;

export function CookieConsent({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(getStoredConsent() === null);
  }, []);

  // Reserve space at the bottom of the page equal to the banner's height so
  // scrolled content stops before it, instead of the fixed banner covering
  // (and swallowing clicks on) whatever happens to be at the bottom.
  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }
    function updatePadding() {
      if (bannerRef.current) {
        document.body.style.paddingBottom = `${bannerRef.current.offsetHeight}px`;
      }
    }
    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updatePadding);
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible) return null;

  function choose(value: ConsentValue) {
    setStoredConsent(value);
    setVisible(false);
  }

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-live="polite"
      aria-label={locale === "ro" ? "Consimțământ cookie-uri" : "Cookie consent"}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/70 bg-white/95 backdrop-blur px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone-600">{text.message[locale]}</p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="inline-flex items-center justify-center rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition-all duration-200 ease-out hover:bg-stone-50"
          >
            {text.essentialOnly[locale]}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-2.5 text-sm font-medium text-orange-50 transition-all duration-200 ease-out hover:bg-orange-700 hover:scale-105 hover:shadow-lg"
          >
            {text.acceptAll[locale]}
          </button>
        </div>
      </div>
    </div>
  );
}
