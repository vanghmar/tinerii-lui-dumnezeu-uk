import type { Event } from "./types";

// ⚠️ SAMPLE DATA — replace with real events. Status (upcoming/past) is derived from the date.
export const events: Event[] = [
  {
    slug: "2026-08-leeds",
    title: { ro: "Întâlnirea tinerilor — Leeds", en: "Youth gathering — Leeds" },
    hostChurchId: "betel-leeds",
    date: "2026-08-15T17:00",
    venueAddress: "Biserica Betel, Leeds (adresa va fi confirmată)",
    mapsUrl: "https://maps.google.com/?q=Leeds",
    preacher: "Va fi anunțat",
    theme: { ro: "Tema va fi anunțată", en: "Theme to be announced" },
    foodAndActivities: {
      ro: "Cină împreună, jocuri și timp de părtășie înainte de programul de închinare.",
      en: "Dinner together, games and fellowship time before the worship programme.",
    },
  },
  {
    slug: "2026-06-london",
    title: { ro: "Întâlnirea tinerilor — Londra", en: "Youth gathering — London" },
    hostChurchId: "harul-london",
    date: "2026-06-06T17:00",
    venueAddress: "Biserica Harul, Londra",
    mapsUrl: "https://maps.google.com/?q=London",
    preacher: "Va fi confirmat",
    theme: { ro: "Psalmul 133 — frați împreună", en: "Psalm 133 — brothers together" },
    summary: {
      ro: "O seară binecuvântată de părtășie la Londra: mâncare bună, cântări de laudă și un mesaj din Psalmul 133. Mulțumim bisericii gazdă pentru primire!",
      en: "A blessed evening of fellowship in London: good food, songs of praise and a message from Psalm 133. Thank you to the host church for the welcome!",
    },
  },
  {
    slug: "2026-04-birmingham",
    title: { ro: "Întâlnirea tinerilor — Birmingham", en: "Youth gathering — Birmingham" },
    hostChurchId: "emanuel-birmingham",
    date: "2026-04-11T17:00",
    venueAddress: "Biserica Emanuel, Birmingham",
    mapsUrl: "https://maps.google.com/?q=Birmingham",
    summary: {
      ro: "Tinerii s-au adunat la Birmingham pentru o seară de închinare și prietenie.",
      en: "The young people gathered in Birmingham for an evening of worship and friendship.",
    },
  },
];
