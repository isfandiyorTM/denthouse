# Master Dent Repair — Mobile Paintless Dent Repair, Dubai & Sharjah

Landing page for a paintless dent repair (PDR) business in Dubai. It's a single fast page,
prerendered to static HTML so Google can read every word. It's built to turn visitors
into WhatsApp messages and phone calls.

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/  (prerendered HTML + sitemap + robots.txt)
npm run preview   # serve the production build locally
```

---

## 1. Before going live: put in the real details

**All company info lives in one file: [`src/data/business.js`](src/data/business.js).**
Every value marked `TODO` is a placeholder. The page text, buttons, map, opening hours and
Google structured data are all generated from it.

| What | Where | Notes |
|---|---|---|
| Name, phone, WhatsApp, email | `business.js` → `contact` | WhatsApp = digits only, e.g. `971501234567` |
| Service area | `business.js` → `serviceCities` + text in `src/i18n/*.js` | Mobile only (no workshop): Dubai and Sharjah |
| Opening hours | `business.js` → `hours` | Drives the live "Open now / Closed" badge (Dubai time) |
| Master's name and photo | `business.js` → `owner` | Put the photo in `public/images/`. A real photo builds trust. |
| His bio, role, skills | each language file → `about` | See *Languages* below |
| Google Maps + review links | `business.js` → `googleMapsUrl`, `googleReviewUrl` | Turns on the Reviews section and "Get directions" |
| Rating, cars repaired | `business.js` → `rating`, `carsRepaired` | **Only real numbers.** Hidden while `null`. |
| Instagram / TikTok / YouTube | `business.js` → `social` | Also linked to the business in Google's data |
| Domain | `business.js` → `siteUrl` | Used for canonical URL, sitemap, link previews |
| Real reviews | [`src/data/reviews.js`](src/data/reviews.js) | Copy real Google reviews only, never write your own |
| Areas served | [`src/data/areas.js`](src/data/areas.js) | English + Arabic names |

> Keep the name, address and phone **identical** to the Google Business Profile, character for
> character. Google uses that consistency to trust a local business.

## Logo

All logo files are in [`brand/`](brand/):

| File | Use it for |
|---|---|
| `master-dent-profile-picture.png` | WhatsApp, Instagram, Google Maps profile picture (fits the circle crop) |
| `master-dent-logo-dark-bg.svg` / `.png` | Horizontal logo on dark backgrounds (car stickers, black shirts, videos) |
| `master-dent-logo-light-bg.svg` / `.png` | Horizontal logo on white (invoices, documents) |
| `master-dent-logo-stacked.svg` / `.png` | Badge above the name, for square posts and print |
| `master-dent-mark.svg` / `.png` | The round MD badge on its own |
| `master-dent-app-icon.svg` | Square app icon (browser tab / phone home screen versions are in `public/`) |

Give printers the **SVG** files: they are vectors and stay sharp at any size.
Colours: gold `#D9B56A` (deep `#A2762F`, light `#F8E4A8`), silver `#D3D7DC`, black `#0E0C0A`.
Lettering: Archivo Expanded SemiBold and Geist SemiBold (both free, SIL Open Font License),
already converted to shapes, so no fonts are needed to use the files.

## 2. Languages and colours

The site comes in **English** (`/`), **Arabic** (`/ar/`, right-to-left), **Russian** (`/ru/`) and
**Hindi** (`/hi/`). Each one is its own prerendered page with its own title, description and
Google data, so the Arabic page can rank for Arabic searches.

- All page text is in [`src/i18n/`](src/i18n/): `en.js`, `ar.js`, `ru.js`, `hi.js`. Every file has
  the same structure, so to change a sentence, change it in each file.
- **Have a native speaker read the Arabic, Russian and Hindi once before launch.**
- First-time visitors whose phone is set to Arabic, Russian or Hindi are sent to that language
  automatically. A choice made in the language menu (globe icon) is remembered and always wins.
- To add a language (e.g. Urdu): copy `en.js` to `ur.js`, translate it, and add one line to
  `LANGS` in [`src/i18n/index.js`](src/i18n/index.js).
- Video titles and reviews can be one language, or `{ en: "…", ar: "…" }` for several.

Light and dark colours follow the visitor's phone or computer setting automatically. The
sun / moon button in the header lets visitors choose; their choice is remembered on every page.

### Hero slideshow

The top of the page shows a slideshow of PDR photos (`public/images/hero/`, listed in
[`src/data/heroSlides.js`](src/data/heroSlides.js)). Only the first photo loads with the page; the
rest download in the background afterwards, so it stays fast. It pauses when scrolled away, and
doesn't auto-play on data-saver / 2G connections or with "reduce motion" turned on.

To add or replace a photo: export it as WebP at 960, 1600 and 1920 px wide (as large as the
original allows, around 30–70 kB each), name it `slide-<number>-<width>.webp`, and add a line to
`heroSlides.js`. Use the photographer's own photos, or photos you have a license for.

## 3. Videos

Edit [`src/data/videos.js`](src/data/videos.js). The six entries there now are **samples**:
they show a yellow "Sample" badge and play a placeholder clip. Replace them with real repairs.

Each video can be:
- **an MP4** in `public/videos/` (`video: "/videos/patrol-hail.mp4"`), or
- **a YouTube link**, including Shorts (`video: "https://youtube.com/shorts/…"`), or
- **two clips** (`before` + `after`), which adds a Before / After / Side-by-side view.

Always add a `poster` (cover image, e.g. `/videos/patrol-hail.jpg`). It makes the grid load
fast, and videos with a poster are submitted to Google Video search automatically.
Use `vertical: true` for phone-shot / Reels videos. Keep MP4s short (15–60 s) and under ~15 MB.

## 4. Deploy

It's a static site. **Netlify** is set up through [`netlify.toml`](netlify.toml): every push to
`main` is built with `npm run build` and published from `dist`. On Netlify the site address
(canonical URL, sitemap, link previews) is detected automatically, and switches to the custom
domain once one is connected in Netlify. On other hosts (Vercel, Cloudflare Pages) use the same
build command and output folder, and set the `siteUrl` fallback in `business.js`.

If you change the business name or headline, regenerate the link-preview image. The
instructions are at the top of [`scripts/og-image.html`](scripts/og-image.html).

---

## 5. Getting found on Google in Dubai

The website is the foundation. These steps decide whether it shows up when someone in Dubai
searches "dent repair", "PDR Dubai" or "dent removal near me". Ranking takes weeks to months,
and nobody can guarantee position #1. These steps are what moves it.

1. **Google Business Profile (most important).** The map results at the top of a local search
   come from here, not from websites. Create and verify it at business.google.com.
   - Primary category: *Auto dent removal service*. Add *Auto body shop* as a secondary.
   - Same name, address and phone as `business.js`. Add the website, hours, services and
     **lots of real photos and short videos** of repairs.
2. **Reviews.** After every repair, send the customer the review link on WhatsApp while
   they're happy. Reply to every review. Number of reviews, rating and recency are the biggest
   map-ranking factors you control.
3. **Google Search Console.** Verify the domain at search.google.com/search-console and
   submit `https://<domain>/sitemap.xml`. Then use *URL inspection → Request indexing*.
4. **Apple Business Connect + Bing Places.** Many people in Dubai use iPhones and Apple Maps.
   Both listings are free.
5. **Instagram / TikTok.** Post every repair as a short before → after video, put the website
   in the bio, and add the profile links to `business.js`.
6. **Measure.** Put a Google Analytics 4 ID in `business.js → analytics`. Every tap on Call,
   WhatsApp, Email or Directions is sent as a `contact_click` event. Mark it as a key event
   in GA4.
7. **Google Business Profile in Arabic too:** add an Arabic business description and reply to
   Arabic reviews in Arabic.

### What's already built in for SEO
- Full page prerendered to HTML at build time ([`scripts/prerender.mjs`](scripts/prerender.mjs)).
- `AutoBodyShop` structured data: address, map coordinates, hours, services, areas served,
  founder, FAQ, plus videos once real ones are added ([`src/seo.js`](src/seo.js)).
- Keyword-focused title, description and headings ("Paintless Dent Repair in Dubai"),
  Dubai neighbourhood names, local geo tags, canonical URL, sitemap, robots.txt.
- Link previews for WhatsApp, Instagram and Facebook (`public/og-image.jpg`).
- Fast and mobile-first: one small JS bundle, no images required, sticky Call/WhatsApp bar on phones.

---

## Project structure

```
src/
  data/business.js     ← company details (edit me)
  data/areas.js        ← neighbourhoods served (English + Arabic)
  data/reviews.js      ← real customer reviews
  i18n/*.js            ← all page text, one file per language
  data/videos.js       ← repair videos
  seo.js               ← <head> tags, JSON-LD, sitemap, robots (generated from data/)
  components/          ← one component + CSS module per page section
  lib/helpers.js       ← WhatsApp links, opening hours, etc.
scripts/prerender.mjs  ← renders the page to static HTML after `vite build`
vite.config.js         ← injects SEO tags, emits sitemap.xml / robots.txt
```
