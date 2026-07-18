import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/gallery";

export const metadata: Metadata = {
  title: "Moments from our gatherings",
  description:
    "Photos are added here after each gathering, carefully and with the consent of those photographed.",
  alternates: { canonical: "/en/galerie", languages: { ro: "/galerie", en: "/en/galerie" } },
  openGraph: {
    images: [
      {
        url: "/images/photo-2026-05-09-12-46-43.jpg",
        width: 1200,
        height: 900,
        alt: "Tinerii lui Dumnezeu UK",
      },
    ],
  },
};

export default function Page() {
  return <GalleryPage locale="en" />;
}
