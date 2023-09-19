import { spotMock, spotsMock } from "../../../mocks/mocks";
import { spotsReducer, toggleIsVisitedActionCreator } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given a spotsReducer reducer", () => {
  describe("When it receives a spotsState and a toggleIsVisited action with the spot 'La Modelo' with the property isVisited as false", () => {
    test("Then it should return a new state with spots and the spot property isVisited of 'La Modelo' as true ", () => {
      const currentSpotsState: SpotsState = {
        spots: spotsMock,
      };

      const toggleSpotIsVisitedAction = toggleIsVisitedActionCreator({
        ...spotMock,
        isVisited: true,
      });

      const newSpotsState = spotsReducer(
        currentSpotsState,
        toggleSpotIsVisitedAction,
      );

      expect(newSpotsState.spots[0]).toHaveProperty("isVisited", true);
    });
  });
});
