import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Auth, signInWithPopup } from "firebase/auth";

vi.mock("firebase/auth", async () => {
  const actual: Auth = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(),
  };
});

describe("Given a HomePage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'Consulta que espacios tienen su acústica registrda o añade el tuyo.'", () => {
      const headerText =
        "Consulta que espacios tienen su acústica registrada o añade el tuyo.";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headerText });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a button with the text 'Entra con GitHub'", () => {
      const buttonText = "Entra con GitHub";

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const button = screen.getByText(buttonText);

      expect(button).toBeInTheDocument();
    });
  });

  describe("When the 'Entra con GitHub' button is clicked", () => {
    test("Then the sigInWithPopup function is called", async () => {
      const loginButtonText = /Entra con GitHub/i;

      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>,
      );

      const loginButton = await screen.getByRole("button", {
        name: loginButtonText,
      });

      await userEvent.click(loginButton);

      expect(signInWithPopup).toHaveBeenCalled();
    });
  });
});
