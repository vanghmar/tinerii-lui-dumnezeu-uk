import Link from "next/link";
import type { Event } from "@/data/types";
import { getChurch } from "@/data/churches";
import { formatEventDate, formatEventTime, daysUntil } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Card, Eyebrow } from "./ui";

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
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
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
      <Link
        href={localePath(locale, `/evenimente/${event.slug}`)}
        className="inline-block text-sm text-orange-700 hover:text-orange-800 mt-3"
      >
        {locale === "ro" ? "Vezi detalii →" : "View details →"}
      </Link>
    </Card>
  );
}
