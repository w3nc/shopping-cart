import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  it("shows contact details and the copyright line", () => {
    renderFooter();

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByText(/1212 South Valley Road/)).toBeInTheDocument();
    expect(screen.getByText("(505) 555 0142")).toBeInTheDocument();
    expect(
      screen.getByText(/Los Pollos Hermanos\. A made up restaurant/),
    ).toBeInTheDocument();
  });

  it("has three link columns that point to real destinations", () => {
    renderFooter();

    const footerNav = screen.getByRole("navigation", {
      name: "Footer navigation",
    });
    expect(footerNav).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBe(3);

    expect(screen.getByRole("link", { name: "Full menu" })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(screen.getByRole("link", { name: "Your order" })).toHaveAttribute(
      "href",
      "/cart",
    );
    expect(
      screen.getByRole("link", { name: "Call the restaurant" }),
    ).toHaveAttribute("href", "tel:+15055550142");
  });
});
