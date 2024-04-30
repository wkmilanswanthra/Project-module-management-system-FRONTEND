import { createSlice } from "@reduxjs/toolkit";

import { getAllMarksheets, generateMarksheets, getMarksheetById } from "../api";

const initialState = {
  marksheets: [],
  marksheet: null,
  loading: false,
  error: null,
};

const MarksheetSlice = createSlice({
  name: "marksheet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMarksheets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMarksheets.fulfilled, (state, action) => {
        state.loading = false;
        state.marksheets = action.payload;
      })
      .addCase(getAllMarksheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(generateMarksheets.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateMarksheets.fulfilled, (state, action) => {
        state.loading = false;
        state.marksheet = action.payload;
      })
      .addCase(generateMarksheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getMarksheetById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarksheetById.fulfilled, (state, action) => {
        state.loading = false;
        state.marksheet = action.payload;
      })
      .addCase(getMarksheetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default MarksheetSlice.reducer;
