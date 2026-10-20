import { useEffect, useState } from "react";
import { fetchMenu } from "../api/menu";

export default function useMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    fetchMenu({ signal: controller.signal })
      .then((data) => {
        if (!active) return;
        setItems(data);
        setLoading(false);
      })
      .catch((requestError) => {
        if (!active || requestError.name === "AbortError") return;
        setError(requestError);
        setItems([]);
        setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return { items, loading, error };
}
