import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const menuItems = [
  {
    id: "crispy-chicken-sandwich",
    name: "Crispy Chicken Sandwich",
    description: "Buttermilk chicken fillet in a soft bun.",
    price: 189,
    image: "/images/menu/placeholder.svg",
    category: "chicken",
  },
];

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => menuItems,
    }),
  );
});

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("App routes", () => {
  it("shows the same navigation on the home page and the cart page", () => {
    const { unmount } = renderAt("/");

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Menu" })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/#whyus",
    );
    expect(screen.getByRole("link", { name: "Visit us" })).toHaveAttribute(
      "href",
      "/#visitus",
    );

    unmount();
    renderAt("/cart");

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
  });

  it("has the anchor targets for About and Visit us on the home page", () => {
    renderAt("/");

    expect(document.getElementById("whyus")).not.toBeNull();
    expect(document.getElementById("visitus")).not.toBeNull();
  });

  it("renders the shop page with products from the menu file", async () => {
    renderAt("/shop");

    expect(
      await screen.findByRole("heading", { name: "Crispy Chicken Sandwich" }),
    ).toBeInTheDocument();
  });

  it("shows a loading message while the menu is on its way", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    renderAt("/shop");

    expect(screen.getByRole("status")).toHaveTextContent("Loading the menu...");
  });

  it("renders the Not Found page for unknown routes", () => {
    renderAt("/no-such-page");

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
  });
});
