import { renderHook } from "@testing-library/react";
import useSpotsApi from "../useSpotsApi";
import { spotsMock } from "../../mocks/mocks";
import { server } from "../../mocks/server";
import { errorHandlers } from "../../mocks/handlers";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";

describe("Given an userSpotsApi custom hook", () => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
    },
  });

  const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
    return <Provider store={store}>{children}</Provider>;
  };

  describe("When a function getSpots is called with a request to an spots database", () => {
    test("Then it should return a list of spots", async () => {
      const user: Partial<User> = { displayName: "Emilio" };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

      const {
        result: {
          current: { getSpots },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spots = await getSpots();

      expect(spots).toStrictEqual(spotsMock);
    });
  });

  describe("When a function getSpots is called with a request to an spots database", () => {
    test("Then it should show a 'Can't get spots right now' message on console", async () => {
      const expectedError = new Error("Can't get spots right now");
      server.resetHandlers(...errorHandlers);

      const {
        result: {
          current: { getSpots },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spots = getSpots();

      expect(spots).rejects.toThrowError(expectedError);
    });
  });
});
