import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { setupStore } from "../../store";
import { spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
  },
});

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the text 'Barcelona SONA' inside a header", () => {
      const user: Partial<User> = { displayName: "Emilio" };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      const expectedHeading = "Barcelona SONA";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });

  test("And no navigation bar has to be shown.", () => {
    const authStateHookMock: Partial<AuthStateHook> = [null as null];
    auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
    const listRoute = "/espacios";

    render(
      <MemoryRouter initialEntries={[listRoute]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
    );

    const navBar = screen.queryByRole("navigation");

    expect(navBar).not.toBeInTheDocument();
  });
});
