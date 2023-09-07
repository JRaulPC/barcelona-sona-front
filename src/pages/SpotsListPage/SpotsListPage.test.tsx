import { render, screen } from "@testing-library/react";
import SpotsListPage from "./SpotsListPage";
import { setupStore } from "../../store";
import { spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";

describe("Given a Spots list page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Espacios'", () => {
      const headerText = "Espacios";
      const store = setupStore({
        spotsStore: {
          spots: spotsMock,
        },
      });

      render(
        <Provider store={store}>
          <SpotsListPage />
        </Provider>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });
  });
});
