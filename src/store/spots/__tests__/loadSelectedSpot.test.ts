import { spotMock, spotsMock } from "../../../mocks/mocks";
import { Spot } from "../../../types";
import { loadSelectedSpotActionCreator, spotsReducer } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given a spotsReducer reducer", () => {
  describe("When it receives a spotsState and a loadSelectedSpot action with the spot 'La Modelo'", () => {
    test("then it should return a new state with 'La Modelo' as selectedSpot", () => {
      const currentSpotsState: SpotsState = {
        spots: spotsMock,
        selectedSpot: {} as Spot,
      };

      const loadSelectedSpotAction = loadSelectedSpotActionCreator(spotMock);

      const newSpotsState = spotsReducer(
        currentSpotsState,
        loadSelectedSpotAction,
      );

      expect(newSpotsState.selectedSpot).toContain(spotMock);
    });
  });
});
