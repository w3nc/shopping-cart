import { useEffect, useRef } from "react";
import gsap from "gsap";
import useReducedMotion from "../../hook/useReducedMotion";
import styles from "./CursorDot.module.css";

// The small dot that trails the mouse (like in the original template).
// It only exists for people using a mouse, and never when motion is reduced.
// It moves through GSAP quickTo, so React state is never touched while the mouse moves.
export default function CursorDot() {
  const dotRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || reduced) return undefined;
    if (!window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches) {
      return undefined;
    }

    const moveX = gsap.quickTo(dot, "x", { duration: 0.28, ease: "power3.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.28, ease: "power3.out" });

    const handleMove = (event) => {
      if (event.pointerType !== "mouse") return;
      dot.dataset.visible = "true";
      moveX(event.clientX);
      moveY(event.clientY);
    };

    const handleOver = (event) => {
      const target = event.target;
      const interactive =
        target instanceof Element &&
        target.closest("a, button, input, label, [role='button']");
      dot.dataset.active = interactive ? "true" : "false";
    };

    const handleLeave = () => {
      dot.dataset.visible = "false";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      dot.dataset.visible = "false";
    };
  }, [reduced]);

  return (
    <span
      ref={dotRef}
      className={styles.dot}
      aria-hidden="true"
      data-visible="false"
      data-active="false"
    />
  );
}
