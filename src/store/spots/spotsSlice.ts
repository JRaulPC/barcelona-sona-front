import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SpotsState } from "./types";
import { Spot } from "../../types";

const initialSpotsState: SpotsState = {
  spots: [],
};

const spotsSlice = createSlice({
  name: "spots",
  initialState: initialSpotsState,
  reducers: {
    loadSpots: (
      currentSpotsState,
      action: PayloadAction<Spot[]>,
    ): SpotsState => ({
      ...currentSpotsState,
      spots: action.payload,
    }),
    deleteSpot: (
      currentSpotsState,
      action: PayloadAction<string>,
    ): SpotsState => ({
      ...currentSpotsState,
      spots: currentSpotsState.spots.filter(
        (spot) => spot.id !== action.payload,
      ),
    }),
  },
});

export const spotsReducer = spotsSlice.reducer;

export const {
  loadSpots: loadSpotsActionCreator,
  deleteSpot: deleteSpotActionCreator,
} = spotsSlice.actions;
