import { BUSINESS } from "../data/business";
import { cx } from "../lib/helpers";
import { LOGO } from "./logoArt";
import styles from "./BrandLogo.module.css";

/** His round gold "MD" badge (public/images/logo). `px` = how big it shows, so the right file loads. */
export function BrandMark({ className, px = 40 }) {
  return (
    <img
      className={className}
      src="/images/logo/master-dent-badge-128.webp"
      srcSet="/images/logo/master-dent-badge-128.webp 128w, /images/logo/master-dent-badge-256.webp 256w, /images/logo/master-dent-badge-512.webp 512w"
      sizes={`${px}px`}
      width={px}
      height={px}
      alt=""
      decoding="async"
    />
  );
}

/**
 * Full logo: his badge + "MASTER DENT" + "PAINTLESS DENT REPAIR".
 * Size it with the CSS variable --logo-h (height of the "MASTER DENT" capitals).
 * "MASTER DENT" uses the current text colour; the tagline uses --logo-gold.
 */
export default function BrandLogo({ className, mark = true, tagline = true, markPx = 40 }) {
  const { line1, line2, gapRatio } = LOGO;
  return (
    <span
      className={cx(styles.logo, className)}
      style={{ "--r2": line2.h / line1.h, "--gap": gapRatio }}
    >
      {mark && <BrandMark className={styles.mark} px={markPx} />}
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
