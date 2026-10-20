import { useState } from "react";
import Button from "../Button/Button";
import styles from "./TestimonialCarousel.module.css";

const testimonials = [
  {
    quote:
      "The chicken is always crispy, never greasy. It feels like a Sunday dinner at my grandmother's house.",
    name: "Marcus T.",
    role: "Local regular",
  },
  {
    quote:
      "I stop by for the spicy sandwich at least twice a week. The staff knows my order before I reach the counter.",
    name: "Elena R.",
    role: "Downtown worker",
  },
  {
    quote:
      "We ordered the family bucket for a small party. Everything arrived hot and the sides were fantastic.",
    name: "Devon K.",
    role: "First-time visitor",
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.imageCol}>
        <img src="/images/menu/happy-customer.jpg" alt="Happy customer" />
      </div>

      <div className={styles.contentCol}>
        {/* Screen reader announcement for slide changes */}
        <span className={styles.srOnly} aria-live="polite">
          Slide {currentIndex + 1} of {testimonials.length}:{" "}
          {testimonials[currentIndex].name}
        </span>

        <div className={styles.slides}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={styles.slide}
              data-active={index === currentIndex}
              aria-hidden={index !== currentIndex}
            >
              <p className={styles.quote}>"{testimonial.quote}"</p>
              <div className={styles.author}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          <Button
            variant="secondary"
            size="sm"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ←
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={next}
            aria-label="Next testimonial"
          >
            →
          </Button>
        </div>
      </div>
    </div>
  );
}
