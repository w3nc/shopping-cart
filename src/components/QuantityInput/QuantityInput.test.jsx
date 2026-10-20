import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import QuantityInput from "./QuantityInput";

function Harness({ initialValue = 1, ...props }) {
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <QuantityInput
        id="quantity"
        value={value}
        onChange={setValue}
        label="Quantity"
        {...props}
      />
      <p data-testid="committed-value">{value}</p>
    </>
  );
}

describe("QuantityInput", () => {
  it("shows the current quantity in a labelled text input", () => {
    render(<Harness initialValue={3} />);

    expect(screen.getByLabelText("Quantity")).toHaveValue("3");
  });

  it("steps up and down with the buttons", async () => {
    const user = userEvent.setup();
    render(<Harness initialValue={2} />);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByTestId("committed-value")).toHaveTextContent("3");

    await user.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByTestId("committed-value")).toHaveTextContent("2");
  });

  it("disables the decrease button at the minimum", () => {
    render(<Harness initialValue={1} />);

    expect(
      screen.getByRole("button", { name: "Decrease quantity" }),
    ).toBeDisabled();
  });

  it("disables the increase button at the maximum", () => {
    render(<Harness initialValue={99} />);

    expect(
      screen.getByRole("button", { name: "Increase quantity" }),
    ).toBeDisabled();
  });

  it("allows an empty value while editing and clamps to the minimum on blur", async () => {
    const user = userEvent.setup();
    render(<Harness initialValue={4} />);

    const input = screen.getByLabelText("Quantity");
    await user.clear(input);

    expect(input).toHaveValue("");
    expect(screen.getByTestId("committed-value")).toHaveTextContent("4");

    await user.tab();

    expect(input).toHaveValue("1");
    expect(screen.getByTestId("committed-value")).toHaveTextContent("1");
  });

  it("clamps a typed number above the maximum on blur", async () => {
    const user = userEvent.setup();
    render(<Harness initialValue={1} />);

    const input = screen.getByLabelText("Quantity");
    await user.clear(input);
    await user.type(input, "250");
    await user.tab();

    expect(input).toHaveValue("99");
    expect(screen.getByTestId("committed-value")).toHaveTextContent("99");
  });

  it("ignores letters and clamps zero up to the minimum on blur", async () => {
    const user = userEvent.setup();
    render(<Harness initialValue={2} />);

    const input = screen.getByLabelText("Quantity");
    await user.clear(input);
    await user.type(input, "abc");

    expect(input).toHaveValue("");

    await user.type(input, "0");
    expect(input).toHaveValue("0");

    await user.tab();

    expect(input).toHaveValue("1");
    expect(screen.getByTestId("committed-value")).toHaveTextContent("1");
  });

  it("uses the custom step handlers when they are given", async () => {
    const user = userEvent.setup();
    const onDecrease = vi.fn();
    const onIncrease = vi.fn();

    render(
      <QuantityInput
        id="custom"
        value={1}
        onChange={() => {}}
        onDecrease={onDecrease}
        onIncrease={onIncrease}
        label="Quantity"
      />,
    );

    const decrease = screen.getByRole("button", { name: "Decrease quantity" });
    expect(decrease).not.toBeDisabled();

    await user.click(decrease);
    expect(onDecrease).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(onIncrease).toHaveBeenCalledTimes(1);
  });
});
