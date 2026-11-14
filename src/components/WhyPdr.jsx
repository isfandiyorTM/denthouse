import { Check, X } from "lucide-react";
import { BUSINESS } from "../data/business";
import { COMPARISON } from "../data/content";
import { waLink } from "../lib/helpers";
import { LogoMark, WhatsAppIcon } from "./icons";
import styles from "./WhyPdr.module.css";

export default function WhyPdr() {
  return (
    <section id="why-pdr" className="section section-alt" data-track="why-pdr">
      <div className={`container ${styles.grid}`}>
        <header className={styles.head} data-reveal>
          <p className="eyebrow">Why paintless</p>
          <h2 className="h2">
            Why PDR beats a <em>respray</em>
          </h2>
          <p className="lead">
            Your car's factory paint is the best finish it will ever have. In {BUSINESS.address.city},
            dealers and buyers check panels with a paint-thickness gauge — a respray shows up
            instantly and takes money off the car. A paintless repair leaves nothing to find.
          </p>
          <a
            href={waLink(`Hi ${BUSINESS.name}! Can my dent be fixed without painting? I'll send a photo.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.cta}`}
          >
            <WhatsAppIcon size={18} />
            Check if my dent qualifies
          </a>
        </header>

        <div className={styles.tableWrap} data-reveal>
          <table className={styles.table}>
            <caption className="sr-only">Paintless dent repair compared with a traditional body shop</caption>
            <thead>
              <tr>
                <td />
                <th scope="col" className={styles.pdrHead}>
                  <LogoMark size={22} />
                  Paintless repair
                </th>
                <th scope="col" className={styles.shopHead}>Body shop</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td className={styles.pdr} data-label="Paintless">
                    <Check size={18} aria-hidden="true" />
                    <span>{row.pdr}</span>
                  </td>
                  <td className={styles.shop} data-label="Body shop">
                    <X size={18} aria-hidden="true" />
                    <span>{row.shop}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.footnote}>Typical figures — every dent is different. Send a photo for an exact answer.</p>
        </div>
      </div>
    </section>
  );
}
