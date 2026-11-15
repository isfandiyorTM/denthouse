import { BUSINESS } from "../data/business";
import { LANGS } from "../i18n";
import { useI18n } from "../i18n/context";
import { mailLink, telLink, waLink } from "../lib/helpers";
import { rememberLang } from "./LangSwitcher";
import BrandLogo from "./BrandLogo";
import { SOCIAL_ICONS } from "./icons";
import styles from "./Footer.module.css";

export default function Footer() {
  const { lang, t } = useI18n();
  const socials = Object.entries(BUSINESS.social).filter(([, url]) => url);

  return (
    <footer className={styles.footer} data-track="footer">
      <div className={`container ${styles.inner}`}>
        <div>
          <BrandLogo className={styles.logo} />
          <p className={styles.tag}>{t.footer.tagline}</p>
        </div>

        <ul className={styles.links}>
          <li><a href={telLink} dir="ltr">{BUSINESS.contact.phoneDisplay}</a></li>
          <li><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href={mailLink} dir="ltr">{BUSINESS.contact.email}</a></li>
          {socials.map(([key, url]) => (
            <li key={key}>
              <a href={url} target="_blank" rel="noopener noreferrer">{SOCIAL_ICONS[key].label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {BUSINESS.legalName}</span>
        {LANGS.length > 1 && (
        <nav aria-label={t.footer.languages} className={styles.langs}>
          {LANGS.map((l) => (
            <a
              key={l.code}
              href={l.path}
              hrefLang={l.code}
              lang={l.code}
              aria-current={l.code === lang ? "true" : undefined}
              onClick={() => rememberLang(l.code)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        )}
      </div>
    </footer>
  );
}
