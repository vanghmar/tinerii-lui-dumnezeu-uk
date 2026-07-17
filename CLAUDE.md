# Tinerii lui Dumnezeu UK — Project Documentation

## Project Overview

**Name:** Tinerii lui Dumnezeu UK  
**Purpose:** Bilingual (Romanian/English) community website for young people from Romanian Baptist churches across the United Kingdom. Showcases gatherings, events, participating churches, photos, and educational resources.

**Live:** https://tinerii-lui-dumnezeu-uk.vercel.app  
**Custom domain:** tinericrestini.uk (registered on Vercel, DNS propagating)

---

## Current Status

### ✅ Completed
- **Core site structure** — full bilingual routing (RO/EN) via Next.js 16 route groups `(ro)` and `(en)/en`
- **All main pages** — Home, About, Events, Churches, Gallery, Resources, Join (Contact form)
- **Static data layer** — Single source of truth: churches.ts, events.ts, gallery.ts, resources.ts
- **Gallery system** — Photo sections auto-organized; event detail pages pull photos from gallery via `getEventPhotos` helper
- **Church profiles** — 6 churches with addresses, pastors, websites, social links (Instagram/YouTube)
- **Events** — Past and upcoming gatherings with posters, themes, Bible verses, standardized times (11:00–19:00)
- **Contact form** — WhatsApp integration (no email backend needed yet)
- **Church leader names** — Pastors/leaders added: Gratian Vandici, Cristi Tiplea, Dumitru Budac, Florin Baci
- **Deployment pipeline** — Vercel auto-deploy on main branch push

### 🔄 In Progress / Recently Added
- **Domain:** tinericrestini.uk registered on Vercel, awaiting DNS propagation from Namecheap
- **Resources page** — Curated YouTube links (shorts, preaches, channels) shared in community WhatsApp group

### ⏸️ On Hold
- Email contact system (currently "Email: coming soon" placeholder; WhatsApp handles all inbound messages)

---

## Architecture & File Structure

```
tinerii-lui-dumnezeu-uk/
├── app/                           # Next.js 16 App Router
│   ├── (ro)/                      # Romanian route group
│   │   ├── alatura-te/            # Join/Contact page
│   │   ├── biserici/              # Churches directory & detail pages
│   │   ├── despre/                # About page
│   │   ├── evenimente/            # Events listing & detail pages
│   │   ├── galerie/               # Gallery page
│   │   └── resurse/               # Resources/recommended links
│   ├── (en)/en/                   # English route group (nested under /en)
│   │   └── [all of above]         # Parallel structure in English
│   └── layout.tsx                 # Root layout, metadata, nav
│
├── components/                     # Reusable React components
│   ├── pages/                     # Page-level components (by route)
│   │   ├── home.tsx
│   │   ├── about.tsx
│   │   ├── church-detail.tsx
│   │   ├── church-list.tsx
│   │   ├── event-detail.tsx
│   │   ├── gallery.tsx
│   │   └── resources.tsx
│   ├── site-shell.tsx             # Navigation, header, footer wrapper
│   ├── event-card.tsx             # Event summary card component
│   ├── church-card.tsx            # Church summary card
│   ├── gallery-grid.tsx           # Photo grid with lightbox
│   ├── contact-form.tsx           # WhatsApp contact form
│   ├── lang-toggle.tsx            # RO/EN language switcher
│   ├── mobile-nav.tsx             # Mobile menu
│   ├── ui.tsx                     # Shared UI primitives (Card, Button, Section, etc.)
│   └── icons.tsx                  # SVG icon components
│
├── data/                          # Static data layer — single source of truth
│   ├── types.ts                   # TypeScript interfaces (Church, Event, GalleryImage, etc.)
│   ├── churches.ts                # 6 Romanian Baptist churches
│   ├── events.ts                  # Past and upcoming gatherings
│   ├── gallery.ts                 # Photo metadata organized by section/eventSlug
│   └── resources.ts               # Curated YouTube links (shorts, preaches, channels)
│
├── lib/                           # Helper utilities
│   ├── events.ts                  # Event helpers: getUpcomingEvents(), getPastEvents(), getEventPhotos(), formatEventDate(), formatEventTimeRange()
│   ├── i18n.ts                    # Bilingual: t(dict, locale), localePath(locale, path)
│   └── fonts.ts                   # Font configuration (Bebas Neue, Inter)
│
├── public/
│   ├── gallery/                   # Event photos organized by folder
│   ├── churches/                  # Church building photos
│   ├── events/                    # Event posters
│   └── images/                    # Hero, bilingual Bible, etc.
│
└── tailwind.config.ts, tsconfig.json, package.json, etc.
```

---

## Key Files & Responsibilities

### Data Layer (Single Source of Truth)

| File | Purpose |
|------|---------|
| `data/types.ts` | TypeScript interfaces: Event, Church, GalleryImage, Resource |
| `data/churches.ts` | 6 participating churches (Birmingham, Hemel Hempstead, Leyton, Ipswich, Northampton, High Wycombe) |
| `data/events.ts` | All gatherings with dates, themes, Bible verses, posters, host churches |
| `data/gallery.ts` | Photo metadata; each photo tagged with `eventSlug` for automatic event page display |
| `data/resources.ts` | Curated YouTube videos organized by category |

### Lib Utilities

| File | Key Functions |
|------|---|
| `lib/events.ts` | `getUpcomingEvents()` / `getPastEvents()` — filter by date<br/>`getEventPhotos(slug)` — derive event photos from gallery<br/>`formatEventDate()` / `formatEventTimeRange()` — 11:00–19:00 display<br/>`daysUntil()` — countdown |
| `lib/i18n.ts` | `t(dict, locale)` — bilingual text lookup<br/>`localePath(locale, path)` — construct RO/EN paths |

### Components

| Component | Purpose |
|-----------|---------|
| `event-card.tsx` | Event summary: title, date, time range, church, CTA |
| `church-card.tsx` | Church name, city, latest event |
| `gallery-grid.tsx` | Responsive photo grid; lightbox with preload optimization |
| `contact-form.tsx` | Name, contact, message → WhatsApp wa.me link |
| `ui.tsx` | Shared UI primitives (Card, Button, SectionBand, etc.) |

### Pages

All routes are bilingual (available under `/ro/...` and `/en/...`):

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | home.tsx | Hero, next event, pillars, recent photos |
| `/despre` | about.tsx | Mission, bilingual Bible image |
| `/evenimente` | event-list.tsx | Upcoming & past events |
| `/evenimente/[slug]` | event-detail.tsx | Event detail with photos from gallery |
| `/biserici` | church-list.tsx | List of 6 churches |
| `/biserici/[id]` | church-detail.tsx | Church info, pastor, socials, hosted events |
| `/galerie` | gallery.tsx | Full gallery organized by event/section |
| `/resurse` | resources.tsx | YouTube resources |
| `/alatura-te` | join.tsx | Contact form (WhatsApp) |

---

## Key Technologies

- **Next.js 16.2.9** — React framework with App Router
- **React 19.2.4** — UI library
- **TypeScript 5** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Vercel** — Hosting with auto-deploy on `git push origin main`

---

## Branding

- **Colors:** Dark (#030303), accent red (#E10600)
- **Fonts:** Bebas Neue (display), Inter (body)
- **Tagline:** "Drop the Knife. Save Lives." (sacred)
- **Name:** "TT Classic" (never "TT Strong")

---

## Current Blockers & Issues

None. All features working; domain DNS propagating.

---

## Next Immediate Steps

1. **DNS Propagation** — tinericrestini.uk will be live once Namecheap records propagate (typically 15 min–2 hours)
2. **Email Integration (future)** — Replace WhatsApp placeholder with email backend when needed
3. **Gallery Tagging (optional)** — Tag existing High Wycombe photos with `eventSlug` to display on event page
4. **Church Images (optional)** — Add interior photos for churches without building images

---

## Standing Workflow Rules

### Do NOT auto-deploy
Only deploy when user explicitly says "deploy" / "push live" / "upload to vercel".

### Type-check before committing
```bash
npx tsc --noEmit  # Always run first
```

### UPDATEGALLERY command
When user types `UPDATEGALLERY`:
1. Scan `public/gallery/` for new photo folders or photos
2. Scan `public/churches/` for new church images
3. Update `data/gallery.ts` and/or `data/churches.ts` accordingly
4. Commit and deploy

### Useful Commands
```bash
npm run dev                              # Local dev
npx tsc --noEmit                         # Type check
git push origin main                     # Push to GitHub
npx vercel --prod --yes                  # Deploy to production
npx vercel domains inspect tinericrestini.uk  # Check domain status
```

---

## Contact & Stakeholders

- **User:** Marian Vanghele (marianvanghelie66@gmail.com)
- **Primary Focus:** Youth ministry community, bilingual content, photo gallery
- **Deployment:** Vercel (https://tinerii-lui-dumnezeu-uk.vercel.app)
