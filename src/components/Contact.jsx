import { Clock, CreditCard, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { BUSINESS } from "../data/business";
import { areasFor } from "../data/areas";
import { useI18n } from "../i18n/context";
import { fullAddress, hoursRows, mailLink, mapsSearchUrl, telLink, waLink } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import { WhatsAppIcon } from "./icons";
import styles from "./Contact.module.css";

/** Mobile service: where he goes, his base, hours, phone, email, payment. */
export default function Contact() {
  const { lang, t } = useI18n();
  const { contact } = BUSINESS;
  const c = t.contact;

  return (
    <section id="contact" className="section section-alt" data-track="contact">
      <div className="container">
        <div className={styles.grid}>
          <div data-reveal>
            <p className="label">{c.label}</p>
            <h2 className="h2">{c.title}</h2>
            <p className="lead">{c.lead}</p>

            <div className={styles.ctas}>
              <a href={waLink(t.wa.quote)} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                <WhatsAppIcon size={18} />
                {c.whatsapp}
              </a>
              <a href={telLink} className="btn btn-light">
                <Phone size={17} aria-hidden="true" />
                {c.call}
              </a>
            </div>
          </div>

          <dl className={styles.card} data-reveal="scale" style={{ "--d": 2 }}>
            <div className={styles.row}>
              <MapPin size={18} aria-hidden="true" />
              <div>
                <dt>{c.area}</dt>
                <dd>{c.areaValue}</dd>
              </div>
            </div>
            <div className={styles.row}>
              <Navigation size={18} aria-hidden="true" />
              <div>
                <dt>{c.base}</dt>
                <dd>
                  <address className={styles.address}>{fullAddress()}</address>
                  <a className="text-link" href={mapsSearchUrl()} target="_blank" rel="noopener noreferrer">{c.baseMap}</a>
                </dd>
              </div>
            </div>
            <div className={styles.row}>
              <Clock size={18} aria-hidden="true" />
              <div>
                <dt>{c.hours}</dt>
                <dd>
                  {hoursRows(t).map((r) => (
                    <span key={r.label} className={styles.hoursRow}>
                      <span>{r.label}</span> <span>{r.value}</span>
                    </span>
                  ))}
                  <OpenStatus className={styles.status} />
                </dd>
              </div>
            </div>
            <div className={styles.row}>
              <Phone size={18} aria-hidden="true" />
              <div>
                <dt>{c.phone}</dt>
                <dd><a href={telLink} dir="ltr">{contact.phoneDisplay}</a></dd>
              </div>
            </div>
            <div className={styles.row}>
              <Mail size={18} aria-hidden="true" />
              <div>
                <dt>{c.email}</dt>
                <dd><a href={mailLink} dir="ltr">{contact.email}</a></dd>
              </div>
            </div>
            <div className={styles.row}>
              <CreditCard size={18} aria-hidden="true" />
              <div>
                <dt>{c.payment}</dt>
                <dd>{c.paymentValue}</dd>
              </div>
            </div>
          </dl>
        </div>

        <p className={styles.areas} data-reveal>
          <strong>{c.areasLabel}</strong> {c.areasText}{" "}
          {areasFor(lang).join(lang === "ar" ? "، " : ", ")}.
        </p>
      </div>
    </section>
  );
}
