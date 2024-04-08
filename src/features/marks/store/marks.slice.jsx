import { createSlice } from "@reduxjs/toolkit";
import {
  createNewmarking,
  getMarking,
  getMarkingBySubmissionId,
  updateMarking,
  deleteMarking,
} from "../api";

const initialState = {
  marking: null,
  loading: false,
  error: null,
};

const marksSlice = createSlice({
  name: "marks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewmarking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewmarking.fulfilled, (state, action) => {
        state.loading = false;
        state.marking = action.payload;
      })
      .addCase(createNewmarking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMarking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarking.fulfilled, (state, action) => {
        state.loading = false;
        state.marking = action.payload;
      })
      .addCase(getMarking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMarkingBySubmissionId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarkingBySubmissionId.fulfilled, (state, action) => {
        state.loading = false;
        state.marking = action.payload;
      })
      .addCase(getMarkingBySubmissionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMarking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMarking.fulfilled, (state, action) => {
        state.loading = false;
        state.marking = action.payload;
      })
      .addCase(updateMarking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMarking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMarking.fulfilled, (state, action) => {
        state.loading = false;
        state.marking = action.payload;
      })
      .addCase(deleteMarking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marksSlice.reducer;
