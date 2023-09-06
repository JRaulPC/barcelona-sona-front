import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

vi.mock("firebase/auth");

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
});
