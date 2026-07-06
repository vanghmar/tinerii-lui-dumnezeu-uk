import Image from "next/image";
import Link from "next/link";
import { churches } from "@/data/churches";
import { gallery } from "@/data/gallery";
import { getNextEvent, getPastEvents } from "@/lib/events";
import { localePath, t, type Locale } from "@/lib/i18n";
import { ButtonLink, Card, Eyebrow, Heading, SectionBand } from "@/components/ui";
import { EventCard } from "@/components/event-card";
import { GalleryGrid } from "@/components/gallery-grid";

const copy = {
  heroTitle: { ro: "Tineri uniți în Hristos", en: "Young people united in Christ" },
  heroSub: {
    ro: "O dată la două luni, tinerii din bisericile baptiste române din UK se adună pentru părtășie, închinare și Cuvântul lui Dumnezeu.",
    en: "Every two months, young people from Romanian Baptist churches across the UK gather for fellowship, worship and God's Word.",
  },
  nextEvent: { ro: "Următorul eveniment", en: "Next event" },
  noEvent: {
    ro: "Următorul eveniment va fi anunțat în curând.",
    en: "The next event will be announced soon.",
  },
  about: { ro: "Despre noi", en: "About us" },
  whoTitle: { ro: "Cine suntem", en: "Who we are" },
  whoText: {
    ro: "Tinerii lui Dumnezeu UK este o familie de tineri din bisericile baptiste române din Marea Britanie. La fiecare două luni, una dintre biserici își deschide ușile și ne primește pe toți — cu mâncare bună, jocuri, cântări de laudă și un mesaj din Scriptură.",
    en: "Tinerii lui Dumnezeu UK is a family of young people from Romanian Baptist churches in the United Kingdom. Every two months, one of the churches opens its doors and welcomes us all — with good food, games, songs of praise and a message from Scripture.",
  },
  readMore: { ro: "Citește mai mult →", en: "Read more →" },
  whyTitle: { ro: "De ce ne adunăm", en: "Why we gather" },
  lastTitle: { ro: "Ultima întâlnire", en: "Our last gathering" },
  churchesTitle: { ro: "Bisericile participante", en: "Participating churches" },
  allChurches: { ro: "Vezi toate bisericile →", en: "See all churches →" },
  galleryTitle: { ro: "Momente de la întâlniri", en: "Moments from our gatherings" },
  fullGallery: { ro: "Vezi galeria →", en: "View gallery →" },
  joinTitle: {
    ro: "Vino la următoarea întâlnire — te așteptăm cu drag",
    en: "Come to the next gathering — we would love to welcome you",
  },
  join: { ro: "Alătură-te", en: "Join us" },
};

const pillars = [
  { icon: "🤝", title: { ro: "Părtășie", en: "Fellowship" }, text: { ro: "Prieteni din toată țara, o singură familie.", en: "Friends from across the country, one family." } },
  { icon: "🎶", title: { ro: "Închinare", en: "Worship" }, text: { ro: "Cântăm împreună spre lauda lui Dumnezeu.", en: "We sing together in praise of God." } },
  { icon: "📖", title: { ro: "Cuvântul", en: "The Word" }, text: { ro: "Un mesaj din Scriptură la fiecare întâlnire.", en: "A message from Scripture at every gathering." } },
  { icon: "🍞", title: { ro: "Prietenie", en: "Friendship" }, text: { ro: "Mâncare bună și timp petrecut împreună.", en: "Good food and time spent together." } },
];

export function HomePage({ locale }: { locale: Locale }) {
  const next = getNextEvent();
  const last = getPastEvents()[0];

  return (
    <>
      <section className="relative overflow-hidden border-t border-stone-200/50">
        <Image
          src="/images/hero-youth-meeting.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 sm:py-28 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-orange-300">
            Tinerii lui Dumnezeu UK
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mt-3">
            {t(copy.heroTitle, locale)}
          </h1>
          <p className="text-lg text-stone-100 mt-5 max-w-2xl mx-auto leading-relaxed">
            {t(copy.heroSub, locale)}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <ButtonLink href={localePath(locale, "/evenimente")}>
              {t(copy.nextEvent, locale)}
            </ButtonLink>
            <ButtonLink href={localePath(locale, "/despre")} variant="white">
              {t(copy.about, locale)}
            </ButtonLink>
          </div>
        </div>
      </section>

      <SectionBand>
        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          {next ? (
            <EventCard event={next} locale={locale} highlight eyebrow={t(copy.nextEvent, locale)} />
          ) : (
            <Card highlight>
              <Eyebrow>{t(copy.nextEvent, locale)}</Eyebrow>
              <p className="text-stone-600 mt-2">{t(copy.noEvent, locale)}</p>
            </Card>
          )}
          {next?.poster ? (
            <Link
              href={localePath(locale, `/evenimente/${next.slug}`)}
              className="relative block w-full h-64 sm:h-full rounded-2xl overflow-hidden shadow-md transition-transform duration-200 hover:-translate-y-1"
            >
              <Image
                src={next.poster}
                alt={t(next.title, locale)}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 90vw, 400px"
              />
            </Link>
          ) : (
            <div>
              <Eyebrow muted>{t(copy.whoTitle, locale)}</Eyebrow>
              <p className="text-stone-600 mt-3 leading-relaxed">{t(copy.whoText, locale)}</p>
              <Link
                href={localePath(locale, "/despre")}
                className="inline-block text-sm text-orange-700 hover:text-orange-800 mt-3 link-underline"
              >
                {t(copy.readMore, locale)}
              </Link>
            </div>
          )}
        </div>
      </SectionBand>

      {next?.poster && (
        <SectionBand>
          <div className="max-w-2xl">
            <Eyebrow muted>{t(copy.whoTitle, locale)}</Eyebrow>
            <p className="text-stone-600 mt-3 leading-relaxed">{t(copy.whoText, locale)}</p>
            <Link
              href={localePath(locale, "/despre")}
              className="inline-block text-sm text-orange-700 hover:text-orange-800 mt-3 link-underline"
            >
              {t(copy.readMore, locale)}
            </Link>
          </div>
        </SectionBand>
      )}

      <SectionBand tint>
        <div className="text-center">
          <Heading>{t(copy.whyTitle, locale)}</Heading>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {pillars.map((p, i) => (
            <Card key={p.title.en} className="text-center animate-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-2xl" aria-hidden>
                {p.icon}
              </div>
              <h3 className="font-serif text-lg text-stone-800 mt-2">{t(p.title, locale)}</h3>
              <p className="text-sm text-stone-500 mt-1">{t(p.text, locale)}</p>
            </Card>
          ))}
        </div>
      </SectionBand>

      {last && (
        <SectionBand>
          <Eyebrow muted>{t(copy.lastTitle, locale)}</Eyebrow>
          <div className="mt-4 max-w-xl">
            <EventCard event={last} locale={locale} />
          </div>
        </SectionBand>
      )}

      <SectionBand tint>
        <Heading>{t(copy.churchesTitle, locale)}</Heading>
        <div className="flex flex-wrap gap-3 mt-6">
          {churches.map((c) => (
            <Link
              key={c.id}
              href={localePath(locale, `/biserici/${c.id}`)}
              className="rounded-full bg-white border border-stone-200/70 px-4 py-2 text-sm text-stone-600 hover:border-orange-300 hover:text-orange-700 transition-colors duration-200"
            >
              {c.name} · <span className="text-orange-700">{c.city}</span>
            </Link>
          ))}
        </div>
        <Link
          href={localePath(locale, "/biserici")}
          className="inline-block text-sm text-orange-700 hover:text-orange-800 mt-5 link-underline"
        >
          {t(copy.allChurches, locale)}
        </Link>
      </SectionBand>

      <SectionBand>
        <Eyebrow muted>{t(copy.galleryTitle, locale)}</Eyebrow>
        <div className="mt-4">
          <GalleryGrid images={gallery.slice(0, 6)} locale={locale} />
        </div>
        <Link
          href={localePath(locale, "/galerie")}
          className="inline-block text-sm text-orange-700 hover:text-orange-800 mt-5 link-underline"
        >
          {t(copy.fullGallery, locale)}
        </Link>
      </SectionBand>

      <section className="bg-gradient-to-br from-orange-600 to-orange-700">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-orange-50">{t(copy.joinTitle, locale)}</p>
          <div className="mt-6">
            <ButtonLink href={localePath(locale, "/alatura-te")} variant="white">
              {t(copy.join, locale)}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
