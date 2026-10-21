import ProductCard from "../components/ProductCard/ProductCard";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import useMenu from "../hook/useMenu";
import styles from "./Shop.module.css";

// Menu sections, in the order they appear on the page.
const categories = [
  { id: "combos", label: "Combos" },
  { id: "chicken", label: "Chicken" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
];

function groupByCategory(items) {
  const groups = categories
    .map(({ id, label }) => ({
      id,
      label,
      items: items.filter((item) => item.category === id),
    }))
    .filter((group) => group.items.length > 0);

  const known = new Set(categories.map((category) => category.id));
  const rest = items.filter((item) => !known.has(item.category));
  if (rest.length > 0) {
    groups.push({ id: "more", label: "More", items: rest });
  }

  return groups;
}

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonText} style={{ width: "60%" }} />
      <div className={styles.skeletonText} style={{ width: "100%" }} />
      <div className={styles.skeletonText} style={{ width: "80%" }} />
      <div className={styles.skeletonFooter} />
    </div>
  );
}

export default function Shop() {
  const { items, loading, error, refetch } = useMenu();

  return (
    <section className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.heading}>Our menu</h1>
          <p className={styles.lead}>
            Fried chicken, sides and drinks, cooked to order.
          </p>
        </header>

        {loading && (
          <div
            className={styles.grid}
            role="status"
            aria-label="Loading the menu"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
            <span className={styles.srOnly}>Loading the menu...</span>
          </div>
        )}

        {!loading && error && (
          <div className={styles.error} role="alert">
            <h2 className={styles.errorTitle}>We hit a snag</h2>
            <p>{error.message}</p>
            <Button onClick={refetch} variant="primary">
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <p className={styles.status}>The menu is empty right now.</p>
        )}

        {!loading &&
          !error &&
          groupByCategory(items).map((group) => (
            <section
              key={group.id}
              className={styles.category}
              aria-labelledby={`category-${group.id}`}
            >
              <h2 id={`category-${group.id}`} className={styles.categoryLabel}>
                {group.label}
              </h2>
              <ul className={styles.grid}>
                {group.items.map((product) => (
                  <li key={product.id} className={styles.gridItem}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
      </Container>
    </section>
  );
}
