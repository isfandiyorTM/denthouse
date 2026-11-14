import { Check } from "lucide-react";
import { BUSINESS } from "../data/business";
import { useI18n } from "../i18n/context";
import styles from "./About.module.css";

export default function About() {
  const { t } = useI18n();
  const { owner } = BUSINESS;
  const initials = owner.name.split(" ").map((w) => w[0]).slice(0, 2).join("");

  return (
    <section id="about" className="section" data-track="about">
      <div className={`container ${styles.grid}`}>
        <div className={styles.photo} data-reveal="clip">
          {owner.photo ? (
            <img src={owner.photo} alt={`${owner.name}, ${t.about.role}, ${BUSINESS.name}`} loading="lazy" decoding="async" />
          ) : (
            <span className={styles.initials} aria-hidden="true">{initials}</span>
          )}
        </div>

        <div data-reveal>
          <p className="label">{t.about.label}</p>
          <h2 className="h2">{owner.name}</h2>
          <p className={styles.role}>{t.about.role}, {BUSINESS.name}</p>

          <div className={styles.bio}>
            {t.about.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {t.about.credentials.length > 0 && (
            <ul className={styles.creds}>
              {t.about.credentials.map((c) => (
                <li key={c}><Check size={18} aria-hidden="true" /> {c}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
