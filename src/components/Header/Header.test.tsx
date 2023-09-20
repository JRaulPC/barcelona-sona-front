import { render, screen } from "@testing-library/react";

import Header from "./Header";
import { BrowserRouter } from "react-router-dom";

describe("Given a Header component", () => {
  describe("When its rendered", () => {
    test("Then it should show 'Barcelona Sona' as a heading", () => {
      const headerText = "Barcelona SONA";

      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
