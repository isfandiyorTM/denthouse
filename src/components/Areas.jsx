import { Clock, MapPin, Navigation } from "lucide-react";
import { BUSINESS } from "../data/business";
import { AREAS } from "../data/content";
import { directionsUrl, fullAddress, hoursRows, mapEmbedUrl, waLink } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import styles from "./Areas.module.css";

export default function Areas() {
  const { area, city } = BUSINESS.address;

  return (
    <section id="areas" className="section section-alt" data-track="areas">
      <div className={`container ${styles.grid}`}>
        <div>
          <header className="section-head" data-reveal>
            <p className="eyebrow">Where we work</p>
            <h2 className="h2">
              Dent repair across <em>{city}</em>
            </h2>
            <p className="lead">
              Our workshop is in {area}.{" "}
              {BUSINESS.mobileService
                ? "With mobile service we also come to you — at home, at the office or in your building's car park, in areas including:"
                : "Customers drive in from all over the city, including:"}
            </p>
          </header>

          <ul className={styles.chips} data-reveal aria-label="Areas we serve">
            {AREAS.map((a) => (
              <li key={a} className={a === area ? styles.home : undefined}>
                {a === area && <MapPin size={13} aria-hidden="true" />}
                {a}
              </li>
            ))}
          </ul>
          <p className={styles.more} data-reveal>
            Don't see your area?{" "}
            <a href={waLink(`Hi ${BUSINESS.name}! Do you cover my area? I'm in `)} target="_blank" rel="noopener noreferrer">
              Ask us on WhatsApp
            </a>{" "}
            — we probably cover it.
          </p>
        </div>

        <div className={styles.card} data-reveal>
          <div className={styles.map}>
            <iframe
              src={mapEmbedUrl()}
              title={`Map: ${BUSINESS.name} workshop in ${area}, ${city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className={styles.info}>
            <div className={styles.row}>
              <MapPin size={18} aria-hidden="true" />
              <div>
                <p className={styles.label}>Workshop</p>
                <address className={styles.address}>
                  <strong>{BUSINESS.legalName}</strong>
                  <br />
                  {fullAddress()}
                </address>
              </div>
            </div>
            <div className={styles.row}>
              <Clock size={18} aria-hidden="true" />
              <div>
                <p className={styles.label}>
                  <OpenStatus fallback="Opening hours" />
                </p>
                <dl className={styles.hours}>
                  {hoursRows().map((r) => (
                    <div key={r.label}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <a href={directionsUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation size={17} aria-hidden="true" />
              Get directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
