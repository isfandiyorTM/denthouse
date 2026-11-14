// Languages of the site. Each gets its own URL and its own prerendered page,
// so Google can show the Arabic page to people searching in Arabic, etc.
// To add a language: copy en.js, translate it, and add one line below.
import { BUSINESS } from "../data/business.js";
import en from "./en.js";
import ar from "./ar.js";
import ru from "./ru.js";
import hi from "./hi.js";

export const LANGS = [
  { code: "en", label: "English", short: "EN", dir: "ltr", path: "/", ogLocale: "en_AE" },
  { code: "ar", label: "العربية", short: "ع", dir: "rtl", path: "/ar/", ogLocale: "ar_AE" },
  { code: "ru", label: "Русский", short: "RU", dir: "ltr", path: "/ru/", ogLocale: "ru_RU" },
  { code: "hi", label: "हिन्दी", short: "हि", dir: "ltr", path: "/hi/", ogLocale: "hi_IN" },
];
export const DEFAULT_LANG = "en";

const FACTORIES = { en, ar, ru, hi };
const cache = {};

export const langInfo = (code) => LANGS.find((l) => l.code === code) ?? LANGS[0];

/** "/ar/" → "ar", anything else → "en" */
export function langFromPath(pathname = "/") {
  const seg = pathname.split("/")[1];
  return seg && seg !== DEFAULT_LANG && FACTORIES[seg] ? seg : DEFAULT_LANG;
}

/** Workshop neighbourhood name in the given language (falls back to English). */
export function areaName(lang) {
  return BUSINESS.address.areaLocal?.[lang] || BUSINESS.address.area;
}

/** All text for one language. */
export function getT(lang) {
  if (!cache[lang]) {
    const mobile = BUSINESS.mobileService;
    const t = (FACTORIES[lang] ?? FACTORIES.en)({ name: BUSINESS.name, area: areaName(lang), mobile });
    t.services.items = t.services.items.filter((i) => mobile || !i.mobileOnly);
    t.faq.items = t.faq.items.filter((i) => mobile || !i.mobileOnly);
    cache[lang] = t;
  }
  return cache[lang];
}

/**
 * Text that may be given per language in the data files:
 *   "Same text everywhere"   or   { en: "…", ar: "…" }  (missing languages fall back to English)
 */
export function loc(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value[lang] ?? value.en;
  return value;
}
