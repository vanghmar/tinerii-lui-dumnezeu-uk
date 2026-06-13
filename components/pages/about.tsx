import { localePath, t, type Locale } from "@/lib/i18n";
import { ButtonLink, Eyebrow, SectionBand } from "@/components/ui";

const copy = {
  eyebrow: { ro: "Despre noi", en: "About us" },
  title: { ro: "O familie de tineri, multe biserici", en: "One family of young people, many churches" },
  p1: {
    ro: "Tinerii lui Dumnezeu UK a început din dorința păstorilor noștri de a-i aduce împreună pe tinerii din bisericile baptiste române din Marea Britanie. La fiecare două luni, una dintre biserici își deschide ușile și ne primește pe toți — cu mâncare bună, jocuri, cântări de laudă și un mesaj din Scriptură.",
    en: "Tinerii lui Dumnezeu UK began with our pastors' desire to bring together the young people of the Romanian Baptist churches in the United Kingdom. Every two months, one of the churches opens its doors and welcomes us all — with good food, games, songs of praise and a message from Scripture.",
  },
  p2: {
    ro: "Ce a început ca o întâlnire între câteva biserici a devenit o familie de tineri care cresc împreună în credință. Apoi următoarea biserică găzduiește întâlnirea, și ciclul continuă — așa ajungem să ne cunoaștem unii pe alții și să ne simțim acasă în fiecare oraș.",
    en: "What began as a meeting between a few churches has become a family of young people growing together in faith. Then the next church hosts the gathering, and the cycle continues — that is how we come to know one another and feel at home in every city.",
  },
  whyTitle: { ro: "De ce ne adunăm", en: "Why we gather" },
  why: {
    ro: "Ne adunăm pentru că credința crește în comunitate. Râdem împreună, mâncăm împreună, ne închinăm împreună și ascultăm împreună Cuvântul.",
    en: "We gather because faith grows in community. We laugh together, eat together, worship together and listen to the Word together.",
  },
  verse: {
    ro: "„Iată ce plăcut și ce dulce este să locuiască frații împreună!” — Psalmul 133:1",
    en: "“How good and pleasant it is when God's people live together in unity!” — Psalm 133:1",
  },
  cta: { ro: "Vino și tu la următoarea întâlnire", en: "Come to the next gathering" },
  join: { ro: "Alătură-te", en: "Join us" },
};

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
      </SectionBand>
      <SectionBand>
        <div className="max-w-2xl space-y-5 text-stone-600 leading-relaxed">
          <p>{t(copy.p1, locale)}</p>
          <p>{t(copy.p2, locale)}</p>
        </div>
        <div className="max-w-2xl mt-10">
          <h2 className="font-serif text-2xl text-stone-800">{t(copy.whyTitle, locale)}</h2>
          <p className="text-stone-600 leading-relaxed mt-3">{t(copy.why, locale)}</p>
          <blockquote className="font-serif text-lg text-orange-700 mt-5 border-l-2 border-orange-200 pl-4">
            {t(copy.verse, locale)}
          </blockquote>
        </div>
        <div className="mt-10">
          <p className="text-stone-600 mb-4">{t(copy.cta, locale)}</p>
          <ButtonLink href={localePath(locale, "/alatura-te")}>{t(copy.join, locale)}</ButtonLink>
        </div>
      </SectionBand>
    </>
  );
}
