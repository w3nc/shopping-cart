import { useState } from "react";
import QuantityInput from "../QuantityInput/QuantityInput";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/currency";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <article
      className={styles.card}
      aria-labelledby={`product-title-${product.id}`}
    >
      <img
        className={styles.image}
        src={product.image}
        alt=""
        width="320"
        height="240"
        loading="lazy"
      />

      <h2 className={styles.title} id={`product-title-${product.id}`}>
        {product.name}
      </h2>

      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>{formatPrice(product.price)}</p>

      <div className={styles.actions}>
        <QuantityInput
          id={`product-quantity-${product.id}`}
          value={quantity}
          onChange={setQuantity}
          label="Quantity"
        />

        <button
          type="button"
          className={styles.button}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
