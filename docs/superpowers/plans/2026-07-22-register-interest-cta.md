# Register Interest for Events — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Register my interest" CTA button to event listing cards and event detail pages that opens a modal form, and forward submissions to a Google Sheet via a new API route and Apps Script webhook.

**Architecture:** A single self-contained client component (`RegisterInterestButton`) renders both the trigger button and its modal, holding its own open/closed state. It POSTs to a new Next.js API route (`/api/register-interest`), which validates input server-side and forwards it to a Google Sheets Apps Script webhook URL stored in an env var. The button is dropped into `event-card.tsx` and `event-detail.tsx`, gated to upcoming events only.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Google Apps Script (Web App) for the Sheets webhook.

**Spec:** `docs/superpowers/specs/2026-07-22-register-interest-cta-design.md`

---

## Task 1: Google Sheet + Apps Script webhook (manual setup, user-assisted)

This task has no code — it produces the webhook URL needed by Task 3. The engineer must walk the user through this interactively; it cannot be scripted end-to-end because it requires an authenticated Google session.

- [ ] **Step 1: Create the Google Sheet**

Ask the user to open Google Sheets while signed in as `contact.tinericrestini@gmail.com`, create a new blank sheet, and name it "Tinerii lui Dumnezeu — Event Interest Registrations". In row 1, add these column headers exactly:

```
Timestamp | Name | Prename | Contact Method | Church or Other | Event Slug
```

- [ ] **Step 2: Create the Apps Script Web App**

In the sheet, go to Extensions → Apps Script. Replace the default `Code.gs` content with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.prename || "",
    data.contactMethod || "",
    data.church || "",
    data.eventSlug || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Save the script (name it "Interest Registration Webhook").

- [ ] **Step 3: Deploy as Web App**

Click Deploy → New deployment → select type "Web app". Set:
- Execute as: **Me** (contact.tinericrestini@gmail.com)
- Who has access: **Anyone**

Click Deploy, authorize the requested permissions (the account owner must click through the Google OAuth consent screen), and copy the resulting Web App URL — it looks like `https://script.google.com/macros/s/AKfycb.../exec`.

- [ ] **Step 4: Record the webhook URL**

Give the copied URL to the engineer/agent so it can be added to env vars in Task 3. Do not commit this URL to git — it's a secret-adjacent value (anyone with it can write rows into the sheet).

---

## Task 2: Add `RegisterInterestButton` component

**Files:**
- Create: `components/register-interest-button.tsx`

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { CloseIcon } from "./icons";

const copy = {
  cta: "Register my interest",
  title: "Register your interest",
  subtitle: (eventTitle: string) => `You're registering interest for: ${eventTitle}`,
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

  function closeModal() {
    setOpen(false);
    setSuccess(false);
    setError(false);
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

    try {
      const response = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, prename, contactMethod, church, eventSlug }),
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
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-stone-800">{copy.title}</h3>
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
```

Note: `eventTitle` is passed as a plain string (already localized by the caller via `t(event.title, locale)`), since this component's own copy is English-only per the spec.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `register-interest-button.tsx`

- [ ] **Step 3: Commit**

```bash
git add components/register-interest-button.tsx
git commit -m "Add RegisterInterestButton component with modal form"
```

---

## Task 3: Add API route forwarding to Google Sheets

**Files:**
- Create: `app/api/register-interest/route.ts`
- Modify: `.env.local` (gitignored, not committed)

- [ ] **Step 1: Write the API route**

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, prename, contactMethod, church, eventSlug } = body;

    if (!name || !prename || !contactMethod || !church || !eventSlug) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      name.length > 200 ||
      prename.length > 200 ||
      contactMethod.length > 200 ||
      church.length > 200 ||
      eventSlug.length > 200
    ) {
      return NextResponse.json(
        { success: false, error: "Input too long" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_INTEREST_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_INTEREST_WEBHOOK_URL is not set");
      return NextResponse.json(
        { success: false, error: "Server misconfigured" },
        { status: 500 }
      );
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, prename, contactMethod, church, eventSlug }),
    });

    if (!response.ok) {
      console.error("Google Sheets webhook error:", response.status);
      return NextResponse.json(
        { success: false, error: "Failed to record interest" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Register interest error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Add the env var locally**

Append to `.env.local` (create the file if it doesn't exist; it's already gitignored):

```
GOOGLE_SHEETS_INTEREST_WEBHOOK_URL=<the URL captured in Task 1, Step 4>
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `register-interest/route.ts`

- [ ] **Step 4: Manual local test**

Run: `npm run dev`, then in another terminal:

```bash
curl -X POST http://localhost:3000/api/register-interest \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","prename":"User","contactMethod":"07000000000","church":"Test Church","eventSlug":"test-event"}'
```

Expected: `{"success":true}` and a new row appears in the Google Sheet from Task 1.

- [ ] **Step 5: Commit**

```bash
git add app/api/register-interest/route.ts
git commit -m "Add register-interest API route forwarding to Google Sheets webhook"
```

(`.env.local` is gitignored and won't be committed — that's expected.)

---

## Task 4: Wire the button into event listing cards

**Files:**
- Modify: `components/event-card.tsx`

- [ ] **Step 1: Add the import and render the button for upcoming events only**

In `components/event-card.tsx`, add the import at the top:

```tsx
import { RegisterInterestButton } from "./register-interest-button";
```

Then locate the `<Link href={localePath(locale, ...` block near the end of the component (lines 74-80) and add the button just before it, gated by `upcoming`:

```tsx
      {upcoming && (
        <div className="mt-3">
          <RegisterInterestButton eventSlug={event.slug} eventTitle={t(event.title, locale)} />
        </div>
      )}
      <Link
        href={localePath(locale, `/evenimente/${event.slug}`)}
        className="group inline-flex items-center gap-1.5 text-sm text-orange-700 hover:text-orange-800 mt-3"
      >
        {locale === "ro" ? "Vezi detalii" : "View details"}
        <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
```

Also add `t` to the existing `import { localePath, t, type Locale } from "@/lib/i18n";` line — check whether `t` is already imported (it is, per the current file at line 5), so no change needed there.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `event-card.tsx`

- [ ] **Step 3: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000/en/evenimente`, confirm the "Register my interest" button appears on upcoming event cards and not on past ones.

- [ ] **Step 4: Commit**

```bash
git add components/event-card.tsx
git commit -m "Add register-interest CTA to event listing cards"
```

---

## Task 5: Wire the button into the event detail page

**Files:**
- Modify: `components/pages/event-detail.tsx`

- [ ] **Step 1: Add the import**

At the top of `components/pages/event-detail.tsx`, add:

```tsx
import { RegisterInterestButton } from "@/components/register-interest-button";
```

- [ ] **Step 2: Render the button in the hero section for upcoming events**

Locate the block starting at line 54 (`{upcoming && (today ? (`) which ends around line 62. Immediately after that closing `)}` (still inside the `<div className="flex-1">` from line 43), add:

```tsx
            {upcoming && (
              <div className="mt-6">
                <RegisterInterestButton eventSlug={event.slug} eventTitle={t(event.title, locale)} />
              </div>
            )}
```

The surrounding context should look like:

```tsx
            {upcoming && (today ? (
              <p className="text-orange-700 font-medium mt-1">{t(copy.today, locale)}</p>
            ) : (
              days > 0 && (
                <p className="text-orange-700 mt-1">
                  {days} {t(copy.inDays, locale)}
                </p>
              )
            ))}
            {upcoming && (
              <div className="mt-6">
                <RegisterInterestButton eventSlug={event.slug} eventTitle={t(event.title, locale)} />
              </div>
            )}
            {!upcoming && event.gratitudeIntro && (() => {
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors mentioning `event-detail.tsx`

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open an upcoming event's detail page (e.g. `http://localhost:3000/en/evenimente/2026-09-ipswich`), confirm the button appears in the hero area, opens the modal, and the modal subtitle shows the correct event title.

- [ ] **Step 5: Commit**

```bash
git add components/pages/event-detail.tsx
git commit -m "Add register-interest CTA to event detail page"
```

---

## Task 6: Add env var to Vercel (staging + production)

**Files:** none (Vercel dashboard/CLI configuration only)

- [ ] **Step 1: Add to staging project**

```bash
cd /tmp/tinerii-staging
npx vercel env add GOOGLE_SHEETS_INTEREST_WEBHOOK_URL production
```

When prompted, paste the webhook URL from Task 1, Step 4.

- [ ] **Step 2: Add to production project**

```bash
cd ~/Desktop/tinerii-lui-dumnezeu-uk
npx vercel env add GOOGLE_SHEETS_INTEREST_WEBHOOK_URL production
```

When prompted, paste the same webhook URL.

- [ ] **Step 3: Verify**

```bash
npx vercel env ls
```

Expected: `GOOGLE_SHEETS_INTEREST_WEBHOOK_URL` listed for the Production environment.

---

## Task 7: Deploy to staging and verify end-to-end

**Files:** none

- [ ] **Step 1: Push staging branch and deploy**

```bash
cd ~/Desktop/tinerii-lui-dumnezeu-uk
git push origin staging
cd /tmp/tinerii-staging
git pull
npx vercel --prod --yes
```

- [ ] **Step 2: Manual test on staging URL**

Open `https://tinerii-lui-dumnezeu-uk-staging.vercel.app/en/evenimente`, click "Register my interest" on an upcoming event, submit the form with test data, and confirm:
- The modal shows the success message and closes after ~2 seconds
- A new row appears in the Google Sheet with the correct event slug

- [ ] **Step 3: Mobile viewport check**

Using the browser's device toolbar (or `resize_window` if using the Claude Browser tool), resize to 375x812 and repeat Step 2 to confirm the modal renders correctly on mobile.

At this point the feature is verified on staging. Production deployment happens only when the user explicitly approves merging `staging` into `main`, per the project's standing staging workflow — this is a separate, later step outside this plan.
