import { renderHook } from "@testing-library/react";
import useSpotsApi from "../useSpotsApi";
import { PropsWithChildren } from "react";
import { setupStore } from "../../store";
import { formMock, spotsMock } from "../../mocks/mocks";
import { Provider } from "react-redux";

import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
    },
    spotsStore: {
      spots: spotsMock,
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
});
