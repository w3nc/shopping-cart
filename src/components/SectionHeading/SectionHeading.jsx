import styles from "./SectionHeading.module.css";

export default function SectionHeading({
  children,
  id,
  as: Tag = "h2",
  align = "left",
  className = "",
}) {
  return (
    <Tag id={id} className={`${styles.heading} ${styles[align]} ${className}`}>
      {children}
    </Tag>
  );
}
