// Photos and videos for "Our work": the files found in public/images/dent and
// public/videos (see the work-media plugin in vite.config.js), plus optional
// titles / details from src/data/videos.js.
//
// File names drive the layout:
//   toyota-before.mp4 + toyota-after.mp4  → one video card with Before / After / Side-by-side
//   porsche-before.jpg, porsche-after.jpg → photo tiles labelled "Before" / "After"
import media from "virtual:work-media";
import { VIDEOS } from "../data/videos";

// Phone / camera file names ("VID_20261115_1504", "photo_2026-11-15…") make bad captions.
const CAMERA_NAME = /^(vid|video|img|image|photo|pxl|mov|whatsapp|signal|screen)[\s_-]*\d|^\d[\d\s_.-]*$/i;
const pretty = (s) =>
  !s || CAMERA_NAME.test(s) ? null : s.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());

const fileName = (p) => p.split("/").pop().replace(/\.[^.]+$/, "");

/** "toyota-after2" → { stem: "toyota", phase: "after", num: 2 } */
function parse(name) {
  const m = name.match(/^(.*?)[-_\s]*\b(before|after)[-_\s]*(\d*)$/i);
  if (!m) return { stem: name, phase: null, num: 0 };
  return { stem: m[1], phase: m[2].toLowerCase(), num: m[3] ? Number(m[3]) : 0 };
}
const PHASE_ORDER = { before: 0, after: 1, null: 2 };

/** Videos: [{ id, video | before+after, poster, title | null, car, area, … }] in display order. */
export function workVideos() {
  const files = media.videos.map((f) => ({ ...f, ...parse(f.name) }));
  const byKey = new Map();
  for (const f of files) {
    if (!f.phase) continue;
    const key = `${f.stem}|${f.num}`;
    byKey.set(key, { ...byKey.get(key), [f.phase]: f });
  }
  const used = new Set();
  const items = [];
  for (const f of files) {
    if (used.has(f.name)) continue;
    const pair = f.phase && byKey.get(`${f.stem}|${f.num}`);
    if (pair?.before && pair?.after) {
      used.add(pair.before.name); used.add(pair.after.name);
      items.push({
        id: `${f.stem || "pair"}${f.num ? `-${f.num}` : ""}`,
        names: [pair.before.name, pair.after.name, f.stem],
        before: pair.before.src, after: pair.after.src,
        poster: pair.before.poster, title: pretty(f.stem),
      });
    } else {
      used.add(f.name);
      items.push({ id: f.name, names: [f.name], video: f.src, poster: f.poster, title: pretty(f.name) });
    }
  }
  // Optional details from videos.js, matched by file name (or the shared name of a pair).
  const order = [];
  const merged = items.map((it) => {
    const i = VIDEOS.findIndex((v) => v.file && it.names.includes(v.file));
    order.push(i === -1 ? Infinity : i);
    return i === -1 ? it : { ...it, ...VIDEOS[i], poster: VIDEOS[i].poster || it.poster };
  });
  const local = merged.map((m, i) => [m, order[i]]).sort((a, b) => a[1] - b[1]).map(([m]) => m);
  // Entries without a local file (e.g. YouTube links) come first.
  const external = VIDEOS.filter((v) => !v.file && (v.video || v.before)).map((v, i) => ({ id: v.id || `video-${i}`, ...v }));
  return [...external, ...local];
}

/** Photos: [{ src, label, phase }] — named photos grouped (before → after), camera photos last. */
export const workPhotos = media.photos
  .map((src) => {
    const name = fileName(src);
    const p = parse(name);
    return { src, phase: p.phase, num: p.num, stem: p.stem, label: pretty(p.phase ? p.stem : name), camera: CAMERA_NAME.test(name) };
  })
  .sort((a, b) =>
    a.camera - b.camera ||
    a.stem.localeCompare(b.stem) ||
    PHASE_ORDER[a.phase] - PHASE_ORDER[b.phase] ||
    a.num - b.num
  );
