import { useEffect, useState } from "react";

/** true once the page is scrolled past `threshold` px. */
export function useScrolledPast(threshold) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const update = () => setPast(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);
  return past;
}
