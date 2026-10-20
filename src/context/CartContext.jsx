import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

export const MIN_QTY = 1;
export const MAX_QTY = 99;

export const cartActions = {
  ADD: "ADD",
  SET_QTY: "SET_QTY",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

export function clampQty(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return MIN_QTY;
  return Math.min(Math.max(parsed, MIN_QTY), MAX_QTY);
}

function roundMoney(value) {
  return Math.round(value * 100) / 100;
}

function createInitialState(initialItems = []) {
  const items = initialItems
    .filter((item) => item && item.id)
    .map((item) => ({
      id: item.id,
      title: item.title ?? "Menu item",
      price: Number(item.price) || 0,
      image: item.image ?? "",
      qty: clampQty(item.qty ?? MIN_QTY),
    }));

  return { items };
}

export function cartReducer(state, action) {
  switch (action.type) {
    case cartActions.ADD: {
      const { product, qty } = action.payload;
      const addQty = clampQty(qty ?? MIN_QTY);
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, qty: clampQty(item.qty + addQty) }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price) || 0,
            image: product.image ?? "",
            qty: addQty,
          },
        ],
      };
    }

    case cartActions.SET_QTY: {
      const { id, qty } = action.payload;
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, qty: clampQty(qty) } : item,
        ),
      };
    }

    case cartActions.INCREMENT: {
      const { id } = action.payload;
      return {
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, qty: Math.min(item.qty + 1, MAX_QTY) }
            : item,
        ),
      };
    }

    case cartActions.DECREMENT: {
      const { id } = action.payload;
      return {
        items: state.items
          .map((item) =>
            item.id === id ? { ...item, qty: item.qty - 1 } : item,
          )
          .filter((item) => item.qty >= MIN_QTY),
      };
    }

    case cartActions.REMOVE: {
      const { id } = action.payload;
      return { items: state.items.filter((item) => item.id !== id) };
    }

    case cartActions.CLEAR:
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext(null);

export function CartProvider({ children, initialItems = [] }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialItems,
    createInitialState,
  );

  const addItem = useCallback((product, qty = MIN_QTY) => {
    dispatch({ type: cartActions.ADD, payload: { product, qty } });
  }, []);

  const setQty = useCallback((id, qty) => {
    dispatch({ type: cartActions.SET_QTY, payload: { id, qty } });
  }, []);

  const increment = useCallback((id) => {
    dispatch({ type: cartActions.INCREMENT, payload: { id } });
  }, []);

  const decrement = useCallback((id) => {
    dispatch({ type: cartActions.DECREMENT, payload: { id } });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: cartActions.REMOVE, payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: cartActions.CLEAR });
  }, []);

  const { totalItems, subtotal } = useMemo(() => {
    const totals = state.items.reduce(
      (accumulator, item) => {
        accumulator.totalItems += item.qty;
        accumulator.subtotal += item.price * item.qty;
        return accumulator;
      },
      { totalItems: 0, subtotal: 0 },
    );

    return {
      totalItems: totals.totalItems,
      subtotal: roundMoney(totals.subtotal),
    };
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      totalItems,
      subtotal,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clearCart,
    }),
    [
      state.items,
      totalItems,
      subtotal,
      addItem,
      setQty,
      increment,
      decrement,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used inside a CartProvider.");
  }

  return context;
}

export default CartContext;
