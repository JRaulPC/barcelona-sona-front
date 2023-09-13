import { spotsMock } from "../../../mocks/mocks";
import { deleteSpotActionCreator, spotsReducer } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given a spotsReducer Reducer", () => {
  describe("When it receives a delete task action with a spot", () => {
    test("Then it should return a new state without the deleted", () => {
      const currentSpotsState: SpotsState = {
        spots: spotsMock,
      };

      const idToDelete = spotsMock[0].id;

      const deleteSpotAction = deleteSpotActionCreator(idToDelete);

      const newSpotsState = spotsReducer(currentSpotsState, deleteSpotAction);

      expect(newSpotsState).not.toContain(spotsMock[0]);
    });
  });
});
