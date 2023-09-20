import { PropsWithChildren } from "react";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import useSpotsApi from "../useSpotsApi";
import { renderHook } from "@testing-library/react";
import { mockedId, spotsMock } from "../../mocks/mocks";
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
  describe("When a function deleteSpot is called with the spot id of 'La modelo' ", () => {
    test("Then it should show a message with the text 'Espacio borrado con éxito", async () => {
      const succesMessage = "Espacio borrado con éxito";

      const {
        result: {
          current: { deleteSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const message = await deleteSpot(mockedId);

      expect(message).toStrictEqual(succesMessage);
    });
  });
  describe("When a function deleteSpot is called with a request to an spots database and the server can't delete the spot", () => {
    test("Then it should show a 'No se puede borrar el espacio' message on console", async () => {
      server.resetHandlers(...errorHandlers);
      const user: Partial<User> = {
        displayName: "Emilio",
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const expectedError = new Error("No se puede borrar el espacio");

      const {
        result: {
          current: { deleteSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spots = deleteSpot(spotsMock[0].id);

      expect(spots).rejects.toThrowError(expectedError);
    });
  });
});
