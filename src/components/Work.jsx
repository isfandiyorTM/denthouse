import { useMemo, useState } from "react";
import { BUSINESS } from "../data/business";
import { VIDEOS } from "../data/videos";
import { useI18n } from "../i18n/context";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import styles from "./Work.module.css";

const PAGE = 6;

export default function Work() {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);
  const videos = useMemo(() => [...VIDEOS].sort((a, b) => (b.date || "").localeCompare(a.date || "")), []);
  if (!videos.length) return null;

  const visible = showAll ? videos : videos.slice(0, PAGE);

  return (
    <section id="work" className="section section-alt" data-track="work">
      <div className="container">
        <div className={styles.head}>
          <header className="section-head" data-reveal>
            <p className="label">{t.work.label}</p>
            <h2 className="h2">{t.work.title}</h2>
            <p className="lead">{t.work.lead}</p>
          </header>
          {BUSINESS.social.instagram && (
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className={`text-link ${styles.more}`}>
              {t.work.instagram}
            </a>
          )}
        </div>

        <ul className={styles.grid}>
          {visible.map((v, i) => (
            <li key={v.id} data-reveal style={{ "--d": i % 3 }}>
              <VideoCard video={v} onOpen={() => setOpen(v)} />
            </li>
          ))}
        </ul>

        {videos.length > PAGE && !showAll && (
          <div className={styles.all}>
            <button type="button" className="btn btn-light" onClick={() => setShowAll(true)}>
              {t.work.showAll(videos.length)}
            </button>
          </div>
        )}
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
