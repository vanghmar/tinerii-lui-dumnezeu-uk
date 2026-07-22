# Feedback Form — Design Spec

Date: 2026-07-22

## Purpose

Add a feedback and suggestions form to the tinerii-lui-dumnezeu-uk site, enabling youth to share what they like, what can be improved, and what they'd like to see on the site. Submissions are captured in a Google Sheet for organizers to review and act on.

## Placement & Navigation

- **Floating CTA button** positioned at the bottom-right of every page (sticky, visible while scrolling)
- Button text: **"Share Feedback"**
- Clicking navigates to a dedicated page at `/feedback` (English only)
- Button is rendered from the main site shell (`site-shell.tsx`) so it appears on all routes

## Form Structure

The feedback form contains two required text fields and one optional contact details section:

| Field | Type | Required | Notes |
|---|---|---|---|
| Feedback | textarea | yes | Prompt: "We would like to hear your feedback — what do you like, and what can we improve?" |
| Suggestions | textarea | yes | Prompt: "What would you like to see or have on the site?" |
| Name | text | no | Part of optional contact details section |
| Email | text | no | Part of optional contact details section |
| WhatsApp | text | no | Part of optional contact details section |

**Contact Details** are grouped under an optional section with helper text: *"Leave this blank if you'd prefer to stay anonymous. We'll use this only to follow up on your ideas."*

## Interaction Flow

1. User clicks "Share Feedback" floating button (visible on any page)
2. Navigates to `/feedback` page
3. Fills in feedback and suggestions (required)
4. Optionally fills in contact details (name, email, WhatsApp)
5. Clicks "Send Feedback"
6. Form POSTs `{ feedback, suggestions, name, email, whatsapp, timestamp }` to API route
7. On success: "Thank you for your feedback, we will be in touch" message displays for ~2s, then page resets or navigates back
8. On failure: inline error message, form stays open for retry

## Technical Design

### New Page: `/feedback`

- **File:** `app/(en)/feedback/page.tsx` (English-only route)
- **Component:** `components/pages/feedback.tsx`
- Contains the feedback form, follows existing page layout patterns (site-shell wrapper, responsive design)

### New Component: `components/feedback-form.tsx`

- Client-side form component with state management (loading, success, error)
- Renders two required textareas + optional contact fields
- Handles form submission, client-side validation
- Shows success/error messages
- Mirrors patterns from `register-interest-button.tsx` and `contact-form.tsx`

### New Floating Button: `components/feedback-cta-button.tsx`

- Positioned `fixed bottom-right` with Tailwind classes
- Sticky, visible at all screen sizes
- Navigates to `/feedback` on click
- Rendered from `site-shell.tsx` on every page

### New API Route: `app/api/feedback/route.ts`

- Accepts POST with `{ feedback, suggestions, name, email, whatsapp }`
- Validates: `feedback` and `suggestions` required (min 1 char, max 1000 chars each)
- Optional fields: `name` (max 100), `email` (max 100), `whatsapp` (max 20)
- Adds `timestamp: new Date().toISOString()` server-side
- Escapes/sanitizes all text to prevent injection
- Forwards payload to Google Sheets webhook URL (env var: `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL`)
- Returns `{ success: true }` on success, `{ error: "message" }` on failure
- Mirrors validation and error handling from `app/api/register-interest/route.ts`

### Google Sheets Integration

- **New Google Sheet** owned by `contact.tinericrestini@gmail.com`
- **Apps Script Web App** deployed as the webhook receiver
- **Columns:** `Timestamp`, `Feedback`, `Suggestions`, `Name`, `Email`, `WhatsApp`
- **Webhook URL** stored in:
  - `.env.local` (local development) — gitignored
  - Vercel staging environment variables (`tinerii-lui-dumnezeu-uk-staging`)
  - Vercel production environment variables (`tinerii-lui-dumnezeu-uk`)
- **Env var name:** `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL`

### Environment Variables Needed

- `GOOGLE_SHEETS_FEEDBACK_WEBHOOK_URL` — new, requires manual Google Sheet + Apps Script setup (user-led, similar to register-interest webhook)

## Styling

- Follows existing site design system: white base, orange-600/700 accents, Lora serif headings, Inter body text
- Form inputs/textareas use existing Tailwind classes (consistent with `register-interest-button.tsx` and `contact-form.tsx`)
- Floating button: orange pill-shaped (`bg-orange-600 hover:bg-orange-700`, `rounded-full`)
- Responsive on mobile (textareas stack vertically, button stays visible at bottom-right)
- Dark mode: respects `prefers-color-scheme` if site supports it (follow existing patterns)

## Out of Scope

- No file/photo uploads (deferred to future phase)
- No bilingual RO/EN version (English only for this form)
- No admin dashboard — organizers read feedback directly from the Google Sheet
- No automated email notifications (feedback arrives only in sheet; organizers can enable Google Sheet notifications manually if desired)
- No duplicate-submission prevention beyond basic client-side form disable-on-submit

## Testing Plan

- Type-check with `npx tsc --noEmit`
- Manually verify floating button appears on all pages
- Manually verify clicking button navigates to `/feedback` page
- Manually verify form fields render and are responsive on mobile/desktop
- Manually verify form submission (required field validation, optional fields work, success/error messages)
- Manually verify submission data lands correctly in the Google Sheet with timestamp
- Verify on staging environment before merging to production

