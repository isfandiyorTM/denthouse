import { useMemo, useState } from "react";
import { BUSINESS } from "../data/business";
import { useI18n } from "../i18n/context";
import { workPhotos, workVideos } from "../lib/media";
import { InstagramIcon } from "./icons";
import PhotoViewer from "./PhotoViewer";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import styles from "./Work.module.css";

const VIDEO_PAGE = 6;
const PHOTO_PAGE = 8;

/** "Our work": his real repair videos and photos (dropped into public/videos and public/images/dent). */
export default function Work() {
  const { t } = useI18n();
  const videos = useMemo(() => workVideos(), []);
  const photos = workPhotos;
  const [allVideos, setAllVideos] = useState(false);
  const [allPhotos, setAllPhotos] = useState(false);
  const [openVideo, setOpenVideo] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(null);

  if (!videos.length && !photos.length) return null;

  const shownVideos = allVideos ? videos : videos.slice(0, VIDEO_PAGE);
  const shownPhotos = allPhotos ? photos : photos.slice(0, PHOTO_PAGE);

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
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className={`btn btn-light ${styles.more}`}>
              <InstagramIcon size={18} />
              {t.work.instagram}
            </a>
          )}
        </div>

        {videos.length > 0 && (
          <>
            <ul className={styles.grid}>
              {shownVideos.map((v, i) => (
                <li key={v.id} data-reveal style={{ "--d": i % 3 }}>
                  <VideoCard video={v} onOpen={() => setOpenVideo(v)} />
                </li>
              ))}
            </ul>
            {videos.length > VIDEO_PAGE && !allVideos && (
              <div className={styles.all}>
                <button type="button" className="btn btn-light" onClick={() => setAllVideos(true)}>
                  {t.work.showAll(videos.length)}
                </button>
              </div>
            )}
          </>
        )}

        {photos.length > 0 && (
          <>
            <ul className={`${styles.photos} ${videos.length ? styles.photosAfter : ""}`}>
              {shownPhotos.map((p, i) => (
                <li key={p.src} data-reveal style={{ "--d": i % 4 }}>
                  <button type="button" className={styles.photoBtn} onClick={() => setPhotoIndex(i)} aria-label={t.work.photoOpen(i + 1)}>
                    <img src={p.src} alt={t.work.photoAlt(p.label, p.phase, i + 1)} loading="lazy" decoding="async" />
                    {(p.phase || p.label) && (
                      <span className={styles.tag} aria-hidden="true">
                        {p.label}
                        {p.label && p.phase && " · "}
                        {p.phase && <b className={p.phase === "after" ? styles.after : undefined}>{t.modal[p.phase]}</b>}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {photos.length > PHOTO_PAGE && !allPhotos && (
              <div className={styles.all}>
                <button type="button" className="btn btn-light" onClick={() => setAllPhotos(true)}>
                  {t.work.showAllPhotos(photos.length)}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {openVideo && <VideoModal video={openVideo} onClose={() => setOpenVideo(null)} />}
      {photoIndex !== null && (
        <PhotoViewer photos={photos} index={photoIndex} onIndex={setPhotoIndex} onClose={() => setPhotoIndex(null)} />
      )}
    </section>
  );
}
