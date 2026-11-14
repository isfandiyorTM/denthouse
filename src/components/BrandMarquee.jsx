import { BRANDS } from "../data/content";
import styles from "./BrandMarquee.module.css";

export default function BrandMarquee() {
  return (
    <section className={styles.wrap} aria-labelledby="makes-label">
      <div className={`container ${styles.inner}`}>
        <p id="makes-label" className={styles.label}>All makes, including</p>
        <div className={styles.viewport}>
          <ul className={styles.track}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <li key={i} aria-hidden={i >= BRANDS.length || undefined}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
