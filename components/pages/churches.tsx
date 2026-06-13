import { churches } from "@/data/churches";
import { t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { ChurchCard } from "@/components/church-card";

const copy = {
  eyebrow: { ro: "Bisericile", en: "Churches" },
  title: { ro: "Bisericile participante", en: "Participating churches" },
  intro: {
    ro: "Aceste biserici baptiste române din Marea Britanie fac parte din familia Tinerii lui Dumnezeu UK. Fiecare găzduiește, pe rând, întâlnirile tinerilor.",
    en: "These Romanian Baptist churches in the United Kingdom are part of the Tinerii lui Dumnezeu UK family. Each one takes its turn hosting the youth gatherings.",
  },
};

export function ChurchesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
        <p className="text-stone-600 mt-4 max-w-2xl">{t(copy.intro, locale)}</p>
      </SectionBand>
      <SectionBand>
        <div className="grid sm:grid-cols-2 gap-5">
          {churches.map((c) => (
            <ChurchCard key={c.id} church={c} locale={locale} />
          ))}
        </div>
      </SectionBand>
    </>
  );
}
