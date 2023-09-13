import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import Page404 from "./Page404";

describe("Given a Page 404", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Error 404'", () => {
      const expectedHeadingText = "Error 404";

      render(
        <BrowserRouter>
          <Page404 />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
