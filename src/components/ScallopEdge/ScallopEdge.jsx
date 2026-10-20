import styles from "./ScallopEdge.module.css";

export default function ScallopEdge({
  position = "top",
  color = "var(--color-yellow)",
  className = "",
}) {
  const placement = position === "bottom" ? "bottom" : "top";
  const classes = [styles.edge, styles[placement], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      aria-hidden="true"
      data-position={placement}
      className={classes}
      style={{ "--scallop-color": color }}
    />
  );
}
