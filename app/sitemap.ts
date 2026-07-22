import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { churches } from "@/data/churches";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/despre", "/biserici", "/evenimente", "/galerie", "/resurse", "/alatura-te"];
  const eventPaths = events.map((e) => `/evenimente/${e.slug}`);
  const churchPaths = churches.map((c) => `/biserici/${c.id}`);
  const now = new Date();
  return [
    ...[...paths, ...eventPaths, ...churchPaths].flatMap((p) => [
      { url: `${SITE_URL}${p || "/"}`, lastModified: now },
      { url: `${SITE_URL}/en${p}`, lastModified: now },
    ]),
    { url: `${SITE_URL}/en/feedback`, lastModified: now },
  ];
}
