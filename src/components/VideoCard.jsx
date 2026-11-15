import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { loc } from "../i18n";
import { useI18n } from "../i18n/context";
import { youtubeId } from "../lib/helpers";
import styles from "./VideoCard.module.css";

/** No cover image? Show the video's own first frame — loaded only when the card scrolls into view. */
function FirstFrame({ src }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShow(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video ref={ref} src={show ? `${src}#t=0.5` : undefined} muted playsInline preload="metadata" tabIndex={-1} aria-hidden="true" />
  );
}

export default function VideoCard({ video, onOpen }) {
  const { lang, t } = useI18n();
  const title = loc(video.title, lang) || t.work.videoTitle;
  const src = video.video || video.before || video.after;
  const yt = youtubeId(src);
  const cover = video.poster || (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null);

  return (
    <article className={styles.card}>
      <button type="button" className={styles.thumb} onClick={onOpen} aria-label={t.work.play(title, video.car || "")}>
        {cover ? <img src={cover} alt="" loading="lazy" decoding="async" /> : !yt && src ? <FirstFrame src={src} /> : null}
        {video.before && video.after && <span className={styles.badge} aria-hidden="true">{t.work.beforeAfter}</span>}
        <span className={styles.play} aria-hidden="true">
          <Play size={18} fill="currentColor" />
        </span>
      </button>
      <h3 className={styles.title}>{title}</h3>
      {(video.car || video.area) && (
        <p className={styles.meta}>
          {video.car}
          {video.car && video.area && " · "}
          {video.area && loc(video.area, lang)}
        </p>
      )}
    </article>
  );
}
