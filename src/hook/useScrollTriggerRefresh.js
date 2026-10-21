import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Refreshes ScrollTrigger when the page grows (menu data, fonts, images).
export default function useScrollTriggerRefresh() {
  useEffect(() => {
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(refresh);
      observer.observe(document.body);
    }

    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      if (observer) observer.disconnect();
    };
  }, []);
}
