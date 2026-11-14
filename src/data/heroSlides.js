/**
 * Background photos of the hero slideshow, in order. Files: public/images/hero/
 *
 * widths : the WebP sizes that exist (slide-<n>-<width>.webp)
 * pos    : which part of the photo stays visible when it's cropped (desktop)
 * posMobile : same, for tall phone screens (only a narrow strip of the photo fits)
 * dim    : darken bright photos so the white text stays readable (1 = as is)
 *
 * To add a photo: export it as WebP at 960 / 1600 / 1920 px wide (whatever the
 * original allows), name it slide-7-<width>.webp and add a line below.
 * Only slide 1 loads with the page; the others load in the background later.
 */
export const HERO_SLIDES = [
  { n: 1, widths: [960, 1600, 1920], pos: "50% 50%", posMobile: "58% 50%", dim: 1 }, // black car, light board
  { n: 2, widths: [960, 1600, 1920], pos: "50% 50%", posMobile: "46% 50%", dim: 0.9 }, // silver car, glue puller
  { n: 3, widths: [960, 1280], pos: "50% 50%", posMobile: "48% 50%", dim: 0.95 }, // slide hammer
  { n: 4, widths: [960, 1200], pos: "50% 50%", posMobile: "38% 50%", dim: 0.75 }, // white car, glue puller
  { n: 5, widths: [960], pos: "50% 50%", posMobile: "62% 50%", dim: 0.72 }, // white door, light board
  { n: 6, widths: [960], pos: "50% 50%", posMobile: "40% 50%", dim: 0.72 }, // knock-down tool
];

export const slideSrcSet = (s) => s.widths.map((w) => `/images/hero/slide-${s.n}-${w}.webp ${w}w`).join(", ");
export const slideSrc = (s) => `/images/hero/slide-${s.n}-${s.widths[s.widths.length - 1]}.webp`;

// How wide each photo is drawn, so the browser downloads the right file:
// - phones: the photo box in the top half is drawn up to 1.5x the screen width
// - upright tablets: drawn full width
// - other screens narrower than 3:2: the cover crop makes it wider than the screen
export const SLIDE_SIZES =
  "(max-width: 720px) 150vw, (orientation: portrait) and (max-width: 1100px) 100vw, (max-aspect-ratio: 3/2) 171vh, 100vw";

// How long each photo stays (ms). Must match the progress bar in Hero.module.css.
export const SLIDE_MS = 6500;
