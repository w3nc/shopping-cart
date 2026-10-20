import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Wordmark from "../Wordmark/Wordmark";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const itemLabel = totalItems === 1 ? "item" : "items";

  const closeMenu = () => setOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && open) {
      setOpen(false);
      if (toggleRef.current) {
        toggleRef.current.focus();
      }
    }
  };

  return (
    <header className={styles.header} onKeyDown={handleKeyDown}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link
          to="/"
          className={styles.brand}
          aria-label="Los Pollos Hermanos, home"
          onClick={closeMenu}
        >
          <Wordmark />
        </Link>

        <ul
          id="primary-links"
          className={styles.links}
          data-open={open ? "true" : "false"}
        >
          <li>
            <NavLink
              className={({ isActive }) =>
                [styles.link, isActive ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")
              }
              to="/shop"
              onClick={closeMenu}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <Link className={styles.link} to="/#whyus" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/#visitus" onClick={closeMenu}>
              Visit us
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link
            className={styles.cartLink}
            to="/cart"
            aria-label={`Cart, ${totalItems} ${itemLabel}`}
            onClick={closeMenu}
          >
            <span>Cart</span>
            <span
              className={styles.badge}
              data-testid="cart-count"
              aria-live="polite"
            >
              {totalItems}
            </span>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-links"
            data-open={open ? "true" : "false"}
            onClick={() => setOpen((current) => !current)}
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>
    </header>
  );
}
