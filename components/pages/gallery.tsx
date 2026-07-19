import Image from "next/image";
import { gallery } from "@/data/gallery";
import { t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { GalleryGrid } from "@/components/gallery-grid";

const copy = {
  eyebrow: { ro: "Galerie", en: "Gallery" },
  title: { ro: "Momente de la întâlniri", en: "Moments from our gatherings" },
  intro: {
    ro: "Distribuim aceste momente cu bucurie, ca să arătăm ce face Dumnezeu în mijlocul nostru. Dacă preferi să nu apari într-o fotografie, scrie-ne și o eliminăm imediat — iar dacă ai poze de la întâlniri, ni le poți trimite cu drag!",
    en: "We share these moments with joy, to show what God is doing among us. If you'd rather not appear in a photo, just let us know and we'll remove it right away — and if you have photos from a gathering, we'd love for you to send them our way!",
  },
};

export function GalleryPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="flex-1 max-w-md">
            <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
            <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
            <p className="text-sm text-stone-600 mt-4 leading-relaxed">{t(copy.intro, locale)}</p>
          </div>
          <div className="relative w-72 h-48 shrink-0 rounded-2xl overflow-hidden shadow-md rotate-2 mx-auto sm:mx-0">
            <Image
              src="/images/photo-2026-05-09-12-46-43.jpg"
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
      </SectionBand>
    </>
  );
}
