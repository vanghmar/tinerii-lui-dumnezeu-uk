import type { Church, Event } from "@/data/types";
import { getChurch } from "@/data/churches";
import { t, type Locale } from "@/lib/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/hero-youth-meeting.jpg`,
    sameAs: [] as string[],
  };
}

export function eventJsonLd(event: Event, locale: Locale) {
  const church = getChurch(event.hostChurchId);
  const startDate = new Date(event.date).toISOString();
  const path = locale === "ro" ? `/evenimente/${event.slug}` : `/en/evenimente/${event.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: t(event.title, locale),
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: `${SITE_URL}${path}`,
    description: event.theme ? t(event.theme, locale) : t(event.title, locale),
    image: event.poster ? [`${SITE_URL}${event.poster}`] : undefined,
    location: {
      "@type": "Place",
      name: church?.name ?? t(event.title, locale),
      address: event.venueAddress,
    },
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    performer: event.preacher ? { "@type": "Person", name: event.preacher } : undefined,
  };
}

export function churchJsonLd(church: Church, locale: Locale) {
  const path = locale === "ro" ? `/biserici/${church.id}` : `/en/biserici/${church.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: church.name,
    url: `${SITE_URL}${path}`,
    description: t(church.description, locale),
    address: {
      "@type": "PostalAddress",
      streetAddress: church.address,
      addressLocality: church.city,
      addressCountry: "GB",
    },
    image: church.image ? `${SITE_URL}${church.image}` : undefined,
    ...(church.website ? { sameAs: [church.website] } : {}),
  };
}
