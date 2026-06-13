export type Locale = "ro" | "en";

export interface Localized {
  ro: string;
  en: string;
}

export function t(text: Localized, locale: Locale): string {
  return text[locale];
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "ro" ? clean : `/en${clean === "/" ? "" : clean}`;
}

export const nav = [
  { path: "/", label: { ro: "Acasă", en: "Home" } },
  { path: "/despre", label: { ro: "Despre noi", en: "About" } },
  { path: "/evenimente", label: { ro: "Evenimente", en: "Events" } },
  { path: "/biserici", label: { ro: "Bisericile", en: "Churches" } },
  { path: "/galerie", label: { ro: "Galerie", en: "Gallery" } },
  { path: "/alatura-te", label: { ro: "Alătură-te", en: "Join us" } },
] as const;
