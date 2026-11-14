import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Pause, Phone, Play } from "lucide-react";
import { BUSINESS } from "../data/business";
import { HERO_SLIDES, SLIDE_MS, SLIDE_SIZES, slideSrc, slideSrcSet } from "../data/heroSlides";
import { areaName } from "../i18n";
import { useI18n } from "../i18n/context";
import { cx, hoursRows, telLink, waLink, yearsOfExperience } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import { WhatsAppIcon } from "./icons";
import styles from "./Hero.module.css";

/** Counts up from 0 once the stats appear. Server HTML shows the final number. */
function CountUp({ to, suffix = "", delay = 900 }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    setN(0);
    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1400);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [to, delay]);
  return <>{n}{suffix}</>;
}

const addTo = (set, i) => (set.has(i) ? set : new Set(set).add(i));

/**
 * Background slideshow, built to stay light:
 * - Only photo 1 is in the page HTML. The others start downloading after the
 *   page has fully loaded and the browser is idle, one photo ahead.
 * - A photo is shown only once it has finished downloading (no blank slides).
 * - It pauses off-screen / in a hidden tab, and doesn't auto-play with
 *   "reduce motion" or data-saver / 2G connections.
 */
function useSlideshow(sectionRef) {
  const count = HERO_SLIDES.length;
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [want, setWant] = useState(0);
  const [mounted, setMounted] = useState(() => new Set([0]));
  const [ready, setReady] = useState(() => new Set([0]));
  const [auto, setAuto] = useState(false); // decided on the client after load
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const failed = useRef(new Set());

  // Start auto-play only after the page has loaded, when the browser is idle.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = navigator.connection;
    const slow = c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ""));
    if (reduce || slow || count < 2) return;
    let handle = 0;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 300));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const start = () => { handle = idle(() => setAuto(true)); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => { window.removeEventListener("load", start); cancel(handle); };
  }, [count]);

  // Pause when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let inView = true;
    const update = () => setHidden(!inView || document.hidden);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [sectionRef]);

  // Preload the photo after the current one.
  useEffect(() => {
    if (auto) setMounted((m) => addTo(m, (active + 1) % count));
  }, [active, auto, count]);

  // Switch to the wanted photo as soon as it has downloaded.
  useEffect(() => {
    if (want === active) return;
    if (!mounted.has(want)) { setMounted((m) => addTo(m, want)); return; }
    if (ready.has(want)) { setPrev(active); setActive(want); }
  }, [want, active, mounted, ready]);

  const next = useCallback(() => {
    let j = (active + 1) % count;
    for (let guard = 0; failed.current.has(j) && guard < count; guard++) j = (j + 1) % count;
    setWant(j);
  }, [active, count]);

  const onLoad = (i) => setReady((r) => addTo(r, i));
  const onError = (i) => { failed.current.add(i); if (i === want && i !== active) setWant(active); };

  return {
    active, prev, mounted, auto, onLoad, onError, next,
    go: setWant,
    paused: userPaused || hidden,
    userPaused,
    togglePause: () => setUserPaused((p) => !p),
  };
}

export default function Hero() {
  const { lang, t } = useI18n();
  const firstHours = hoursRows(t)[0];
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const show = useSlideshow(sectionRef);

  // Gentle parallax: the photos move slower than the page.
  useEffect(() => {
    const el = mediaRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        el.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const words = t.hero.title.split(" ");
  const count = HERO_SLIDES.length;

  return (
    <section
      id="top"
      ref={sectionRef}
      className={cx(styles.hero, show.paused && styles.paused, !show.auto && styles.manual)}
      style={{ "--slide-ms": `${SLIDE_MS}ms` }}
      data-track="hero"
    >
      <div className={styles.media} ref={mediaRef} aria-hidden="true">
        {HERO_SLIDES.map((s, i) =>
          show.mounted.has(i) ? (
            <div
              key={s.n}
              className={cx(styles.slide, i === show.active && styles.active, i === show.prev && styles.prev)}
              style={{ "--pos": s.pos, "--pos-m": s.posMobile, "--dim": s.dim }}
            >
              <img
                src={slideSrc(s)}
                srcSet={slideSrcSet(s)}
                sizes={SLIDE_SIZES}
                alt=""
                decoding="async"
                {...(i === 0 ? { fetchpriority: "high" } : {})}
                onLoad={() => show.onLoad(i)}
                onError={() => show.onError(i)}
              />
            </div>
          ) : null
        )}
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <p className={styles.meta}>
          <span>{areaName(lang)}{lang === "ar" ? "، " : ", "}{t.city}</span>
          <span className={styles.sep} aria-hidden="true" />
          <OpenStatus fallback={`${firstHours.label} ${firstHours.value}`} />
        </p>

        <h1 className={styles.title}>
          {words.map((w, i) => (
            <span key={i} className={styles.word} style={{ "--i": i }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p className={styles.lead}>{t.hero.lead}</p>

        <div className={styles.ctas}>
          <a href={waLink(t.wa.quote)} target="_blank" rel="noopener noreferrer" className={`btn ${styles.primary}`}>
            <WhatsAppIcon size={18} />
            {t.hero.cta}
          </a>
          <a href={telLink} className={`btn ${styles.glass}`}>
            <Phone size={17} aria-hidden="true" />
            <span dir="ltr">{BUSINESS.contact.phoneDisplay}</span>
          </a>
        </div>
        <p className={styles.note}>{t.hero.note}</p>

        <dl className={styles.stats}>
          <div>
            <dt>{t.hero.stats.years}</dt>
            <dd><CountUp to={yearsOfExperience()} suffix="+" /></dd>
          </div>
          <div>
            <dt>{t.hero.stats.paint}</dt>
            <dd><CountUp to={100} suffix="%" delay={1050} /></dd>
          </div>
          <div>
            <dt>{t.hero.stats.time}</dt>
            <dd>{t.hero.stats.timeValue}</dd>
          </div>
        </dl>
      </div>

      {count > 1 && (
        <div className={styles.controls} role="group" aria-label={t.hero.slides.label}>
          {HERO_SLIDES.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={cx(styles.bar, i === show.active && styles.barOn)}
              aria-label={t.hero.slides.photo(i + 1, count)}
              aria-current={i === show.active ? "true" : undefined}
              onClick={() => show.go(i)}
            >
              <span className={styles.track}>
                {i === show.active && <span key={show.active} className={styles.fill} onAnimationEnd={show.next} />}
              </span>
            </button>
          ))}
          {show.auto && (
            <button
              type="button"
              className={styles.pause}
              onClick={show.togglePause}
              aria-label={show.userPaused ? t.hero.slides.play : t.hero.slides.pause}
            >
              {show.userPaused ? <Play size={14} fill="currentColor" aria-hidden="true" /> : <Pause size={14} fill="currentColor" aria-hidden="true" />}
            </button>
          )}
        </div>
      )}

      <a href="#work" className={styles.cue} aria-label={t.hero.scroll}>
        <ChevronDown size={22} aria-hidden="true" />
      </a>
    </section>
  );
}
