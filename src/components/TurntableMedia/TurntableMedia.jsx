import { useEffect, useRef, useState } from "react";
import styles from "./TurntableMedia.module.css";

export default function TurntableMedia({ videoSrc, imageSrc, className = "" }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // If a video exists, pause/play it based on visibility
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 },
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <div className={`${styles.mediaCard} ${className}`} ref={containerRef}>
      {videoSrc ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={videoSrc}
          poster={imageSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className={styles.turntableScene}>
          <div
            className={`${styles.turntableCube} ${!isVisible ? styles.paused : ""}`}
          >
            {/* Create a 4-sided prism using the image */}
            {[0, 90, 180, 270].map((degree) => (
              <div
                key={degree}
                className={styles.face}
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  transform: `rotateY(${degree}deg) translateZ(80px)`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
