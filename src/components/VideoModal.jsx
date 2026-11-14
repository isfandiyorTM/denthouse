import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { BUSINESS } from "../data/business";
import { SERVICES } from "../data/content";
import { cx, waLink, youtubeId } from "../lib/helpers";
import { WhatsAppIcon } from "./icons";
import styles from "./VideoModal.module.css";

function Player({ src, poster, title, vertical, autoPlay = true }) {
  const yt = youtubeId(src);
  if (yt) {
    return (
      <div className={cx(styles.frame, vertical && styles.vertical)}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=${autoPlay ? 1 : 0}&rel=0&playsinline=1&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className={cx(styles.frame, styles.native, vertical && styles.vertical)}>
      <video src={src} poster={poster} controls autoPlay={autoPlay} playsInline preload="metadata" aria-label={title} />
    </div>
  );
}

export default function VideoModal({ video, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const isPair = Boolean(video.before && video.after);
  const [view, setView] = useState("before");
  const service = SERVICES.find((s) => s.id === video.service);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e) {
      if (e.key === "Escape") return onCloseRef.current();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), iframe, video[controls], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  return (
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className={cx(styles.dialog, isPair && view === "split" && styles.wide)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        data-track="video-modal"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>
              {service?.short}
              {video.area && (
                <>
                  <span aria-hidden="true"> · </span>
                  <MapPin size={12} aria-hidden="true" /> {video.area}
                </>
              )}
            </p>
            <h2 id="video-modal-title" className={styles.title}>{video.title}</h2>
            <p className={styles.car}>{video.car}</p>
          </div>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close video">
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {isPair && (
          <div className={styles.tabs} role="group" aria-label="Choose view">
            {[["before", "Before"], ["after", "After"], ["split", "Side by side"]].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={cx(styles.tab, view === id && styles.tabActive)}
                aria-pressed={view === id}
                onClick={() => setView(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className={styles.stage}>
          {!isPair && <Player src={video.video} poster={video.poster} title={video.title} vertical={video.vertical} />}
          {isPair && view !== "split" && (
            <Player key={view} src={video[view]} title={`${video.title} — ${view}`} vertical={video.vertical} />
          )}
          {isPair && view === "split" && (
            <div className={styles.split}>
              {["before", "after"].map((side) => (
                <div key={side}>
                  <p className={cx(styles.sideLabel, side === "after" && styles.sideAfter)}>{side}</p>
                  <Player src={video[side]} title={`${video.title} — ${side}`} vertical={video.vertical} autoPlay={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        {video.description && <p className={styles.desc}>{video.description}</p>}

        <footer className={styles.footer}>
          <p>
            <strong>Got a dent like this?</strong> Send a photo — we'll price it for free.
          </p>
          <a
            className="btn btn-primary"
            href={waLink(`Hi ${BUSINESS.name}! I saw your "${video.title}" video. I have a similar dent — here's a photo:`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            Get a quote
          </a>
        </footer>
      </div>
    </div>
  );
}
