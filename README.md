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

His logo (the gold round "MD" badge) is in [`brand/`](brand/):

| File | Use |
|---|---|
| `master-dent-logo-original.png` | The original file he made |
| `master-dent-logo-circle.png` | Round cut-out with a transparent background |

The website uses resized copies in `public/images/logo/`. The browser-tab and phone
home-screen icons (`public/favicon.ico`, `favicon-64.png`, `apple-touch-icon.png`,
`icon-512.png`) use just the "MD" part, because the full badge is unreadable at 16 px.
The lettering next to the badge in the navbar ("MASTER DENT / PAINTLESS DENT REPAIR") is drawn
from `src/components/logoArt.js`. Accent colour: gold `#D9B56A` (`#8A6A2E` on white).

## 2. Languages and colours

The site is in **English** (his customers speak English). Arabic, Russian and Hindi versions
exist in [`src/i18n/`](src/i18n/) but are switched off: to turn one on, update its text
(services, contact) and add its code to `ENABLED` in [`src/i18n/index.js`](src/i18n/index.js).
All page text is in `src/i18n/en.js`.

Light and dark colours follow the visitor's phone or computer setting automatically. The
sun / moon button in the header lets visitors choose; their choice is remembered.

### Hero slideshow

The top of the page shows a slideshow of PDR photos (`public/images/hero/`, listed in
[`src/data/heroSlides.js`](src/data/heroSlides.js)). Only the first photo loads with the page; the
rest download in the background afterwards, so it stays fast. It pauses when scrolled away, and
doesn't auto-play on data-saver / 2G connections or with "reduce motion" turned on.

To add or replace a photo: export it as WebP at 960, 1600 and 1920 px wide (as large as the
original allows, around 30–70 kB each), name it `slide-<number>-<width>.webp`, and add a line to
`heroSlides.js`. Use the photographer's own photos, or photos you have a license for.

## 3. Photos and videos of his work

No code needed: drop files into these folders and they appear in "Our work", newest file name first.

- **Photos** → `public/images/dent/` (jpg / png / webp). Shown as a grid; tap to open full screen.
- **Videos** → `public/videos/` (MP4 best). A cover image with the same name is used if present
  (`tesla-door.mp4` + `tesla-door.jpg`), otherwise the video's first frame.
- Optional titles and details for videos: [`src/data/videos.js`](src/data/videos.js).

Keep videos short (15–60 s) and under ~15 MB each (1080p, H.264 MP4), and photos under ~300 kB:
big files make the page slow on phones.

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
