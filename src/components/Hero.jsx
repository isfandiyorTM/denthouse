import { useEffect, useRef, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { BUSINESS } from "../data/business";
import { areaName } from "../i18n";
import { useI18n } from "../i18n/context";
import { hoursRows, telLink, waLink, yearsOfExperience } from "../lib/helpers";
import OpenStatus from "./OpenStatus";
import { WhatsAppIcon } from "./icons";
import styles from "./Hero.module.css";

// Photo: Dubai Marina at night by Albert Canite (Unsplash License, free for commercial use).
const HERO_SRCSET = "/images/hero-dubai-960.webp 960w, /images/hero-dubai-1600.webp 1600w, /images/hero-dubai-2400.webp 2400w";

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

export default function Hero() {
  const { lang, t } = useI18n();
  const firstHours = hoursRows(t)[0];
  const mediaRef = useRef(null);

  // Gentle parallax: the photo moves slower than the page.
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

  return (
    <section id="top" className={styles.hero} data-track="hero">
      <div className={styles.media} ref={mediaRef} aria-hidden="true">
        <picture>
          <source type="image/webp" srcSet={HERO_SRCSET} sizes="100vw" />
          <img src="/images/hero-dubai-1600.jpg" alt="" fetchpriority="high" decoding="async" />
        </picture>
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

      <a href="#work" className={styles.cue} aria-label={t.hero.scroll}>
        <ChevronDown size={22} aria-hidden="true" />
      </a>
    </section>
  );
}
