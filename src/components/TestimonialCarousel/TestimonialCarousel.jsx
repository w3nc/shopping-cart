import { useState } from "react";
import Button from "../Button/Button";
import Photo from "../Photo/Photo";
import styles from "./TestimonialCarousel.module.css";

const testimonials = [
  {
    quote:
      "The chicken is always crispy, never greasy. It feels like a Sunday dinner at my grandmother's house.",
    name: "Marcus T.",
    role: "Local regular",
    photo: "bucket2",
  },
  {
    quote:
      "I stop by for the spicy sandwich at least twice a week. The staff knows my order before I reach the counter.",
    name: "Elena R.",
    role: "Downtown worker",
    photo: "tender",
  },
  {
    quote:
      "We ordered the family bucket for a small party. Everything arrived hot and the sides were fantastic.",
    name: "Devon K.",
    role: "First-time visitor",
    photo: "bucket",
  },
];

export default function TestimonialCarousel({ slides = testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = slides.length;

  const next = () => setCurrentIndex((index) => (index + 1) % total);
  const prev = () => setCurrentIndex((index) => (index - 1 + total) % total);

  return (
    <div
      className={styles.wrap}
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className={styles.imageCol} aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.name}
            className={styles.photo}
            data-active={index === currentIndex}
          >
            <Photo name={slide.photo} alt="" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        ))}
      </div>

      <div className={styles.contentCol}>
        <span className={styles.mark} aria-hidden="true">
          &ldquo;
        </span>

        <div className={styles.slides} aria-live="polite">
          {slides.map((slide, index) => (
            <figure
              key={slide.name}
              className={styles.slide}
              data-active={index === currentIndex}
              aria-hidden={index !== currentIndex}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
            >
              <blockquote className={styles.quote}>
                <p>{slide.quote}</p>
              </blockquote>
              <figcaption className={styles.author}>
                <strong>{slide.name}</strong>
                <span>{slide.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.controls}>
          <Button
            variant="secondary"
            size="sm"
            onClick={prev}
            aria-label="Previous testimonial"
            className={styles.arrow}
          >
            <span aria-hidden="true">&larr;</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={next}
            aria-label="Next testimonial"
            className={styles.arrow}
          >
            <span aria-hidden="true">&rarr;</span>
          </Button>
          <span className={styles.counter} aria-hidden="true">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
