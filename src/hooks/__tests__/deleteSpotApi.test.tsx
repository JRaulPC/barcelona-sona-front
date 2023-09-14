import { PropsWithChildren } from "react";
import { setupStore } from "../../store";
import { Provider } from "react-redux";
import { User } from "firebase/auth";
import auth, { AuthStateHook } from "react-firebase-hooks/auth";
import useSpotsApi from "../useSpotsApi";
import { renderHook } from "@testing-library/react";
import { idToDelete, spotsMock } from "../../mocks/mocks";

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
  describe("When a function deleteSpot is called with the spot id of 'La modelo' ", () => {
    test("Then it should send a request to delete la modelo from the db", async () => {
      const succesMessage = "Espacio borrado con éxito";

      const {
        result: {
          current: { deleteSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const message = await deleteSpot(idToDelete);

      expect(message).toStrictEqual(succesMessage);
    });
  });
});
