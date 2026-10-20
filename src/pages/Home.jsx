import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-heading">
        <h1 id="home-heading" className={styles.title}>
          Los Pollos Hermanos
        </h1>
        <p className={styles.tagline}>
          Fried chicken, biscuits and big buckets, cooked fresh every day.
        </p>
        <Link className={styles.cta} to="/shop">
          See the menu
        </Link>
        <p className={styles.note}>
          Placeholder home page. Colors and animations come in a later phase.
        </p>
      </section>

      <section
        id="whyus"
        className={styles.section}
        aria-labelledby="whyus-heading"
      >
        <h2 id="whyus-heading">Why us</h2>
        <ul className={styles.list}>
          <li>Chicken hand breaded every morning.</li>
          <li>Fries cut fresh, never frozen.</li>
          <li>Buckets built for sharing with the whole table.</li>
        </ul>
      </section>

      <section
        id="visitus"
        className={styles.section}
        aria-labelledby="visitus-heading"
      >
        <h2 id="visitus-heading">Visit us</h2>
        <address className={styles.address}>
          1212 South Valley Road, Albuquerque
          <br />
          Open daily, 10:00 to 22:00
          <br />
          Call (505) 555 0142
        </address>
      </section>
    </>
  );
}
