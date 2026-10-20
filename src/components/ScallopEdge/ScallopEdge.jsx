import styles from "./ScallopEdge.module.css";

export default function ScallopEdge({
  position = "bottom",
  color = "var(--color-yellow)",
  size = 24,
  className = "",
}) {
  return (
    <div
      className={`${styles.edge} ${styles[position]} ${className}`}
      style={{ "--scallop-color": color, "--scallop-h": `${size}px` }}
      aria-hidden="true"
    />
  );
}
