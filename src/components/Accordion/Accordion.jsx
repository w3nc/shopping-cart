import { useState } from "react";
import styles from "./Accordion.module.css";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
              >
                <span>{item.question}</span>
                <span className={styles.icon} data-open={isOpen}>
                  +
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={styles.panel}
              data-open={isOpen}
            >
              <div className={styles.content}>{item.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
