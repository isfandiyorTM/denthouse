/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BUSINESS INFO — the ONE place to edit the company's details.
 *
 *  Everything reads from this file: page text, the WhatsApp / call
 *  buttons, the map, opening hours, and the structured data (JSON-LD)
 *  that tells Google "this is a dent-repair business in Dubai".
 *
 *  ⚠ Keep name, address and phone IDENTICAL to the Google Business Profile
 *    (character for character). That consistency is a local-ranking signal.
 *
 *  Every value marked  TODO  is a placeholder — replace before going live.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const BUSINESS = {
  name: "DentHouse",
  // Full trading name as shown on the Google Business Profile.
  legalName: "DentHouse Paintless Dent Repair", // TODO
  // Live domain, https, no trailing slash. Used for canonical URL, sitemap, social previews.
  // On Netlify this is detected automatically (its URL variable = the custom domain once
  // one is connected, otherwise the .netlify.app address). The fallback is used elsewhere.
  siteUrl:
    (typeof process !== "undefined" && process.env && process.env.URL) ||
    "https://denthouse.ae", // TODO: fallback for non-Netlify builds
  // Year he started doing PDR — the site shows "N+ years" from this.
  foundedYear: 2015, // TODO

  owner: {
    name: "Master Name", // TODO: his real name
    role: "Founder & Master PDR Technician",
    // Put a photo in /public/images and set e.g. "/images/master.jpg". A real
    // photo of him at work builds more trust than anything else on the page.
    photo: null, // TODO
    bio: [
      // TODO: rewrite in his own words — where he learned, what he loves about the craft.
      "Every dent tells you how to fix it — if you know how to read the reflection. For more than a decade, that has been the craft: reading a panel under a striped light board, then working the metal back from behind, millimetre by millimetre, until the lines run perfectly straight again.",
      "No filler. No sanding. No respray. Just specialist rods, glue-pull tabs, patience, and the original factory paint left exactly as it left the factory.",
      "DentHouse runs on one rule: tell the customer the truth. If paintless repair can't give you a perfect result, you'll hear that before any work starts.",
    ],
    // Short facts shown with check marks. Only list things that are true.
    credentials: [
      "Steel and aluminium panels", // TODO: confirm
      "Hail damage specialist", // TODO: confirm
      "Daily drivers to supercars and EVs", // TODO: confirm
    ],
  },

  contact: {
    phone: "+971500000000", // TODO: international format, no spaces
    phoneDisplay: "+971 50 000 0000", // TODO: how it is shown on the page
    whatsapp: "971500000000", // TODO: digits only, country code first
    email: "info@denthouse.ae", // TODO
  },

  address: {
    street: "Al Quoz Industrial Area 3", // TODO: warehouse / unit number + street
    area: "Al Quoz", // TODO: neighbourhood — used in headings ("workshop in Al Quoz")
    city: "Dubai",
    region: "Dubai",
    country: "AE",
  },
  // TODO: in Google Maps right-click the workshop pin → click the coordinates to copy.
  geo: { lat: 25.1365, lng: 55.2337 },
  // TODO: Google Business Profile → Share → copy link. Used for "Get directions" + reviews.
  googleMapsUrl: null,
  // TODO: Google Business Profile → "Ask for reviews" link (https://g.page/r/…/review).
  googleReviewUrl: null,

  // Opening hours (24h). null = closed. Days: Mo Tu We Th Fr Sa Su.
  hours: {
    Mo: ["08:00", "18:00"], // TODO
    Tu: ["08:00", "18:00"],
    We: ["08:00", "18:00"],
    Th: ["08:00", "18:00"],
    Fr: ["08:00", "18:00"],
    Sa: ["08:00", "18:00"],
    Su: null,
  },
  timeZone: "Asia/Dubai",

  // Does he drive to the customer? Turns the "mobile service" copy on/off.
  mobileService: true, // TODO: confirm
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
    instagram: null, // TODO e.g. "https://www.instagram.com/denthouse.ae"
    tiktok: null,
    youtube: null,
    facebook: null,
  },

  // Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Tracks calls, WhatsApp
  // clicks and quote requests so you can see what brings customers. null = off.
  analytics: { gaMeasurementId: null },
};
