import type { Event } from "./types";

// Dates and churches confirmed from official update message (year 5 of the movement).
// Addresses, preachers, summaries — to be filled in as they happen.
export const events: Event[] = [
  // ── Upcoming ──────────────────────────────────────────────────────────────

  {
    slug: "2026-07-birmingham",
    title: { ro: "Întâlnirea tinerilor — Birmingham", en: "Youth gathering — Birmingham" },
    hostChurchId: "connected-life-birmingham",
    date: "2026-07-18T17:00",
    venueAddress: "Biserica Connected Life, Birmingham (adresa va fi confirmată)",
    mapsUrl: "https://maps.google.com/?q=Connected+Life+Church+Birmingham",
    preacher: "Va fi anunțat",
    theme: { ro: "Tema va fi anunțată", en: "Theme to be announced" },
    foodAndActivities: {
      ro: "Masă împreună, jocuri și timp de părtășie înainte de programul de închinare.",
      en: "Shared meal, games and fellowship time before the worship programme.",
    },
  },
  {
    slug: "2026-09-ipswich",
    title: { ro: "Întâlnirea tinerilor — Ipswich", en: "Youth gathering — Ipswich" },
    hostChurchId: "ekklesia-ipswich",
    date: "2026-09-26T17:00",
    venueAddress: "Biserica Ekklesia, Ipswich (adresa va fi confirmată)",
    mapsUrl: "https://maps.google.com/?q=Ipswich",
    preacher: "Va fi anunțat",
    theme: { ro: "Tema va fi anunțată", en: "Theme to be announced" },
    foodAndActivities: {
      ro: "Masă împreună, jocuri și timp de părtășie înainte de programul de închinare.",
      en: "Shared meal, games and fellowship time before the worship programme.",
    },
  },

  // ── Past ──────────────────────────────────────────────────────────────────

  {
    slug: "2026-05-london",
    title: { ro: "Întâlnirea tinerilor — Londra", en: "Youth gathering — London" },
    hostChurchId: "hristos-leyton-london",
    date: "2026-05-09T17:00",
    venueAddress: "Biserica lui Hristos din Leyton, Londra",
    mapsUrl: "https://maps.google.com/?q=Leyton,London",
    summary: {
      ro: "Tinerii s-au adunat la Londra pentru o zi plină de părtășie, jocuri și închinare.",
      en: "The young people gathered in London for a day full of fellowship, games and worship.",
    },
  },
  {
    slug: "2026-03-hemel-hempstead",
    title: { ro: "Întâlnirea tinerilor — Hemel Hempstead", en: "Youth gathering — Hemel Hempstead" },
    hostChurchId: "maranata-hemel-hempstead",
    date: "2026-03-14T17:00",
    venueAddress: "Biserica Maranata, Hemel Hempstead",
    mapsUrl: "https://maps.google.com/?q=Hemel+Hempstead",
    summary: {
      ro: "O întâlnire binecuvântată la Hemel Hempstead, cu cântări de laudă și un mesaj din Cuvântul lui Dumnezeu.",
      en: "A blessed gathering in Hemel Hempstead, with songs of praise and a message from God's Word.",
    },
  },
  {
    slug: "2026-01-birmingham",
    title: { ro: "Întâlnirea tinerilor — Birmingham", en: "Youth gathering — Birmingham" },
    hostChurchId: "connected-life-birmingham",
    date: "2026-01-10T17:00",
    venueAddress: "Biserica Connected Life, Birmingham",
    mapsUrl: "https://maps.google.com/?q=Connected+Life+Church+Birmingham",
    summary: {
      ro: "Tinerii s-au adunat la Birmingham pentru a începe noul an împreună în Hristos.",
      en: "The young people gathered in Birmingham to start the new year together in Christ.",
    },
  },
  {
    slug: "2025-11-high-wycombe",
    title: { ro: "Întâlnirea tinerilor — High Wycombe", en: "Youth gathering — High Wycombe" },
    hostChurchId: "viata-noua-high-wycombe",
    date: "2025-11-08T17:00",
    venueAddress: "Biserica Viața Nouă, High Wycombe",
    mapsUrl: "https://maps.google.com/?q=High+Wycombe",
    summary: {
      ro: "Prima întâlnire a anului 5 al mișcării, o seară de părtășie și închinare la High Wycombe.",
      en: "The first gathering of the movement's 5th year, an evening of fellowship and worship in High Wycombe.",
    },
  },
];
