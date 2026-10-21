import QuantityInput from "../QuantityInput/QuantityInput";
import Photo from "../Photo/Photo";
import { getMenuPhoto, photoStyle } from "../../data/menuPhotos";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/currency";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
  const { setQty, increment, decrement, removeItem } = useCart();
  const mapped = getMenuPhoto(item);

  return (
    <li className={styles.row}>
      <div className={styles.imageWrap}>
        {mapped ? (
          <Photo
            name={mapped.photo}
            alt=""
            sizes="96px"
            className={styles.image}
            style={photoStyle(mapped)}
          />
        ) : (
          <img
            className={styles.image}
            src={item.image}
            alt=""
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>{item.title}</h2>
        <p className={styles.price}>{formatPrice(item.price)} each</p>
      </div>

      <div className={styles.controls}>
        <QuantityInput
          id={`cart-quantity-${item.id}`}
          value={item.qty}
          onChange={(nextQty) => setQty(item.id, nextQty)}
          onIncrease={() => increment(item.id)}
          onDecrease={() => decrement(item.id)}
          label="Quantity"
        />
      </div>

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
