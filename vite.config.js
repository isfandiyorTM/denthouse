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

export default defineConfig({
  plugins: [react(), seo()],
});
