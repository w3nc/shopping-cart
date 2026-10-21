import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import TestimonialCarousel from "./TestimonialCarousel";

describe("TestimonialCarousel", () => {
  it("is announced as a carousel and shows the first slide", () => {
    render(<TestimonialCarousel />);

    expect(
      screen.getByRole("group", { name: "Customer testimonials" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "1 of 3" })).toHaveTextContent(
      "Walter White",
    );
    expect(screen.queryByRole("group", { name: "2 of 3" })).not.toBeInTheDocument();
  });

  it("moves forward and back, wrapping around at both ends", async () => {
    const user = userEvent.setup();
    render(<TestimonialCarousel />);

    await user.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(screen.getByRole("group", { name: "2 of 3" })).toHaveTextContent(
      "Walt",
    );

    await user.click(screen.getByRole("button", { name: "Previous testimonial" }));
    await user.click(screen.getByRole("button", { name: "Previous testimonial" }));
    expect(screen.getByRole("group", { name: "3 of 3" })).toHaveTextContent(
      "Walt & Jesse",
    );
  });
});
