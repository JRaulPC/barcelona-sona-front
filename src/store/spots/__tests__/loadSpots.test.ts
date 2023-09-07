import { spotsMock } from "../../../mocks/mocks";
import { Spot } from "../../../types";
import { loadSpotsActionCreator, spotsReducer } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given a loadSpots reducer", () => {
  describe("When it receives a spotsState and a loadSpots action with 'La modelo' and 'Palau de la música' ", () => {
    test("Then it should return a new state with the spots 'La modelo' and 'Palau de la música'", () => {
      const currentSpotsState: SpotsState = {
        spots: [],
      };

      const spots: Spot[] = spotsMock;

      const loadSpotsAction = loadSpotsActionCreator(spots);

      const newSpotsState = spotsReducer(currentSpotsState, loadSpotsAction);

      expect(newSpotsState).toHaveProperty("spots", spotsMock);
    });
  });
});
