import { useEffect, useRef, useState } from "react";
import QuantityInput from "../QuantityInput/QuantityInput";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/currency";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    setJustAdded(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <article
      className={styles.card}
      aria-labelledby={`product-title-${product.id}`}
    >
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={product.image}
          alt=""
          width="320"
          height="240"
          loading="lazy"
        />
        {product.altImage && (
          <img
            className={styles.imageHover}
            src={product.altImage}
            alt=""
            width="320"
            height="240"
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title} id={`product-title-${product.id}`}>
          {product.title}
        </h2>

        {product.tags && product.tags.length > 0 && (
          <div className={styles.tags}>
            {product.tags.map((tag) => (
              <Tag key={tag} tone="default">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>

      <div className={styles.actions}>
        <QuantityInput
          id={`product-quantity-${product.id}`}
          value={quantity}
          onChange={setQuantity}
          label="Quantity"
        />

        <Button
          variant={justAdded ? "secondary" : "primary"}
          onClick={handleAddToCart}
          className={styles.addButton}
          aria-live="polite"
        >
          {justAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
}
