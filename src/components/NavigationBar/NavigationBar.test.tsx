import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Auth, User, signOut } from "firebase/auth";
import userEvent from "@testing-library/user-event";

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signOut: vi.fn(),
  };
});

const user: Partial<User> = { displayName: "Emilio" };

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a NavigationBar component", () => {
  describe("When is rendered", () => {
    test("Then it should have an image with the alternative text 'Link para acceder a la página de listado' ", () => {
      const altText = "Link para acceder a la página de listado";

      render(
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>,
      );

      const navLink = screen.getByAltText(altText);
      expect(navLink).toBeInTheDocument();
    });
  });

  describe("When the user uses the 'Salir' button ", () => {
    test("Then it should show a page with the text 'Consulta que espacios tienen su acústica registrada o añade el tuyo.' as a heading", async () => {
      const exitButton = /salir/i;

      render(
        <BrowserRouter>
          <NavigationBar />
        </BrowserRouter>,
      );

      const logoutButton = screen.getByRole("button", { name: exitButton });

      await userEvent.click(logoutButton);

      expect(signOut).toHaveBeenCalled();
    });
  });
});
