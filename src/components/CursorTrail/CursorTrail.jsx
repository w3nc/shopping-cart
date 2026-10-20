import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CursorTrail.module.css";

// Replace these with real food or restaurant images later
const IMAGES = [
  "/images/menu/cursor-1.jpg",
  "/images/menu/cursor-2.jpg",
  "/images/menu/cursor-3.jpg",
];

const POOL_SIZE = 12;
const THROTTLE_DISTANCE = 60; // pixels
const IMAGE_SIZE = 80; // pixels

export default function CursorTrail() {
  const containerRef = useRef(null);
  const poolRef = useRef([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const currentIndex = useRef(0);

  useEffect(() => {
    // 1. Environment Checks
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isHover = window.matchMedia("(hover: hover)").matches;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Disable on touch devices and reduced motion
    if (!isFinePointer || !isHover || isReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      // Check if the mouse is actually inside the Visit Us section
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) return;

      // Calculate position relative to the container
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Throttle by distance moved
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      if (dist < THROTTLE_DISTANCE) return;

      lastPos.current = { x, y };

      // Get next node from the pool
      const node = poolRef.current[currentIndex.current];
      if (!node) return;

      currentIndex.current = (currentIndex.current + 1) % POOL_SIZE;

      // Pick an image
      const imgIndex = currentIndex.current % IMAGES.length;
      node.style.backgroundImage = `url(${IMAGES[imgIndex]})`;

      // Kill any existing tweens on this node
      gsap.killTweensOf(node);

      // Set initial position and state
      gsap.set(node, {
        x: x - IMAGE_SIZE / 2,
        y: y - IMAGE_SIZE / 2,
        scale: 1,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 20, // slight random rotation for organic feel
      });

      // Animate out
      gsap.to(node, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    };

    // Attach to window because the container has pointer-events: none
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Clean up any lingering GSAP animations
      poolRef.current.forEach((node) => {
        if (node) gsap.killTweensOf(node);
      });
    };
  }, []);

  return (
    <div
      className={styles.trailContainer}
      ref={containerRef}
      aria-hidden="true"
    >
      {Array.from({ length: POOL_SIZE }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (poolRef.current[i] = el)}
          className={styles.trailImage}
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}
