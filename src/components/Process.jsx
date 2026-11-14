import { useI18n } from "../i18n/context";
import { waLink } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./Process.module.css";

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="section section-alt" data-track="process">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="label">{t.process.label}</p>
          <h2 className="h2">{t.process.title}</h2>
        </header>

        {/* data-reveal="fade" on the list: the connecting line draws itself when it scrolls in */}
        <ol className={styles.steps} data-reveal="fade">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal style={{ "--d": i * 2 + 1 }}>
              <span className={styles.num} aria-hidden="true">{i + 1}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>

        <div data-reveal style={{ "--d": 6 }}>
          <a href={waLink(t.wa.quote)} target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${styles.cta}`}>
            <WhatsAppIcon size={18} />
            {t.hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
