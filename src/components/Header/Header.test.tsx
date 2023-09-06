import { render, screen } from "@testing-library/react";

import Header from "./Header";

describe("Given a Header component", () => {
  describe("When its rendered", () => {
    test("Then it should show 'Barcelona Sona' as a heading", () => {
      const headerText = "Barcelona SONA";

      render(<Header />);

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
