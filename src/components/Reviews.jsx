import { ArrowUpRight, Star } from "lucide-react";
import { BUSINESS } from "../data/business";
import { REVIEWS } from "../data/content";
import styles from "./Reviews.module.css";

function Stars({ value = 5, size = 16 }) {
  return (
    <span className={styles.stars} aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill={i < Math.round(value) ? "currentColor" : "none"} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Shows only real data: reviews from content.js and the Google rating from business.js. */
export default function Reviews() {
  const { rating, googleMapsUrl, googleReviewUrl } = BUSINESS;
  if (!REVIEWS.length && !rating && !googleMapsUrl) return null;

  return (
    <section id="reviews" className="section" data-track="reviews">
      <div className="container">
        <div className={styles.head}>
          <header className="section-head" data-reveal>
            <p className="eyebrow">Reviews</p>
            <h2 className="h2">
              What drivers in {BUSINESS.address.city} <em>say</em>
            </h2>
          </header>
          {rating && (
            <div className={styles.summary} data-reveal>
              <span className={styles.score}>{rating.value}</span>
              <div>
                <Stars value={rating.value} size={18} />
                <p>{rating.count} Google reviews</p>
              </div>
            </div>
          )}
        </div>

        {REVIEWS.length > 0 && (
          <ul className={styles.grid}>
            {REVIEWS.map((r, i) => (
              <li key={i} className={styles.card} data-reveal style={{ "--i": i % 3 }}>
                <Stars value={r.rating ?? 5} />
                <blockquote className={styles.quote}>“{r.text}”</blockquote>
                <p className={styles.who}>
                  <strong>{r.name}</strong>
                  {r.car && <span>{r.car}</span>}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.ctas} data-reveal>
          {googleMapsUrl && (
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Read all reviews on Google <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
          {googleReviewUrl && (
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Star size={16} aria-hidden="true" /> Repaired with us? Leave a review
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
