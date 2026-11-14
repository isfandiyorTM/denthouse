import { Phone } from "lucide-react";
import { useScrolledPast } from "../hooks/useScroll";
import { cx, telLink, waLink, WA_QUOTE_TEXT } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./FloatingActions.module.css";

/** Desktop: floating WhatsApp button. Mobile: sticky Call / WhatsApp bar. */
export default function FloatingActions() {
  const show = useScrolledPast(560);

  return (
    <>
      <a
        href={waLink(WA_QUOTE_TEXT)}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(styles.fab, show && styles.show)}
        aria-label="Chat with us on WhatsApp"
        data-track="fab"
      >
        <WhatsAppIcon size={30} />
        <span className={styles.tip} aria-hidden="true">Send us a photo</span>
      </a>

      <div className={cx(styles.bar, show && styles.show)} data-track="mobile-bar">
        <a href={telLink} className={styles.call}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <a href={waLink(WA_QUOTE_TEXT)} target="_blank" rel="noopener noreferrer" className={styles.wa}>
          <WhatsAppIcon size={20} />
          WhatsApp a photo
        </a>
      </div>
    </>
  );
}
