// Builds everything search engines read: <head> tags, JSON-LD structured
// data, sitemap.xml, robots.txt and the web manifest. All generated from
// src/data/*, injected at build time by the plugin in vite.config.js.
// Plain JS only (no JSX / CSS) — it is imported by vite.config.js.
import { BUSINESS as B } from "./data/business.js";
import { SERVICES, FAQS, AREAS } from "./data/content.js";
import { VIDEOS } from "./data/videos.js";
import { absoluteUrl, hoursSchema, youtubeId } from "./lib/helpers.js";

const url = `${B.siteUrl}/`;
const { area, city } = B.address;

export const SEO = {
  title: `Paintless Dent Repair Dubai | PDR & Dent Removal | ${B.name}`,
  description:
    `Paintless dent repair (PDR) in Dubai. Door dings, creases and hail damage removed with no paint or filler — ` +
    `factory finish kept. Workshop in ${area}${B.mobileService ? " + mobile service" : ""}. WhatsApp a photo for a free quote.`,
  image: absoluteUrl("/og-image.png"),
  imageAlt: `${B.name} — paintless dent repair in Dubai`,
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON safe to inline inside <script> */
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

function businessSchema() {
  const sameAs = Object.values(B.social).filter(Boolean);
  if (B.googleMapsUrl) sameAs.push(B.googleMapsUrl);

  const schema = {
    "@type": "AutoBodyShop",
    "@id": `${url}#business`,
    name: B.name,
    alternateName: B.legalName !== B.name ? B.legalName : undefined,
    description: SEO.description,
    url,
    telephone: B.contact.phone,
    email: B.contact.email,
    image: SEO.image,
    logo: absoluteUrl("/icon-512.png"),
    priceRange: B.priceRange || undefined,
    currenciesAccepted: "AED",
    foundingDate: String(B.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: B.address.street,
      addressLocality: city,
      addressRegion: B.address.region,
      addressCountry: B.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: B.geo.lat, longitude: B.geo.lng },
    hasMap: B.googleMapsUrl || `https://www.google.com/maps?q=${B.geo.lat},${B.geo.lng}`,
    openingHoursSpecification: hoursSchema(),
    areaServed: [
      { "@type": "City", name: "Dubai" },
      ...AREAS.map((name) => ({ "@type": "Place", name: `${name}, Dubai` })),
    ],
    founder: { "@type": "Person", name: B.owner.name, jobTitle: B.owner.role },
    knowsAbout: [
      "Paintless dent repair", "PDR", "Dent removal", "Hail damage repair",
      "Door ding repair", "Crease repair", "Bumper dent repair",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dent repair services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${s.title} in Dubai`,
          description: s.text,
          serviceType: "Paintless dent repair",
          areaServed: { "@type": "City", name: "Dubai" },
        },
      })),
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
  if (B.rating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: B.rating.value,
      reviewCount: B.rating.count,
      bestRating: 5,
    };
  }
  return schema;
}

function videoSchemas() {
  // Google requires a thumbnail; only real videos with a poster or YouTube id are listed.
  return VIDEOS.filter((v) => !v.sample)
    .map((v) => {
      const src = v.video || v.after || v.before;
      const yt = youtubeId(src);
      const thumb = v.poster ? absoluteUrl(v.poster) : yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null;
      if (!thumb) return null;
      return {
        "@type": "VideoObject",
        name: `${v.title} — ${v.car}`,
        description: v.description || `Paintless dent repair on a ${v.car} in ${v.area || "Dubai"}.`,
        thumbnailUrl: thumb,
        uploadDate: v.date,
        ...(yt ? { embedUrl: `https://www.youtube.com/embed/${yt}` } : { contentUrl: absoluteUrl(src) }),
        publisher: { "@id": `${url}#business` },
      };
    })
    .filter(Boolean);
}

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(),
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: B.name,
        inLanguage: "en-AE",
        publisher: { "@id": `${url}#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: SEO.title,
        description: SEO.description,
        inLanguage: "en-AE",
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": `${url}#business` },
        primaryImageOfPage: SEO.image,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...videoSchemas(),
    ],
  };
}

export function buildHead() {
  const ga = B.analytics?.gaMeasurementId;
  const tags = [
    `<title>${esc(SEO.title)}</title>`,
    `<meta name="description" content="${esc(SEO.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `<link rel="alternate" hreflang="en-AE" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,

    // Local signals
    `<meta name="geo.region" content="AE-DU" />`,
    `<meta name="geo.placename" content="${esc(city)}" />`,
    `<meta name="geo.position" content="${B.geo.lat};${B.geo.lng}" />`,
    `<meta name="ICBM" content="${B.geo.lat}, ${B.geo.lng}" />`,

    // Social previews (WhatsApp, Instagram, Facebook, X, iMessage)
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(B.name)}" />`,
    `<meta property="og:locale" content="en_AE" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(SEO.title)}" />`,
    `<meta property="og:description" content="${esc(SEO.description)}" />`,
    `<meta property="og:image" content="${SEO.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(SEO.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(SEO.title)}" />`,
    `<meta name="twitter:description" content="${esc(SEO.description)}" />`,
    `<meta name="twitter:image" content="${SEO.image}" />`,

    // App / icons
    `<meta name="theme-color" content="#0b0c0e" media="(prefers-color-scheme: dark)" />`,
    `<meta name="theme-color" content="#f7f6f3" media="(prefers-color-scheme: light)" />`,
    `<meta name="format-detection" content="telephone=yes" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,

    // Fonts
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" />`,

    // Structured data for Google (business, services, hours, FAQ, videos)
    `<script type="application/ld+json">${jsonForScript(structuredData())}</script>`,
  ];

  if (ga) {
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(ga)}');</script>`
    );
  }
  return tags.join("\n    ");
}

export function buildSitemap(now = new Date()) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}</loc>
    <lastmod>${now.toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`;
}

export function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${B.siteUrl}/sitemap.xml
`;
}

export function buildManifest() {
  return JSON.stringify(
    {
      name: `${B.name} — Paintless Dent Repair Dubai`,
      short_name: B.name,
      start_url: "/",
      display: "standalone",
      background_color: "#0b0c0e",
      theme_color: "#0b0c0e",
      icons: [
        { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      ],
    },
    null,
    2
  );
}
