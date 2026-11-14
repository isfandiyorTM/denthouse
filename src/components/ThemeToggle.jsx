import { Moon, Sun } from "lucide-react";
import { useI18n } from "../i18n/context";
import styles from "./ThemeToggle.module.css";

const COLORS = { light: "#ffffff", dark: "#0f0f0f" };

/** Light / dark switch. Until the visitor uses it, the site follows the device setting. */
export default function ThemeToggle() {
  const { t } = useI18n();

  function toggle() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", COLORS[next]));
    try { localStorage.setItem("dh_theme", next); } catch { /* private mode */ }
  }

  // Icons are switched by CSS (global.css), so the server-rendered HTML always matches.
  return (
    <button type="button" className={styles.button} onClick={toggle} aria-label={t.nav.theme} title={t.nav.theme}>
      <Moon size={18} className="theme-moon" aria-hidden="true" />
      <Sun size={18} className="theme-sun" aria-hidden="true" />
    </button>
  );
}
