import { Star } from "lucide-react";
import { BUSINESS } from "../data/business";
import { REVIEWS } from "../data/reviews";
import { loc } from "../i18n";
import { useI18n } from "../i18n/context";
import styles from "./Reviews.module.css";

/** Hidden until there are real reviews (data/reviews.js) or a real Google rating (business.js). */
export default function Reviews() {
  const { lang, t } = useI18n();
  const { rating, googleMapsUrl, googleReviewUrl } = BUSINESS;
  if (!REVIEWS.length && !rating) return null;

  return (
    <section id="reviews" className="section section-alt" data-track="reviews">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="label">{t.reviews.label}</p>
          <h2 className="h2">{t.reviews.title}</h2>
          {rating && (
            <p className="lead">
              <Star size={18} fill="currentColor" className={styles.star} aria-hidden="true" />{" "}
              {t.reviews.rating(rating.value, rating.count)}
            </p>
          )}
        </header>

        {REVIEWS.length > 0 && (
          <ul className={styles.grid}>
            {REVIEWS.map((r, i) => (
              <li key={i} className={styles.card} data-reveal style={{ "--d": i % 3 }}>
                <blockquote>“{loc(r.text, lang)}”</blockquote>
                <p className={styles.who}>{r.name}{r.car && ` · ${r.car}`}</p>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.links}>
          {googleMapsUrl && <a className="text-link" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">{t.reviews.all}</a>}
          {googleReviewUrl && <a className="text-link" href={googleReviewUrl} target="_blank" rel="noopener noreferrer">{t.reviews.leave}</a>}
        </p>
      </div>
    </section>
  );
}
