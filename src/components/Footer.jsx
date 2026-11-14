import { ArrowUp } from "lucide-react";
import { BUSINESS } from "../data/business";
import { SERVICES } from "../data/content";
import { hoursRows, mailLink, telLink, waLink } from "../lib/helpers";
import { Logo } from "./Navbar";
import { SOCIAL_ICONS } from "./icons";
import styles from "./Footer.module.css";

export default function Footer() {
  const { address, contact } = BUSINESS;
  const socials = Object.entries(BUSINESS.social).filter(([, url]) => url);

  return (
    <footer className={styles.footer} data-track="footer">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p>
              Paintless dent repair in {address.city}. Dents removed from behind the panel — factory
              paint kept.
            </p>
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map(([key, url]) => {
                  const { Icon, label } = SOCIAL_ICONS[key];
                  return (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${BUSINESS.name} on ${label}`}>
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <nav aria-label="Services">
            <h2 className={styles.h}>Services</h2>
            <ul className={styles.list}>
              {SERVICES.map((s) => (
                <li key={s.id}><a href="#services">{s.title}</a></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.h}>Workshop</h2>
            <address className={styles.address}>
              {BUSINESS.legalName}
              <br />
              {address.street}
              <br />
              {address.city}, United Arab Emirates
            </address>
            <dl className={styles.hours}>
              {hoursRows().map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className={styles.h}>Contact</h2>
            <ul className={styles.list}>
              <li><a href={telLink}>{contact.phoneDisplay}</a></li>
              <li><a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={mailLink}>{contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {BUSINESS.legalName}. All rights reserved.
          </p>
          <a href="#top" className={styles.toTop}>
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
