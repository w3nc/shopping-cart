import { useLayoutEffect } from "react";

const PROBE_SIZE = 100;

export default function useFitText(boxRef, textRef) {
  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;

    if (!box || !text) {
      return undefined;
    }

    let frame = 0;
    let cancelled = false;

    const fit = () => {
      const available = box.clientWidth;
      if (!available) return;

      text.style.fontSize = `${PROBE_SIZE}px`;
      const natural = text.getBoundingClientRect().width;
      if (!natural) return;

      const size = Math.floor((available / natural) * PROBE_SIZE * 100) / 100;
      text.style.fontSize = `${size}px`;
    };

    const schedule = () => {
      if (cancelled) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };

    fit();

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(schedule);
      observer.observe(box);
    } else {
      window.addEventListener("resize", schedule);
    }

    const fonts = typeof document !== "undefined" ? document.fonts : undefined;
    if (fonts) {
      if (fonts.ready) {
        fonts.ready.then(schedule);
      }
      if (fonts.addEventListener) {
        fonts.addEventListener("loadingdone", schedule);
      }
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", schedule);
      }
      if (fonts && fonts.removeEventListener) {
        fonts.removeEventListener("loadingdone", schedule);
      }
    };
  }, [boxRef, textRef]);
}
