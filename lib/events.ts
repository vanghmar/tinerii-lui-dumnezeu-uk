import { events } from "@/data/events";
import { gallery } from "@/data/gallery";
import type { Event, GalleryImage } from "@/data/types";

function now(): Date {
  return new Date();
}

export function getUpcomingEvents(): Event[] {
  return events
    .filter((e) => new Date(e.date) >= now())
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(): Event[] {
  return events
    .filter((e) => new Date(e.date) < now())
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNextEvent(): Event | undefined {
  return getUpcomingEvents()[0];
}

export function getEvent(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventPhotos(slug: string): GalleryImage[] {
  return gallery.filter((img) => img.eventSlug === slug);
}

export function formatEventDate(date: string, locale: "ro" | "en"): string {
  return new Date(date).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatEventTime(date: string): string {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// The gatherings always run the same 8-hour programme, doors to close.
const PROGRAMME_LENGTH_HOURS = 8;

export function formatEventTimeRange(date: string): string {
  const start = new Date(date);
  const end = new Date(start.getTime() + PROGRAMME_LENGTH_HOURS * 3600_000);
  return `${formatEventTime(start.toISOString())} – ${formatEventTime(end.toISOString())}`;
}

// Whole calendar days remaining, counted at UTC midnight boundaries — so the
// count ticks over exactly once a day regardless of the event's own time of
// day (e.g. an 11:00 event is still "1 day away" all the way until midnight).
export function daysUntil(date: string): number {
  const target = new Date(date);
  const current = now();
  const startOfTarget = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const startOfCurrent = Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate());
  return Math.round((startOfTarget - startOfCurrent) / 86400000);
}

export function isEventToday(date: string): boolean {
  const d = new Date(date);
  const n = now();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
}
