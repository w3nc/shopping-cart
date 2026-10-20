import { useEffect, useId, useState } from "react";
import styles from "./QuantityInput.module.css";

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 99;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function QuantityInput({
  id,
  value,
  onChange,
  onIncrease,
  onDecrease,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  label = "Quantity",
  disabled = false,
}) {
  const generatedId = useId();
  const inputId = id ?? `quantity-${generatedId}`;
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const commit = () => {
    const parsed = Number.parseInt(text, 10);
    const next = Number.isNaN(parsed) ? min : clamp(parsed, min, max);
    setText(String(next));
    if (next !== value) onChange(next);
  };

  const handleTextChange = (event) => {
    const digitsOnly = event.target.value.replace(/[^0-9]/g, "");
    setText(digitsOnly);

    if (digitsOnly === "") return;

    const parsed = Number.parseInt(digitsOnly, 10);
    if (parsed >= min && parsed <= max && parsed !== value) {
      onChange(parsed);
    }
  };

  const handleDecrease = () => {
    if (onDecrease) {
      onDecrease();
      return;
    }

    const next = clamp(value - 1, min, max);
    setText(String(next));
    if (next !== value) onChange(next);
  };

  const handleIncrease = () => {
    if (onIncrease) {
      onIncrease();
      return;
    }

    const next = clamp(value + 1, min, max);
    setText(String(next));
    if (next !== value) onChange(next);
  };

  const decreaseDisabled = disabled || (value <= min && !onDecrease);
  const increaseDisabled = disabled || value >= max;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          onClick={handleDecrease}
          disabled={decreaseDisabled}
          aria-label="Decrease quantity"
        >
          -
        </button>

        <input
          id={inputId}
          className={styles.input}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          value={text}
          onChange={handleTextChange}
          onBlur={commit}
          disabled={disabled}
        />

        <button
          type="button"
          className={styles.button}
          onClick={handleIncrease}
          disabled={increaseDisabled}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
