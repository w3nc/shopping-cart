import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

const menuItems = [
  {
    id: 3,
    title: "Spicy Pollo Sandwich",
    description: "Buttermilk fillet tossed in red spice, pickles, and house sauce.",
    price: 8.49,
    image: "/images/menu/placeholder.svg",
    category: "chicken",
    tags: ["Spicy", "Sandwich"],
    featured: true,
  },
  {
    id: 4,
    title: "Pollo Wrap",
    description: "Crispy chicken strips, slaw, and ranch in a warm flour tortilla.",
    price: 7.29,
    image: "/images/menu/placeholder.svg",
    category: "chicken",
    tags: ["Handheld"],
    featured: false,
  },
];

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => menuItems,
    }),
  );
});

describe("Home page", () => {
  it("has one main heading and sections with headings in order", () => {
    renderHome();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Los Pollos Hermanos" }),
    ).toBeInTheDocument();

    [
      "Our favorites",
      "Why our chicken is the best",
      "Words from our regulars",
      "Visit us and try our famous chicken",
      "Frequently asked questions",
    ].forEach((name) => {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    });
  });

  it("links the hero buttons to the shop and to the visit section", () => {
    renderHome();

    expect(screen.getByRole("link", { name: "Order now" })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(screen.getByRole("link", { name: "Visit us" })).toHaveAttribute(
      "href",
      "/#visitus",
    );
  });

  it("shows only the featured dishes in Our favorites once the menu loads", async () => {
    renderHome();

    expect(
      await screen.findByRole("heading", { level: 3, name: "Spicy Pollo Sandwich" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Pollo Wrap" }),
    ).not.toBeInTheDocument();
  });

  it("opens a FAQ answer when its question is pressed", async () => {
    const user = userEvent.setup();
    renderHome();

    const question = screen.getByRole("button", { name: /do you offer catering/i });
    expect(question).toHaveAttribute("aria-expanded", "false");

    await user.click(question);

    expect(question).toHaveAttribute("aria-expanded", "true");
  });

  it("opens directions in a new tab safely", () => {
    renderHome();

    const link = screen.getByRole("link", { name: /get directions/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
