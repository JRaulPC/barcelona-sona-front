import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SpotsState } from "./types";
import { Spot } from "../../types";

const initialSpotsState: SpotsState = {
  spots: [],
  selectedSpot: {} as Spot,
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

    addSpot: (currentSpotsState, action: PayloadAction<Spot>): SpotsState => ({
      ...currentSpotsState,
      spots: [...currentSpotsState.spots, action.payload],
    }),

    loadSelectedSpot: (
      currentSpotsState,
      action: PayloadAction<Spot>,
    ): SpotsState => ({
      ...currentSpotsState,
      selectedSpot: action.payload,
    }),
  },
});

export const spotsReducer = spotsSlice.reducer;

export const {
  loadSpots: loadSpotsActionCreator,
  deleteSpot: deleteSpotActionCreator,
  addSpot: addsSpotActionCreator,
  loadSelectedSpot: loadSelectedSpotActionCreator,
} = spotsSlice.actions;
