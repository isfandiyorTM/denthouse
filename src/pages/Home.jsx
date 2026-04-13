import { useState } from "react";
import { CATEGORIES } from "../data/constants";
import VideoCard  from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import styles from "./Home.module.css";

export default function Home({ videos }) {
  const [category, setCategory] = useState("all");
  const [query,    setQuery]    = useState("");
  const [modal,    setModal]    = useState(null);

  const filtered = videos.filter((v) => {
    const matchCat = category === "all" || v.category === category;
    const q        = query.toLowerCase();
    const matchQ   = !q || [v.title, v.carModel, v.description].join(" ").toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.pill}>✦ Professional Dent Repair</div>
        <h1 className={styles.heroTitle}>
          Before <span className={styles.accent}>&</span> After
        </h1>
        <p className={styles.heroSub}>
          Watch our expert technicians restore damaged vehicles to showroom
          perfection — no painting needed.
        </p>
        <div className={styles.stats}>
          {[
            { n: `${videos.length}+`, l: "Repairs showcased" },
            { n: "5★",               l: "Customer rating"   },
            { n: "PDR",              l: "Paint-free method" },
            { n: "24h",              l: "Quick turnaround"  },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLbl}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Search ───────────────────────────────── */}
      <div className={styles.searchWrap}>
        <div className={styles.searchInner}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            placeholder="Search by car model, repair type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ── Category pills ───────────────────────── */}
      <div className={`${styles.cats} hide-scrollbar`}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`${styles.catBtn} ${category === c.id ? styles.catActive : ""}`}
            onClick={() => setCategory(c.id)}
          >
            <span className={styles.catIcon}>{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Result count ─────────────────────────── */}
      <p className={styles.count}>
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {category !== "all" && ` in ${CATEGORIES.find((c) => c.id === category)?.label}`}
        {query && ` for "${query}"`}
      </p>

      {/* ── Grid ─────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🚗</div>
          <p>No videos found for your search.</p>
          <button className={styles.clearBtn} onClick={() => { setQuery(""); setCategory("all"); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} onClick={() => setModal(v)} />
          ))}
        </div>
      )}

      {/* ── Modal ────────────────────────────────── */}
      {modal && <VideoModal video={modal} onClose={() => setModal(null)} />}
    </>
  );
}
