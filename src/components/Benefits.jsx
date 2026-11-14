import { ShieldCheck, Timer, Truck, Wallet } from "lucide-react";
import { BUSINESS } from "../data/business";
import { useI18n } from "../i18n/context";
import styles from "./Benefits.module.css";

export default function Benefits() {
  const { t } = useI18n();
  const icons = [ShieldCheck, Timer, BUSINESS.mobileService ? Truck : Wallet];

  return (
    <section className={styles.section} data-track="benefits">
      <ul className={`container ${styles.list}`}>
        {t.benefits.map((b, i) => {
          const Icon = icons[i];
          return (
            <li key={b.title} className={styles.item} data-reveal style={{ "--d": i }}>
              <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <p className={styles.title}>{b.title}</p>
              <p className={styles.text}>{b.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
