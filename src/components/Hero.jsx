import { Check, MoveHorizontal, Phone, Star } from "lucide-react";
import { BUSINESS } from "../data/business";
import { hoursRows, telLink, waLink, WA_QUOTE_TEXT, yearsOfExperience } from "../lib/helpers";
import LineBoard from "./LineBoard";
import OpenStatus from "./OpenStatus";
import { WhatsAppIcon } from "./icons";
import styles from "./Hero.module.css";

export default function Hero() {
  const { area, city } = BUSINESS.address;

  const stats = [
    { value: `${yearsOfExperience()}+`, label: "years fixing dents" },
    BUSINESS.carsRepaired && { value: BUSINESS.carsRepaired, label: "cars repaired" },
    { value: "100%", label: "original paint kept" },
    { value: "1–3 h", label: "typical repair time" },
    BUSINESS.rating
      ? { value: <>{BUSINESS.rating.value}<Star size={20} fill="currentColor" aria-hidden="true" /></>, label: `Google rating · ${BUSINESS.rating.count} reviews` }
      : BUSINESS.mobileService && { value: "Mobile", label: `service across ${city}` },
  ].filter(Boolean).slice(0, 4);

  return (
    <section id="top" className={styles.hero} data-track="hero">
      <div className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <OpenStatus fallback={`${hoursRows()[0].label} · ${hoursRows()[0].value}`} />
            <span className={styles.statusSep} aria-hidden="true" />
            <span>{area}, {city}</span>
          </p>

          <h1 className={styles.title}>
            <span className={styles.kicker}>Paintless Dent Repair in {city}</span>{" "}
            <span className={styles.big}>
              Dents out. <em>Factory paint</em> stays.
            </span>
          </h1>

          <p className={styles.lead}>
            Door dings, creases and hail damage removed from behind the panel — no filler, no
            sanding, no respray. Most repairs take hours, not days, at our {area} workshop
            {BUSINESS.mobileService ? ` or at your door anywhere in ${city}` : ""}.
          </p>

          <div className={styles.ctas}>
            <a href={waLink(WA_QUOTE_TEXT)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
              <WhatsAppIcon size={20} />
              WhatsApp a photo — free quote
            </a>
            <a href={telLink} className="btn btn-ghost btn-lg">
              <Phone size={18} aria-hidden="true" />
              {BUSINESS.contact.phoneDisplay}
            </a>
          </div>

          <ul className={styles.ticks}>
            <li><Check size={16} aria-hidden="true" /> No paint, no filler</li>
            <li><Check size={16} aria-hidden="true" /> Same-day in most cases</li>
            <li><Check size={16} aria-hidden="true" /> All makes &amp; models</li>
          </ul>
        </div>

        <figure className={styles.visual}>
          <div className={styles.frame}>
            <LineBoard interactive />
          </div>
          <figcaption className={styles.caption}>
            <MoveHorizontal size={16} aria-hidden="true" />
            <span>
              <strong>Drag to compare.</strong> This is how we read a dent: the reflection lines bend around it.
              When they run straight again, the panel is perfect.
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statLabel}>{s.label}</dt>
              <dd className={styles.statValue}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
