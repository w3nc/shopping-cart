import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  className = "",
  stagger = 0,
  y = 24,
  duration = 0.6,
}) {
  const container = useRef(null);

  useGSAP(
    () => {
      const target = container.current;
      if (!target) return;

      // Check for reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // If stagger > 0, we animate the children (e.g., grid items).
      // If stagger === 0, we animate the container itself.
      const elements = stagger > 0 ? target.children : target;

      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger: stagger > 0 ? stagger : 0,
          ease: "power2.out",
          invalidateOnRefresh: true,
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play none none none",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className={className}>
      {children}
    </div>
  );
}
