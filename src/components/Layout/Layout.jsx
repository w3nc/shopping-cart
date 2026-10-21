import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CursorDot from "../CursorDot/CursorDot";
import useScrollTriggerRefresh from "../../hook/useScrollTriggerRefresh";
import styles from "./Layout.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname, hash, key } = useLocation();

  useScrollTriggerRefresh();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a moment so the page (and the menu on it) has its real height
      const timer = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);

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
      <CursorDot />
    </div>
  );
}
