import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import MotionToggle from "./MotionToggle";

describe("MotionToggle", () => {
  it("reflects the current setting and flips it when pressed", async () => {
    const user = userEvent.setup();
    render(<MotionToggle />);

    // The test setup switches motion off before every test
    const toggle = screen.getByRole("button", { name: "Reduce motion" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.dataset.motion).toBe("full");
    expect(window.localStorage.getItem("lph-motion")).toBe("full");
  });
});
