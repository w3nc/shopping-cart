import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useReducedMotion from "../../hook/useReducedMotion";

// Counts from 0 up to `end` the first time it scrolls into view.
// The real number is always in the page for screen readers and for people with reduced motion.
export default function CountUp({ end, suffix = "", duration = 2 }) {
  const counterRef = useRef(null);
  const reduced = useReducedMotion();
  const finalText = `${end}${suffix}`;

  useGSAP(
    () => {
      const counter = counterRef.current;
      if (!counter) return;

      if (reduced) {
        counter.textContent = finalText;
        return;
      }

      const state = { value: 0 };
      counter.textContent = `0${suffix}`;

      gsap.to(state, {
        value: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          counter.textContent = `${Math.floor(state.value)}${suffix}`;
        },
        onComplete: () => {
          counter.textContent = finalText;
        },
      });
    },
    {
      scope: counterRef,
      dependencies: [reduced, end, suffix, duration],
      revertOnUpdate: true,
    },
  );

  return (
    <>
      <span className="sr-only">{finalText}</span>
      <span ref={counterRef} aria-hidden="true">
        {finalText}
      </span>
    </>
  );
}
