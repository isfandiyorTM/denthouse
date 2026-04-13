import { useState } from "react";
import { CATEGORIES } from "../data/constants";
import styles from "./VideoModal.module.css";

export default function VideoModal({ video, onClose }) {
  const [tab, setTab] = useState("before");
  const catLabel = CATEGORIES.find((c) => c.id === video.category)?.label ?? video.category;

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{video.title}</h2>
            <p className={styles.subtitle}>
              {video.carModel} · {catLabel} · {video.date}
            </p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Tab switcher */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === "before" ? styles.activeTab : ""}`}
              onClick={() => setTab("before")}
            >
              ▶ Before
            </button>
            <button
              className={`${styles.tab} ${tab === "after" ? styles.activeTab : ""}`}
              onClick={() => setTab("after")}
            >
              ✓ After
            </button>
          </div>

          {/* Video player */}
          <div className={styles.player}>
            <video
              key={tab === "before" ? video.beforeUrl : video.afterUrl}
              src={tab === "before" ? video.beforeUrl : video.afterUrl}
              controls
              autoPlay
              muted
              playsInline
            />
          </div>

          {/* Meta + description */}
          <div className={styles.meta}>
            <div className={styles.tags}>
              <span className={styles.tag}><span className={styles.tagDot}>◆</span>{catLabel}</span>
              <span className={styles.tag}><span className={styles.tagDot}>◆</span>Paintless Dent Repair</span>
              <span className={styles.tag}><span className={styles.tagDot}>◆</span>{video.date}</span>
            </div>
            <p className={styles.desc}>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
