import { UiState } from "../types";
import {
  hideErrorActionCreator,
  showErrorActionCreator,
  uiReducer,
} from "../uiSlice";

describe("Given a ui reducer", () => {
  describe("When it receives an uiState and a showError action with isError false", () => {
    test("Then it should return a new state with the state isError as true", () => {
      const currentUiState: UiState = {
        isError: false,
      };

      const showErrorAction = showErrorActionCreator();

      const newUiState = uiReducer(currentUiState, showErrorAction);

      expect(newUiState).toHaveProperty("isError", true);
    });
  });

  describe("When it receives an uiState and a showError action with isError true", () => {
    test("Then it should return a new state with the state isError as false", () => {
      const currentUiState: UiState = {
        isError: true,
      };

      const hideErrorAction = hideErrorActionCreator();

      const newUiState = uiReducer(currentUiState, hideErrorAction);

      expect(newUiState).toHaveProperty("isError", false);
    });
  });
});
