import Link from "next/link";
import type { Event } from "@/data/types";
import { getChurch } from "@/data/churches";
import { formatEventDate, formatEventTime, daysUntil } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Card, Eyebrow } from "./ui";
import { CalendarIcon, ArrowRightIcon } from "./icons";

export function EventCard({
  event,
  locale,
  highlight = false,
  eyebrow,
}: {
  event: Event;
  locale: Locale;
  highlight?: boolean;
  eyebrow?: string;
}) {
  const church = getChurch(event.hostChurchId);
  const days = daysUntil(event.date);
  const upcoming = new Date(event.date) >= new Date();

  return (
    <Card highlight={highlight}>
      <div className="flex items-start justify-between gap-3">
        <div>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}</div>
        <CalendarIcon className="w-5 h-5 text-orange-400 shrink-0" />
      </div>
      <h3 className="font-serif text-xl text-stone-800 mt-1.5">{t(event.title, locale)}</h3>
      <p className="text-sm text-stone-500 mt-1 capitalize">
        {formatEventDate(event.date, locale)} · {formatEventTime(event.date)}
      </p>
      {church && (
        <p className="text-sm text-stone-500">
          {church.name}, {church.city}
        </p>
      )}
      {upcoming && days >= 0 && (
        <p className="text-sm text-orange-700 mt-2">
          {locale === "ro"
            ? days === 0
              ? "Astăzi!"
              : `În ${days} ${days === 1 ? "zi" : "zile"}`
            : days === 0
              ? "Today!"
              : `In ${days} ${days === 1 ? "day" : "days"}`}
        </p>
      )}
      {!upcoming && event.summary && (
        <p className="text-sm text-stone-600 mt-2 line-clamp-2">{t(event.summary, locale)}</p>
      )}
      {highlight && event.theme && (
        <div className="mt-3 pt-3 border-t border-stone-100">
          <p className="text-xs uppercase tracking-wide text-stone-400">
            {locale === "ro" ? "Tema" : "Theme"}
          </p>
          <p className="text-sm text-stone-600 mt-1 line-clamp-2">{t(event.theme, locale)}</p>
        </div>
      )}
      <Link
        href={localePath(locale, `/evenimente/${event.slug}`)}
        className="group inline-flex items-center gap-1.5 text-sm text-orange-700 hover:text-orange-800 mt-3"
      >
        {locale === "ro" ? "Vezi detalii" : "View details"}
        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </Card>
  );
}
