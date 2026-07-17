import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChurch } from "@/data/churches";
import { getEvent, getEventPhotos, formatEventDate, formatEventTimeRange, daysUntil } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { GalleryGrid } from "@/components/gallery-grid";

const copy = {
  back: { ro: "← Toate evenimentele", en: "← All events" },
  host: { ro: "Biserica gazdă", en: "Host church" },
  when: { ro: "Data și ora", en: "Date and time" },
  where: { ro: "Locația", en: "Location" },
  preacher: { ro: "Predicator", en: "Preacher" },
  theme: { ro: "Tema", en: "Theme" },
  food: { ro: "Mâncare și activități", en: "Food and activities" },
  invite: { ro: "Vă așteptăm!", en: "We can't wait to see you!" },
  summary: { ro: "Cum a fost", en: "How it was" },
  photos: { ro: "Fotografii", en: "Photos" },
  inDays: { ro: "zile rămase", en: "days to go" },
};

export function EventDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const event = getEvent(slug);
  if (!event) notFound();

  const church = getChurch(event.hostChurchId);
  const upcoming = new Date(event.date) >= new Date();
  const days = daysUntil(event.date);
  const photos = getEventPhotos(event.slug);

  return (
    <>
      <SectionBand tint>
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          <div className="flex-1">
            <Link
              href={localePath(locale, "/evenimente")}
              className="text-sm text-orange-700 hover:text-orange-800"
            >
              {t(copy.back, locale)}
            </Link>
            <h1 className="font-serif text-4xl text-stone-800 mt-4">{t(event.title, locale)}</h1>
            <p className="text-stone-500 mt-2 capitalize">
              {formatEventDate(event.date, locale)} · {formatEventTimeRange(event.date)}
            </p>
            {upcoming && days > 0 && (
              <p className="text-orange-700 mt-1">
                {days} {t(copy.inDays, locale)}
              </p>
            )}
          </div>
          {event.poster && (
            <div className="relative w-56 h-72 shrink-0 rounded-2xl overflow-hidden shadow-md -rotate-2 mx-auto sm:mx-0">
              <Image
                src={event.poster}
                alt={t(event.title, locale)}
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
          )}
        </div>
      </SectionBand>
      <SectionBand>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
          {church && (
            <div>
              <dt><Eyebrow muted>{t(copy.host, locale)}</Eyebrow></dt>
              <dd className="text-stone-700 mt-1">
                {church.name}, {church.city}
              </dd>
            </div>
          )}
          <div>
            <dt><Eyebrow muted>{t(copy.where, locale)}</Eyebrow></dt>
            <dd className="text-stone-700 mt-1">
              {event.venueAddress}
              <br />
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-700 hover:text-orange-800"
              >
                Google Maps ↗
              </a>
            </dd>
          </div>
          {event.preacher && (
            <div>
              <dt><Eyebrow muted>{t(copy.preacher, locale)}</Eyebrow></dt>
              <dd className="text-stone-700 mt-1">{event.preacher}</dd>
            </div>
          )}
          {event.theme && (
            <div>
              <dt><Eyebrow muted>{t(copy.theme, locale)}</Eyebrow></dt>
              <dd className="text-stone-700 mt-1">{t(event.theme, locale)}</dd>
            </div>
          )}
          {event.foodAndActivities && (
            <div className="sm:col-span-2">
              <dt><Eyebrow muted>{t(copy.food, locale)}</Eyebrow></dt>
              <dd className="text-stone-700 mt-1">{t(event.foodAndActivities, locale)}</dd>
            </div>
          )}
        </dl>
        {event.invite && upcoming && (
          <div className="max-w-2xl mt-10 rounded-2xl bg-orange-50 border border-orange-200/70 p-6">
            <Eyebrow>{t(copy.invite, locale)}</Eyebrow>
            <p className="text-stone-700 leading-relaxed mt-2 whitespace-pre-line">
              {t(event.invite, locale)}
            </p>
          </div>
        )}
        {event.summary && (
          <div className="max-w-2xl mt-10">
            <Eyebrow muted>{t(copy.summary, locale)}</Eyebrow>
            <p className="text-stone-600 leading-relaxed mt-2">{t(event.summary, locale)}</p>
          </div>
        )}
        {photos.length > 0 && (
          <div className="max-w-2xl mt-10">
            <Eyebrow muted>{t(copy.photos, locale)}</Eyebrow>
            <div className="mt-3">
              <GalleryGrid images={photos} locale={locale} />
            </div>
          </div>
        )}
      </SectionBand>
    </>
  );
}
