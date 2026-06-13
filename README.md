# Tinerii lui Dumnezeu UK — website

Site-ul mișcării de tineret a bisericilor baptiste române din UK.
Static Next.js site — no database. All content lives in `data/`.

## How to update content

1. **New event**: add an object to `data/events.ts` (copy an existing one). Status (upcoming/past) is automatic from the date.
2. **After an event**: edit the same event — add `summary` and `photos`.
3. **Churches**: edit `data/churches.ts`. ⚠️ Current entries are SAMPLE data — replace with pastor-approved details.
4. **Photos**: put files in `public/gallery/`, then list them in `data/gallery.ts` (or in an event's `photos`). Every entry requires `consentChecked: true` — only set it after the consent process below.
5. Deploy: `git add -A && git commit -m "update" && git push` (Vercel auto-deploys), or `npx vercel --prod`.

## Photo consent process (do not skip)

1. Curate candidates (prefer wide group shots; no close-ups of identifiable minors).
2. Pastor/organiser reviews the set.
3. Parents confirm for any identifiable minor.
4. Strip metadata: `exiftool -all= photo.jpg` (or export via Preview/sips).
5. Never attach full names to photos of young people.
6. Removal requests: delete from the data file and redeploy within 24h.

Announcement for events:
> „La întâlnirile noastre facem fotografii care pot apărea pe site-ul și paginile noastre. Dacă nu doriți ca dumneavoastră sau copilul dumneavoastră să apară în fotografii publicate, vă rugăm să anunțați un organizator. Fotografiile cu minori în prim-plan sunt publicate doar cu acordul părinților."

## Before launch checklist

- [ ] Replace sample churches and events with real, approved data
- [ ] Set the real contact email in `components/contact-form.tsx` (and webhook URL when ready)
- [ ] Update the domain in `app/sitemap.ts`
- [ ] Pastor review of all church entries

## Development

```bash
npm run dev    # local dev at http://localhost:3000
npm run build  # production build (all pages static)
```
