// Page copy that isn't company-specific contact info.
// Written for people in Dubai searching things like "dent repair Dubai",
// "paintless dent removal near me", "hail damage repair Dubai".
import { BUSINESS } from "./business.js";

const { area } = BUSINESS.address;
const mobile = BUSINESS.mobileService;

/* ── Services ─────────────────────────────────────────────── */
// `id` is also used to tag videos (see videos.js) and pick the icon.
export const SERVICES = [
  {
    id: "door-dings",
    title: "Door dings & parking dents",
    short: "Door dings",
    text: "Tight mall car parks, swinging doors, stray trolleys. Small dents pushed out from behind the panel — usually while you wait.",
  },
  {
    id: "hail",
    title: "Hail damage repair",
    short: "Hail damage",
    text: "When a storm hits the UAE, one car can take dozens of dents across the roof, bonnet and boot. We remove them panel by panel and keep the factory finish.",
  },
  {
    id: "creases",
    title: "Creases & large dents",
    short: "Creases",
    text: "Sharp body-line creases and big, soft dents on doors, fenders and quarter panels — worked out gradually until the reflection runs straight.",
  },
  {
    id: "bumpers",
    title: "Plastic bumper dents",
    short: "Bumpers",
    text: "Pushed-in plastic bumpers reshaped with controlled heat and pressure. No replacement part, no respray, no waiting for parts.",
  },
  {
    id: "lease-return",
    title: "Lease, rental & resale prep",
    short: "Lease return",
    text: "Returning a leased or rental car, or about to sell? Remove the dings before inspection and avoid damage charges or a lower offer.",
  },
  ...(mobile
    ? [{
        id: "mobile",
        title: "Mobile PDR — we come to you",
        short: "Mobile service",
        text: "At your villa, office or building car park anywhere in Dubai. All we need is a bit of shade and an hour or two.",
      }]
    : []),
];

/* ── PDR vs traditional body shop ─────────────────────────── */
export const COMPARISON = [
  { label: "Factory paint", pdr: "Kept — 100% original", shop: "Sanded, filled and resprayed" },
  { label: "Typical time", pdr: "1–3 hours", shop: "3–7 days" },
  { label: "Resale value", pdr: "Protected — passes paint-gauge checks", shop: "Respray shows up on a paint gauge" },
  { label: "Cost", pdr: "No paint, filler or parts to pay for", shop: "Paint, materials and labour" },
  { label: "Your car", pdr: "Back the same day", shop: "Off the road for days" },
  { label: "Colour match", pdr: "Nothing to match", shop: "Risk of mismatch and overspray" },
];

/* ── How it works ─────────────────────────────────────────── */
export const PROCESS = [
  {
    id: "photo",
    title: "Send a photo",
    text: "WhatsApp us two or three photos of the dent from different angles, with the whole panel in frame.",
  },
  {
    id: "quote",
    title: "Get a clear price",
    text: "We reply with a price and a time estimate. No obligation — and if PDR isn't right for your dent, we'll tell you.",
  },
  {
    id: "repair",
    title: "We fix it",
    text: mobile
      ? `At our workshop in ${area}, or at your home or office anywhere in Dubai.`
      : `At our workshop in ${area}, Dubai.`,
  },
  {
    id: "done",
    title: "Drive away",
    text: "Checked under an LED reflection board. Panel straight, factory paint untouched.",
  },
];

/* ── Areas served (local SEO: neighbourhood names people search with) ── */
export const AREAS = [
  "Al Quoz", "Al Barsha", "Dubai Marina", "JLT", "JBR", "Palm Jumeirah",
  "Jumeirah", "Umm Suqeim", "Downtown Dubai", "Business Bay", "DIFC",
  "Dubai Hills", "Arabian Ranches", "Motor City", "Sports City", "JVC",
  "Al Furjan", "Damac Hills", "Mirdif", "Dubai Silicon Oasis", "Al Nahda",
  "Deira", "Bur Dubai", "Al Karama",
];

/* ── Makes we repair (text only; marquee) ─────────────────── */
export const BRANDS = [
  "Toyota", "Nissan", "Lexus", "Mercedes-Benz", "BMW", "Porsche", "Land Rover",
  "Range Rover", "Audi", "Tesla", "Ford", "Chevrolet", "GMC", "Jeep",
  "Mitsubishi", "Hyundai", "Kia", "Honda", "Volkswagen", "Infiniti",
  "Bentley", "Rolls-Royce", "Ferrari", "Lamborghini",
];

/* ── FAQ (also published as FAQPage structured data) ──────── */
export const FAQS = [
  {
    q: "What is paintless dent repair (PDR)?",
    a: "PDR is a way of removing dents without filler or paint. A technician reaches behind the panel with specialist rods — or pulls from the outside with glue tabs — and slowly massages the metal back to its original shape. Your factory paint is never touched.",
  },
  {
    q: "How much does dent repair cost in Dubai?",
    a: "It depends on the size and depth of the dent and where it sits on the panel. Small door dings are the most affordable; hail damage is priced per panel. The fastest way to get an exact price is to send a photo on WhatsApp — it's free and there's no obligation.",
  },
  {
    q: "Can every dent be fixed without painting?",
    a: "Most dents where the paint isn't cracked or chipped can be. If the paint is broken or the metal is stretched too far, we'll tell you honestly before we start and point you to the right fix.",
  },
  {
    q: "How long does a repair take?",
    a: "Most single dents take between 30 minutes and 3 hours. Larger creases or hail damage across several panels can take one to three days.",
  },
  ...(mobile
    ? [{
        q: "Do you come to my home or office?",
        a: `Yes. We offer mobile dent repair across Dubai — villas, offices and building car parks. Larger jobs such as hail damage are best done at our workshop in ${area}.`,
      }]
    : []),
  {
    q: "Can you fix dents before I return a leased or rental car?",
    a: "Yes — it's one of the most common jobs we do. Removing dings before the return inspection is usually far cheaper than the damage charge.",
  },
  {
    q: "Will the dent come back or the repair be visible?",
    a: "No. Once the metal is back in shape it stays there. The repair is checked under a reflection board, which shows even tiny distortions — when the lines run straight, the panel is right.",
  },
  {
    q: "Which car brands do you repair?",
    a: "All makes and models — from daily drivers like Toyota and Nissan to German luxury cars, 4x4s, EVs and supercars.",
  },
];

/* ── Customer reviews ─────────────────────────────────────── */
// Paste REAL reviews here (e.g. from Google, with the customer's permission).
// Never invent reviews — it breaks Google's rules and customers' trust.
// The reviews section stays hidden until there is something real to show.
// Example: { name: "Ahmed K.", car: "Nissan Patrol", text: "…", rating: 5 }
export const REVIEWS = [];
