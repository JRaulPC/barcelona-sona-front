import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SpotDetailPage from "./SpotDetailPage";
import { spotMock, spotsMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};
const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given a SpotsDetailPage page", () => {
  describe("When its rendered", () => {
    test("Then it should show a heading with the text 'La Modelo''", async () => {
      const path = `/detalle/${spotMock.id}`;
      const store = setupStore({
        spotsStore: {
          spots: spotsMock,
          selectedSpot: spotMock,
        },
      });

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
  });
});
