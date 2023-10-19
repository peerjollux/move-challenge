import { render, screen } from "@testing-library/react";
import { TagForm } from "./tag-form";
import userEvent from "@testing-library/user-event";

const onSubmit = jest.fn();

describe("<TagForm />", () => {
  beforeEach(() => {
    render(<TagForm onSubmit={onSubmit} />);
    onSubmit.mockReset();
  });

  it("should render input", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });

  it("should render submit button", () => {
    const button = screen.getByRole("button", { name: "Add tag" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should update inout value", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "foo");
    expect(input).toHaveValue("foo");
  });

  it("should trigger onSubmit when pressing enter", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "foo");
    await userEvent.keyboard("{enter}");

    expect(onSubmit).toHaveBeenCalledWith("foo");
  });

  it("should trigger onSubmit when clicking submit button", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "foo");

    const submit = screen.getByRole("button");
    await userEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith("foo");
  });

  it("should reset input value after submit", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "foo");
    await userEvent.keyboard("{enter}");

    expect(onSubmit).toHaveBeenCalledWith("foo");
    expect(input).toHaveValue("");
  });

  it("should trigger invalid when input is empty", async () => {
    const input = screen.getByRole("textbox");
    const submit = screen.getByRole("button");
    await userEvent.click(submit);

    expect(onSubmit).not.toHaveBeenCalledWith();
    expect(input).toBeInvalid();
  });

  it("should not accept max 20 character", async () => {
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "a text that is longer than 20 characters");
    expect(input).toHaveValue("a text that is longe");
  });
});
