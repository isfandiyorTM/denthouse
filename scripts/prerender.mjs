// Renders the React app to static HTML and writes it into dist/index.html,
// so search engines (and slow phones) get the full page content instantly,
// before any JavaScript runs. React then "hydrates" it in the browser.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distHtml = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await fs.readFile(distHtml, "utf8");
if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> placeholder.");
}

const html = template.replace("<!--app-html-->", render());
await fs.writeFile(distHtml, html);
await fs.rm(ssrDir, { recursive: true, force: true });

console.log(`✓ prerendered dist/index.html (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
