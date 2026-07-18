import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/gallery";

export const metadata: Metadata = {
  title: "Momente de la întâlniri",
  description:
    "Fotografiile vor fi adăugate aici după fiecare întâlnire, cu grijă și cu acordul celor fotografiați.",
  alternates: { canonical: "/galerie", languages: { ro: "/galerie", en: "/en/galerie" } },
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
  return <GalleryPage locale="ro" />;
}
