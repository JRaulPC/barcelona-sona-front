import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { setupStore } from "../../store";
import { spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";

vi.mock("firebase/auth");

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

  describe("When the 'Entra con GitHub' button is clicked", () => {
    test("Then it should show a page with the header 'Espacios'", async () => {
      const loginButtonLabel = "Botón para iniciar sesión de usuario";
      const newExpectedHeading = "Espacios";

      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const homeRoute = "/home";

      render(
        <MemoryRouter initialEntries={[homeRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      const loginButton = screen.getByLabelText(loginButtonLabel);

      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: newExpectedHeading,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the user is in the list page and the 'Salir' button is clicked", () => {
    test("Then it should show a page with the text 'Consulta que espacios tienen su acústica registrada o añade el tuyo.' as a heading", () => {
      const exitButtonLabel = "Click para salir de la aplicación";
      const expectedHeading =
        "Consulta que espacios tienen su acústica registrada o añade el tuyo.";
      const listRoute = "/espacios";

      const user: Partial<User> = { displayName: "Emilio" };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <MemoryRouter initialEntries={[listRoute]}>
          <Provider store={store}>
            <App />
          </Provider>
        </MemoryRouter>,
      );

      waitFor(() => {
        screen.debug();
        const logoutButton = screen.getByLabelText(exitButtonLabel);
        userEvent.click(logoutButton);
        const heading = screen.getByRole("heading", {
          name: expectedHeading,
        });
        screen.debug();
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
});
