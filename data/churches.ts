import type { Church } from "./types";

// ⚠️ SAMPLE DATA — replace every entry with real, pastor-approved details before launch.
export const churches: Church[] = [
  {
    id: "betel-leeds",
    name: "Biserica Baptistă Betel",
    city: "Leeds",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Leeds",
    description: {
      ro: "O biserică românească baptistă din Leeds, parte a familiei Tinerii lui Dumnezeu UK.",
      en: "A Romanian Baptist church in Leeds, part of the Tinerii lui Dumnezeu UK family.",
    },
  },
  {
    id: "harul-london",
    name: "Biserica Baptistă Harul",
    city: "Londra",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=London",
    description: {
      ro: "O comunitate caldă de credincioși români din Londra.",
      en: "A warm community of Romanian believers in London.",
    },
  },
  {
    id: "emanuel-birmingham",
    name: "Biserica Baptistă Emanuel",
    city: "Birmingham",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Birmingham",
    description: {
      ro: "Biserică baptistă română din Birmingham, cu o inimă pentru tineri.",
      en: "A Romanian Baptist church in Birmingham with a heart for young people.",
    },
  },
  {
    id: "sion-manchester",
    name: "Biserica Baptistă Sion",
    city: "Manchester",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Manchester",
    description: {
      ro: "Parte a mișcării de tineret din nordul Angliei.",
      en: "Part of the youth movement in the north of England.",
    },
  },
  {
    id: "golgota-northampton",
    name: "Biserica Baptistă Golgota",
    city: "Northampton",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Northampton",
    description: {
      ro: "O biserică ce găzduiește cu drag întâlnirile tinerilor.",
      en: "A church that warmly hosts the youth gatherings.",
    },
  },
  {
    id: "maranata-luton",
    name: "Biserica Baptistă Maranata",
    city: "Luton",
    address: "Adresa va fi confirmată",
    pastor: "Pastor (de confirmat)",
    mapsUrl: "https://maps.google.com/?q=Luton",
    description: {
      ro: "Comunitate românească baptistă din Luton.",
      en: "A Romanian Baptist community in Luton.",
    },
  },
];

export function getChurch(id: string): Church | undefined {
  return churches.find((c) => c.id === id);
}
