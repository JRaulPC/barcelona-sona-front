import { render, screen } from "@testing-library/react";
import SpotsListPage from "./SpotsListPage";
import { setupStore } from "../../store";
import { spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
  },
});

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a Spots list page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Espacios'", () => {
      const expectedHeadingText = "Espacios";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <SpotsListPage />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", {
        name: expectedHeadingText,
      });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the 'Borrar' button of the card with the heading 'La Modelo' is clicked", () => {
    test("Then it should not show the card with the heading 'La Modelo'", async () => {
      const buttonText = "Eliminar";
      const expectedCardHeading = "La modelo";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <SpotsListPage />
          </Provider>
        </BrowserRouter>,
      );

      const deleteButton = await screen.getAllByRole("button", {
        name: buttonText,
      });

      const cardHeading = await screen.getByRole("heading", {
        name: expectedCardHeading,
      });

      await userEvent.click(deleteButton[0]);

      expect(cardHeading).not.toBeInTheDocument();
    });
  });
});
