import { useEffect, useRef } from "react";
import { Globe } from "lucide-react";
import { LANGS, langInfo } from "../i18n";
import { useI18n } from "../i18n/context";
import styles from "./LangSwitcher.module.css";

/** Remember an explicit choice so the auto-redirect on "/" never overrides it. */
export function rememberLang(code) {
  try { localStorage.setItem("dh_lang", code); } catch { /* private mode */ }
}

export default function LangSwitcher() {
  const { lang, t } = useI18n();
  const ref = useRef(null);
  const current = langInfo(lang);

  useEffect(() => {
    const close = (e) => {
      if (ref.current?.open && (e.type === "keydown" ? e.key === "Escape" : !ref.current.contains(e.target))) {
        ref.current.open = false;
      }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", close);
    };
  }, []);

  return (
    <details ref={ref} className={styles.wrap}>
      <summary className={styles.button} aria-label={`${t.nav.language}: ${current.label}`}>
        <Globe size={17} aria-hidden="true" />
        <span>{current.short}</span>
      </summary>
      <ul className={styles.menu}>
        {LANGS.map((l) => (
          <li key={l.code}>
            <a
              href={l.path}
              hrefLang={l.code}
              lang={l.code}
              dir={l.dir}
              aria-current={l.code === lang ? "true" : undefined}
              onClick={() => rememberLang(l.code)}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
