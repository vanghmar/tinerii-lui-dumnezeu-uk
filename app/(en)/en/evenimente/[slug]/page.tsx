import { EventDetailPage } from "@/components/pages/event-detail";
import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <EventDetailPage slug={slug} locale="en" />;
}
