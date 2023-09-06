import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Given a Button componente", () => {
  describe("When is rendered with the text 'button'", () => {
    test("Then it should show a button with the text 'Exit'", () => {
      const exitButtonText = "Exit";

      render(
        <Button className="exit-button" actionOnClick={() => {}}>
          {exitButtonText}
        </Button>,
      );

      const button = screen.getByRole("button", { name: exitButtonText });

      expect(button).toBeInTheDocument();
    });
  });
});
