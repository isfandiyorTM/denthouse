import { useEffect } from "react";

/**
 * Fades in elements marked with `data-reveal` as they scroll into view.
 * Only elements BELOW the fold at load time are hidden — anything already
 * visible stays put, so the prerendered page never flashes. Without JS,
 * or with reduced-motion on, everything is simply visible.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    const fold = window.innerHeight * 0.92;
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return;
      el.classList.add("reveal-pending");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
