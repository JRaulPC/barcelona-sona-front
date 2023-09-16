import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { spotsMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import SpotsList from "./SpotsList";
import { BrowserRouter } from "react-router-dom";

describe("Given a SpotsList component", () => {
  describe("When is rendered with 'La modelo' and 'Palau de la música' ", () => {
    test("Then it should show 'La modelo' and 'Palau de la música' inside headings", () => {
      const store = setupStore({ spotsStore: { spots: spotsMock } });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <SpotsList />
          </Provider>
        </BrowserRouter>,
      );

      spotsMock.forEach((spot) => {
        const expectedHeading = screen.getByRole("heading", {
          name: spot.name,
        });

        expect(expectedHeading).toBeInTheDocument();
      });
    });
  });
});
