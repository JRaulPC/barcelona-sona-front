import { spotsMock } from "../../../mocks/mocks";
import { Spot } from "../../../types";
import { addsSpotActionCreator, spotsReducer } from "../spotsSlice";
import { SpotsState } from "../types";

describe("Given an addSpots reducer", () => {
  describe("When it receives a spotsState and an addSpots action with the spot 'St Felip Neri'", () => {
    test("Then it should return a new state with a collection of spots and the spot ''St Felip Neri'' on it", () => {
      const currentSpotsState: SpotsState = {
        spots: spotsMock,
      };

      const stFelipNeriMock: Spot = {
        id: "1",
        name: "St. Felip Neri",
        isVisited: true,
        openingYear: 1500,
        spotUse: "church",
        imageUrl: "https://s2.qwant.cfelipneri.jp&p=0&a=0.jpg",
        description: "St.Felip Neri es una iglesia de...",
      };

      const addSpotAction = addsSpotActionCreator(stFelipNeriMock);
      const newSpotsState = spotsReducer(currentSpotsState, addSpotAction);

      expect(newSpotsState.spots).toContain(stFelipNeriMock);
    });
  });
});
