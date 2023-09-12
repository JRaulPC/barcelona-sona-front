import { UiState } from "../types";
import {
  startLoadingActionCreator,
  stopLoadingActionCreator,
  uiReducer,
} from "../uiSlice";

describe("Given a ui reducer", () => {
  describe("When it receives an uiState and a startLoading action with isLoading false", () => {
    test("Then it should return a new state with the state isLoading as true", () => {
      const currentUiState: UiState = {
        isLoading: false,
      };

      const startLoadingAction = startLoadingActionCreator();

      const newUiState = uiReducer(currentUiState, startLoadingAction);

      expect(newUiState).toHaveProperty("isLoading", true);
    });
  });

  describe("When it receives an uiState and a stop action with isLoading true", () => {
    test("Then it should return a new state with the state isLoading as false", () => {
      const currentUiState: UiState = {
        isLoading: true,
      };

      const stopLoadingAction = stopLoadingActionCreator();

      const newUiState = uiReducer(currentUiState, stopLoadingAction);

      expect(newUiState).toHaveProperty("isLoading", false);
    });
  });
});
