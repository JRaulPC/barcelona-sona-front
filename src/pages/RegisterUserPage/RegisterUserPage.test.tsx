import { BrowserRouter } from "react-router-dom";
import RegisterUserPage from "./RegisterUserPage";
import { render, screen } from "@testing-library/react";

describe("Given a RegisterUserPage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'Crear cuenta'", () => {
      const headerText = "Crear cuenta";

      render(
        <BrowserRouter>
          <RegisterUserPage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
