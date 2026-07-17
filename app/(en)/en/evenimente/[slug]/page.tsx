import type { Metadata } from "next";
import { EventDetailPage } from "@/components/pages/event-detail";
import { events } from "@/data/events";
import { getEvent, formatEventDate } from "@/lib/events";
import { getChurch } from "@/data/churches";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};

  const church = getChurch(event.hostChurchId);
  const title = t(event.title, "en");
  const description = event.theme
    ? t(event.theme, "en")
    : `${formatEventDate(event.date, "en")}${church ? ` at ${church.name}, ${church.city}` : ""}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/evenimente/${slug}`,
      languages: { ro: `/evenimente/${slug}`, en: `/en/evenimente/${slug}` },
    },
    openGraph: event.poster ? { images: [{ url: event.poster, width: 800, height: 1000, alt: title }] } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetailPage slug={slug} locale="en" />;
}
