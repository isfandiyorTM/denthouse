import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildHead, buildSitemap, buildRobots, buildManifest } from "./src/seo.js";

/**
 * Injects SEO <head> tags (dev + build) and emits sitemap.xml, robots.txt
 * and site.webmanifest — all generated from src/data/business.js.
 * The page body itself is prerendered by scripts/prerender.mjs.
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
      handler: (html) => html.replace("<!--app-head-->", buildHead()),
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
