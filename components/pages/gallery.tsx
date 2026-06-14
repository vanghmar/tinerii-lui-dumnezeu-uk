import Image from "next/image";
import { gallery } from "@/data/gallery";
import { t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { GalleryGrid } from "@/components/gallery-grid";

const copy = {
  eyebrow: { ro: "Galerie", en: "Gallery" },
  title: { ro: "Momente de la întâlniri", en: "Moments from our gatherings" },
  intro: {
    ro: "Fotografiile vor fi adăugate aici după fiecare întâlnire, cu grijă și cu acordul celor fotografiați.",
    en: "Photos are added here after each gathering, carefully and with the consent of those photographed.",
  },
  privacy: {
    ro: "Dacă apari într-o fotografie și dorești să fie eliminată, contactează-ne și o vom elimina imediat.",
    en: "If you appear in a photo and would like it removed, contact us and we will remove it right away.",
  },
};

export function GalleryPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="max-w-xs">
            <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
            <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
            <p className="text-stone-600 mt-4">{t(copy.intro, locale)}</p>
          </div>
          <div className="relative flex-1 h-56 sm:h-64 shrink-0 rounded-2xl overflow-hidden shadow-md rotate-2 mx-auto sm:mx-0">
            <Image
              src="/gallery/2026-05-london/photo-2026-05-09-12-46-43.jpg"
              alt="Tinerii lui Dumnezeu"
              fill
              className="object-cover"
              sizes="208px"
            />
          </div>
        </div>
      </SectionBand>
      <SectionBand>
        <GalleryGrid images={gallery} locale={locale} />
        <p className="text-sm text-stone-400 mt-8 max-w-2xl">{t(copy.privacy, locale)}</p>
      </SectionBand>
    </>
  );
}
