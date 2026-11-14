import { useEffect } from "react";

/**
 * Scroll animations. Mark elements with data-reveal (= "up", the default),
 * data-reveal="scale", "side", "clip" or "fade"; optional style={{ "--d": n }} staggers them.
 *
 * Rules that keep content from ever getting stuck invisible:
 * - Only elements BELOW the fold at load are hidden (no flash on first paint).
 * - Cleanup restores every element it touched (React dev mode runs effects
 *   twice; without this the second run skipped everything and left it hidden).
 * - Two triggers: IntersectionObserver plus a scroll check, so a missed
 *   observer callback can't hide content.
 * - No JS, or "reduce motion" on → everything is simply visible.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = new Set();
    const timers = new Set();

    function reveal(el) {
      if (!pending.delete(el)) return;
      io.unobserve(el);
      el.classList.add("rv-in");
      el.classList.remove("rv-pending");
      // Drop the transition afterwards so hover effects aren't delayed.
      const delay = Number(getComputedStyle(el).getPropertyValue("--d")) || 0;
      const timer = setTimeout(() => { el.classList.remove("rv-in"); timers.delete(timer); }, 1400 + delay * 90);
      timers.add(timer);
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal(e.target)),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    function watch(root) {
      const fold = window.innerHeight * 0.92;
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        if (pending.has(el) || el.dataset.rvDone) return;
        el.dataset.rvDone = "1";
        if (el.getBoundingClientRect().top < fold) return; // already on screen: leave visible
        el.classList.add("rv-pending");
        pending.add(el);
        io.observe(el);
      });
    }

    // Safety net: anything pending that is on screen gets revealed.
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const limit = window.innerHeight;
        pending.forEach((el) => el.getBoundingClientRect().top < limit && reveal(el));
      });
    }

    watch(document);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Elements added later (e.g. "Show all repairs").
    const mo = new MutationObserver((records) => {
      for (const r of records) r.addedNodes.forEach((n) => n.nodeType === 1 && watch(n.parentElement || document));
    });
    mo.observe(document.getElementById("main") || document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      timers.forEach(clearTimeout);
      // Restore everything so a re-run (or unmount) never leaves content hidden.
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.remove("rv-pending", "rv-in");
        delete el.dataset.rvDone;
      });
    };
  }, []);
}
