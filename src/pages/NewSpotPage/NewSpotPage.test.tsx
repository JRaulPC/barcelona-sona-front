import { Provider } from "react-redux";
import { spotsMock } from "../../mocks/mocks";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewSpotPage from "./NewSpotPage";
import { setupStore } from "../../store";

describe("Given a New spot page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Añade un nuevo espacio'", () => {
      const expectedHeading = "Añade un nuevo espacio";
      const store = setupStore({
        spotsStore: {
          spots: spotsMock,
        },
      });

      render(
        <BrowserRouter>
          <Provider store={store}>
            <NewSpotPage />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });
});
