import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { langFromPath } from "./i18n";

const lang = langFromPath(window.location.pathname);
const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

// Production HTML is prerendered → hydrate it. In dev the root is empty → render.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
