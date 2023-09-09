import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";

describe("Given a HomePage page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Consulta que espacios tienen su acústica registrda o añade el tuyo.'", () => {
      const headerText =
        "Consulta que espacios tienen su acústica registrada o añade el tuyo.";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button with the text 'Entra con GitHub'", () => {
      const buttonText = "Entra con GitHub";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const button = screen.getByText(buttonText);

      expect(button).toBeInTheDocument();
    });
  });
});
