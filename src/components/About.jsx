import { Check } from "lucide-react";
import { BUSINESS } from "../data/business";
import { useI18n } from "../i18n/context";
import { yearsOfExperience } from "../lib/helpers";
import { LogoMark } from "./icons";
import styles from "./About.module.css";

export default function About() {
  const { lang, t } = useI18n();
  const { owner } = BUSINESS;
  const [first, ...rest] = owner.name.split(" ");

  return (
    <section id="about" className="section" data-track="about">
      <div className={`container ${styles.grid}`}>
        {owner.photo ? (
          <div className={styles.photo} data-reveal="clip">
            <img src={owner.photo} alt={`${owner.name}, ${t.about.role}, ${BUSINESS.name}`} loading="lazy" decoding="async" />
          </div>
        ) : (
          // Until there's a photo of him: a branded card instead of an empty box.
          <div className={styles.emblem} data-reveal="clip" aria-hidden="true">
            <div className={styles.emblemTop}>
              <LogoMark size={40} />
              <span>{BUSINESS.name}</span>
            </div>
            <div>
              <span className={styles.years} dir="ltr">{yearsOfExperience()}+</span>
              <span className={styles.yearsLabel}>{t.about.yearsLabel}</span>
            </div>
            <div className={styles.emblemBottom}>
              <span className={styles.signature}>{owner.name}</span>
              <span className={styles.where}>{t.hero.where}</span>
            </div>
          </div>
        )}

        <div data-reveal>
          <p className="label">{t.about.label}</p>
          <h2 className="h2">
            <span className={styles.accentWord}>{first}</span>
            {rest.length > 0 && ` ${rest.join(" ")}`}
          </h2>
          <p className={styles.role}>{t.about.role}{lang === "ar" ? "، " : ", "}{BUSINESS.name}</p>

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
