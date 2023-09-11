import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Loader from "./Loader";

describe("Given a Loading component", () => {
  describe("When is rendered", () => {
    test("Then it should show a loading screen to the user when the page is not charged ", () => {
      render(<Loader />);

      const loader = screen.getByLabelText("loading-screen");

      expect(loader).toBeInTheDocument();
    });
  });
});
