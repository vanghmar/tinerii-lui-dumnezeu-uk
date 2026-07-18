"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";

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
  sendEmail: { ro: "Trimite prin email", en: "Send email" },
  sendWhatsApp: { ro: "Trimite pe WhatsApp", en: "Send on WhatsApp" },
  emailLabel: { ro: "sau ", en: "or " },
  success: { ro: "✓ Mesajul a fost trimis cu succes!", en: "✓ Message sent successfully!" },
  error: { ro: "Eroare la trimitere. Încearcă din nou.", en: "Error sending message. Please try again." },
  sending: { ro: "Se trimite...", en: "Sending..." },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !contact || !message) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message }),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setLoading(false);
    }
  }

  function handleWhatsAppSubmit() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const text = message
      ? `${message}${name ? `\n\n— ${name}` : ""}${contact ? ` (${contact})` : ""}`
      : locale === "ro"
        ? "Bună! Aș vrea să aflu mai multe despre Tinerii lui Dumnezeu UK."
        : "Hi! I'd like to find out more about Tinerii lui Dumnezeu UK.";

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  const input =
    "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300 focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  const buttonBase =
    "inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  return (
    <div className="space-y-4">
      {/* Email Form */}
      <form ref={formRef} onSubmit={handleEmailSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-stone-600">{labels.name[locale]}</span>
            <input name="name" required className={`${input} mt-1`} disabled={loading} />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">{labels.email[locale]}</span>
            <input name="contact" required className={`${input} mt-1`} disabled={loading} />
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
            disabled={loading}
          />
        </label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`${buttonBase} bg-orange-600 text-orange-50 hover:bg-orange-700 hover:scale-105 hover:shadow-lg`}
            >
              {loading ? labels.sending[locale] : labels.sendEmail[locale]}
            </button>
            <span className="text-sm text-stone-500">
              {labels.emailLabel[locale]}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="text-orange-700 hover:text-orange-800 font-medium link-underline"
              >
                {labels.sendWhatsApp[locale]}
              </button>
            </span>
          </div>
          {success && <div className="text-sm text-green-700 font-medium">{labels.success[locale]}</div>}
          {error && <div className="text-sm text-red-700 font-medium">{labels.error[locale]}</div>}
        </div>
      </form>
    </div>
  );
}
