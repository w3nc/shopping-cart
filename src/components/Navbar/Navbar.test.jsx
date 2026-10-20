import { MemoryRouter } from "react-router-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../../App";

const menuItems = [
  {
    id: "classic-bucket",
    name: "The Classic Bucket",
    description: "Eight pieces of golden fried chicken.",
    price: 899,
    image: "/images/menu/placeholder.svg",
    category: "chicken",
  },
  {
    id: "cheese-fries",
    name: "Loaded Cheese Fries",
    description: "Fresh cut fries with cheese sauce.",
    price: 149,
    image: "/images/menu/placeholder.svg",
    category: "sides",
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

function renderShop() {
  return render(
    <MemoryRouter initialEntries={["/shop"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Navbar cart badge", () => {
  it("starts at zero and updates when a product is added to the cart", async () => {
    const user = userEvent.setup();
    renderShop();

    expect(
      screen.getByRole("link", { name: "Cart, 0 items" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");

    const heading = await screen.findByRole("heading", {
      name: "The Classic Bucket",
    });
    const card = heading.closest("article");

    await user.click(within(card).getByRole("button", { name: "Add to Cart" }));

    expect(
      screen.getByRole("link", { name: "Cart, 1 item" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
  });

  it("adds up quantities across products", async () => {
    const user = userEvent.setup();
    renderShop();

    const bucketHeading = await screen.findByRole("heading", {
      name: "The Classic Bucket",
    });
    const bucketCard = bucketHeading.closest("article");
    const friesHeading = screen.getByRole("heading", {
      name: "Loaded Cheese Fries",
    });
    const friesCard = friesHeading.closest("article");

    await user.click(
      within(bucketCard).getByRole("button", { name: "Add to Cart" }),
    );
    await user.click(
      within(friesCard).getByRole("button", { name: "Add to Cart" }),
    );

    expect(
      screen.getByRole("link", { name: "Cart, 2 items" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });

  it("adds the typed quantity instead of one", async () => {
    const user = userEvent.setup();
    renderShop();

    const heading = await screen.findByRole("heading", {
      name: "The Classic Bucket",
    });
    const card = heading.closest("article");
    const input = within(card).getByLabelText("Quantity");

    await user.clear(input);
    await user.type(input, "4");
    await user.click(within(card).getByRole("button", { name: "Add to Cart" }));

    expect(
      screen.getByRole("link", { name: "Cart, 4 items" }),
    ).toBeInTheDocument();
  });
});
