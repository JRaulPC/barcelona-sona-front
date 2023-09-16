import { renderHook } from "@testing-library/react";
import { User } from "firebase/auth";
import { PropsWithChildren } from "react";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import { errorHandlers } from "../../mocks/handlers";
import { mockedId, spotMock } from "../../mocks/mocks";
import { server } from "../../mocks/server";
import { setupStore } from "../../store";
import useSpotsApi from "../useSpotsApi";

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
  describe("When a function getSpotById is called with the id '1'", () => {
    test("Then it should return the spot 'La modelo'", async () => {
      const {
        result: {
          current: { getSpotById },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spot = await getSpotById(spotMock.id);

      expect(spot).toStrictEqual(spotMock);
    });
  });

  describe("When a function getSpotById is called and the server can't deliver the spot with id '1'", () => {
    test("Then it should show a 'No se puede mostrar el espacio' message on console", async () => {
      server.resetHandlers(...errorHandlers);
      const expectedError = new Error("No se puede mostrar el espacio");

      const {
        result: {
          current: { getSpotById },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spot = getSpotById(mockedId);

      expect(spot).rejects.toThrowError(expectedError);
    });
  });
});
