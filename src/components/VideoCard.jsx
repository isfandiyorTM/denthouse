import { Play } from "lucide-react";
import { loc } from "../i18n";
import { useI18n } from "../i18n/context";
import { youtubeId } from "../lib/helpers";
import styles from "./VideoCard.module.css";

export default function VideoCard({ video, onOpen }) {
  const { lang, t } = useI18n();
  const title = loc(video.title, lang);
  const yt = youtubeId(video.video || video.before || video.after);
  const cover = video.poster || (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null);

  return (
    <article className={styles.card}>
      <button type="button" className={styles.thumb} onClick={onOpen} aria-label={t.work.play(title, video.car)}>
        {cover && <img src={cover} alt="" loading="lazy" decoding="async" />}
        <span className={styles.play} aria-hidden="true">
          <Play size={18} fill="currentColor" />
        </span>
        {video.sample && <span className={styles.sample}>{t.work.sample}</span>}
      </button>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.meta}>
        {video.car}
        {video.area && ` · ${loc(video.area, lang)}`}
      </p>
    </article>
  );
}
