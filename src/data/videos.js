/**
 * ─────────────────────────────────────────────────────────────────────────
 *  REPAIR VIDEOS — newest first.
 *
 *  video   : one of
 *            • a file in /public/videos, e.g. "/videos/patrol-hail.mp4"
 *            • a YouTube link (normal, Shorts, or youtu.be)
 *  poster  : cover image, e.g. "/videos/patrol-hail.jpg"  ← strongly recommended.
 *            YouTube videos get their thumbnail automatically.
 *            Videos WITH a poster are also listed for Google video search.
 *  before / after : optional — two separate clips instead of `video`.
 *            Enables a Before / After / Side-by-side view.
 *  vertical: true for phone-shot / Reels / Shorts (9:16) videos.
 *  service : one of the ids in content.js → SERVICES (used by the filter chips).
 *  area    : Dubai neighbourhood — good for local search.
 *  date    : YYYY-MM-DD
 *
 *  Tip: keep MP4s short (15–60 s) and under ~15 MB. Export at 1080p, H.264.
 * ─────────────────────────────────────────────────────────────────────────
 */

// ⚠ SAMPLE entries — they show a "Sample" badge on the site.
// Replace them with his real repair videos (and delete `sample: true`).
const PLACEHOLDER_CLIP = "https://www.w3schools.com/html/mov_bbb.mp4";

export const VIDEOS = [
  {
    id: "lc300-door",
    sample: true,
    title: "Parking ding on the driver's door",
    car: "Toyota Land Cruiser 2023",
    service: "door-dings",
    area: "Dubai Marina",
    date: "2025-01-18",
    description: "A sharp ding from a car door in a mall car park. Pushed out from behind the door skin in under an hour.",
    video: PLACEHOLDER_CLIP,
  },
  {
    id: "patrol-hail",
    sample: true,
    title: "Hail damage across roof and bonnet",
    car: "Nissan Patrol 2022",
    service: "hail",
    area: "Al Barsha",
    date: "2025-01-05",
    description: "Dozens of hail dents removed panel by panel. Original paint on every panel.",
    video: PLACEHOLDER_CLIP,
  },
  {
    id: "g63-crease",
    sample: true,
    title: "Sharp crease on the rear quarter",
    car: "Mercedes-Benz G 63",
    service: "creases",
    area: "Downtown Dubai",
    date: "2024-12-18",
    description: "A long crease along the body line, worked out gradually until the reflection ran straight.",
    before: PLACEHOLDER_CLIP,
    after: PLACEHOLDER_CLIP,
  },
  {
    id: "lx600-bumper",
    sample: true,
    title: "Pushed-in front bumper",
    car: "Lexus LX 600",
    service: "bumpers",
    area: "JVC",
    date: "2024-12-10",
    description: "Plastic bumper reshaped with heat — no replacement part and no respray.",
    video: PLACEHOLDER_CLIP,
  },
  {
    id: "model3-lease",
    sample: true,
    title: "Four dings fixed before lease return",
    car: "Tesla Model 3",
    service: "lease-return",
    area: "Business Bay",
    date: "2024-12-02",
    description: "Four small dents across two doors removed the day before the lease inspection.",
    video: PLACEHOLDER_CLIP,
  },
  {
    id: "rrs-mobile",
    sample: true,
    title: "Door dent fixed at the customer's villa",
    car: "Range Rover Sport",
    service: "mobile",
    area: "Arabian Ranches",
    date: "2024-11-15",
    description: "Mobile repair in the customer's driveway. Done in 90 minutes.",
    video: PLACEHOLDER_CLIP,
  },
];
