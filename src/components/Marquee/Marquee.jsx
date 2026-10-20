import styles from "./Marquee.module.css";

export default function Marquee({ children, tilt = -3, className = "" }) {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ "--tilt": `${tilt}deg` }}
    >
      <div className={styles.track}>
        <div className={styles.content}>{children}</div>
        <div className={styles.content} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
