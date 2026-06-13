import { getPastEvents, getUpcomingEvents } from "@/lib/events";
import { t, type Locale } from "@/lib/i18n";
import { Card, Eyebrow, SectionBand } from "@/components/ui";
import { EventCard } from "@/components/event-card";

const copy = {
  eyebrow: { ro: "Evenimente", en: "Events" },
  title: { ro: "Întâlnirile tinerilor", en: "Youth gatherings" },
  intro: {
    ro: "La fiecare două luni, o altă biserică găzduiește întâlnirea. Toți tinerii sunt bineveniți — vino cu un prieten!",
    en: "Every two months, a different church hosts the gathering. All young people are welcome — bring a friend!",
  },
  upcoming: { ro: "Urmează", en: "Upcoming" },
  none: {
    ro: "Următorul eveniment va fi anunțat în curând.",
    en: "The next event will be announced soon.",
  },
  past: { ro: "Întâlniri trecute", en: "Past gatherings" },
};

export function EventsPage({ locale }: { locale: Locale }) {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <SectionBand tint>
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
        <p className="text-stone-600 mt-4 max-w-2xl">{t(copy.intro, locale)}</p>
      </SectionBand>
      <SectionBand>
        <h2 className="font-serif text-2xl text-stone-800 mb-5">{t(copy.upcoming, locale)}</h2>
        {upcoming.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {upcoming.map((e, i) => (
              <EventCard key={e.slug} event={e} locale={locale} highlight={i === 0} />
            ))}
          </div>
        ) : (
          <Card highlight>
            <p className="text-stone-600">{t(copy.none, locale)}</p>
          </Card>
        )}
        {past.length > 0 && (
          <>
            <h2 className="font-serif text-2xl text-stone-800 mt-12 mb-5">{t(copy.past, locale)}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {past.map((e) => (
                <EventCard key={e.slug} event={e} locale={locale} />
              ))}
            </div>
          </>
        )}
      </SectionBand>
    </>
  );
}
