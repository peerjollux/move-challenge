import { render, screen } from "@testing-library/react";
import { TextInput } from "./text-input";

it("should show value", () => {
  render(<TextInput defaultValue={"foo"} type="text" />);

  expect(screen.getByRole("textbox")).toHaveValue("foo");
});
