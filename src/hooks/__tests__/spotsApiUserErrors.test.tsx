import { renderHook } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../../store";
import useSpotsApi from "../useSpotsApi";
import { idToDelete } from "../../mocks/mocks";

const wrapper = ({ children }: PropsWithChildren): React.ReactElement => {
  const store = setupStore({
    uiStore: {
      isLoading: false,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

describe("Given an userSpotsApi custom hook", () => {
  describe("When a function getSpots is called without a valid user ", () => {
    test("Then it should show an error on console", async () => {
      const expectedError = new Error("Can't get spots right now");

      const {
        result: {
          current: { getSpots },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const spots = getSpots();

      expect(spots).rejects.toThrowError(expectedError);
    });
  });

  describe("When a function deleteSpot is called without a valid user ", () => {
    test("Then it should show an error on console", async () => {
      const expectedError = new Error("No se puede borrar el espacio");

      const {
        result: {
          current: { deleteSpot },
        },
      } = renderHook(() => useSpotsApi(), { wrapper });

      const message = deleteSpot(idToDelete);

      expect(message).rejects.toThrowError(expectedError);
    });
  });
});
