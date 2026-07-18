import { t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";

const copy = {
  eyebrow: { ro: "Politica de cookie-uri", en: "Cookie policy" },
  title: { ro: "Cum folosim cookie-urile", en: "How we use cookies" },
  intro: {
    ro: "Această pagină explică ce sunt cookie-urile și cum le folosim pe tinericrestini.uk.",
    en: "This page explains what cookies are and how we use them on tinericrestini.uk.",
  },
  essentialTitle: { ro: "Cookie-uri strict necesare", en: "Strictly necessary cookies" },
  essential: {
    ro: "Aceste cookie-uri sunt necesare pentru funcționarea site-ului (de exemplu, reținerea alegerii tale privind cookie-urile) și sunt mereu active.",
    en: "These cookies are required for the site to function (for example, remembering your cookie choice) and are always active.",
  },
  analyticsTitle: { ro: "Cookie-uri de analiză și publicitate", en: "Analytics and advertising cookies" },
  analytics: {
    ro: "Dacă alegi „Accept toate”, folosim aceste cookie-uri pentru a înțelege cum este folosit site-ul (Google Search Console, Microsoft Clarity) și pentru a măsura eficiența campaniilor noastre (Google Ads). Sunt activate doar cu acordul tău și poți reveni oricând asupra alegerii.",
    en: "If you choose “Accept all”, we use these cookies to understand how the site is used (Google Search Console, Microsoft Clarity) and to measure the effectiveness of our campaigns (Google Ads). They are only enabled with your consent, and you can change your choice at any time.",
  },
  changeTitle: { ro: "Cum îți schimbi alegerea", en: "How to change your choice" },
  change: {
    ro: "Poți șterge datele site-ului din setările browser-ului tău pentru a vedea din nou bannerul de cookie-uri și a alege altfel.",
    en: "You can clear this site's data in your browser settings to see the cookie banner again and choose differently.",
  },
  contactTitle: { ro: "Întrebări?", en: "Questions?" },
  contact: {
    ro: "Ne poți scrie oricând la contact.tinericrestini@gmail.com.",
    en: "You can always write to us at contact.tinericrestini@gmail.com.",
  },
} as const;

export function CookiePolicyPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint size="compact">
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
        <p className="text-stone-600 mt-4 max-w-2xl">{t(copy.intro, locale)}</p>
      </SectionBand>
      <SectionBand>
        <div className="max-w-2xl space-y-8 text-stone-600 leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl text-stone-800">{t(copy.essentialTitle, locale)}</h2>
            <p className="mt-3">{t(copy.essential, locale)}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-stone-800">{t(copy.analyticsTitle, locale)}</h2>
            <p className="mt-3">{t(copy.analytics, locale)}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-stone-800">{t(copy.changeTitle, locale)}</h2>
            <p className="mt-3">{t(copy.change, locale)}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-stone-800">{t(copy.contactTitle, locale)}</h2>
            <p className="mt-3">{t(copy.contact, locale)}</p>
          </div>
        </div>
      </SectionBand>
    </>
  );
}
