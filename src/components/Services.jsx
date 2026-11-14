import { useI18n } from "../i18n/context";
import { waLink } from "../lib/helpers";
import styles from "./Services.module.css";

export default function Services() {
  const { t } = useI18n();
  const [pre, link, post] = t.services.unsure;

  return (
    <section id="services" className="section" data-track="services">
      <div className={`container ${styles.grid}`}>
        <header className={styles.head} data-reveal="side">
          <p className="label">{t.services.label}</p>
          <h2 className="h2">{t.services.title}</h2>
          <p className="lead">{t.services.lead}</p>
          <p className={styles.unsure}>
            {pre}{" "}
            <a className="text-link" href={waLink(t.wa.unsure)} target="_blank" rel="noopener noreferrer">
              {link}
            </a>{" "}
            {post}
          </p>
        </header>

        <ul className={styles.list}>
          {t.services.items.map((s, i) => (
            <li key={s.id} className={styles.item} data-reveal style={{ "--d": i }}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
