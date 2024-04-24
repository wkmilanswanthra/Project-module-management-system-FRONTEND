import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAssessments,
  createAssessment,
  getAssessmentById,
  updateAssessment,
  deleteAssessment,
  getTotalNumberOfAssessments,
} from "../api";

const initialState = {
  assessments: [],
  assessment: null,
  totalNumberOfAssessments: 0,
  loading: false,
  error: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
      })
      .addCase(getAllAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments.push(action.payload);
      })
      .addCase(createAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAssessmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAssessmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.assessment = action.payload;
      })
      .addCase(getAssessmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assessment = action.payload;
      })
      .addCase(updateAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = state.assessments.filter(
          (assessment) => assessment.id !== action.payload
        );
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTotalNumberOfAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalNumberOfAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.totalNumberOfAssessments = action.payload;
      })
      .addCase(getTotalNumberOfAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default assessmentSlice.reducer;
