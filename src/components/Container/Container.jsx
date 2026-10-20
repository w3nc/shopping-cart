import styles from "./Container.module.css";

export default function Container({
  children,
  as: Tag = "div",
  width = "default",
  className = "",
}) {
  return (
    <Tag className={`${styles.container} ${styles[width]} ${className}`}>
      {children}
    </Tag>
  );
}
