import { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import { BUSINESS } from "../data/business";
import { SERVICES } from "../data/content";
import { VIDEOS } from "../data/videos";
import { cx } from "../lib/helpers";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import { InstagramIcon } from "./icons";
import styles from "./Work.module.css";

const PAGE = 6;

export default function Work() {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(null);

  const videos = useMemo(() => [...VIDEOS].sort((a, b) => (b.date || "").localeCompare(a.date || "")), []);
  const chips = useMemo(() => {
    const used = new Set(videos.map((v) => v.service));
    return SERVICES.filter((s) => used.has(s.id));
  }, [videos]);

  const filtered = filter === "all" ? videos : videos.filter((v) => v.service === filter);
  const visible = showAll ? filtered : filtered.slice(0, PAGE);

  if (!videos.length) return null;

  return (
    <section id="work" className="section section-alt" data-track="work">
      <div className="container">
        <div className={styles.head}>
          <header className="section-head" data-reveal>
            <p className="eyebrow">Our work</p>
            <h2 className="h2">
              Real repairs, <em>start to finish</em>
            </h2>
            <p className="lead">
              No editing tricks — just the dent, the tools and the result. Filmed in our workshop and
              on driveways around {BUSINESS.address.city}.
            </p>
          </header>
          {BUSINESS.social.instagram && (
            <a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className={cx("btn btn-ghost", styles.insta)}>
              <InstagramIcon size={18} />
              More on Instagram
            </a>
          )}
        </div>

        {chips.length > 1 && (
          <div className={styles.chips} role="group" aria-label="Filter repairs by type">
            {[{ id: "all", short: "All repairs" }, ...chips].map((c) => {
              const count = c.id === "all" ? videos.length : videos.filter((v) => v.service === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={cx(styles.chip, filter === c.id && styles.chipActive)}
                  aria-pressed={filter === c.id}
                  onClick={() => { setFilter(c.id); setShowAll(false); }}
                >
                  {c.short}
                  <span className={styles.count}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        <ul className={styles.grid}>
          {visible.map((v, i) => (
            <li key={v.id}>
              <VideoCard video={v} index={i} onOpen={() => setOpen(v)} />
            </li>
          ))}
        </ul>

        {filtered.length > PAGE && !showAll && (
          <div className={styles.more}>
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll(true)}>
              Show all {filtered.length} repairs <ArrowDown size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
