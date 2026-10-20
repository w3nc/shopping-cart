import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders a real button that defaults to type button", () => {
    render(<Button>Order now</Button>);

    expect(screen.getByRole("button", { name: "Order now" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("calls onClick when clicked and ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    const { rerender } = render(<Button onClick={onClick}>Add</Button>);
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <Button onClick={onClick} disabled>
        Add
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "Add" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a link when given a to or href prop", () => {
    render(
      <MemoryRouter>
        <Button to="/shop">See the menu</Button>
        <Button href="tel:+15055550142">Call us</Button>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "See the menu" })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(screen.getByRole("link", { name: "Call us" })).toHaveAttribute(
      "href",
      "tel:+15055550142",
    );
  });
});
