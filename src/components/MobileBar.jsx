import { Phone } from "lucide-react";
import { useScrolledPast } from "../hooks/useScroll";
import { useI18n } from "../i18n/context";
import { cx, telLink, waLink } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./MobileBar.module.css";

/** Phones only: Call / WhatsApp buttons pinned to the bottom after scrolling a little. */
export default function MobileBar() {
  const { t } = useI18n();
  const show = useScrolledPast(400);
  return (
    <div className={cx(styles.bar, show && styles.show)} data-track="mobile-bar">
      <a href={telLink} className="btn btn-light">
        <Phone size={17} aria-hidden="true" />
        {t.mobileBar.call}
      </a>
      <a href={waLink(t.wa.quote)} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
        <WhatsAppIcon size={18} />
        {t.mobileBar.whatsapp}
      </a>
    </div>
  );
}
