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

export function daysUntil(date: string): number {
  const ms = new Date(date).getTime() - now().getTime();
  return Math.ceil(ms / 86400000);
}
