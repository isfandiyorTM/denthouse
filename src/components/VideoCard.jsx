import { CATEGORIES } from "../data/constants";
import styles from "./VideoCard.module.css";

export default function VideoCard({ video, onClick }) {
  const catLabel = CATEGORIES.find((c) => c.id === video.category)?.label ?? video.category;

  return (
    <div className={styles.card} onClick={onClick}>
      {/* Thumbnail area */}
      <div className={styles.thumb}>
        <div className={styles.badges}>
          <span className={styles.catBadge}>{catLabel}</span>
          <span className={styles.baBadge}>Before / After</span>
        </div>
        <div className={styles.playBtn}>▶</div>
      </div>

      {/* Info */}
      <div className={styles.body}>
        <h3 className={styles.title}>{video.title}</h3>
        <p className={styles.model}>
          <span className={styles.dot}>●</span>
          {video.carModel}
        </p>
        <p className={styles.desc}>{video.description}</p>
        <div className={styles.footer}>
          <span className={styles.date}>{video.date}</span>
          <span className={styles.watch}>Watch repair →</span>
        </div>
      </div>
    </div>
  );
}
