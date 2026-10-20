import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  title,
  description,
  id,
  level = 2,
  align = "left",
  className = "",
}) {
  const safeLevel = Math.min(Math.max(Number(level) || 2, 1), 6);
  const Heading = `h${safeLevel}`;
  const classes = [styles.wrap, align === "center" && styles.center, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
