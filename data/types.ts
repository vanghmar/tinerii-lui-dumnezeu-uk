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
  summary?: Localized;
  photos?: GalleryImage[];
}

export interface Organiser {
  name: string;
  role: Localized;
  churchId?: string;
  email?: string;
}
