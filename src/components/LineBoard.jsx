import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cx, seeded } from "../lib/helpers";
import styles from "./LineBoard.module.css";

/*
 * A glossy car panel reflecting a striped "line board" — the tool PDR
 * technicians use to see a dent. Over a dent the stripes bend; once the
 * metal is back in shape they run straight again.
 *
 * Left of the divider = before (dented), right = after (repaired).
 * Paths are computed deterministically, so server and client render the same.
 */

const W = 640;
const H = 460;

function stripePaths({ count, dent, k, step = 8, precision = 1 }) {
  const top = 34;
  const bottom = H - 34;
  const gap = (bottom - top) / (count - 1);
  const s2 = 2 * dent.s * dent.s;
  const paths = [];
  for (let i = 0; i < count; i++) {
    const y0 = top + i * gap;
    let d = "";
    for (let x = -16; x <= W + 16; x += step) {
      const nx = (x - W / 2) / (W / 2);
      const bow = 18 * nx * nx + 6 * nx; // gentle panel curvature
      const dx = x - dent.x;
      const dy = y0 - dent.y;
      const g = Math.exp(-(dx * dx + dy * dy) / s2);
      // pinch = lines pulled into the dent; wave = the S-bend either side of it
      const y = y0 + bow + k * (-dent.pinch * dy * g + dent.wave * (dx / dent.s) * g);
      d += `${x === -16 ? "M" : "L"}${x} ${+y.toFixed(precision)}`;
    }
    paths.push(d);
  }
  return { paths, stroke: gap * 0.34 };
}

function dentFor(seed) {
  // Dent sits left of centre so it's fully visible on the "before" side at rest.
  if (seed === "hero") return { x: 205, y: 236, s: 92, pinch: 0.55, wave: 28 };
  return {
    x: W * (0.2 + seeded(seed, 1) * 0.1),
    y: H * (0.32 + seeded(seed, 2) * 0.16),
    s: 82 + seeded(seed, 3) * 26,
    pinch: 0.42 + seeded(seed, 4) * 0.14,
    wave: (seeded(seed, 5) > 0.5 ? 1 : -1) * (18 + seeded(seed, 6) * 10),
  };
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function LineBoard({ interactive = false, split = true, tags = true, seed = "hero", lines = 13, className }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const dent = useMemo(() => dentFor(seed), [seed]);
  // Small thumbnails don't need fine detail — keeps the prerendered HTML light.
  const detail = interactive ? { step: 8, precision: 1 } : { step: 16, precision: 0 };
  const before = useMemo(() => (split ? stripePaths({ count: lines, dent, k: 1, ...detail }) : { paths: [], stroke: 0 }), [lines, dent, split, interactive]); // eslint-disable-line react-hooks/exhaustive-deps
  const after = useMemo(() => stripePaths({ count: lines, dent, k: 0, ...detail }), [lines, dent, interactive]); // eslint-disable-line react-hooks/exhaustive-deps

  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const boxRef = useRef(null);
  const dragging = useRef(false);
  const stopIntro = useRef(() => {});

  // One-time hint animation so visitors see it's draggable.
  useEffect(() => {
    if (!interactive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const keys = [[0, 50], [900, 50], [1900, 78], [3200, 14], [4200, 50]];
    let raf = 0;
    let start = 0;
    const tick = (now) => {
      start ||= now;
      const t = now - start;
      const i = keys.findIndex(([kt]) => kt > t);
      if (i === -1) return setPos(50);
      const [t0, p0] = keys[i - 1];
      const [t1, p1] = keys[i];
      setPos(p0 + (p1 - p0) * ease((t - t0) / (t1 - t0)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    stopIntro.current = () => cancelAnimationFrame(raf);
    return () => cancelAnimationFrame(raf);
  }, [interactive]);

  const fromClientX = useCallback((clientX) => {
    const r = boxRef.current.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100, 2, 98));
  }, []);

  const handlers = interactive
    ? {
        onPointerDown(e) {
          stopIntro.current();
          setTouched(true);
          dragging.current = true;
          e.currentTarget.setPointerCapture?.(e.pointerId);
          fromClientX(e.clientX);
        },
        onPointerMove(e) {
          if (dragging.current) fromClientX(e.clientX);
        },
        onPointerUp() {
          dragging.current = false;
        },
        onPointerCancel() {
          dragging.current = false;
        },
      }
    : {};

  function onKeyDown(e) {
    const step = e.shiftKey ? 10 : 4;
    const next =
      e.key === "ArrowLeft" ? pos - step
      : e.key === "ArrowRight" ? pos + step
      : e.key === "Home" ? 2
      : e.key === "End" ? 98
      : null;
    if (next === null) return;
    e.preventDefault();
    stopIntro.current();
    setTouched(true);
    setPos(clamp(next, 2, 98));
  }

  const clipX = (pos / 100) * W;
  const id = (name) => `${uid}-${name}`;

  return (
    <div
      ref={boxRef}
      className={cx(styles.board, interactive && styles.interactive, className)}
      {...handlers}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={styles.svg}>
        <defs>
          <linearGradient id={id("paint")} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#262a31" />
            <stop offset="0.55" stopColor="#14171b" />
            <stop offset="1" stopColor="#0a0b0d" />
          </linearGradient>
          <linearGradient id={id("stripe")} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.42" stopColor="#fff" stopOpacity="0.96" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.82" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id={id("shade")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.45" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("gloss")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
            <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={id("warm")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E8580A" stopOpacity="0" />
            <stop offset="1" stopColor="#E8580A" stopOpacity="0.16" />
          </linearGradient>
          <clipPath id={id("clip")}>
            <rect x="0" y="0" width={clipX} height={H} />
          </clipPath>
        </defs>

        {/* AFTER — straight reflections */}
        <rect width={W} height={H} fill={`url(#${id("paint")})`} />
        <g fill="none" stroke={`url(#${id("stripe")})`} strokeWidth={after.stroke}>
          {after.paths.map((d, i) => <path key={i} d={d} />)}
        </g>

        {/* BEFORE — bent reflections, clipped to the left of the divider */}
        {split && (
          <g clipPath={`url(#${id("clip")})`}>
            <rect width={W} height={H} fill={`url(#${id("paint")})`} />
            <g fill="none" stroke={`url(#${id("stripe")})`} strokeWidth={before.stroke}>
              {before.paths.map((d, i) => <path key={i} d={d} />)}
            </g>
            <ellipse cx={dent.x} cy={dent.y} rx={dent.s * 1.05} ry={dent.s * 0.8} fill={`url(#${id("shade")})`} />
          </g>
        )}

        <rect width={W} height={H} fill={`url(#${id("gloss")})`} />
        <rect width={W} height={H} fill={`url(#${id("warm")})`} />
        {split && !interactive && (
          <line x1={W / 2} y1="0" x2={W / 2} y2={H} stroke="#E8580A" strokeWidth="3" />
        )}
      </svg>

      {split && tags && (
        <>
          <span className={cx(styles.tag, styles.tagBefore)} aria-hidden="true">Before</span>
          <span className={cx(styles.tag, styles.tagAfter)} aria-hidden="true">After</span>
        </>
      )}

      {interactive && (
        <div className={styles.divider} style={{ left: `${pos}%` }}>
          <div
            className={cx(styles.handle, !touched && styles.handleHint)}
            role="slider"
            tabIndex={0}
            aria-label="Compare before and after repair"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% before`}
            onKeyDown={onKeyDown}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6-6 6 6 6" />
              <path d="m15 6 6 6-6 6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
