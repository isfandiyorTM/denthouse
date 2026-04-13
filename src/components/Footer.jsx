import styles from "./Footer.module.css";

export default function Footer({ adminMode = false }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        Dent<span className={styles.accent}>House</span>
      </div>
      {adminMode ? (
        <p className={styles.sub}>Admin Panel</p>
      ) : (
        <>
          <p className={styles.sub}>Professional Paintless Dent Repair</p>
          <p className={styles.copy}>
            © {new Date().getFullYear()} DentHouse. All rights reserved.
          </p>
        </>
      )}
    </footer>
  );
}
