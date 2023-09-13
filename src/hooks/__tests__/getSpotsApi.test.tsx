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
  describe("When a function getSpots is called with a request to an spots database", () => {
    test("Then it should return a list of spots", async () => {
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
      const user: Partial<User> = {
        displayName: "Emilio",
        getIdToken: vi.fn().mockResolvedValue("token"),
      };

      const authStateHookMock: Partial<AuthStateHook> = [user as User];
      auth.useIdToken = vi.fn().mockReturnValue([user]);
      auth.useAuthState = vi.fn().mockReturnValue(authStateHookMock);

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
