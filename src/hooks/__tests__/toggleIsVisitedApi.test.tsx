import { renderHook } from "@testing-library/react";
import { User } from "firebase/auth";
import { PropsWithChildren } from "react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { spotMock, toggledApiSpotMock } from "../../mocks/mocks";
import { setupStore } from "../../store";
import useSpotsApi from "../useSpotsApi";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

const user: Partial<User> = {
  displayName: "Emilio",
  getIdToken: vi.fn().mockResolvedValue("token"),
};

const authStateHookMock: Partial<AuthStateHook> = [user as User];
auth.useIdToken = vi.fn().mockReturnValue([user]);
auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

describe("Given an userSpotsApi custom hook", () => {
  describe("When a function toggleIsVisited is called with the id '1' corresponding to 'La modelo' and the property isVisited as false", () => {
    test("Then it should return the spot 'La modelo' with the", async () => {
      const {
        result: {
          current: { toogleIsVisited },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spotToUpdate = await toogleIsVisited(spotMock.id, true);

      expect(spotToUpdate).toEqual(toggledApiSpotMock.spot);
    });

    describe("When a function toggleIsVisited is called and the server can't update the spot with id '1'", () => {
      test("Then it should show a 'No se puede actualizar el espacio' message on console", async () => {
        server.resetHandlers(...errorHandlers);
        const expectedError = new Error("No se puede actualizar el espacio");

        const {
          result: {
            current: { toogleIsVisited },
          },
        } = renderHook(() => useSpotsApi(), { wrapper });

        const spotToUpdate = toogleIsVisited(spotMock.id, false);

        expect(spotToUpdate).rejects.toThrowError(expectedError);
      });
    });
  });
});
