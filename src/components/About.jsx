import { Check } from "lucide-react";
import { BUSINESS } from "../data/business";
import { useI18n } from "../i18n/context";
import { yearsOfExperience } from "../lib/helpers";
import BrandLogo, { BrandMark } from "./BrandLogo";
import styles from "./About.module.css";

export default function About() {
  const { lang, t } = useI18n();
  const { owner } = BUSINESS;
  // Until he gives a personal name, the section is about the business ("Master Dent Repair").
  const title = owner.name || BUSINESS.name;
  const [first, ...rest] = title.split(" ");

  return (
    <section id="about" className="section" data-track="about">
      <div className={`container ${styles.grid}`}>
        {owner.photo ? (
          <div className={styles.photo} data-reveal="clip">
            <img src={owner.photo} alt={`${title}, ${t.about.role}`} loading="lazy" decoding="async" />
          </div>
        ) : (
          // Until there's a photo of him: a branded card instead of an empty box.
          <div className={styles.emblem} data-reveal="clip" aria-hidden="true">
            <BrandMark className={styles.emblemMark} px={88} />
            <div>
              <span className={styles.years} dir="ltr">{yearsOfExperience()}+</span>
              <span className={styles.yearsLabel}>{t.about.yearsLabel}</span>
            </div>
            <div className={styles.emblemBottom}>
              <BrandLogo className={styles.emblemLogo} mark={false} />
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
          <p className={styles.role}>
            {owner.name ? `${t.about.role}${lang === "ar" ? "، " : ", "}${BUSINESS.name}` : t.about.role}
          </p>

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
