"use client";

import type { Locale } from "@/lib/i18n";

// WhatsApp click-to-chat — no inbox to manage, messages land straight in WhatsApp.
const WHATSAPP_NUMBER = "447549119705";
const CONTACT_EMAIL = "contact.tinericrestini@gmail.com";

const labels = {
  name: { ro: "Numele tău", en: "Your name" },
  email: { ro: "Email sau telefon", en: "Email or phone" },
  message: { ro: "Mesajul tău", en: "Your message" },
  placeholder: {
    ro: "Spune-ne cine ești și cum te putem ajuta...",
    en: "Tell us who you are and how we can help...",
  },
  send: { ro: "Trimite mesajul pe WhatsApp", en: "Send message on WhatsApp" },
  emailLabel: { ro: "sau scrie-ne pe email:", en: "or email us:" },
};

export function ContactForm({ locale }: { locale: Locale }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const contact = String(data.get("contact") ?? "");
    const message = String(data.get("message") ?? "");

    const text = `${message}\n\n— ${name}${contact ? ` (${contact})` : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  }

  const input =
    "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300 focus:shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-stone-600">{labels.name[locale]}</span>
          <input name="name" required className={`${input} mt-1`} />
        </label>
        <label className="block">
          <span className="text-sm text-stone-600">{labels.email[locale]}</span>
          <input name="contact" required className={`${input} mt-1`} />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-stone-600">{labels.message[locale]}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={labels.placeholder[locale]}
          className={`${input} mt-1`}
        />
      </label>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center rounded-full bg-orange-600 px-6 py-2.5 text-sm font-medium text-orange-50 transition-all duration-200 ease-out hover:bg-orange-700 hover:scale-105 hover:shadow-lg"
        >
          {labels.send[locale]}
        </button>
        <span className="text-sm text-stone-500">
          {labels.emailLabel[locale]}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-700 hover:text-orange-800 link-underline">
            {CONTACT_EMAIL}
          </a>
        </span>
      </div>
    </form>
  );
}
