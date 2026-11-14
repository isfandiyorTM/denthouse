import { useEffect, useState } from "react";
import { Moon, Phone, Sun } from "lucide-react";
import { BUSINESS } from "../data/business";
import { cx, telLink, waLink, WA_QUOTE_TEXT } from "../lib/helpers";
import { useActiveSection, useScrolledPast } from "../hooks/useScroll";
import { LogoMark, WhatsAppIcon } from "./icons";
import styles from "./Navbar.module.css";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "work", label: "Our work" },
  { id: "why-pdr", label: "Why PDR" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("dh_theme", next); } catch { /* private mode */ }
}

export function Logo({ className }) {
  return (
    <span className={cx(styles.logo, className)}>
      <LogoMark size={34} />
      <span className={styles.wordmark}>
        Dent<span>House</span>
      </span>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(8);
  const active = useActiveSection(LINKS.map((l) => l.id));

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={cx(styles.header, (scrolled || open) && styles.solid)} data-track="navbar">
      <div className={cx("container", styles.bar)}>
        <a href="#top" className={styles.logoLink} aria-label={`${BUSINESS.name} — back to top`} onClick={close}>
          <Logo />
        </a>

        <nav className={styles.links} aria-label="Main">
          {LINKS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={cx(styles.link, active === id && styles.linkActive)}>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} onClick={toggleTheme} aria-label="Switch light / dark theme">
            <Sun size={18} className="theme-icon-sun" aria-hidden="true" />
            <Moon size={18} className="theme-icon-moon" aria-hidden="true" />
          </button>
          <a href={telLink} className={styles.phone}>
            <Phone size={16} aria-hidden="true" />
            {BUSINESS.contact.phoneDisplay}
          </a>
          <a href={waLink(WA_QUOTE_TEXT)} target="_blank" rel="noopener noreferrer" className={cx("btn btn-primary btn-sm", styles.cta)}>
            <WhatsAppIcon size={17} />
            Free quote
          </a>
          <button
            type="button"
            className={cx(styles.burger, open && styles.burgerOpen)}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.sheet} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {LINKS.map(({ id, label }, i) => (
            <a key={id} href={`#${id}`} className={styles.sheetLink} onClick={close} style={{ "--i": i }}>
              {label}
            </a>
          ))}
          <div className={styles.sheetCtas}>
            <a href={waLink(WA_QUOTE_TEXT)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" onClick={close}>
              <WhatsAppIcon size={19} /> WhatsApp a photo
            </a>
            <a href={telLink} className="btn btn-ghost btn-lg" onClick={close}>
              <Phone size={18} aria-hidden="true" /> Call {BUSINESS.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
