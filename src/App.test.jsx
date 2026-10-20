import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const menuItems = [
  {
    id: 3,
    title: "Spicy Pollo Sandwich",
    description:
      "Buttermilk fillet tossed in red spice, pickles, and house sauce.",
    price: 8.49,
    image: "/images/menu/placeholder.svg",
    altImage: "/images/menu/placeholder.svg",
    category: "chicken",
    tags: ["Spicy", "Sandwich"],
    featured: true,
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
    const visitUsLinks = screen.getAllByRole("link", { name: "Visit us" });
    expect(visitUsLinks.length).toBeGreaterThan(0);
    visitUsLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/#visitus");
    });

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
      await screen.findByRole("heading", { name: "Spicy Pollo Sandwich" }),
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
