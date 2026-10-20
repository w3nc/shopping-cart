import { Link } from "react-router-dom";
import ScallopEdge from "../ScallopEdge/ScallopEdge";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ScallopEdge position="top" color="var(--color-yellow)" />

      <div className={styles.inner}>
        <h2 className={styles.wordmark}>Los Pollos Hermanos</h2>

        <nav aria-label="Footer navigation" className={styles.columns}>
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>Menu</h2>
            <ul className={styles.list}>
              <li>
                <Link to="/shop" className={styles.link}>
                  Full menu
                </Link>
              </li>
              <li>
                <Link to="/" className={styles.link}>
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnHeading}>Order</h2>
            <ul className={styles.list}>
              <li>
                <Link to="/cart" className={styles.link}>
                  Your order
                </Link>
              </li>
              <li>
                <Link to="/shop" className={styles.link}>
                  Browse the menu
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnHeading}>Visit</h2>
            <address className={styles.address}>
              <p>1212 South Valley Road</p>
              <p>Albuquerque, NM</p>
              <p>(505) 555 0142</p>
            </address>
            <p className={styles.cta}>
              <a href="tel:+15055550142" className={styles.link}>
                Call the restaurant
              </a>
            </p>
          </div>
        </nav>

        <p className={styles.copyright}>
          Los Pollos Hermanos. A made up restaurant for a school project.
        </p>
      </div>
    </footer>
  );
}
