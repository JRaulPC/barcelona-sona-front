import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { spotMock, spotsMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import SpotDetailPage from "./SpotDetailPage";

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};
const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

const store = setupStore({
  spotsStore: {
    spots: spotsMock,
    selectedSpot: spotMock,
  },
});

const path = `/detalle/${spotMock.id}`;

describe("Given a SpotsDetailPage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'La Modelo''", async () => {
      const expectedHeading = spotMock.name;

      render(
        <MemoryRouter initialEntries={[path]}>
          <Provider store={store}>
            <Routes>
              <Route path={"/detalle/:id"} element={<SpotDetailPage />}></Route>
            </Routes>
          </Provider>
        </MemoryRouter>,
      );

      const heading = await screen.getByRole("heading", {
        name: expectedHeading,
      });

      expect(heading).toBeInTheDocument();
    });

    describe("When the checkbox of the car 'La modelo' with the text 'Lo has visitado?' is clicked", () => {
      test("Then the checkbox should appear as clicked", async () => {
        const checkboxText = "Lo has visitado?";

        const user: Partial<User> = {
          displayName: "Emilio",
          getIdToken: vi.fn().mockResolvedValue("token"),
        };

        const authStateHookMock: Partial<AuthStateHook> = [user as User];
        auth.useIdToken = vi.fn().mockReturnValue([user]);
        auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

        render(
          <MemoryRouter initialEntries={[path]}>
            <Provider store={store}>
              <Routes>
                <Route
                  path={"/detalle/:id"}
                  element={<SpotDetailPage />}
                ></Route>
              </Routes>
            </Provider>
          </MemoryRouter>,
        );

        const checkbox = await screen.getByLabelText(checkboxText);

        await userEvent.click(checkbox);

        expect(checkbox).toHaveProperty("value", "on");
      });
    });
  });
});
