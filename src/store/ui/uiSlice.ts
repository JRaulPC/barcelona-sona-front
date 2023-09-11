import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "./types";

export const initialUiState: UiState = {
  isLoading: false,
  isError: false,
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
    showError: (currentUiState): UiState => ({
      ...currentUiState,
      isError: true,
    }),
    hideError: (currentUiState): UiState => ({
      ...currentUiState,
      isError: false,
    }),
  },
});

export const uiReducer = uiSlice.reducer;

export const {
  startLoading: startLoadingActionCreator,
  stopLoading: stopLoadingActionCreator,
  showError: showErrorActionCreator,
  hideError: hideErrorActionCreator,
} = uiSlice.actions;
