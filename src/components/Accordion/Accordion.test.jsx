import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Accordion from "./Accordion";

const items = [
  { question: "First question?", answer: "First answer." },
  { question: "Second question?", answer: "Second answer." },
];

describe("Accordion", () => {
  it("starts with every answer closed", () => {
    render(<Accordion items={items} />);

    screen.getAllByRole("button").forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("opens an answer and links the button to its region", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const button = screen.getByRole("button", { name: /first question/i });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: /first question/i }),
    ).toHaveTextContent("First answer.");
  });

  it("keeps only one answer open at a time and closes on a second click", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const first = screen.getByRole("button", { name: /first question/i });
    const second = screen.getByRole("button", { name: /second question/i });

    await user.click(first);
    await user.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    await user.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });
});
