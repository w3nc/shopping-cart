import { useEffect, useRef, useState } from "react";
import Photo from "../Photo/Photo";
import { prismPhotos } from "../../data/menuPhotos";
import styles from "./TurntableMedia.module.css";

// A card with a slowly turning four-sided "turntable" of photos.
// Pass videoSrc to play a looping video instead (pauses when scrolled away).
export default function TurntableMedia({
  videoSrc,
  poster,
  images = prismPhotos,
  title,
  text,
  className = "",
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

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

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.mediaCard} ${className}`} ref={containerRef}>
      <div className={styles.stage}>
        {videoSrc ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Looping video of fresh chicken"
          />
        ) : (
          <div
            className={styles.turntableScene}
            role="img"
            aria-label="Slowly turning photos of our fried chicken"
          >
            <div
              className={`${styles.turntableCube} ${
                !isVisible ? styles.paused : ""
              }`}
            >
              {images.slice(0, 4).map((name, index) => (
                <div
                  key={name}
                  className={styles.face}
                  style={{
                    transform: `rotateY(${index * 90}deg) translateZ(calc(var(--face-w) / 2))`,
                  }}
                >
                  <Photo name={name} alt="" sizes="180px" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {title ? (
        <div className={styles.caption}>
          <h3 className={styles.captionTitle}>{title}</h3>
          {text ? <p className={styles.captionText}>{text}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
