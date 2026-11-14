// Renders the site to static HTML once per language:
//   dist/index.html (English), dist/ar/index.html, dist/ru/index.html, dist/hi/index.html
// Search engines (and slow phones) get the full page instantly, before any
// JavaScript runs. React then "hydrates" it in the browser.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, buildHead, htmlAttrs, LANGS } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
for (const marker of ['<html lang="en">', "<!--app-head-->", "<!--app-html-->"]) {
  if (!template.includes(marker)) throw new Error(`dist/index.html is missing ${marker}`);
}

for (const { code, path: urlPath } of LANGS) {
  const html = template
    .replace('<html lang="en">', `<html ${htmlAttrs(code)}>`)
    .replace("<!--app-head-->", buildHead(code))
    .replace("<!--app-html-->", render(code));
  const outDir = path.join(dist, urlPath);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html);
  console.log(`✓ prerendered ${path.relative(root, path.join(outDir, "index.html"))} (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
}

await fs.rm(ssrDir, { recursive: true, force: true });
