import { useEffect, useRef, useState } from "react";
import QuantityInput from "../QuantityInput/QuantityInput";
import Button from "../Button/Button";
import Tag from "../Tag/Tag";
import Photo from "../Photo/Photo";
import { getMenuPhoto, photoStyle } from "../../data/menuPhotos";
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

  const mapped = getMenuPhoto(product);
  const cardSizes = "(min-width: 1280px) 24vw, (min-width: 640px) 46vw, 92vw";

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
        {mapped ? (
          <>
            <Photo
              name={mapped.photo}
              alt=""
              sizes={cardSizes}
              className={styles.image}
              style={photoStyle(mapped)}
            />
            {mapped.altPhoto ? (
              <Photo
                name={mapped.altPhoto}
                alt=""
                sizes={cardSizes}
                className={styles.imageHover}
              />
            ) : null}
          </>
        ) : (
          <>
            <img
              className={styles.image}
              src={product.image}
              alt=""
              width="320"
              height="240"
              loading="lazy"
              decoding="async"
            />
            {product.altImage && (
              <img
                className={styles.imageHover}
                src={product.altImage}
                alt=""
                width="320"
                height="240"
                loading="lazy"
                decoding="async"
              />
            )}
          </>
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
