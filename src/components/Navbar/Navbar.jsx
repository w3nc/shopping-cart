import { useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "../../context/CartContext";
import useReducedMotion from "../../hook/useReducedMotion";
import styles from "./Navbar.module.css";

gsap.registerPlugin(ScrollTrigger);

// How far the visitor scrolls (px) while the bar morphs from full to compact.
const COMPACT_DISTANCE = 140;

// How long the bar takes to catch up with the scrollbar.
const SCRUB_SMOOTHING = 0.5;

// With reduced motion the bar skips the morph and simply switches state here.
const REDUCED_MOTION_SNAP_AT = 20;

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const navRef = useRef(null);
  const linksRef = useRef(null);
  const actionsRef = useRef(null);
  const itemLabel = totalItems === 1 ? "item" : "items";

  const reduced = useReducedMotion();

  // The navbar is driven by one number, --nav-p (0 = full bar, 1 = compact
  // pill), tied to scroll progress so the morph follows the scroll both ways.
  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      if (reduced) {
        nav.style.setProperty("--nav-p", window.scrollY > REDUCED_MOTION_SNAP_AT ? "1" : "0");
        ScrollTrigger.create({
          start: REDUCED_MOTION_SNAP_AT,
          end: "max",
          onToggle: (self) =>
            nav.style.setProperty("--nav-p", self.isActive ? "1" : "0"),
        });
        return;
      }

      gsap.fromTo(
        nav,
        { "--nav-p": 0 },
        {
          "--nav-p": 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: COMPACT_DISTANCE,
            scrub: SCRUB_SMOOTHING,
          },
        },
      );
    },
    { scope: navRef, dependencies: [reduced], revertOnUpdate: true },
  );

  // The compact pill must fit its content, so we measure its width and pass it
  // as --nav-w-compact (CSS can't animate to fit-content).
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const measure = () => {
      const previousProgress = nav.style.getPropertyValue("--nav-p");

      // Temporarily switch to compact state to measure width, then restore.
      // The browser never paints the in-between state.
      nav.style.setProperty("--nav-p", "1");
      nav.style.width = "max-content";
      const width = Math.ceil(nav.getBoundingClientRect().width);
      nav.style.width = "";

      if (previousProgress) {
        nav.style.setProperty("--nav-p", previousProgress);
      } else {
        nav.style.removeProperty("--nav-p");
      }

      if (width > 0) nav.style.setProperty("--nav-w-compact", `${width}px`);
    };

    measure();

    // Re-measure when content size changes (cart count, mobile links, fonts, resize).
    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      if (linksRef.current) observer.observe(linksRef.current);
      if (actionsRef.current) observer.observe(actionsRef.current);
    }
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", measure);
    };
    // "reduced" is here on purpose: switching motion modes re-runs the GSAP setup.
  }, [reduced, totalItems]);

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
      <nav className={styles.nav} ref={navRef} aria-label="Main navigation">
        <Link
          to="/"
          className={styles.brand}
          aria-label="Los Pollos Hermanos, home"
          onClick={closeMenu}
        >
          <img
            className={styles.logo}
            src="/images/chicken-leg.png"
            alt=""
            width="32"
            height="32"
          />
        </Link>

        <ul
          id="primary-links"
          ref={linksRef}
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

        <div className={styles.actions} ref={actionsRef}>
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
