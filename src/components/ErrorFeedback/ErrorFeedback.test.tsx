import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App/App";
import ErrorFeedback from "./ErrorFeedback";
import { setupStore } from "../../store";

describe("Given an Error component", () => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
      isError: true,
    },
  });

  const errorText = "Something went wrong...";

  describe("When is rendered with a 'Something went wrong message'", () => {
    test("Then it should show a 'Something went wrong message' on screen", () => {
      render(
        <Provider store={store}>
          <ErrorFeedback />
        </Provider>,
      );

      const errorMessage = screen.getByText(errorText);

      expect(errorMessage).toBeInTheDocument();
    });

    describe("When the user clicks on the 'close' button", () => {
      test("Then the error feedback screen should not be displayed", async () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>,
        );

        const errorMessage = screen.getByText(errorText);
        const closeButton = screen.getByRole("button", { name: /close/i });

        await userEvent.click(closeButton);

        expect(errorMessage).not.toBeInTheDocument();
      });
    });
  });
});
