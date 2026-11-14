import { useId, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "../data/business";
import { AREAS } from "../data/content";
import { directionsUrl, fullAddress, hoursRows, mailLink, telLink, waLink, WA_QUOTE_TEXT } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import { SOCIAL_ICONS, WhatsAppIcon } from "./icons";
import styles from "./Contact.module.css";

const EMPTY = { name: "", car: "", area: "", damage: "" };

export default function Contact() {
  const uid = useId();
  const [form, setForm] = useState(EMPTY);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    const text = [
      `Hi ${BUSINESS.name}! I'd like a quote.`,
      "",
      `Name: ${form.name.trim()}`,
      `Car: ${form.car.trim()}`,
      ...(form.area.trim() ? [`Area: ${form.area.trim()}`] : []),
      `Damage: ${form.damage.trim()}`,
      "",
      "Photos of the dent below:",
    ].join("\n");
    window.gtag?.("event", "generate_lead", { method: "quote_form" });
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  const methods = [
    { href: waLink(WA_QUOTE_TEXT), icon: <WhatsAppIcon size={20} />, label: "WhatsApp", value: "Send a photo of the dent", external: true, primary: true },
    { href: telLink, icon: <Phone size={20} aria-hidden="true" />, label: "Call", value: BUSINESS.contact.phoneDisplay },
    { href: mailLink, icon: <Mail size={20} aria-hidden="true" />, label: "Email", value: BUSINESS.contact.email },
    { href: directionsUrl(), icon: <MapPin size={20} aria-hidden="true" />, label: "Workshop", value: fullAddress(), external: true },
  ];
  const socials = Object.entries(BUSINESS.social).filter(([, url]) => url);
  const field = (name) => `${uid}-${name}`;

  return (
    <section id="contact" className="section" data-track="contact">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.info} data-reveal>
            <p className="eyebrow">Free quote</p>
            <h2 className="h2">
              Got a dent? Get a price <em>today</em>.
            </h2>
            <p className="lead">
              The quickest way is a photo on WhatsApp. Prefer to talk? Call us. Or fill in the form —
              it opens WhatsApp with your details ready to send.
            </p>

            <ul className={styles.methods}>
              {methods.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    className={`${styles.method} ${m.primary ? styles.methodPrimary : ""}`}
                    {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className={styles.methodIcon}>{m.icon}</span>
                    <span className={styles.methodText}>
                      <span className={styles.methodLabel}>{m.label}</span>
                      <span className={styles.methodValue}>{m.value}</span>
                    </span>
                    <ArrowUpRight size={18} className={styles.methodArrow} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.foot}>
              <OpenStatus fallback={hoursRows().map((r) => `${r.label} ${r.value}`).join(" · ")} className={styles.open} />
              {socials.length > 0 && (
                <div className={styles.socials}>
                  {socials.map(([key, url]) => {
                    const { Icon, label } = SOCIAL_ICONS[key];
                    return (
                      <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${BUSINESS.name} on ${label}`}>
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <form className={styles.form} onSubmit={onSubmit} data-reveal>
            <h3 className={styles.formTitle}>Quick quote request</h3>
            <p className={styles.formSub}>Takes 30 seconds. No obligation.</p>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={field("name")}>Your name</label>
                <input id={field("name")} value={form.name} onChange={set("name")} autoComplete="name" required placeholder="e.g. Ahmed" />
              </div>
              <div className={styles.field}>
                <label htmlFor={field("area")}>Area <span>(optional)</span></label>
                <input id={field("area")} value={form.area} onChange={set("area")} list={field("areas")} placeholder="e.g. Dubai Marina" />
                <datalist id={field("areas")}>
                  {AREAS.map((a) => <option key={a} value={a} />)}
                </datalist>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor={field("car")}>Car — make, model, year</label>
              <input id={field("car")} value={form.car} onChange={set("car")} required placeholder="e.g. Nissan Patrol 2022" />
            </div>
            <div className={styles.field}>
              <label htmlFor={field("damage")}>Where is the dent?</label>
              <textarea
                id={field("damage")}
                value={form.damage}
                onChange={set("damage")}
                required
                rows={3}
                placeholder="e.g. Driver's door, about the size of a coin, paint not damaged"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              <WhatsAppIcon size={20} />
              Continue in WhatsApp
            </button>
            <p className={styles.formNote}>
              Opens WhatsApp with your details filled in — just attach a photo of the dent and press send.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
