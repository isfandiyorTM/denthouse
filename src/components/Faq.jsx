import { Plus } from "lucide-react";
import { useI18n } from "../i18n/context";
import styles from "./Faq.module.css";

export default function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="section" data-track="faq">
      <div className={`container ${styles.wrap}`}>
        <header className="section-head" data-reveal>
          <p className="label">{t.faq.label}</p>
          <h2 className="h2">{t.faq.title}</h2>
        </header>

        <div className={styles.list}>
          {t.faq.items.map((f, i) => (
            <details key={f.q} className={styles.item} name="faq" data-reveal style={{ "--d": i }}>
              <summary className={styles.q}>
                <h3>{f.q}</h3>
                <Plus size={20} className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
