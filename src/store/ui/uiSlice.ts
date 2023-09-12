import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "./types";

export const initialUiState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    startLoading: (currentUiState): UiState => ({
      ...currentUiState,
      isLoading: true,
    }),
    stopLoading: (currentUiState): UiState => ({
      ...currentUiState,
      isLoading: false,
    }),
  },
});

export const uiReducer = uiSlice.reducer;

export const {
  startLoading: startLoadingActionCreator,
  stopLoading: stopLoadingActionCreator,
} = uiSlice.actions;
