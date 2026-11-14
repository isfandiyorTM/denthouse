import { useEffect, useState } from "react";
import { openStatus, cx } from "../lib/helpers";
import { useI18n } from "../i18n/context";
import styles from "./OpenStatus.module.css";

/** "Open now · until 6 pm" — computed in Dubai time, on the client only. */
export default function OpenStatus({ fallback, className }) {
  const { t } = useI18n();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const update = () => setStatus(openStatus(t));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [t]);

  if (!status && !fallback) return null;
  return (
    <span className={cx(styles.status, className)}>
      <span className={cx(styles.dot, status && (status.open ? styles.open : styles.closed))} aria-hidden="true" />
      {status ? status.text : fallback}
    </span>
  );
}
