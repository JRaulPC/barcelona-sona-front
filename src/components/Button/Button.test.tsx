import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button componente", () => {
  describe("When is rendered with the text 'button'", () => {
    test("Then it should show a button with the text 'button'", () => {
      const buttonText = "button";

      render(
        <Button className="button" actionOnClick={() => {}}>
          <span>button</span>
        </Button>,
      );

      const button = screen.getByRole("button", { name: buttonText });

      expect(button).toBeInTheDocument();
    });
  });
});