import Link from "next/link";
import type { Church } from "@/data/types";
import { events } from "@/data/events";
import { formatEventDate } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Card } from "./ui";
import { MapPinIcon } from "./icons";

export function ChurchCard({ church, locale }: { church: Church; locale: Locale }) {
  const hosted = events
    .filter((e) => e.hostChurchId === church.id && new Date(e.date) < new Date())
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Link href={localePath(locale, `/biserici/${church.id}`)} className="block group">
      <Card className="h-full group-hover:border-orange-200">
        <h3 className="font-serif text-xl text-stone-800 group-hover:text-orange-700 transition-colors duration-200">
          {church.name}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-orange-700 mt-0.5">
          <MapPinIcon className="w-4 h-4 shrink-0" />
          {church.city}
        </p>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">{t(church.description, locale)}</p>
        {hosted.length > 0 && (
          <p className="text-xs text-stone-400 mt-3">
            {locale === "ro" ? "A găzduit întâlnirea din " : "Hosted the gathering of "}
            {formatEventDate(hosted[0].date, locale)}
          </p>
        )}
        <p className="text-sm text-orange-600 mt-3 font-medium group-hover:text-orange-700 transition-colors duration-200">
          {locale === "ro" ? "Vezi detalii →" : "View details →"}
        </p>
      </Card>
    </Link>
  );
}
