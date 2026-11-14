import { Plus } from "lucide-react";
import { BUSINESS } from "../data/business";
import { FAQS } from "../data/content";
import { waLink } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <section id="faq" className="section" data-track="faq">
      <div className={`container ${styles.grid}`}>
        <header className={styles.head} data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2">
            Questions people ask <em>before booking</em>
          </h2>
          <p className="lead">Something else on your mind? Ask — a real person answers.</p>
          <a
            href={waLink(`Hi ${BUSINESS.name}! I have a question: `)}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-ghost ${styles.ask}`}
          >
            <WhatsAppIcon size={18} />
            Ask on WhatsApp
          </a>
        </header>

        <div className={styles.list}>
          {FAQS.map((f, i) => (
            <details key={f.q} className={styles.item} name="faq" open={i === 0} data-reveal style={{ "--i": i % 4 }}>
              <summary className={styles.q}>
                <h3>{f.q}</h3>
                <span className={styles.icon} aria-hidden="true"><Plus size={18} /></span>
              </summary>
              <p className={styles.a}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
