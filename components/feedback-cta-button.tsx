"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, getStoredConsent } from "./cookie-consent";

export function FeedbackCtaButton() {
  const pathname = usePathname();
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    setCookieBannerVisible(getStoredConsent() === null);
    function handleConsentChange() {
      setCookieBannerVisible(getStoredConsent() === null);
    }
    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  }, []);

  if (pathname === "/en/feedback" || cookieBannerVisible) return null;

  return (
    <Link
      href="/en/feedback"
      className="fixed bottom-6 right-6 z-30 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-orange-600 text-orange-50 shadow-lg hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-out"
    >
      Share Feedback
    </Link>
  );
}
