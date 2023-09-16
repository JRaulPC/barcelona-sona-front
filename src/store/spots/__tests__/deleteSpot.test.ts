import { spotMock, spotsMock } from "../../../mocks/mocks";
import { deleteSpotActionCreator, spotsReducer } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given a spotsReducer Reducer", () => {
  describe("When it receives a spotsState and a delete spot action with the spot 'La Modelo'", () => {
    test("Then it should return a new state without the spot 'La modelo'", () => {
      const currentSpotsState: SpotsState = {
        spots: spotsMock,
      };

      const idToDelete = spotMock.id;

      const deleteSpotAction = deleteSpotActionCreator(idToDelete);

      const newSpotsState = spotsReducer(currentSpotsState, deleteSpotAction);

      expect(newSpotsState).not.toContain(spotMock);
    });
  });
});
