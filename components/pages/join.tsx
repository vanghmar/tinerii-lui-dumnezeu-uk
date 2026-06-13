import { t, type Locale } from "@/lib/i18n";
import { Eyebrow, SectionBand } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

const copy = {
  eyebrow: { ro: "Alătură-te", en: "Join us" },
  title: { ro: "Vino așa cum ești", en: "Come as you are" },
  p1: {
    ro: "Nu trebuie să cunoști pe nimeni ca să vii — vino așa cum ești. Dacă ești tânăr, dacă ai întrebări despre credință, sau dacă pur și simplu vrei să vezi cum este, te așteptăm cu drag la următoarea întâlnire.",
    en: "You don't need to know anyone to come — come as you are. If you're young, if you have questions about faith, or if you simply want to see what it's like, we would love to welcome you at the next gathering.",
  },
  contactTitle: { ro: "Scrie-ne", en: "Write to us" },
  p2: {
    ro: "Scrie-ne și îți răspundem cu drag. Te putem pune în legătură cu biserica cea mai apropiată de tine sau îți putem da detalii despre următorul eveniment.",
    en: "Write to us and we will gladly reply. We can connect you with the church nearest to you or give you details about the next event.",
  },
};

export function JoinPage({ locale }: { locale: Locale }) {
  return (
    <>
      <SectionBand tint>
        <Eyebrow>{t(copy.eyebrow, locale)}</Eyebrow>
        <h1 className="font-serif text-4xl text-stone-800 mt-3">{t(copy.title, locale)}</h1>
        <p className="text-stone-600 mt-4 max-w-2xl leading-relaxed">{t(copy.p1, locale)}</p>
      </SectionBand>
      <SectionBand>
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl text-stone-800">{t(copy.contactTitle, locale)}</h2>
          <p className="text-stone-600 mt-3 mb-7">{t(copy.p2, locale)}</p>
          <ContactForm locale={locale} />
        </div>
      </SectionBand>
    </>
  );
}
