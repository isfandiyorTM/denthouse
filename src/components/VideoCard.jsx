import { MapPin, Play } from "lucide-react";
import { SERVICES } from "../data/content";
import { cx, youtubeId } from "../lib/helpers";
import LineBoard from "./LineBoard";
import styles from "./VideoCard.module.css";

function Thumb({ video }) {
  const yt = youtubeId(video.video || video.before || video.after);
  const src = video.poster || (yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null);
  if (src) {
    return <img className={styles.img} src={src} alt="" loading="lazy" decoding="async" />;
  }
  // No cover image yet → generated line-board artwork, unique per video.
  return <LineBoard seed={video.id} lines={9} tags={false} />;
}

export default function VideoCard({ video, index = 0, onOpen }) {
  const service = SERVICES.find((s) => s.id === video.service);
  const isPair = Boolean(video.before && video.after);

  return (
    <article className={styles.card} data-reveal style={{ "--i": index % 3 }}>
      <button type="button" className={styles.thumb} onClick={onOpen} aria-label={`Play video: ${video.title}, ${video.car}`}>
        <Thumb video={video} />
        <span className={styles.shade} aria-hidden="true" />
        <span className={styles.play} aria-hidden="true">
          <Play size={22} fill="currentColor" />
        </span>
        <span className={styles.badges} aria-hidden="true">
          {service && <span className={styles.badge}>{service.short}</span>}
          {isPair && <span className={cx(styles.badge, styles.badgeAccent)}>Before / After</span>}
        </span>
        {video.sample && <span className={styles.sample}>Sample</span>}
      </button>
      <div className={styles.body}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.meta}>
          <span>{video.car}</span>
          {video.area && (
            <span className={styles.area}>
              <MapPin size={13} aria-hidden="true" />
              {video.area}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
