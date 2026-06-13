import type { Church } from "@/data/types";
import { events } from "@/data/events";
import { formatEventDate } from "@/lib/events";
import { t, type Locale } from "@/lib/i18n";
import { Card } from "./ui";

export function ChurchCard({ church, locale }: { church: Church; locale: Locale }) {
  const hosted = events
    .filter((e) => e.hostChurchId === church.id && new Date(e.date) < new Date())
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Card>
      <h3 className="font-serif text-xl text-stone-800">{church.name}</h3>
      <p className="text-sm text-orange-700">{church.city}</p>
      <p className="text-sm text-stone-600 mt-2">{t(church.description, locale)}</p>
      <dl className="mt-3 space-y-1 text-sm text-stone-500">
        <div>
          <dt className="inline font-medium text-stone-600">
            {locale === "ro" ? "Pastor: " : "Pastor: "}
          </dt>
          <dd className="inline">{church.pastor}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-stone-600">
            {locale === "ro" ? "Adresă: " : "Address: "}
          </dt>
          <dd className="inline">{church.address}</dd>
        </div>
        {church.serviceTimes && (
          <div>
            <dt className="inline font-medium text-stone-600">
              {locale === "ro" ? "Program: " : "Services: "}
            </dt>
            <dd className="inline">{church.serviceTimes}</dd>
          </div>
        )}
      </dl>
      {hosted.length > 0 && (
        <p className="text-xs text-stone-400 mt-3">
          {locale === "ro" ? "A găzduit întâlnirea din " : "Hosted the gathering of "}
          {formatEventDate(hosted[0].date, locale)}
        </p>
      )}
      <div className="flex gap-4 mt-3 text-sm">
        <a
          href={church.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-700 hover:text-orange-800"
        >
          Google Maps ↗
        </a>
        {church.website && (
          <a
            href={church.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-700 hover:text-orange-800"
          >
            Website ↗
          </a>
        )}
      </div>
    </Card>
  );
}
