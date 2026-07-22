"use client";

import { useState, useEffect, useRef } from "react";
import { CloseIcon } from "./icons";

const copy = {
  cta: "Register my interest",
  title: "Register your interest",
  subtitle: (eventTitle: string) => `Registering interest for: ${eventTitle}`,
  name: "Name",
  prename: "Prename",
  contactMethod: "How we should contact you",
  church: "Church or Other",
  submit: "Register Interest",
  submitting: "Submitting...",
  success: "Thank you for your interest, we will be in touch",
  error: "Something went wrong. Please try again.",
};

export function RegisterInterestButton({
  eventSlug,
  eventTitle,
}: {
  eventSlug: string;
  eventTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else {
      triggerButtonRef.current?.focus();
    }
  }, [open]);

  function closeModal() {
    setOpen(false);
    setSuccess(false);
    setError(false);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const prename = String(data.get("prename") ?? "").trim();
    const contactMethod = String(data.get("contactMethod") ?? "").trim();
    const church = String(data.get("church") ?? "").trim();

    if (!name || !prename || !contactMethod || !church) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    const timestamp = new Date().toISOString();

    try {
      const response = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, prename, contactMethod, church, eventSlug, timestamp }),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
        setTimeout(closeModal, 2000);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Register interest error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300 focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <>
      <button
        type="button"
        ref={triggerButtonRef}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium bg-orange-600 text-orange-50 hover:bg-orange-700 hover:scale-105 hover:shadow-lg transition-all duration-200 ease-out"
      >
        {copy.cta}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 px-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-interest-title"
          >
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h3 id="register-interest-title" className="font-serif text-2xl text-stone-800">{copy.title}</h3>
            <p className="text-sm text-stone-500 mt-1">{copy.subtitle(eventTitle)}</p>

            {success ? (
              <p className="text-sm text-green-700 font-medium mt-6">{copy.success}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <label className="block">
                  <span className="text-sm text-stone-600">{copy.name}</span>
                  <input name="name" required className={`${input} mt-1`} disabled={loading} />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-600">{copy.prename}</span>
                  <input name="prename" required className={`${input} mt-1`} disabled={loading} />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-600">{copy.contactMethod}</span>
                  <input name="contactMethod" required className={`${input} mt-1`} disabled={loading} />
                </label>
                <label className="block">
                  <span className="text-sm text-stone-600">{copy.church}</span>
                  <input name="church" required className={`${input} mt-1`} disabled={loading} />
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium bg-orange-600 text-orange-50 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? copy.submitting : copy.submit}
                </button>

                {error && <p className="text-sm text-red-700 font-medium">{copy.error}</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
