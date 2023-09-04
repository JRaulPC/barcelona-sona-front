import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When its rendered with the text 'Barcelona Sona' on a h1 element", () => {
    test("Then it should show 'Barcelona Sona' as a header", () => {
      const headerText = "Barcelona SONA";

      render(<Header />);

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
