# Register Interest for Events — Design Spec

Date: 2026-07-22

## Purpose

Add a "Register my interest" CTA that lets visitors express interest in a specific upcoming event, without committing to a full RSVP flow. Captures lightweight contact info into a Google Sheet the organizers can follow up from.

## Placement

The CTA button appears in two places:

1. **Events listing page** (`/evenimente`) — on each upcoming event's card
2. **Event detail page** (`/evenimente/[slug]`) — as a CTA on the event's own page

Both placements open the same modal, pre-scoped to the event the user clicked from.

## Form Fields

Modal contains a single-language (English only) form:

| Field | Type | Required |
|---|---|---|
| Name | text | yes |
| Prename | text | yes |
| How we should contact you | free text | yes |
| Church or Other | free text | yes |

Plus a hidden field carrying the event's `slug`, captured automatically from the page context the user clicked from — not user-editable.

## Interaction Flow

1. User clicks "Register my interest" on a listing card or detail page.
2. Modal opens over the current page (no navigation).
3. User fills the 4 fields and submits.
4. Form POSTs `{ name, prename, contactMethod, church, eventSlug, timestamp }` to a new API route.
5. API route forwards the payload to a Google Sheets webhook (Apps Script Web App).
6. On success: modal shows "Thank you for your interest, we will be in touch" for ~2s, then auto-closes.
7. On failure: inline error message in the modal, form stays open so the user can retry.

## Technical Design

### New component: `components/event-interest-modal.tsx`
- Controlled modal (open/close state lifted to whichever parent renders the trigger button)
- Reuses existing UI primitives from `components/ui.tsx` where applicable (buttons, inputs) — follow `contact-form.tsx` patterns for consistency
- Receives `eventSlug` and `eventTitle` as props so the modal can say "Registering interest for: {eventTitle}"

### New trigger button
- Added to `components/event-card.tsx` (listing) and `components/pages/event-detail.tsx` (or wherever the detail page renders the CTA area)
- Button opens the modal, passing the event's slug/title

### New API route: `app/api/register-interest/route.ts`
- Mirrors the existing `app/api/contact/route.ts` pattern
- Validates required fields server-side
- Forwards to Google Sheets webhook URL stored in `GOOGLE_SHEETS_INTEREST_WEBHOOK_URL` env var
- Returns success/failure JSON

### Google Sheets integration
- New Google Sheet owned by `contact.tinericrestini@gmail.com`
- Apps Script Web App deployed as the webhook, columns: Timestamp, Name, Prename, Contact Method, Church/Other, Event Slug
- Webhook URL stored in `.env.local` (gitignored) and as a Vercel production env var on both the production and staging Vercel projects
- This is a **new** webhook, separate from the TT Classic project's Google Sheets webhook mentioned in global config — different site, different sheet

### Env vars needed
- `GOOGLE_SHEETS_INTEREST_WEBHOOK_URL` — new, needs to be created during implementation with the user's help (Apps Script setup requires interactive Google account steps)

## Styling

- Follows existing site design system: white base, orange-600/700 accents, Lora/Inter fonts, pill buttons
- Modal follows standard overlay pattern (dim background, centered card, close button, Escape/click-outside to dismiss)

## Out of Scope

- No email confirmation to the user (WhatsApp/email contact flow already exists separately for direct contact)
- No bilingual RO/EN support for this specific form (per user decision — English only)
- No duplicate-submission prevention beyond basic client-side disable-on-submit
- No admin dashboard — organizers read directly from the Google Sheet

## Testing Plan

- Type-check with `npx tsc --noEmit`
- Manually verify modal opens/closes correctly from both trigger locations
- Manually verify a test submission lands correctly in the Google Sheet
- Verify on both mobile and desktop viewport widths
- Verify on the staging environment (`tinerii-lui-dumnezeu-uk-staging.vercel.app`) before merging to `main`
