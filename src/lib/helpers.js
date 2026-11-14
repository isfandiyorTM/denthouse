// Plain JS helpers (no JSX) — imported by components AND by vite.config.js,
// so keep this file free of React / CSS imports.
import { BUSINESS } from "../data/business.js";

const DAY_KEYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const DAY_SHORT = { Mo: "Mon", Tu: "Tue", We: "Wed", Th: "Thu", Fr: "Fri", Sa: "Sat", Su: "Sun" };
const DAY_SCHEMA = {
  Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday",
  Fr: "Friday", Sa: "Saturday", Su: "Sunday",
};

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ── Contact links ─────────────────────────────────────────── */
export function waLink(text = "") {
  const base = `https://wa.me/${BUSINESS.contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
export const telLink = `tel:${BUSINESS.contact.phone}`;
export const mailLink = `mailto:${BUSINESS.contact.email}`;

export const WA_QUOTE_TEXT = `Hi ${BUSINESS.name}! I have a dent I'd like fixed. I'll send a photo — could you give me a price?`;

export function directionsUrl() {
  if (BUSINESS.googleMapsUrl) return BUSINESS.googleMapsUrl;
  const { lat, lng } = BUSINESS.geo;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}
export function mapEmbedUrl() {
  const { lat, lng } = BUSINESS.geo;
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

export function fullAddress() {
  const { street, city } = BUSINESS.address;
  return `${street}, ${city}, UAE`;
}

export function yearsOfExperience(now = new Date()) {
  return Math.max(1, now.getFullYear() - BUSINESS.foundedYear);
}

/* ── Opening hours ─────────────────────────────────────────── */
function formatTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

/** Groups consecutive days with identical hours: [{ days: ["Mo",…], hours: [open, close] | null }] */
export function hoursGroups(hours = BUSINESS.hours) {
  const groups = [];
  for (const d of DAY_KEYS) {
    const h = hours[d] ?? null;
    const last = groups[groups.length - 1];
    if (last && JSON.stringify(last.hours) === JSON.stringify(h)) last.days.push(d);
    else groups.push({ days: [d], hours: h });
  }
  return groups;
}

/** Human-readable rows: [{ label: "Mon – Sat", value: "8 am – 6 pm" }] */
export function hoursRows() {
  return hoursGroups().map(({ days, hours }) => ({
    label: days.length > 1 ? `${DAY_SHORT[days[0]]} – ${DAY_SHORT[days[days.length - 1]]}` : DAY_SHORT[days[0]],
    value: hours ? `${formatTime(hours[0])} – ${formatTime(hours[1])}` : "Closed",
  }));
}

/** schema.org OpeningHoursSpecification[] */
export function hoursSchema() {
  return hoursGroups()
    .filter((g) => g.hours)
    .map((g) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: g.days.map((d) => DAY_SCHEMA[d]),
      opens: g.hours[0],
      closes: g.hours[1],
    }));
}

/** Open/closed status in the business's own time zone. Call on the client only. */
export function openStatus(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BUSINESS.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const todayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };

  const today = BUSINESS.hours[DAY_KEYS[todayIdx]];
  if (today && minutes >= toMin(today[0]) && minutes < toMin(today[1])) {
    return { open: true, text: `Open now · until ${formatTime(today[1])}` };
  }
  // Find next opening
  for (let i = 0; i < 8; i++) {
    const idx = (todayIdx + i) % 7;
    const h = BUSINESS.hours[DAY_KEYS[idx]];
    if (!h) continue;
    if (i === 0 && minutes >= toMin(h[0])) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_SHORT[DAY_KEYS[idx]];
    return { open: false, text: `Closed · opens ${when} ${formatTime(h[0])}` };
  }
  return { open: false, text: "Closed" };
}

/* ── Video sources ─────────────────────────────────────────── */
export function youtubeId(url) {
  if (!url) return null;
  const m = String(url).match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

export function absoluteUrl(path) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${BUSINESS.siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Cheap deterministic hash → 0..1, used to vary generated artwork per item. */
export function seeded(str, salt = 0) {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return ((h >>> 0) % 10000) / 10000;
}
