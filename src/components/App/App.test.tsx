import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

vi.mock("firebase/auth");

const user: Partial<User> = { displayName: "Emilio" };

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given an App component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the text 'Barcelona SONA' inside a header", () => {
      const expectedHeading = "Barcelona SONA";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: expectedHeading });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the 'Entra con GitHub' button is clicked", () => {
    test("Then it should show a page with a list of espacios", async () => {
      const loginButtonText = "Botón para iniciar sesión de usuario";
      const newExpectedHeading = "Espacios";

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const loginButton = screen.getByLabelText(loginButtonText);

      await userEvent.click(loginButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: newExpectedHeading,
        });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the 'Salir' button is clicked", () => {
    const exitButtonLabel = "Click para salir de la aplicación";
    const expectedHeading =
      "Consulta que espacios tienen su acústica registrada o añade el tuyo.";

    test("Then it should show a page with the text 'Consulta que espacios tienen su acústica registrada o añade el tuyo.' as a heading", async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const logoutButton = screen.getByLabelText(exitButtonLabel);

      await userEvent.click(logoutButton);

      waitFor(() => {
        const heading = screen.getByRole("heading", {
          name: expectedHeading,
        });
        expect(heading).toBeInTheDocument();
      });
    });

    test("And no navigation bar has to be shown.", () => {
      const authStateHookMock: Partial<AuthStateHook> = [null as null];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      waitFor(() => {
        const navBar = screen.getByRole("navigation");
        expect(navBar).not.toBeInTheDocument();
      });
    });
  });
});
