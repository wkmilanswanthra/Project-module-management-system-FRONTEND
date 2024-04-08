import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllRubrics,
  createRubric,
  getRubric,
  getRubricByAssessmentId,
  updateRubric,
  deleteRubric,
} from "../api";

const initialState = {
  rubrics: [],
  rubric: {},
  loading: false,
  error: null,
};

const rubricSlice = createSlice({
  name: "rubric",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRubrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllRubrics.fulfilled, (state, action) => {
        state.loading = false;
        state.rubrics = action.payload;
      })
      .addCase(fetchAllRubrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createRubric.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRubric.fulfilled, (state, action) => {
        state.loading = false;
        state.rubrics.push(action.payload);
      })
      .addCase(createRubric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRubric.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRubric.fulfilled, (state, action) => {
        state.loading = false;
        state.rubric = action.payload;
      })
      .addCase(getRubric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRubricByAssessmentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRubricByAssessmentId.fulfilled, (state, action) => {
        state.loading = false;
        state.rubric = action.payload;
      })
      .addCase(getRubricByAssessmentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRubric.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRubric.fulfilled, (state, action) => {
        state.loading = false;
        state.rubric = action.payload;
      })
      .addCase(updateRubric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRubric.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRubric.fulfilled, (state, action) => {
        state.loading = false;
        state.rubric = action.payload;
      })
      .addCase(deleteRubric.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rubricSlice.reducer;
