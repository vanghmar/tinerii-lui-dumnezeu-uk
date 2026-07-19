import { resources } from "@/data/resources";
import type { Resource, ResourceCategory } from "@/data/types";
import { t, type Locale } from "@/lib/i18n";
import { Card, Eyebrow, SectionBand } from "@/components/ui";
import { PlayIcon } from "@/components/icons";

const copy = {
  eyebrow: { ro: "Resurse", en: "Resources" },
  title: { ro: "Ce ascultăm și ce urmărim", en: "What we're watching and listening to" },
  intro: {
    ro: "În grupul nostru de WhatsApp, tinerii împărtășesc adesea scurte videoclipuri, predici, canale și cântece creștine pe care le ascultăm și care ne-au ajutat în umblarea cu Dumnezeu. Le adunăm aici, cu bucurie, pentru oricine ar putea găsi în ele ceva important.",
    en: "In our WhatsApp group, young people often share short videos, messages, channels and worship songs we enjoy that have helped us in our walk with God. We're gathering them here, gladly, for anyone who might find something important in them.",
  },
};

const sections: { category: ResourceCategory; title: Record<Locale, string>; language?: "en" | "ro" }[] = [
  { category: "songs", title: { ro: "Cântece de închinare recomandate — Engleză", en: "Recommended worship songs — English" }, language: "en" },
  { category: "songs", title: { ro: "Cântece de închinare recomandate — Română", en: "Recommended worship songs — Romanian" }, language: "ro" },
  { category: "shorts", title: { ro: "Shorts", en: "Shorts" } },
  { category: "preaches", title: { ro: "Predici și mesaje", en: "Preaches and messages" } },
  { category: "channels", title: { ro: "Canale de urmărit", en: "Channels to follow" } },
];

function ResourceCard({ resource, locale }: { resource: Resource; locale: Locale }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="h-full flex items-start gap-3">
        <PlayIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-stone-800 leading-snug">{resource.title}</p>
          <p className="text-sm text-stone-400 mt-1">{resource.source}</p>
        </div>
      </Card>
    </a>
  );
}

export function ResourcesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
        <p className="text-stone-600 mt-4 max-w-2xl leading-relaxed">{t(copy.intro, locale)}</p>
      </SectionBand>

      <SectionBand>
        <div className="space-y-12">
          {sections.map(({ category, title, language }) => {
            const items = resources.filter((r) => {
              if (r.category !== category) return false;
              if (language !== undefined) return r.language === language;
              return true;
            });
            if (items.length === 0) return null;
            const sectionKey = language ? `${category}-${language}` : category;
            return (
              <div key={sectionKey}>
                <h2 className="font-serif text-2xl text-stone-800">{title[locale]}</h2>
                <div className="mt-1 h-px w-16 bg-orange-500" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {items.map((r) => (
                    <ResourceCard key={r.url} resource={r} locale={locale} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SectionBand>
    </>
  );
}
