export type Locale = "ro" | "en";

export interface Localized {
  ro: string;
  en: string;
}

export const LOCALE_COOKIE = "locale";

export function t(text: Localized, locale: Locale): string {
  return text[locale];
}

export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "ro" ? clean : `/en${clean === "/" ? "" : clean}`;
}

/** Given any pathname (RO or EN), returns which locale it belongs to. */
export function localeOfPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ro";
}

/** Given any pathname (RO or EN), returns the equivalent path in the other locale. */
export function swapLocalePath(pathname: string): string {
  const current = localeOfPath(pathname);
  const bare = current === "en" ? pathname.replace(/^\/en/, "") || "/" : pathname;
  return localePath(current === "en" ? "ro" : "en", bare);
}

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Persists the visitor's chosen locale so future visits (and the proxy) honor it. */
export function saveLocalePreference(locale: Locale): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // localStorage can throw in private-browsing contexts — the cookie is the source of truth anyway.
  }
}

export const nav = [
  { path: "/", label: { ro: "Acasă", en: "Home" } },
  { path: "/despre", label: { ro: "Despre noi", en: "About" } },
  { path: "/evenimente", label: { ro: "Evenimente", en: "Events" } },
  { path: "/biserici", label: { ro: "Bisericile", en: "Churches" } },
  { path: "/galerie", label: { ro: "Galerie", en: "Gallery" } },
  { path: "/resurse", label: { ro: "Resurse", en: "Resources" } },
  { path: "/alatura-te", label: { ro: "Alătură-te", en: "Join us" } },
] as const;
