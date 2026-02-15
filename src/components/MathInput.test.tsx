import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MathInput } from "./MathInput";

describe("MathInput component", () => {
  test("renders with default equation and displays toolbar", () => {
    render(<MathInput />);
    // Check that the heading is present
    expect(screen.getByText("Введите уравнение")).toBeInTheDocument();
    // Check that a toolbar button exists
    expect(screen.getByRole("button", { name: "a/b" })).toBeInTheDocument();
  });

  test("calls onChange when input changes", async () => {
    const handleChange = vi.fn();
    render(<MathInput onChange={handleChange} />);
    const input = screen.getByRole("textbox"); // EditableMathField renders an input element
    await userEvent.type(input, "x+1=2");
    // onChange should have been called at least once
    expect(handleChange).toHaveBeenCalled();
  });
});
