# Feedback Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a floating "Share Feedback" CTA button (visible on every page) that links to a dedicated English-only `/en/feedback` page containing a feedback/suggestions form, which submits to a new Google Sheets webhook via a new API route.

**Architecture:** Mirrors the existing register-interest feature exactly: a client component form posts JSON to a Next.js API route (`app/api/feedback/route.ts`), which validates and forwards the payload to a Google Apps Script webhook URL stored in an env var. A new floating button component is added to `site-shell.tsx` so it renders on every page regardless of locale, always linking to `/en/feedback`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Google Apps Script Web App (webhook), Vercel env vars.

---

## File Structure

- Create: `app/(en)/en/feedback/page.tsx` — route entry, sets metadata, renders `FeedbackPage`
- Create: `components/pages/feedback.tsx` — page layout (hero band + form), follows `components/pages/join.tsx` pattern
- Create: `components/feedback-form.tsx` — client form component (feedback, suggestions, optional contact fields)
- Create: `components/feedback-cta-button.tsx` — floating bottom-right button, client component (needs `usePathname` to avoid showing on the `/feedback` page itself... actually simplest: always show it, linking to `/en/feedback`; no need to hide on the feedback page itself per spec, but we'll skip rendering it there to avoid a button linking to the current page)
- Create: `app/api/feedback/route.ts` — API route, mirrors `app/api/register-interest/route.ts`
- Modify: `components/site-shell.tsx` — render `<FeedbackCtaButton />` inside `SiteShell`

## Task 1: API route for feedback submissions

**Files:**
- Create: `app/api/feedback/route.ts`

- [ ] **Step 1: Create the API route file**

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { feedback, suggestions, name, email, whatsapp } = body;

    if (!feedback || !suggestions) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      typeof feedback !== "string" ||
      typeof suggestions !== "string" ||
      (name !== undefined && typeof name !== "string") ||
      (email !== undefined && typeof email !== "string") ||
      (whatsapp !== undefined && typeof whatsapp !== "string")
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid input types" },
        { status: 400 }
      );
    }

    const nameValue = String(name ?? "").trim();
    const emailValue = String(email ?? "").trim();
    const whatsappValue = String(whatsapp ?? "").trim();

    if (
      feedback.length > 1000 ||
      suggestions.length > 1000 ||
      nameValue.length > 100 ||
      emailValue.length > 100 ||
      whatsappValue.length > 20
    ) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedback: escapeJson(feedback),
        suggestions: escapeJson(suggestions),
        name: escapeJson(nameValue),
        email: escapeJson(emailValue),
        whatsapp: escapeJson(whatsappValue),
      }),
    });

    if (!response.ok) {
      console.error("Google Sheets webhook error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { success: false, error: "Failed to record feedback" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

function escapeJson(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
  };
  return text.replace(/[&<>"'\n\r\t]/g, (char) => map[char]);
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/api/feedback/route.ts
git commit -m "Add feedback API route forwarding to Google Sheets webhook"
```

## Task 2: Feedback form component

**Files:**
- Create: `components/feedback-form.tsx`

- [ ] **Step 1: Create the form component**

```tsx
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
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const input =
    "w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 transition-all duration-200 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300 focus:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  if (success) {
    return <p className="text-sm text-green-700 font-medium">{copy.success}</p>;
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

      {error && <p className="text-sm text-red-700 font-medium">{copy.error}</p>}
    </form>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/feedback-form.tsx
git commit -m "Add feedback form component"
```

## Task 3: Feedback page

**Files:**
- Create: `components/pages/feedback.tsx`
- Create: `app/(en)/en/feedback/page.tsx`

- [ ] **Step 1: Create the page-level component**

```tsx
import { Eyebrow, SectionBand } from "@/components/ui";
import { FeedbackForm } from "@/components/feedback-form";

export function FeedbackPage() {
  return (
    <SectionBand tint>
      <Eyebrow>Feedback</Eyebrow>
      <h1 className="font-serif text-4xl text-stone-800 mt-3">Share your feedback</h1>
      <p className="text-stone-600 mt-4 max-w-2xl leading-relaxed">
        Your voice matters to us. Tell us what you like, what we could do better, and what you&apos;d
        like to see next.
      </p>
      <div className="max-w-2xl mt-8">
        <FeedbackForm />
      </div>
    </SectionBand>
  );
}
```

- [ ] **Step 2: Create the route entry**

```tsx
import type { Metadata } from "next";
import { FeedbackPage } from "@/components/pages/feedback";

export const metadata: Metadata = {
  title: "Share your feedback",
  description: "Tell us what you like, what we could improve, and what you'd like to see on the site.",
  alternates: { canonical: "/en/feedback" },
};

export default function Page() {
  return <FeedbackPage />;
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add components/pages/feedback.tsx "app/(en)/en/feedback/page.tsx"
git commit -m "Add /en/feedback page"
```

## Task 4: Floating feedback CTA button

**Files:**
- Create: `components/feedback-cta-button.tsx`
- Modify: `components/site-shell.tsx`

- [ ] **Step 1: Create the floating button component**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FeedbackCtaButton() {
  const pathname = usePathname();
  if (pathname === "/en/feedback") return null;

  return (
    <Link
      href="/en/feedback"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-orange-600 text-orange-50 shadow-lg hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-out"
    >
      Share Feedback
    </Link>
  );
}
```

- [ ] **Step 2: Render it from the site shell**

In `components/site-shell.tsx`, add the import:

```typescript
import { FeedbackCtaButton } from "./feedback-cta-button";
```

Then modify the return statement of `SiteShell` (currently `components/site-shell.tsx:62-73`) to render the button after `<Analytics />`:

```tsx
export function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={organizationJsonLd()} />
      <EventDayBanner locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <CookieConsent locale={locale} />
      <Analytics />
      <FeedbackCtaButton />
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add components/feedback-cta-button.tsx components/site-shell.tsx
git commit -m "Add floating Share Feedback CTA button to site shell"
```

## Task 5: Manual verification on local dev server

**Files:** none (verification only)

- [ ] **Step 1: Start dev server and check the button renders on every page**

Run: `npm run dev`, visit `http://localhost:3000`, `http://localhost:3000/en`, `http://localhost:3000/en/evenimente`, `http://localhost:3000/galerie` (RO page).
Expected: "Share Feedback" button visible bottom-right on all of them, and absent only on `/en/feedback` itself.

- [ ] **Step 2: Verify the form page**

Visit `http://localhost:3000/en/feedback`.
Expected: page renders with feedback textarea, suggestions textarea, optional name/email/whatsapp fields, and a "Send Feedback" button.

- [ ] **Step 3: Verify required-field validation**

Click "Send Feedback" with both textareas empty.
Expected: inline error message appears, no network request succeeds (check with the browser's network tab that no 200 was returned, or that no request was sent since the client-side check short-circuits).

- [ ] **Step 4: Verify submission with the Google Sheets webhook not yet configured**

Fill in feedback and suggestions, submit.
Expected (until `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL` is set in `.env.local`): the request returns a 500 "Server misconfigured" and the form shows the inline error message. This confirms the route's validation and error path work correctly before the webhook exists.

- [ ] **Step 5: Commit is not needed for this task (verification only)**

## Task 6: Google Sheet + Apps Script webhook setup (user-led)

**Files:** none (external Google account setup)

This task requires the user's Google account access and cannot be done by an agent alone.

- [ ] **Step 1: Create a new Google Sheet**

Owned by `contact.tinericrestini@gmail.com`. Add header row: `Timestamp | Feedback | Suggestions | Name | Email | WhatsApp`.

- [ ] **Step 2: Create the Apps Script Web App**

In the Sheet: Extensions → Apps Script. Paste a script that reads the POSTed JSON body and appends a row with `new Date().toISOString()` plus the five fields, in the same column order as the header row. Deploy as a Web App (Execute as: Me, Who has access: Anyone).

- [ ] **Step 3: Copy the deployment's `/exec` URL**

This is `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL`.

- [ ] **Step 4: Add the env var locally**

Append to `.env.local` (gitignored):

```
GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL=<paste the /exec URL here>
```

- [ ] **Step 5: Add the env var to Vercel staging and production**

```bash
cd /tmp/tinerii-staging && npx vercel env add GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL production
cd ~/Desktop/tinerii-lui-dumnezeu-uk && npx vercel env add GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL production
```

Paste the same `/exec` URL when prompted for each.

- [ ] **Step 6: Re-run Task 5, Step 4 locally with the webhook now configured**

Submit the form again with `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL` set in `.env.local` (restart `npm run dev` first so the new env var loads).
Expected: success message displays, and a new row appears in the Google Sheet with the submitted values and a timestamp.

## Task 7: Deploy to staging and verify end-to-end

**Files:** none (deploy + verification)

- [ ] **Step 1: Push the feature branch changes to staging**

```bash
cd ~/Desktop/tinerii-lui-dumnezeu-uk && git push origin staging
```

- [ ] **Step 2: Pull and deploy the staging Vercel project**

```bash
cd /tmp/tinerii-staging && git pull && npx vercel --prod --yes
```

- [ ] **Step 3: Verify on the staging URL**

Visit `https://tinerii-lui-dumnezeu-uk-staging.vercel.app`, confirm the floating button appears, navigate to `/en/feedback`, submit a real test entry, and confirm it lands in the Google Sheet.

- [ ] **Step 4: Wait for user approval before merging `staging` into `main` or deploying production**

Per the project's standing workflow rule: only deploy production when the user explicitly says so.

---

## Self-Review Notes

**Spec coverage:**
- Floating CTA button, bottom-right, all pages → Task 4 ✅
- Dedicated `/feedback` (English-only) page → Task 3 ✅
- Two required textareas with specified copy → Task 2 ✅
- Optional contact details (name, email, whatsapp) with helper text → Task 2 ✅
- API route validation + Google Sheets webhook forwarding → Task 1 ✅
- Google Sheet columns `Timestamp, Feedback, Suggestions, Name, Email, WhatsApp` → Task 6 ✅
- Success/error messaging → Task 2 ✅
- Staging verification before production → Task 7 ✅

**Type consistency:** `feedback`, `suggestions`, `name`, `email`, `whatsapp` field names match exactly across `feedback-form.tsx` (FormData keys), `app/api/feedback/route.ts` (destructured body fields), and the Google Sheet header row order in Task 6.

**No placeholders:** all code blocks are complete and copy-pasteable; Task 6 is inherently manual (Google account setup) and is explicitly scoped as user-led with exact commands where automatable.
