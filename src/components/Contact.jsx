import { Phone } from "lucide-react";
import { BUSINESS } from "../data/business";
import { areasFor } from "../data/areas";
import { useI18n } from "../i18n/context";
import { directionsUrl, fullAddress, hoursRows, mailLink, mapEmbedUrl, telLink, waLink } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import { WhatsAppIcon } from "./icons";
import styles from "./Contact.module.css";

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

            <dl className={styles.details}>
              <div>
                <dt>{c.workshop}</dt>
                <dd>
                  {/* Address stays in English — it must match Google Maps exactly. */}
                  <address dir="ltr" lang="en">{BUSINESS.legalName}<br />{fullAddress()}</address>
                  <a className="text-link" href={directionsUrl()} target="_blank" rel="noopener noreferrer">{c.directions}</a>
                </dd>
              </div>
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
              <div>
                <dt>{c.phone}</dt>
                <dd><a href={telLink} dir="ltr">{contact.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt>{c.email}</dt>
                <dd><a href={mailLink} dir="ltr">{contact.email}</a></dd>
              </div>
            </dl>
          </div>

          <div className={styles.map} data-reveal="scale" style={{ "--d": 2 }}>
            <iframe src={mapEmbedUrl()} title={c.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>

        <p className={styles.areas} data-reveal>
          <strong>{c.areasLabel}</strong>{" "}
          {BUSINESS.mobileService ? c.areasMobile : c.areasStatic}{" "}
          {areasFor(lang).join(lang === "ar" ? "، " : ", ")}.
        </p>
      </div>
    </section>
  );
}
