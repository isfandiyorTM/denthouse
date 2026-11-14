import { ArrowRight, Car, CloudHail, DoorOpen, Info, KeyRound, Spline, Truck, Wrench } from "lucide-react";
import { BUSINESS } from "../data/business";
import { SERVICES } from "../data/content";
import { waLink } from "../lib/helpers";
import styles from "./Services.module.css";

export const SERVICE_ICONS = {
  "door-dings": DoorOpen,
  hail: CloudHail,
  creases: Spline,
  bumpers: Car,
  "lease-return": KeyRound,
  mobile: Truck,
};

export default function Services() {
  return (
    <section id="services" className="section" data-track="services">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">What we fix</p>
          <h2 className="h2">
            Car dent repair in {BUSINESS.address.city}{" "}— <em>without the paint shop</em>
          </h2>
          <p className="lead">
            If the paint isn't cracked, there's a good chance the dent can disappear completely —
            and your car keeps the original factory finish that a respray never quite matches.
          </p>
        </header>

        <ul className={styles.grid}>
          {SERVICES.map((s, i) => {
            const Icon = SERVICE_ICONS[s.id] ?? Wrench;
            return (
              <li key={s.id} className={styles.card} data-reveal style={{ "--i": i % 3 }}>
                <div className={styles.top}>
                  <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.text}>{s.text}</p>
                <a
                  className={`link-arrow ${styles.link}`}
                  href={waLink(`Hi ${BUSINESS.name}! I'd like a quote for: ${s.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get a price <ArrowRight size={16} aria-hidden="true" />
                  <span className="sr-only"> for {s.title.toLowerCase()}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className={styles.note} data-reveal>
          <Info size={18} aria-hidden="true" />
          <span>
            <strong>Not sure if PDR can fix it?</strong> Send a photo anyway. If it's really a job for a
            body shop, we'll tell you straight.
          </span>
        </p>
      </div>
    </section>
  );
}
