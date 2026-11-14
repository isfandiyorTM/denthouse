/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BUSINESS INFO — the ONE place to edit the company's details.
 *
 *  Everything reads from this file: the WhatsApp / call buttons, opening
 *  hours, and the structured data (JSON-LD) that tells Google "this is a
 *  dent-repair business in Dubai". Page TEXT lives in src/i18n/*.js.
 *
 *  ⚠ Keep name and phone IDENTICAL to the Google Business Profile
 *    (character for character). That consistency is a local-ranking signal.
 *
 *  Values marked TODO are still missing.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS = {
  name: "Master Dent Repair",
  // Full trading name as on the trade license / Google Business Profile.
  legalName: "Master Dent Repair",
  // Live domain, https, no trailing slash. Used for canonical URL, sitemap, social previews.
  // On Netlify this is detected automatically (its URL variable = the custom domain once
  // one is connected, otherwise the .netlify.app address). The fallback is used elsewhere.
  siteUrl:
    (typeof process !== "undefined" && process.env && process.env.URL) ||
    "https://www.example.com", // TODO: real domain, for builds outside Netlify
  // "More than 10 years of experience in the UAE" (Nov 2026) — the site shows "N+ years".
  foundedYear: 2016,

  owner: {
    name: null, // TODO: his personal name, if he wants it shown (the About section uses the business name until then)
    // Put a photo in /public/images and set e.g. "/images/master.jpg". A real
    // photo of him at work builds more trust than anything else on the page.
    photo: null, // TODO
    // His role, bio and skills are text, so they live in each language file:
    // src/i18n/en.js, ar.js, ru.js, hi.js → about
  },

  contact: {
    phone: "+971551704343",
    phoneDisplay: "+971 55 170 4343",
    whatsapp: "971551704343", // same number as the phone
    email: "denthousepdr@gmail.com", // he may switch to uaedentspecialist@gmail.com
  },

  // Mobile service only — he drives to the customer (home, office or parking),
  // there is no workshop to visit. Google calls this a "service-area business":
  // no street address is published, only the areas served.
  // The page text ("Dubai and Sharjah") is in src/i18n/*.js; neighbourhoods in data/areas.js.
  serviceCities: ["Dubai", "Sharjah"],
  address: { city: "Dubai", region: "Dubai", country: "AE" },

  // TODO: Google Business Profile → Share → copy link (used for "All reviews on Google").
  googleMapsUrl: null,
  // TODO: Google Business Profile → "Ask for reviews" link (https://g.page/r/…/review).
  googleReviewUrl: null,

  // Opening hours (24h). null = closed. Days: Mo Tu We Th Fr Sa Su.
  hours: {
    Mo: ["09:00", "18:00"],
    Tu: ["09:00", "18:00"],
    We: ["09:00", "18:00"],
    Th: ["09:00", "18:00"],
    Fr: ["09:00", "18:00"],
    Sa: ["09:00", "18:00"],
    Su: ["09:00", "18:00"],
  },
  timeZone: "Asia/Dubai",

  // Rough price level for Google ("$", "$$", "$$$" or e.g. "AED 150–3000").
  priceRange: "$$",

  // ONLY real numbers copied from Google — never invent these.
  // e.g. rating: { value: 4.9, count: 132 }
  rating: null,
  // e.g. "3,000+" — leave null if unknown; the stat is hidden.
  carsRepaired: null,

  // Full profile URLs. null = hidden. These also go into Google's "sameAs" data,
  // which links the profiles to this business.
  social: {
    instagram: null, // TODO
    tiktok: null,
    youtube: null,
    facebook: null,
  },

  // Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Tracks calls and WhatsApp
  // clicks so you can see what brings customers. null = off.
  analytics: { gaMeasurementId: null },
};
