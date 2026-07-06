import type { Church } from "./types";

// ⚠️ Names and cities confirmed from official update message.
// Addresses, pastors, mapsUrl — still to be completed before launch.
export const churches: Church[] = [
  {
    id: "viata-noua-high-wycombe",
    name: "Biserica Viața Nouă",
    city: "High Wycombe",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=High+Wycombe",
    description: {
      ro: "O comunitate română baptistă din High Wycombe, parte a familiei Tinerii lui Dumnezeu UK.",
      en: "A Romanian Baptist community in High Wycombe, part of the Tinerii lui Dumnezeu UK family.",
    },
  },
  {
    id: "connected-life-birmingham",
    name: "Biserica Connected Life",
    city: "Birmingham",
    address: "George Road, Birmingham B23 7RY",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Connected+Life+Church+George+Road+Birmingham+B23+7RY",
    website: "https://connectedlifechurch.co.uk",
    description: {
      ro: "O biserică vie din Birmingham, care găzduiește cu drag întâlnirile tinerilor.",
      en: "A vibrant church in Birmingham, warmly hosting the youth gatherings.",
    },
    image: "/churches/connected-life-birmingham.jpg",
  },
  {
    id: "maranata-hemel-hempstead",
    name: "Biserica Maranata",
    city: "Hemel Hempstead",
    address: "Cemetery Hill, Hemel Hempstead HP1 1JF",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Biserica+Baptista+Maranata+Cemetery+Hill+Hemel+Hempstead+HP1+1JF",
    description: {
      ro: "Comunitate românească baptistă din Hemel Hempstead, unită în așteptarea revenirii Domnului.",
      en: "A Romanian Baptist community in Hemel Hempstead, united in awaiting the Lord's return.",
    },
    image: "/churches/maranata-hemel-hempstead.jpg",
  },
  {
    id: "hristos-leyton-london",
    name: "Biserica lui Hristos din Leyton",
    city: "Londra",
    address: "73 Francis Road, London E10 6PL",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Christ+Church+Leyton+73+Francis+Road+London+E10+6PL",
    website: "https://christchurchleyton.org.uk",
    description: {
      ro: "O comunitate românească din Leyton, Londra, cu inimă deschisă pentru tineri.",
      en: "A Romanian community in Leyton, London, with an open heart for young people.",
    },
    image: "/churches/hristos-leyton-london.jpg",
  },
  {
    id: "emaus-northampton",
    name: "Biserica Emaus",
    city: "Northampton",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Northampton",
    description: {
      ro: "Biserică română baptistă din Northampton, al cărei nume evocă întâlnirea cu Hristos pe drum.",
      en: "A Romanian Baptist church in Northampton, whose name evokes the encounter with Christ on the road.",
    },
  },
  {
    id: "ekklesia-ipswich",
    name: "Biserica Ekklesia",
    city: "Ipswich",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Ipswich",
    description: {
      ro: "Comunitate românească baptistă din Ipswich, parte activă a mișcării de tineret.",
      en: "A Romanian Baptist community in Ipswich, an active part of the youth movement.",
    },
  },
];

export function getChurch(id: string): Church | undefined {
  return churches.find((c) => c.id === id);
}
