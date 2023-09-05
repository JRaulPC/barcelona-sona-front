import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";

describe("Given a NavigationBar component", () => {
  describe("When is rendered", () => {
    test("Then it should have an image with the alternative text 'Link para acceder a la página de listado' ", () => {
      const altText = "Link para acceder a la página de listado";

      render(
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>,
      );

      const navLink = screen.getByAltText(altText);
      expect(navLink).toBeInTheDocument();
    });
  });
});
