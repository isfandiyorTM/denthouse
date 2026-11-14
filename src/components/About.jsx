import { Check } from "lucide-react";
import { BUSINESS } from "../data/business";
import { waLink, yearsOfExperience } from "../lib/helpers";
import LineBoard from "./LineBoard";
import { InstagramIcon, LogoMark, WhatsAppIcon } from "./icons";
import styles from "./About.module.css";

export default function About() {
  const { owner, address } = BUSINESS;
  const firstName = owner.name.split(" ")[0];
  const years = yearsOfExperience();

  return (
    <section id="about" className="section section-alt" data-track="about">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media} data-reveal>
          <div className={styles.photo}>
            {owner.photo ? (
              <img src={owner.photo} alt={`${owner.name}, ${owner.role} at ${BUSINESS.name}`} loading="lazy" decoding="async" />
            ) : (
              <>
                <LineBoard seed="about" lines={15} split={false} />
                <div className={styles.placeholder}>
                  <span className={styles.years}>{years}+</span>
                  <span className={styles.yearsLabel}>years of reading dents</span>
                </div>
              </>
            )}
          </div>
          <div className={styles.badge}>
            <LogoMark size={36} />
            <div>
              <strong>{BUSINESS.name}</strong>
              <span>Since {BUSINESS.foundedYear} · {address.area}, {address.city}</span>
            </div>
          </div>
        </div>

        <div className={styles.copy}>
          <header data-reveal>
            <p className="eyebrow">Meet the master</p>
            <h2 className="h2">{owner.name}</h2>
            <p className={styles.role}>{owner.role}</p>
          </header>

          <div className={styles.bio} data-reveal>
            {owner.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {owner.credentials.length > 0 && (
            <ul className={styles.creds} data-reveal>
              {owner.credentials.map((c) => (
                <li key={c}><Check size={16} aria-hidden="true" /> {c}</li>
              ))}
            </ul>
          )}

          <div className={styles.actions} data-reveal>
            <a
              href={waLink(`Hi ${firstName}! I have a question about a dent.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsAppIcon size={18} />
              Message {firstName}
            </a>
            {BUSINESS.social.instagram && (
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <InstagramIcon size={18} />
                Follow on Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
