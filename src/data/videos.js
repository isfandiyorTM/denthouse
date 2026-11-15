/**
 * ─────────────────────────────────────────────────────────────────────────
 *  REPAIR VIDEOS & PHOTOS
 *
 *  You don't need to edit code to add work:
 *    • photos → put them in  public/images/dent/   (jpg, png, webp)
 *    • videos → put them in  public/videos/        (mp4 best; webm/mov also work)
 *  They appear automatically in "Our work".
 *
 *  Name files so the site can pair them:
 *    toyota-before.mp4 + toyota-after.mp4   → one card with Before / After / Side by side
 *    porsche-before.jpg, porsche-after.jpg  → photo tiles labelled "Before" / "After"
 *  A video can have a cover image with the same name: tesla-door.mp4 + tesla-door.jpg
 *
 *  OPTIONAL — titles and details below, matched by file name (no extension).
 *  For a before/after pair use the shared name ("toyota"), or "before-1" for before-1/after-1.
 *  Videos listed here are shown first, in this order. The video player sizes itself
 *  to each video (square, vertical or wide) automatically.
 *  YouTube videos can be added too: { video: "https://youtube.com/shorts/…", title: "…" }
 *
 *  Tip: keep videos short (15–60 s) and under ~15 MB (export 1080p, H.264 MP4).
 * ─────────────────────────────────────────────────────────────────────────
 */
export const VIDEOS = [
  { file: "toyota", title: "Big door dent on a Toyota", car: "Toyota" },
  { file: "before-1", title: "Rear wheel-arch dent" },
  { file: "fixing-video3", title: "Tailgate dent, fixed without repainting", car: "Ford Bronco Sport" },
  { file: "fixing-video", title: "Rear panel dent, step by step" },
  { file: "fixing-video2", title: "Dent next to the fuel door" },
];
