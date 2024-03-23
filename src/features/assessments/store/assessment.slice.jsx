import { createSlice } from "@reduxjs/toolkit";
import { getAllAssessments, createAssessment } from "../api";

const initialState = {
  assessments: [],
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
      });
  },
});

export default assessmentSlice.reducer;
