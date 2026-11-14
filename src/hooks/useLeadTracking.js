import { useEffect } from "react";

/**
 * If Google Analytics is configured (business.js → analytics), sends an event
 * every time someone taps Call, WhatsApp or Email — the actions that bring
 * customers. In GA4 mark "contact_click" as a key event to see leads.
 */
export function useLeadTracking() {
  useEffect(() => {
    function onClick(e) {
      if (typeof window.gtag !== "function") return;
      const a = e.target.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      const method = href.startsWith("tel:") ? "phone"
        : href.includes("wa.me/") ? "whatsapp"
        : href.startsWith("mailto:") ? "email"
        : /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|g\.page/.test(href) ? "directions"
        : null;
      if (method) {
        window.gtag("event", "contact_click", {
          method,
          location: a.closest("[data-track]")?.getAttribute("data-track") || "page",
        });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
