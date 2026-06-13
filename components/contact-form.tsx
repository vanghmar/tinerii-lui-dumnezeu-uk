"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

// Paste the Google Apps Script webhook URL here once it exists.
// While empty, the form falls back to opening the user's email app.
const WEBHOOK_URL = "";
const CONTACT_EMAIL = "contact@tineriiluidumnezeu.uk"; // replace with the real inbox

const labels = {
  name: { ro: "Numele tău", en: "Your name" },
  email: { ro: "Email sau telefon", en: "Email or phone" },
  message: { ro: "Mesajul tău", en: "Your message" },
  placeholder: {
    ro: "Spune-ne cine ești și cum te putem ajuta...",
    en: "Tell us who you are and how we can help...",
  },
  send: { ro: "Trimite mesajul", en: "Send message" },
  sending: { ro: "Se trimite...", en: "Sending..." },
  sent: {
    ro: "Mulțumim! Mesajul tău a fost trimis — îți răspundem cât de curând.",
    en: "Thank you! Your message was sent — we will reply as soon as we can.",
  },
  error: {
    ro: "Ceva nu a mers. Te rugăm să ne scrii direct la",
    en: "Something went wrong. Please email us directly at",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const contact = String(data.get("contact") ?? "");
    const message = String(data.get("message") ?? "");

    if (!WEBHOOK_URL) {
      const subject = encodeURIComponent(`Mesaj de pe site — ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${contact}`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ type: "contact", name, contact, message }),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-stone-700 bg-orange-50 rounded-2xl p-6">{labels.sent[locale]}</p>;
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
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-full bg-orange-600 px-6 py-2.5 text-sm font-medium text-orange-50 transition-all duration-200 ease-out hover:bg-orange-700 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none"
      >
        {status === "sending" ? labels.sending[locale] : labels.send[locale]}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-700">
          {labels.error[locale]} {CONTACT_EMAIL}
        </p>
      )}
    </form>
  );
}
