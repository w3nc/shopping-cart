import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "./components/Layout/Layout";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <CartProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}
