import { Link } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import styles from "./Cart.module.css";

export default function Cart() {
  const { items, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section aria-labelledby="cart-heading">
        <h1 id="cart-heading" className={styles.heading}>
          Your cart
        </h1>
        <p className={styles.empty}>Your cart is empty.</p>
        <Link className={styles.emptyLink} to="/shop">
          Browse the menu
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="cart-heading">
      <h1 id="cart-heading" className={styles.heading}>
        Your cart
      </h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <div className={styles.summary}>
        <p className={styles.count}>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
        <p className={styles.subtotal}>
          Subtotal{" "}
          <strong data-testid="cart-subtotal">{formatPrice(subtotal)}</strong>
        </p>
        <p className={styles.note}>
          This demo has no checkout. Pay at the counter when you visit.
        </p>
        <p>
          <Link to="/shop">Keep shopping</Link>
        </p>
      </div>
    </section>
  );
}
