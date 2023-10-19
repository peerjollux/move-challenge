import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "./tag";

const onValueChange = jest.fn();
const onDelete = jest.fn();

describe("<Tag />", () => {
  beforeEach(() => {
    render(
      <Tag value={"foo"} onValueChange={onValueChange} onDelete={onDelete} />
    );
    onValueChange.mockReset();
    onDelete.mockReset();
  });

  it("should show value", () => {
    expect(screen.getByText("foo")).toBeInTheDocument();
  });

  describe("editing", () => {
    beforeEach(async () => {
      const button = screen.getByRole("button", { name: "Edit tag" });
      await userEvent.click(button);
    });

    it("should change to edit mode", async () => {
      const input = screen.getByRole("textbox");
      expect(input).toHaveValue("foo");
      expect(input).toHaveFocus();
    });

    it("should update input value", async () => {
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "bar");
      expect(input).toHaveValue("foobar");
    });

    it("should trigger onValueChange on blur", async () => {
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "bar");
      await userEvent.tab();
      expect(onValueChange).toBeCalledWith("foobar");
    });

    it("should trigger onValueChange on enter", async () => {
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "bar");
      await userEvent.keyboard("{enter}");
      expect(onValueChange).toBeCalledWith("foobar");
    });

    it("should NOT trigger onValueChange if invalid", async () => {
      const input = screen.getByRole("textbox");
      await fireEvent.change(input, { target: { value: "" } });
      await userEvent.tab();
      expect(onValueChange).not.toBeCalled();
    });

    it("should NOT trigger onValueChange if value has not changed", async () => {
      await userEvent.tab();
      expect(onValueChange).not.toBeCalled();
    });

    it("should exit edit mode", async () => {
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "bar");
      await userEvent.keyboard("{enter}");
      expect(input).not.toBeInTheDocument();
    });
  });

  it("should trigger onDelete", async () => {
    const button = screen.getByRole("button", { name: "Delete tag" });
    await userEvent.click(button);
    expect(onDelete).toBeCalled();
  });
});
