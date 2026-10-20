import QuantityInput from "../QuantityInput/QuantityInput";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/currency";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
  const { setQty, increment, decrement, removeItem } = useCart();

  return (
    <li className={styles.row}>
      <img
        className={styles.image}
        src={item.image}
        alt=""
        width="96"
        height="96"
        loading="lazy"
      />

      <div className={styles.info}>
        <h2 className={styles.name}>{item.title}</h2>
        <p className={styles.price}>{formatPrice(item.price)} each</p>
      </div>

      <QuantityInput
        id={`cart-quantity-${item.id}`}
        value={item.qty}
        onChange={(nextQty) => setQty(item.id, nextQty)}
        onIncrease={() => increment(item.id)}
        onDecrease={() => decrement(item.id)}
        label="Quantity"
      />

      <p className={styles.lineTotal}>{formatPrice(item.price * item.qty)}</p>

      <button
        type="button"
        className={styles.remove}
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${item.title} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
