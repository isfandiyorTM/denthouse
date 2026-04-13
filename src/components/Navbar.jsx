import styles from "./Navbar.module.css";

function CarLogo() {
  return (
    <svg width="34" height="17" viewBox="0 0 64 32" fill="none">
      <path d="M4 22 L10 12 L20 9 L44 9 L54 12 L60 22 L60 26 L4 26 Z" fill="#E8580A" />
      <path d="M22 9 L26 5 L38 5 L42 9" fill="#c94a08" />
      <circle cx="16" cy="27" r="4.5" fill="#111" stroke="#555" strokeWidth="1.5" />
      <circle cx="16" cy="27" r="2"   fill="#333" />
      <circle cx="48" cy="27" r="4.5" fill="#111" stroke="#555" strokeWidth="1.5" />
      <circle cx="48" cy="27" r="2"   fill="#333" />
    </svg>
  );
}

export default function Navbar({ view, onViewChange, adminLoggedIn, onLogout }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => onViewChange("home")}>
        <CarLogo />
        <span className={styles.logoText}>
          Dent<span className={styles.accent}>House</span>
        </span>
      </div>

      <div className={styles.right}>
        {view === "home" ? (
          <>
            <button className={`${styles.btn} ${styles.active}`}>Gallery</button>
            <button
              className={`${styles.btn} ${styles.adminBtn}`}
              onClick={() => onViewChange("admin")}
            >
              Admin ↗
            </button>
          </>
        ) : (
          <>
            <button className={styles.btn} onClick={() => onViewChange("home")}>
              ← Customer View
            </button>
            {adminLoggedIn && (
              <button className={styles.btn} onClick={onLogout}>
                Sign out
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
