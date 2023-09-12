import { render, screen } from "@testing-library/react";
import SpotsListPage from "./SpotsListPage";
import { setupStore } from "../../store";
import { spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";

describe("Given a Spots list page", () => {
  describe("When is rendered", () => {
    test("Then it should show a heading with the text 'Espacios'", () => {
      const user: Partial<User> = { displayName: "Emilio" };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

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
