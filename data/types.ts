import type { Localized } from "@/lib/i18n";

export interface Church {
  id: string;
  name: string;
  city: string;
  address: string;
  pastor: string;
  serviceTimes?: string;
  mapsUrl: string;
  website?: string;
  socials?: { facebook?: string; instagram?: string; youtube?: string };
  description: Localized;
  image?: string;
  images?: string[]; // additional photos shown on the detail page
}

export interface GalleryImage {
  src: string;
  alt: Localized;
  eventSlug?: string;
  /** Set only on the FIRST photo of a section — renders a heading above it */
  section?: Localized;
  // literal true — every published photo requires a conscious consent check
  consentChecked: true;
}

export interface Event {
  slug: string;
  title: Localized;
  hostChurchId: string;
  date: string; // ISO local, e.g. "2026-08-15T17:00"
  venueAddress: string;
  mapsUrl: string;
  preacher?: string;
  theme?: Localized;
  foodAndActivities?: Localized;
  invite?: Localized; // pre-event announcement message
  poster?: string; // flyer image shown before the event
  summary?: Localized;
  gratitude?: Localized; // post-event thank-you note; replaces foodAndActivities on the detail page when set
  photos?: GalleryImage[];
}

export type ResourceCategory = "shorts" | "preaches" | "channels" | "songs";

export interface Resource {
  title: string;
  url: string;
  source: string; // channel / author name
  category: ResourceCategory;
  language?: "en" | "ro"; // for bilingual resources (worship songs); undefined = language-agnostic
  note?: Localized; // optional one-line context on why it's worth watching
}

export interface Organiser {
  name: string;
  role: Localized;
  churchId?: string;
  email?: string;
}
