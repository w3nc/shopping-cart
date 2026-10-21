import styles from "./Marquee.module.css";

// An endless strip of text. The content is repeated enough times to be wider than any screen,
// and the whole track slides left by exactly one copy, so the loop has no visible jump.
export default function Marquee({
  children,
  tilt = -3,
  repeat = 4,
  className = "",
}) {
  const group = Array.from({ length: repeat }, (_, index) => (
    <span key={index} className={styles.unit}>
      {children}
    </span>
  ));

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      aria-hidden="true"
      style={{ "--tilt": `${tilt}deg` }}
    >
      <div className={styles.track}>
        <div className={styles.content}>{group}</div>
        <div className={styles.content}>{group}</div>
      </div>
    </div>
  );
}
