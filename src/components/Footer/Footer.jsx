import { useRef } from "react";
import { Link } from "react-router-dom";
import useFitText from "../../hook/useFitText";
import Container from "../Container/Container";
import ScallopEdge from "../ScallopEdge/ScallopEdge";
import styles from "./Footer.module.css";

const linkGroups = [
  {
    title: "Eat",
    links: [
      { label: "Full menu", to: "/shop" },
      { label: "Your order", to: "/cart" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Home page", to: "/" },
      { label: "Why people love us", to: "/#whyus" },
      { label: "Hours and address", to: "/#visitus" },
    ],
  },
  {
    title: "Say hello",
    links: [
      { label: "Call the restaurant", href: "tel:+15055550142" },
      { label: "Email the kitchen", href: "mailto:hello@lospollos.example" },
    ],
  },
];

export default function Footer() {
  const boxRef = useRef(null);
  const textRef = useRef(null);
  useFitText(boxRef, textRef);

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <ScallopEdge position="top" color="var(--color-yellow)" />

      <Container>
        <div className={styles.top}>
          <div className={styles.contact}>
            <h2 className={styles.contactTitle}>Find us</h2>
            <address className={styles.address}>
              1212 South Valley Road, Albuquerque
              <br />
              Open daily, 10:00 to 22:00
            </address>
            <p className={styles.phone}>(505) 555 0142</p>
          </div>

          <nav className={styles.columns} aria-label="Footer navigation">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h2 className={styles.columnTitle}>{group.title}</h2>
                <ul className={styles.list}>
                  {group.links.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link className={styles.link} to={item.to}>
                          {item.label}
                        </Link>
                      ) : (
                        <a className={styles.link} href={item.href}>
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </Container>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <div ref={boxRef} className={styles.wordmarkBox}>
          <span ref={textRef} className={styles.wordmark}>
            Los Pollos Hermanos
          </span>
        </div>
      </div>

      <Container>
        <p className={styles.copy}>
          {`\u00A9 ${year} Los Pollos Hermanos. A made up restaurant for a coding project.`}
        </p>
      </Container>
    </footer>
  );
}
