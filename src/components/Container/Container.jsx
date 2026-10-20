import styles from "./Container.module.css";

export default function Container({
  as: Component = "div",
  size = "default",
  className = "",
  children,
  ...rest
}) {
  const classes = [
    styles.container,
    size === "narrow" && styles.narrow,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}
