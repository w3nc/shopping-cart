import useReducedMotion from "../../hook/useReducedMotion";
import { setMotion } from "../../utils/motion";
import styles from "./MotionToggle.module.css";

// A visible switch so nobody is stuck with a motionless (or too busy) page.
// It also covers the rule that moving content which starts by itself needs a way to stop it.
export default function MotionToggle() {
  const reduced = useReducedMotion();

  return (
    <div className={styles.wrap}>
      <button
        type="button"
        className={styles.button}
        aria-pressed={reduced}
        onClick={() => setMotion(reduced ? "full" : "reduce")}
      >
        <span className={styles.switch} aria-hidden="true">
          <span className={styles.knob} />
        </span>
        <span>Reduce motion</span>
      </button>

    </div>
  );
}
