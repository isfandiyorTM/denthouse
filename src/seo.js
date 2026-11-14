// Builds everything search engines read: <head> tags, JSON-LD structured
// data, sitemap.xml, robots.txt and the web manifest — one version per language.
// Generated from src/data/* and src/i18n/*, injected at build time
// (scripts/prerender.mjs) and in dev (vite.config.js).
// Plain JS only (no JSX / CSS) — it is imported by vite.config.js.
import { BUSINESS as B } from "./data/business.js";
import { areasFor } from "./data/areas.js";
import { VIDEOS } from "./data/videos.js";
import { DEFAULT_LANG, LANGS, getT, langInfo, loc } from "./i18n/index.js";
import { absoluteUrl, hoursSchema, youtubeId } from "./lib/helpers.js";
import { HERO_SLIDES, SLIDE_SIZES, slideSrcSet } from "./data/heroSlides.js";

const root = `${B.siteUrl}/`;
const pageUrl = (lang) => `${B.siteUrl}${langInfo(lang).path}`;
const image = absoluteUrl("/og-image.jpg");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** JSON safe to inline inside <script> */
const jsonForScript = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

/** Attributes for <html> on each language page. */
export function htmlAttrs(lang) {
  const l = langInfo(lang);
  return `lang="${l.code}" dir="${l.dir}"`;
}

function businessSchema(lang, t) {
  const sameAs = Object.values(B.social).filter(Boolean);
  if (B.googleMapsUrl) sameAs.push(B.googleMapsUrl);

  const schema = {
    "@type": "AutoBodyShop",
    "@id": `${root}#business`,
    name: B.name,
    alternateName: B.legalName !== B.name ? B.legalName : undefined,
    description: t.seo.description,
    url: pageUrl(lang),
    telephone: B.contact.phone,
    email: B.contact.email,
    image,
    logo: absoluteUrl("/icon-512.png"),
    priceRange: B.priceRange || undefined,
    currenciesAccepted: "AED",
    foundingDate: String(B.foundedYear),
    availableLanguage: LANGS.map((l) => l.code),
    // Mobile service ("service-area business"): city only, no street address or map pin.
    address: {
      "@type": "PostalAddress",
      addressLocality: B.address.city,
      addressRegion: B.address.region,
      addressCountry: B.address.country,
    },
    hasMap: B.googleMapsUrl || undefined,
    openingHoursSpecification: hoursSchema(),
    areaServed: [
      ...B.serviceCities.map((name) => ({ "@type": "City", name })),
      ...areasFor(lang).map((name) => ({ "@type": "Place", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t.services.title,
      itemListElement: t.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.text,
          serviceType: "Paintless dent repair",
          areaServed: B.serviceCities.map((name) => ({ "@type": "City", name })),
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

function videoSchemas(lang) {
  // Google requires a thumbnail; only real videos with a poster or YouTube id are listed.
  return VIDEOS.filter((v) => !v.sample)
    .map((v) => {
      const src = v.video || v.after || v.before;
      const yt = youtubeId(src);
      const thumb = v.poster ? absoluteUrl(v.poster) : yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null;
      if (!thumb) return null;
      const title = loc(v.title, lang);
      return {
        "@type": "VideoObject",
        name: `${title} — ${v.car}`,
        description: loc(v.description, lang) || `${title} — ${v.car}, ${loc(v.area, lang) || "Dubai"}`,
        thumbnailUrl: thumb,
        uploadDate: v.date,
        inLanguage: lang,
        ...(yt ? { embedUrl: `https://www.youtube.com/embed/${yt}` } : { contentUrl: absoluteUrl(src) }),
        publisher: { "@id": `${root}#business` },
      };
    })
    .filter(Boolean);
}

export function structuredData(lang = DEFAULT_LANG) {
  const t = getT(lang);
  const url = pageUrl(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      businessSchema(lang, t),
      {
        "@type": "WebSite",
        "@id": `${root}#website`,
        url: root,
        name: B.name,
        inLanguage: LANGS.map((l) => l.code),
        publisher: { "@id": `${root}#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: t.seo.title,
        description: t.seo.description,
        inLanguage: lang,
        isPartOf: { "@id": `${root}#website` },
        about: { "@id": `${root}#business` },
        primaryImageOfPage: image,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: t.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      ...videoSchemas(lang),
    ],
  };
}

// On "/" only: send first-time visitors whose phone/browser is set to Arabic,
// Russian or Hindi to their language. Never overrides a choice made in the
// language menu (saved as dh_lang). Search engines are not redirected.
const autoLanguageScript = () => {
  const others = LANGS.filter((l) => l.code !== DEFAULT_LANG).map((l) => l.code);
  return `<script>(function(){try{if(location.pathname!=="/")return;var L=${JSON.stringify(others)},s=localStorage.getItem("dh_lang");if(s){if(L.indexOf(s)>-1)location.replace("/"+s+"/"+location.hash);return}var n=navigator.languages||[navigator.language];for(var i=0;i<n.length;i++){var c=String(n[i]||"").slice(0,2).toLowerCase();if(c==="${DEFAULT_LANG}")return;if(L.indexOf(c)>-1){location.replace("/"+c+"/"+location.hash);return}}}catch(e){}})();</script>`;
};

// Apply the visitor's saved light/dark choice before the page is drawn (no flash).
const themeScript = `<script>(function(){try{var t=localStorage.getItem("dh_theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);var c=t==="dark"?"#0f0f0f":"#ffffff";document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c)})}}catch(e){}})();</script>`;

const EXTRA_FONTS = {
  ar: "family=IBM+Plex+Sans+Arabic:wght@400;500;600",
  hi: "family=Noto+Sans+Devanagari:wght@400;500;600",
};

export function buildHead(lang = DEFAULT_LANG) {
  const t = getT(lang);
  const l = langInfo(lang);
  const url = pageUrl(lang);
  const ga = B.analytics?.gaMeasurementId;
  const fonts = ["family=Geist:wght@400;500;600", EXTRA_FONTS[lang]].filter(Boolean).join("&");

  const tags = [
    lang === DEFAULT_LANG ? autoLanguageScript() : "",
    `<title>${esc(t.seo.title)}</title>`,
    `<meta name="description" content="${esc(t.seo.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    ...LANGS.map((x) => `<link rel="alternate" hreflang="${x.code}" href="${pageUrl(x.code)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${root}" />`,

    // Local signals
    `<meta name="geo.region" content="AE-DU" />`,
    `<meta name="geo.placename" content="Dubai" />`,

    // Link previews (WhatsApp, Instagram, Facebook, X, iMessage)
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(B.name)}" />`,
    `<meta property="og:locale" content="${l.ogLocale}" />`,
    ...LANGS.filter((x) => x.code !== lang).map((x) => `<meta property="og:locale:alternate" content="${x.ogLocale}" />`),
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(t.seo.title)}" />`,
    `<meta property="og:description" content="${esc(t.seo.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(t.hero.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(t.seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(t.seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,

    // Colours follow the device's light / dark setting, or the visitor's toggle choice
    `<meta name="color-scheme" content="light dark" />`,
    `<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />`,
    `<meta name="theme-color" content="#0f0f0f" media="(prefers-color-scheme: dark)" />`,
    themeScript,
    `<meta name="format-detection" content="telephone=yes" />`,
    `<link rel="icon" href="/favicon.ico" sizes="32x32" />`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
    `<link rel="manifest" href="/site.webmanifest" />`,

    // First hero photo: start downloading right away (biggest thing on screen).
    // The other slideshow photos load later, after the page is ready.
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${slideSrcSet(HERO_SLIDES[0])}" imagesizes="${SLIDE_SIZES}" fetchpriority="high" />`,

    // Fonts (Arabic / Hindi pages also load a font for their script)
    `<link rel="preconnect" href="https://fonts.googleapis.com" />`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap" />`,

    // Structured data for Google (business, services, hours, FAQ, videos)
    `<script type="application/ld+json">${jsonForScript(structuredData(lang))}</script>`,
  ];

  if (ga) {
    tags.push(
      `<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(ga)}"></script>`,
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${esc(ga)}');</script>`
    );
  }
  return tags.filter(Boolean).join("\n    ");
}

export function buildSitemap(now = new Date()) {
  const lastmod = now.toISOString().slice(0, 10);
  const alternates = LANGS.map(
    (x) => `    <xhtml:link rel="alternate" hreflang="${x.code}" href="${pageUrl(x.code)}" />`
  ).join("\n");
  const urls = LANGS.map(
    (l) => `  <url>
    <loc>${pageUrl(l.code)}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${root}" />
  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
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
      name: `${B.name} — Dubai & Sharjah`,
      short_name: B.name,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
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
