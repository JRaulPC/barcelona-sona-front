import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { spotsMock } from "../../mocks/mocks";
import SpotCard from "./SpotCard";
import { setupStore } from "../../store";

describe("Given a SpotCard component", () => {
  describe("When it recives a spot with name 'La modelo'", () => {
    test("Then it should show the name 'La modelo' inside a heading", () => {
      const headingText = "La modelo";
      const store = setupStore({ spotsStore: { spots: spotsMock } });
      const laModelo = spotsMock[0];
      const listPosition = 3;

      render(
        <Provider store={store}>
          <SpotCard spot={laModelo} listPosition={listPosition} />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });
});
