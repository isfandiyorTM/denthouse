import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { cx, waLink, youtubeId } from "../lib/helpers";
import { loc } from "../i18n";
import { useI18n } from "../i18n/context";
import { WhatsAppIcon } from "./icons";
import styles from "./VideoModal.module.css";

function Player({ src, poster, title, vertical, autoPlay = true }) {
  const yt = youtubeId(src);
  // Size the player to the video's real shape (square / vertical / wide), read from the file.
  const [ratio, setRatio] = useState(null);
  const style = ratio ? { aspectRatio: String(ratio), width: `min(100%, calc(70vh * ${ratio.toFixed(3)}))`, height: "auto" } : undefined;
  return (
    <div className={cx(styles.frame, !ratio && vertical && styles.vertical)} style={style}>
      {yt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=${autoPlay ? 1 : 0}&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay={autoPlay}
          playsInline
          preload="metadata"
          aria-label={title}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
          }}
        />
      )}
    </div>
  );
}

export default function VideoModal({ video, onClose }) {
  const { lang, t } = useI18n();
  const title = loc(video.title, lang) || t.work.videoTitle;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const isPair = Boolean(video.before && video.after);
  const [view, setView] = useState("before");

  useEffect(() => {
    const opener = document.activeElement;
    const root = document.documentElement;
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
      root.style.overflow = "";
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
            <h2 id="video-modal-title" className={styles.title}>{title}</h2>
            <p className={styles.meta}>{video.car}{video.area && ` · ${loc(video.area, lang)}`}</p>
          </div>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label={t.modal.close}>
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {isPair && (
          <div className={styles.tabs} role="group" aria-label={t.modal.views}>
            {[["before", t.modal.before], ["after", t.modal.after], ["split", t.modal.split]].map(([id, label]) => (
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
          {!isPair && <Player src={video.video} poster={video.poster} title={title} vertical={video.vertical} />}
          {isPair && view !== "split" && (
            <Player key={view} src={video[view]} title={`${title} (${t.modal[view]})`} vertical={video.vertical} />
          )}
          {isPair && view === "split" && (
            <div className={styles.split}>
              {["before", "after"].map((side) => (
                <div key={side}>
                  <p className={styles.side}>{t.modal[side]}</p>
                  <Player src={video[side]} title={`${title} (${t.modal[side]})`} vertical={video.vertical} autoPlay={false} />
                </div>
              ))}
            </div>
          )}
        </div>

        {video.description && <p className={styles.desc}>{loc(video.description, lang)}</p>}

        <footer className={styles.footer}>
          <p>{t.modal.similar}</p>
          <a
            className="btn btn-dark btn-sm"
            href={waLink(t.wa.video(title))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={16} />
            {t.modal.send}
          </a>
        </footer>
      </div>
    </div>
  );
}
