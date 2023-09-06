import { render, screen } from "@testing-library/react";
import SpotsListPage from "./SpotsListPage";

describe("Given a Spots list page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Espacios'", () => {
      const headerText = "Espacios";

      render(<SpotsListPage />);

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
