import { BUSINESS } from "../data/business";
import { cx, waLink } from "../lib/helpers";
import { useScrolledPast } from "../hooks/useScroll";
import { useI18n } from "../i18n/context";
import LangSwitcher from "./LangSwitcher";
import ThemeToggle from "./ThemeToggle";
import { LogoMark, WhatsAppIcon } from "./icons";
import styles from "./Navbar.module.css";

const LINKS = ["work", "services", "about", "faq", "contact"];

export function Logo() {
  return (
    <span className={styles.logo}>
      <LogoMark size={28} />
      {BUSINESS.name}
    </span>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const scrolled = useScrolledPast(24);

  return (
    <header className={cx(styles.header, scrolled ? styles.scrolled : styles.onHero)} data-track="navbar">
      <div className={cx("container", styles.bar)}>
        <a href="#top" className={styles.home} aria-label={t.nav.home}>
          <Logo />
        </a>
        <nav className={styles.links} aria-label="Main">
          {LINKS.map((id) => (
            <a key={id} href={`#${id}`}>{t.nav[id]}</a>
          ))}
        </nav>
        <div className={styles.actions}>
          <ThemeToggle />
          <LangSwitcher />
          <a
            href={waLink(t.wa.quote)}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("btn btn-dark btn-sm", styles.wa)}
            aria-label={t.nav.whatsapp}
          >
            <WhatsAppIcon size={16} />
            <span className={styles.waText}>{t.nav.whatsapp}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
