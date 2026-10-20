import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CountUp({ end, suffix = "", duration = 2 }) {
  const counterRef = useRef(null);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        counterRef.current.textContent = `${end}${suffix}`;
        return;
      }

      const obj = { val: 0 };

      gsap.to(obj, {
        val: end,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 85%",
          once: true, // Only animate once
        },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${Math.floor(obj.val)}${suffix}`;
          }
        },
      });
    },
    { scope: counterRef },
  );

  return (
    <span ref={counterRef} aria-label={`${end}${suffix}`}>
      0{suffix}
    </span>
  );
}
