import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getChurch } from "@/data/churches";
import { events } from "@/data/events";
import { formatEventDate } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { MapPinIcon } from "@/components/icons";

const copy = {
  back: { ro: "← Toate bisericile", en: "← All churches" },
  pastor: { ro: "Pastor", en: "Pastor" },
  address: { ro: "Adresă", en: "Address" },
  serviceTimes: { ro: "Program", en: "Services" },
  mapsLink: { ro: "Vezi pe hartă ↗", en: "View on map ↗" },
  website: { ro: "Website ↗", en: "Website ↗" },
  instagram: { ro: "Instagram ↗", en: "Instagram ↗" },
  youtube: { ro: "YouTube ↗", en: "YouTube ↗" },
  socials: { ro: "Rețele sociale", en: "Socials" },
  hostedTitle: { ro: "Întâlniri găzduite", en: "Gatherings hosted" },
  photos: { ro: "Fotografii", en: "Photos" },
  noPhotos: {
    ro: "Fotografii vor fi adăugate în curând.",
    en: "Photos will be added soon.",
  },
};

export function ChurchDetailPage({ id, locale }: { id: string; locale: Locale }) {
  const church = getChurch(id);
  if (!church) notFound();

  const hosted = events
    .filter((e) => e.hostChurchId === church.id && new Date(e.date) < new Date())
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SectionBand tint>
        <Link
          href={localePath(locale, "/biserici")}
          className="text-sm text-orange-700 hover:text-orange-800"
        >
          {t(copy.back, locale)}
        </Link>
        <div className="flex items-start gap-4 mt-4">
          <div className="flex-1">
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-800">{church.name}</h1>
            <p className="flex items-center gap-1.5 text-orange-700 mt-2">
              <MapPinIcon className="w-4 h-4 shrink-0" />
              {church.city}
            </p>
          </div>
        </div>
      </SectionBand>

      <SectionBand>
        <div className="grid sm:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* Details column */}
          <div>
            <p className="text-stone-600 leading-relaxed">{t(church.description, locale)}</p>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-medium text-stone-700">{t(copy.pastor, locale)}</dt>
                <dd className="text-stone-500 mt-0.5">{church.pastor}</dd>
              </div>
              <div>
                <dt className="font-medium text-stone-700">{t(copy.address, locale)}</dt>
                <dd className="text-stone-500 mt-0.5">{church.address}</dd>
              </div>
              {church.serviceTimes && (
                <div>
                  <dt className="font-medium text-stone-700">{t(copy.serviceTimes, locale)}</dt>
                  <dd className="text-stone-500 mt-0.5">{church.serviceTimes}</dd>
                </div>
              )}
            </dl>

            <div className="flex flex-wrap gap-4 mt-6 text-sm">
              <a
                href={church.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-700 hover:text-orange-800 transition-colors"
              >
                {t(copy.mapsLink, locale)}
              </a>
              {church.website && (
                <a
                  href={church.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-700 hover:text-orange-800 transition-colors"
                >
                  {t(copy.website, locale)}
                </a>
              )}
            </div>

            {(church.socials?.instagram || church.socials?.youtube) && (
              <div className="mt-6">
                <Eyebrow muted>{t(copy.socials, locale)}</Eyebrow>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  {church.socials.instagram && (
                    <a
                      href={church.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-700 hover:text-orange-800 transition-colors"
                    >
                      {t(copy.instagram, locale)}
                    </a>
                  )}
                  {church.socials.youtube && (
                    <a
                      href={church.socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-700 hover:text-orange-800 transition-colors"
                    >
                      {t(copy.youtube, locale)}
                    </a>
                  )}
                </div>
              </div>
            )}

            {hosted.length > 0 && (
              <div className="mt-8">
                <Eyebrow muted>{t(copy.hostedTitle, locale)}</Eyebrow>
                <ul className="mt-2 space-y-1">
                  {hosted.map((e) => (
                    <li key={e.slug}>
                      <Link
                        href={localePath(locale, `/evenimente/${e.slug}`)}
                        className="text-sm text-orange-700 hover:text-orange-800 link-underline"
                      >
                        {formatEventDate(e.date, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Primary photo */}
          {church.image && (
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image
                src={church.image}
                alt={church.name}
                width={640}
                height={420}
                sizes="(max-width: 640px) 100vw, 640px"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        {/* Additional photos */}
        {church.images && church.images.length > 0 && (
          <div className="mt-12">
            <Eyebrow muted>{t(copy.photos, locale)}</Eyebrow>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {church.images.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-sm aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`${church.name} – ${i + 1}`}
                    width={480}
                    height={360}
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionBand>
    </>
  );
}
