import { useId } from "react";
import { BUSINESS } from "../data/business";
import { cx } from "../lib/helpers";
import { LOGO } from "./logoArt";
import styles from "./BrandLogo.module.css";

/** The round MD badge. Always dark with gold/silver, so it works on any background. */
export function BrandMark({ className, size }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const stops = (list) => list.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />);
  return (
    <svg className={className} viewBox="0 0 64 64" width={size || 64} height={size || 64} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="0" y2="1">{stops(LOGO.gold)}</linearGradient>
        <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1">{stops(LOGO.silver)}</linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31.5" fill={LOGO.badge} />
      <circle cx="32" cy="32" r="29.2" fill="none" stroke={`url(#${uid}g)`} strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.9" fill="none" stroke={`url(#${uid}g)`} strokeOpacity=".35" strokeWidth=".6" />
      <g transform={LOGO.mono.transform}>
        <path d={LOGO.mono.m} fill={`url(#${uid}g)`} />
        <path d={LOGO.mono.d} fill={`url(#${uid}s)`} />
      </g>
    </svg>
  );
}

/**
 * Full logo: badge + "MASTER DENT" + "PAINTLESS DENT REPAIR".
 * Size it with the CSS variable --logo-h (height of the "MASTER DENT" capitals).
 * "MASTER DENT" uses the current text colour; the tagline uses --logo-gold.
 */
export default function BrandLogo({ className, mark = true, tagline = true }) {
  const { line1, line2, gapRatio } = LOGO;
  return (
    <span
      className={cx(styles.logo, className)}
      style={{ "--r2": line2.h / line1.h, "--gap": gapRatio }}
    >
      {mark && <BrandMark className={styles.mark} />}
      <span className={styles.words} aria-hidden="true">
        <svg className={styles.line1} viewBox={`0 0 ${line1.w} ${line1.h}`} width={line1.w} height={line1.h}>
          <path d={line1.d} fill="currentColor" />
        </svg>
        {tagline && (
          <svg className={styles.line2} data-part="tagline" viewBox={`0 0 ${line2.w} ${line2.h}`} width={line2.w} height={line2.h}>
            <path d={line2.d} fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="sr-only">{BUSINESS.name}</span>
    </span>
  );
}
