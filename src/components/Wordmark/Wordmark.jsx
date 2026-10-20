import styles from "./Wordmark.module.css";

export default function Wordmark({ className = "" }) {
  const classes = [styles.wordmark, className].filter(Boolean).join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <span className={styles.line}>Los Pollos</span>
      <span className={styles.line}>Hermanos</span>
    </span>
  );
}
