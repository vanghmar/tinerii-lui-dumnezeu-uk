"use client";

import { useState } from "react";

const copy = {
  feedbackLabel: "We would like to hear your feedback — what do you like, and what can we improve?",
  suggestionsLabel: "What would you like to see or have on the site?",
  contactTitle: "Contact details (optional)",
  contactHelper: "Leave this blank if you'd prefer to stay anonymous. We'll use this only to follow up on your ideas.",
  name: "Name",
  email: "Email",
  whatsapp: "WhatsApp",
  submit: "Send Feedback",
  submitting: "Sending...",
  success: "Thank you for your feedback, we will be in touch",
  error: "Something went wrong. Please try again.",
};

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const feedback = String(data.get("feedback") ?? "").trim();
    const suggestions = String(data.get("suggestions") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const whatsapp = String(data.get("whatsapp") ?? "").trim();

    if (!feedback || !suggestions) {
      setError(true);
      setTimeout(() => setError(false), 4000);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, suggestions, name, email, whatsapp }),
      });

      if (response.ok) {
        setSuccess(true);
        form.reset();
      } else {
        setError(true);
        setTimeout(() => setError(false), 4000);
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300 focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  if (success) {
    return (
      <p role="status" className="text-sm text-green-700 font-medium">
        {copy.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block">
        <span className="text-sm text-stone-600">{copy.feedbackLabel}</span>
        <textarea name="feedback" required rows={4} className={`${input} mt-1`} disabled={loading} />
      </label>
      <label className="block">
        <span className="text-sm text-stone-600">{copy.suggestionsLabel}</span>
        <textarea name="suggestions" required rows={4} className={`${input} mt-1`} disabled={loading} />
      </label>

      <div className="border-t border-stone-200 pt-6">
        <h3 className="font-serif text-lg text-stone-800">{copy.contactTitle}</h3>
        <p className="text-sm text-stone-500 mt-1 mb-4">{copy.contactHelper}</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm text-stone-600">{copy.name}</span>
            <input name="name" className={`${input} mt-1`} disabled={loading} />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">{copy.email}</span>
            <input name="email" type="email" className={`${input} mt-1`} disabled={loading} />
          </label>
          <label className="block">
            <span className="text-sm text-stone-600">{copy.whatsapp}</span>
            <input name="whatsapp" className={`${input} mt-1`} disabled={loading} />
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium bg-orange-600 text-orange-50 hover:bg-orange-700 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 ease-out"
      >
        {loading ? copy.submitting : copy.submit}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-700 font-medium">
          {copy.error}
        </p>
      )}
    </form>
  );
}
