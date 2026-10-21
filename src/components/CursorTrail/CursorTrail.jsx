import { useEffect, useRef } from "react";
import gsap from "gsap";
import photos from "../../assets/photos";
import { trailPhotos } from "../../data/menuPhotos";
import useReducedMotion from "../../hook/useReducedMotion";
import styles from "./CursorTrail.module.css";

const POOL_SIZE = 12;
const SPAWN_DISTANCE = 70; // pixels the mouse must travel before the next photo pops up
const IMAGE_WIDTH = 96;
const IMAGE_HEIGHT = 120;

// Photos pop up behind the mouse inside the "Visit us" section and fade away after about a second.
// A fixed pool of elements is reused and moved with GSAP, so React state never changes while the mouse moves.
export default function CursorTrail() {
  const containerRef = useRef(null);
  const poolRef = useRef([]);
  const lastPoint = useRef({ x: -9999, y: -9999 });
  const nextIndex = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reduced) return undefined;

    const handleMove = (event) => {
      // Mouse and pen only. Touch has no hover, so it never leaves a trail.
      if (event.pointerType === "touch") return;

      const rect = container.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const travelled = Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y);
      if (travelled < SPAWN_DISTANCE) return;
      lastPoint.current = { x, y };

      const node = poolRef.current[nextIndex.current];
      nextIndex.current = (nextIndex.current + 1) % POOL_SIZE;
      if (!node) return;

      gsap.killTweensOf(node);
      gsap.set(node, {
        x: x - IMAGE_WIDTH / 2,
        y: y - IMAGE_HEIGHT / 2,
        scale: 0.55,
        opacity: 0,
        rotation: (Math.random() - 0.5) * 22,
      });
      gsap
        .timeline()
        .to(node, { scale: 1, opacity: 1, duration: 0.18, ease: "power2.out" })
        .to(node, {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          delay: 0.4,
        });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      poolRef.current.forEach((node) => {
        if (node) {
          gsap.killTweensOf(node);
          gsap.set(node, { opacity: 0 });
        }
      });
    };
  }, [reduced]);

  return (
    <div className={styles.trailContainer} ref={containerRef} aria-hidden="true">
      {Array.from({ length: POOL_SIZE }).map((_, index) => {
        const photo = photos[trailPhotos[index % trailPhotos.length]];
        return (
          <img
            key={index}
            ref={(element) => {
              poolRef.current[index] = element;
            }}
            className={styles.trailImage}
            src={photo.small}
            alt=""
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        );
      })}
    </div>
  );
}
