// Plain JS helpers (no JSX) — imported by components AND by vite.config.js,
// so keep this file free of React / CSS imports.
import { BUSINESS } from "../data/business.js";

const DAY_KEYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
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

/** Full base address, e.g. "9th Street, Al Awir Road, Nadd Al Hamar, Dubai". */
export function fullAddress() {
  const { street, area, city } = BUSINESS.address;
  return [street, area, city].filter(Boolean).join(", ");
}
/** Google Maps link for his base: his own listing if set, otherwise an address search. */
export function mapsSearchUrl() {
  if (BUSINESS.googleMapsUrl) return BUSINESS.googleMapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS.name}, ${fullAddress()}`)}`;
}

export function yearsOfExperience(now = new Date()) {
  return Math.max(1, now.getFullYear() - BUSINESS.foundedYear);
}

/* ── Opening hours ─────────────────────────────────────────── */
// `t` is the language dictionary (src/i18n/*.js): it supplies day names and time format.
function formatTime(hhmm, t) {
  const [h, m] = hhmm.split(":").map(Number);
  return t.time(h, m);
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

/** Human-readable rows: [{ label: "Mon – Sat", value: "8 am – 6 pm" }], or "Every day" when all 7 match. */
export function hoursRows(t) {
  return hoursGroups().map(({ days, hours }) => ({
    label:
      days.length === 7 ? t.everyDay
      : days.length > 1 ? `${t.days[days[0]]} – ${t.days[days[days.length - 1]]}`
      : t.days[days[0]],
    value: hours ? `${formatTime(hours[0], t)} – ${formatTime(hours[1], t)}` : t.closedDay,
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
export function openStatus(t, now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: BUSINESS.timeZone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const get = (t) => parts.find((p) => p.type === t)?.value;
  const todayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };

  const today = BUSINESS.hours[DAY_KEYS[todayIdx]];
  if (today && minutes >= toMin(today[0]) && minutes < toMin(today[1])) {
    return { open: true, text: t.status.open(formatTime(today[1], t)) };
  }
  // Find next opening
  for (let i = 0; i < 8; i++) {
    const idx = (todayIdx + i) % 7;
    const h = BUSINESS.hours[DAY_KEYS[idx]];
    if (!h) continue;
    if (i === 0 && minutes >= toMin(h[0])) continue;
    const when = i === 0 ? t.status.today : i === 1 ? t.status.tomorrow : t.days[DAY_KEYS[idx]];
    return { open: false, text: t.status.closed(when, formatTime(h[0], t)) };
  }
  return { open: false, text: t.status.closedAll };
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

