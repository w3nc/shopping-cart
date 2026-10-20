import styles from "./Wordmark.module.css";

export default function Wordmark({ size = "md", className = "" }) {
  return (
    <span className={`${styles.wordmark} ${styles[size]} ${className}`}>
      Los Pollos Hermanos
    </span>
  );
}
