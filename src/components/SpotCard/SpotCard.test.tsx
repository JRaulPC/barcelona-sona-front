import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { spotsMock } from "../../mocks/mocks";
import SpotCard from "./SpotCard";
import { setupStore } from "../../store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

describe("Given a SpotCard component", () => {
  const headingText = "La modelo";
  const store = setupStore({ spotsStore: { spots: spotsMock } });
  const laModelo = spotsMock[0];

  const listPosition = 4;

  describe("When it recives a spot with name 'La modelo'", () => {
    test("Then it should show the name 'La modelo' inside a heading", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <SpotCard spot={laModelo} listPosition={listPosition} />
          </Provider>
        </BrowserRouter>,
      );

      const heading = screen.getByRole("heading", { name: headingText });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When the checkbox with the text 'Lo has visitado?' is clicked", () => {
    test("Then the checkbox should appear as clicked", async () => {
      const checkboxText = "Visitado";

      const user: Partial<User> = {
        displayName: "Emilio",
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      render(
        <BrowserRouter>
          <Provider store={store}>
            <SpotCard spot={laModelo} listPosition={listPosition} />
          </Provider>
        </BrowserRouter>,
      );

      const checkbox = await screen.getByLabelText(checkboxText);

      await userEvent.click(checkbox);

      expect(checkbox).toHaveProperty("value", "on");
    });
  });
});
