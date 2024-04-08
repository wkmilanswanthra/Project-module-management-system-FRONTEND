import { createSlice } from "@reduxjs/toolkit";
import { fetchAllSubmissions, getSubmission } from "../api";

const initialState = {
  submissions: [],
  submission: {},
  loading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.submission = action.payload;
      })
      .addCase(getSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default submissionSlice.reducer;
