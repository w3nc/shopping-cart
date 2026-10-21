import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useReducedMotion from "../../hook/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Fades and lifts its content into view as it scrolls on screen.
// stagger > 0 animates the direct children one after another instead of the whole block.
export default function Reveal({
  children,
  className = "",
  stagger = 0,
  y = 24,
  duration = 0.6,
}) {
  const container = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const target = container.current;
      if (!target || reduced) return;

      const elements =
        stagger > 0 ? gsap.utils.toArray(target.children) : target;

      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: stagger > 0 ? stagger : 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: target,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    {
      scope: container,
      dependencies: [reduced, stagger, y, duration],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
