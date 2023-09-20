import { renderHook } from "@testing-library/react";
import useSpotsApi from "../useSpotsApi";
import { PropsWithChildren } from "react";
import { setupStore } from "../../store";
import { formMock, spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";

import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { errorHandlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import { BrowserRouter } from "react-router-dom";

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
    },
    spotsStore: {
      spots: spotsMock,
    },
  });
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given an userSpotsApi custom hook", () => {
  describe("When a function addSpot is called with the spot 'St. Felip Neri'", () => {
    test("Then it should send a request to add the spot 'St. Felip Neri' to the database", async () => {
      const {
        result: {
          current: { addSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const newSpot = await addSpot(formMock);

      expect(newSpot).toStrictEqual(formMock);
    });
  });

  describe("When a function addSpot is called with a request to an spots database and the server can't add the spot", () => {
    test("Then it should show a 'No se puede crear el espacio' message on console", async () => {
      server.resetHandlers(...errorHandlers);
      const user: Partial<User> = {
        displayName: "Emilio",
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const expectedError = new Error("No se pudo añadir el espacio");

      const {
        result: {
          current: { addSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spots = addSpot(formMock);

      expect(spots).rejects.toThrowError(expectedError);
    });
  });
});
