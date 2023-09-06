import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("Given a HomePage page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Consulta que espacios tienen su acústica registrda o añade el tuyo.'", () => {
      const headerText =
        "Consulta que espacios tienen su acústica registrada o añade el tuyo.";

      render(<HomePage />);

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
