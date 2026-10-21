import { useId, useState } from "react";
import styles from "./Accordion.module.css";

// Each question is a button that opens its answer (WAI-ARIA accordion pattern).
// One answer is open at a time.
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={triggerId}
              >
                <span>{item.question}</span>
                <span
                  className={styles.icon}
                  data-open={isOpen}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
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
