import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import Loader from "./Loader";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../App/App";
import { setupStore } from "../../store";

describe("Given a Loading component", () => {
  describe("When is rendered", () => {
    test("Then it should show a loading screen to the user when the page is not charged ", () => {
      render(<Loader />);

      const loader = screen.getByLabelText("loading-screen");

      expect(loader).toBeInTheDocument();
    });

    describe("When isLoading is true", () => {
      test("Then it shouldn't show a loading screen", () => {
        const store = setupStore({
          uiStore: {
            isLoading: true,
          },
        });

        render(
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>,
        );

        const loader = screen.getByLabelText("loading-screen");

        expect(loader).toBeInTheDocument();
      });
    });
  });
});
