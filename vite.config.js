import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildHead, buildSitemap, buildRobots, buildManifest, htmlAttrs } from "./src/seo.js";
import { langFromPath } from "./src/i18n/index.js";

/**
 * SEO plugin.
 * - Dev: fills in <head> and <html lang/dir> for the language in the URL (/, /ar/, /ru/, /hi/).
 * - Build: emits sitemap.xml, robots.txt, site.webmanifest. The per-language pages
 *   (head + prerendered body) are written by scripts/prerender.mjs.
 */
function seo() {
  let isSsrBuild = false;
  return {
    name: "denthouse-seo",
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.server) return html; // build: prerender.mjs handles it per language
        const lang = langFromPath(ctx.originalUrl || "/");
        return html.replace('<html lang="en">', `<html ${htmlAttrs(lang)}>`).replace("<!--app-head-->", buildHead(lang));
      },
    },
    configureServer(server) {
      const files = {
        "/sitemap.xml": ["application/xml", buildSitemap],
        "/robots.txt": ["text/plain", buildRobots],
        "/site.webmanifest": ["application/manifest+json", buildManifest],
      };
      server.middlewares.use((req, res, next) => {
        const hit = files[req.url];
        if (!hit) return next();
        res.setHeader("Content-Type", hit[0]);
        res.end(hit[1]());
      });
    },
    generateBundle() {
      if (isSsrBuild) return;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemap() });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: buildRobots() });
      this.emitFile({ type: "asset", fileName: "site.webmanifest", source: buildManifest() });
    },
  };
}

/**
 * Work media plugin: lists the files in public/images/dent (photos) and
 * public/videos (videos) and exposes them as `import media from "virtual:work-media"`.
 * Just drop files in those folders — no code changes needed. Newest file names first.
 * In dev, adding or removing a file reloads the page.
 */
const MEDIA_DIRS = { photos: "public/images/dent", videos: "public/videos" };
const PHOTO_EXT = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|m4v|mov)$/i;

function workMedia() {
  const id = "virtual:work-media";
  const resolved = "\0" + id;
  const list = (dir, ext) => {
    const full = path.resolve(dir);
    if (!fs.existsSync(full)) return [];
    return fs.readdirSync(full).filter((f) => ext.test(f)).sort().reverse();
  };
  return {
    name: "work-media",
    resolveId: (source) => (source === id ? resolved : null),
    load(source) {
      if (source !== resolved) return null;
      const photos = list(MEDIA_DIRS.photos, PHOTO_EXT).map((f) => `/images/dent/${f}`);
      const posters = new Set(list(MEDIA_DIRS.videos, PHOTO_EXT));
      const videos = list(MEDIA_DIRS.videos, VIDEO_EXT).map((f) => {
        const base = f.replace(VIDEO_EXT, "");
        const poster = [...posters].find((p) => p.replace(PHOTO_EXT, "") === base);
        return { src: `/videos/${f}`, poster: poster ? `/videos/${poster}` : null, name: base };
      });
      return `export default ${JSON.stringify({ photos, videos })};`;
    },
    configureServer(server) {
      const dirs = Object.values(MEDIA_DIRS).map((d) => path.resolve(d));
      server.watcher.add(dirs);
      const refresh = (file) => {
        if (!dirs.some((d) => path.resolve(file).startsWith(d))) return;
        const mod = server.moduleGraph.getModuleById(resolved);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", refresh);
      server.watcher.on("unlink", refresh);
    },
  };
}

export default defineConfig({
  plugins: [react(), seo(), workMedia()],
});
