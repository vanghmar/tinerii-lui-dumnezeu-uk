import type { MetadataRoute } from "next";
import { events } from "@/data/events";

const BASE = "https://tineriiluidumnezeu.uk"; // update once the real domain is bought

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/despre", "/biserici", "/evenimente", "/galerie", "/alatura-te"];
  const eventPaths = events.map((e) => `/evenimente/${e.slug}`);
  return [...paths, ...eventPaths].flatMap((p) => [
    { url: `${BASE}${p || "/"}` },
    { url: `${BASE}/en${p}` },
  ]);
}
