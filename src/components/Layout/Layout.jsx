import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

export default function Layout() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 0);

      return () => window.clearTimeout(timer);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key]);

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
