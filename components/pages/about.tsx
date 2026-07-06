import Image from "next/image";
import { localePath, t, type Locale } from "@/lib/i18n";
import { ButtonLink, Eyebrow, SectionBand } from "@/components/ui";

const copy = {
  eyebrow: { ro: "Despre noi", en: "About us" },
  title: { ro: "O familie de tineri, multe biserici", en: "One family of young people, many churches" },
  p1: {
    ro: "Tinerii lui Dumnezeu UK a început din dorința păstorilor noștri de a-i aduce împreună pe tinerii din bisericile baptiste române din Marea Britanie. La fiecare două luni, una dintre biserici își deschide ușile și ne primește pe toți — cu mâncare bună, jocuri, cântări de laudă și un mesaj din Scriptură.",
    en: "Tinerii lui Dumnezeu UK began with our pastors' desire to bring together the young people of the Romanian Baptist churches in the United Kingdom. Every two months, one of the churches opens its doors and welcomes us all — with good food, games, songs of praise and a message from Scripture.",
  },
  p1b: {
    ro: "Suntem, în principal, o comunitate de tineri români — dar primim cu bucurie pe oricine dorește să ni se alăture, indiferent de limbă sau biserică; la nevoie, putem asigura și traducere. Îi încurajăm pe tineri să își aducă prietenii de la școală sau de oriunde altundeva, vorbitori de engleză sau de orice altă limbă, iar Biblia bilingvă a devenit un simbol firesc al acestei deschideri.",
    en: "We are, at heart, a community of Romanian young people — but we warmly welcome anyone who wants to join us, whatever language they speak or church they belong to; translation can be provided when needed. We encourage our young people to bring their friends along, whether from school or elsewhere, English speakers included, and the bilingual Bible has become a natural symbol of that openness.",
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
      <SectionBand tint size="compact">
        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
          <div className="flex-1">
            <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
          </div>
          <div className="relative w-56 h-64 sm:w-64 sm:h-72 shrink-0 rounded-2xl overflow-hidden shadow-md rotate-2 mx-auto sm:mx-0">
            <Image
              src="/images/bible-bilingual.jpg"
              alt={locale === "ro" ? "Biblie bilingvă, română și engleză" : "Bilingual Bible, Romanian and English"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 224px, 256px"
            />
          </div>
        </div>
      </SectionBand>
      <SectionBand>
        <div className="max-w-2xl space-y-5 text-stone-600 leading-relaxed">
          <p className="text-lg text-stone-700 leading-relaxed">{t(copy.p1, locale)}</p>
          <p>{t(copy.p1b, locale)}</p>
          <p>{t(copy.p2, locale)}</p>
        </div>
        <div className="max-w-2xl mt-10">
          <h2 className="font-serif text-2xl text-stone-800">{t(copy.whyTitle, locale)}</h2>
          <p className="text-stone-600 leading-relaxed mt-3">{t(copy.why, locale)}</p>
          <blockquote className="font-serif text-xl italic text-orange-700 mt-6 border-l-4 border-orange-300 pl-5 py-1">
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
