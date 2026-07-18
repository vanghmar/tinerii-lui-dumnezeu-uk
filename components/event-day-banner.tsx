"use client";

import { useEffect, useState } from "react";
import { getChurch } from "@/data/churches";
import { getNextEvent, formatEventTime, isEventToday } from "@/lib/events";
import { t, type Locale } from "@/lib/i18n";

const text = {
  title: {
    ro: "Astăzi este ziua întâlnirii! Vă așteptăm cu drag",
    en: "Today is the day! We can't wait to see you",
  },
  directions: { ro: "Indicații", en: "Directions" },
  dismiss: { ro: "Închide", en: "Dismiss" },
} as const;

export function EventDayBanner({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(true);
  const next = getNextEvent();

  useEffect(() => {
    if (!next) return;
    const key = `event-day-banner-${next.slug}`;
    setDismissed(sessionStorage.getItem(key) === "1");
  }, [next]);

  if (!next || !isEventToday(next.date) || dismissed) return null;

  const church = getChurch(next.hostChurchId);

  function close() {
    if (next) sessionStorage.setItem(`event-day-banner-${next.slug}`, "1");
    setDismissed(true);
  }

  return (
    <div className="relative z-[60] bg-gradient-to-r from-orange-600 to-orange-700 text-orange-50">
      <div className="mx-auto max-w-5xl px-5 py-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <p className="text-sm font-medium">
          🎉 {t(text.title, locale)}
          {church
            ? locale === "ro"
              ? ` la ${church.name}, ${church.city}`
              : ` at ${church.name}, ${church.city}`
            : ""}
          {" · "}
          {formatEventTime(next.date)}
        </p>
        <a
          href={next.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium hover:bg-white/25 transition-colors duration-200"
        >
          {t(text.directions, locale)}
        </a>
        <button
          type="button"
          onClick={close}
          aria-label={t(text.dismiss, locale)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-100/80 hover:text-white text-lg leading-none px-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}
