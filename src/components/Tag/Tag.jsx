import styles from "./Tag.module.css";

export default function Tag({ tone = "cream", className = "", children }) {
  const classes = [styles.tag, styles[tone], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
