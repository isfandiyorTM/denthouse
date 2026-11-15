import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useI18n } from "../i18n/context";
import styles from "./PhotoViewer.module.css";

/** Full-screen photo viewer: arrows / keyboard / swipe, Esc or tap outside to close. */
export default function PhotoViewer({ photos, index, onIndex, onClose }) {
  const { t } = useI18n();
  const g = t.work.gallery;
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const latest = useRef({ index, onIndex, onClose });
  latest.current = { index, onIndex, onClose };
  const n = photos.length;
  const go = (d) => onIndex((index + d + n) % n);

  useEffect(() => {
    const opener = document.activeElement;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      const { index: i, onIndex: set, onClose: close } = latest.current;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") set((i + 1) % n);
      if (e.key === "ArrowLeft") set((i - 1 + n) % n);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      opener?.focus?.();
    };
  }, [n]);

  // Preload the neighbours so arrows feel instant.
  useEffect(() => {
    [index + 1, index - 1].forEach((i) => { const img = new Image(); img.src = photos[(i + n) % n].src; });
  }, [index, n, photos]);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={t.work.photo(index + 1)}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img key={photos[index].src} className={styles.photo} src={photos[index].src} alt={t.work.photoAlt(photos[index].label, photos[index].phase, index + 1)} />
      {(photos[index].label || photos[index].phase) && (
        <p className={styles.caption}>
          {photos[index].label}
          {photos[index].label && photos[index].phase && " · "}
          {photos[index].phase && t.modal[photos[index].phase]}
        </p>
      )}

      <button ref={closeRef} type="button" className={`${styles.btn} ${styles.close}`} onClick={onClose} aria-label={g.close}>
        <X size={22} aria-hidden="true" />
      </button>
      {n > 1 && (
        <>
          <button type="button" className={`${styles.btn} ${styles.prev}`} onClick={() => go(-1)} aria-label={g.prev}>
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <button type="button" className={`${styles.btn} ${styles.next}`} onClick={() => go(1)} aria-label={g.next}>
            <ChevronRight size={26} aria-hidden="true" />
          </button>
          <p className={styles.count} aria-live="polite">{g.count(index + 1, n)}</p>
        </>
      )}
    </div>
  );
}
