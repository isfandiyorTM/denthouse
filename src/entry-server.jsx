import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export { LANGS } from "./i18n";
export { buildHead, htmlAttrs } from "./seo.js";

export function render(lang) {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  );
}
