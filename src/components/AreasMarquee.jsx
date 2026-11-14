import { MapPin } from "lucide-react";
import { areasFor } from "../data/areas";
import { useI18n } from "../i18n/context";
import styles from "./AreasMarquee.module.css";

/** Slowly scrolling band of Dubai neighbourhoods. Pauses on hover. */
export default function AreasMarquee() {
  const { lang, t } = useI18n();
  const areas = areasFor(lang);
  const label = t.marquee.label;

  return (
    <section className={styles.band} aria-label={label}>
      <p className={styles.label}>
        <MapPin size={15} aria-hidden="true" />
        {label}
      </p>
      <div className={styles.viewport}>
        <ul className={styles.track}>
          {[...areas, ...areas].map((a, i) => (
            <li key={i} aria-hidden={i >= areas.length || undefined}>{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
