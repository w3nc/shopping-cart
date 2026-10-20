import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Cart from "./Cart";
import { CartProvider } from "../context/CartContext";
import { formatPrice } from "../utils/currency";

const seededItems = [
  {
    id: "classic-bucket",
    name: "The Classic Bucket",
    price: 899,
    image: "/images/menu/placeholder.svg",
    qty: 2,
  },
  {
    id: "cheese-fries",
    name: "Loaded Cheese Fries",
    price: 149,
    image: "/images/menu/placeholder.svg",
    qty: 1,
  },
];

function renderCart(items = seededItems) {
  return render(
    <MemoryRouter initialEntries={["/cart"]}>
      <CartProvider initialItems={items}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<h1>Shop page</h1>} />
        </Routes>
      </CartProvider>
    </MemoryRouter>,
  );
}

function getRow(name) {
  return screen.getByRole("heading", { name }).closest("li");
}

describe("Cart page", () => {
  it("lists the items, the item count and the subtotal", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { name: "The Classic Bucket" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Loaded Cheese Fries" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3 items")).toBeInTheDocument();
    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent(
      formatPrice(1947),
    );
  });

  it("updates the subtotal when a typed quantity changes", async () => {
    const user = userEvent.setup();
    renderCart();

    const row = getRow("The Classic Bucket");
    const input = within(row).getByLabelText("Quantity");

    await user.clear(input);
    await user.type(input, "3");

    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent(
      formatPrice(2846),
    );
  });

  it("removes an item when its quantity is decreased from one", async () => {
    const user = userEvent.setup();
    renderCart();

    const row = getRow("Loaded Cheese Fries");
    await user.click(
      within(row).getByRole("button", { name: "Decrease quantity" }),
    );

    expect(
      screen.queryByRole("heading", { name: "Loaded Cheese Fries" }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent(
      formatPrice(1798),
    );
  });

  it("removes an item with the remove button", async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(
      screen.getByRole("button", {
        name: "Remove The Classic Bucket from cart",
      }),
    );

    expect(
      screen.queryByRole("heading", { name: "The Classic Bucket" }),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("cart-subtotal")).toHaveTextContent(
      formatPrice(149),
    );
  });

  it("shows an empty state with a link back to the shop", () => {
    renderCart([]);

    expect(
      screen.getByRole("heading", { name: "Your cart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Browse the menu" }),
    ).toHaveAttribute("href", "/shop");
  });
});
