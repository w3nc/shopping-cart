import ProductCard from "../components/ProductCard/ProductCard";
import useMenu from "../hook/useMenu";
import styles from "./Shop.module.css";

export default function Shop() {
  const { items, loading, error } = useMenu();

  return (
    <section aria-labelledby="shop-heading">
      <header className={styles.header}>
        <h1 id="shop-heading" className={styles.heading}>
          Our menu
        </h1>
        <p className={styles.lead}>
          Fried chicken, sides and drinks, cooked to order.
        </p>
      </header>

      {loading && (
        <p className={styles.status} role="status">
          Loading the menu...
        </p>
      )}

      {!loading && error && (
        <div className={styles.error} role="alert">
          <p>{error.message}</p>
          <p>Check your connection and refresh the page to try again.</p>
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <p className={styles.status}>The menu is empty right now.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <ul className={styles.grid}>
          {items.map((product) => (
            <li key={product.id} className={styles.gridItem}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
