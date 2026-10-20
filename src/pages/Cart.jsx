import { Link } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import styles from "./Cart.module.css";

export default function Cart() {
  const { items, totalItems, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className={styles.page}>
        <Container>
          <div className={styles.emptyState}>
            <h1 className={styles.heading}>Your cart</h1>
            <p className={styles.empty}>Your cart is empty.</p>
            <Button
              to="/shop"
              variant="primary"
              size="lg"
              className={styles.emptyLink}
            >
              Browse the menu
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <Container>
        <h1 className={styles.heading}>Your cart</h1>

        <div className={styles.layout}>
          <div className={styles.listCol}>
            <ul className={styles.list}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>

          <aside className={styles.summaryCol}>
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order summary</h2>

              <div className={styles.summaryRow}>
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className={styles.summaryTotal}>
                <span>Subtotal</span>
                <strong data-testid="cart-subtotal">
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <Button
                to="/shop"
                variant="primary"
                size="lg"
                className={styles.checkoutBtn}
              >
                Continue ordering
              </Button>

              <p className={styles.note}>
                This demo has no checkout. Pay at the counter when you visit.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
