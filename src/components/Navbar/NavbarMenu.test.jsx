import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartProvider } from "../../context/CartContext";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Navbar mobile menu toggle", () => {
  it("starts closed and opens when the toggle is pressed", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes with the Escape key", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes after a link inside the menu is chosen", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("link", { name: "About" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("keeps the cart badge visible with the current count", () => {
    renderNavbar();

    expect(
      screen.getByRole("link", { name: "Cart, 0 items" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });
});
