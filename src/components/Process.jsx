import { BadgeCheck, Camera, MessageCircle, Wrench } from "lucide-react";
import { PROCESS } from "../data/content";
import { waLink, WA_QUOTE_TEXT } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./Process.module.css";

const ICONS = { photo: Camera, quote: MessageCircle, repair: Wrench, done: BadgeCheck };

export default function Process() {
  return (
    <section id="process" className="section" data-track="process">
      <div className="container">
        <header className="section-head center" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="h2">
            From photo to perfect in <em>four steps</em>
          </h2>
        </header>

        <ol className={styles.steps}>
          {PROCESS.map((step, i) => {
            const Icon = ICONS[step.id] ?? Wrench;
            return (
              <li key={step.id} className={styles.step} data-reveal style={{ "--i": i }}>
                <div className={styles.marker}>
                  <span className={styles.icon}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                </div>
                <p className={styles.num}>Step {i + 1}</p>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
              </li>
            );
          })}
        </ol>

        <div className={styles.cta} data-reveal>
          <a href={waLink(WA_QUOTE_TEXT)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            <WhatsAppIcon size={20} />
            Start with step 1
          </a>
          <span className={styles.ctaNote}>Free · no obligation</span>
        </div>
      </div>
    </section>
  );
}
