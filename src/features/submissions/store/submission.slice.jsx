import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllSubmissions,
  getSubmission,
  getSubmissionByProjectId,
} from "../api";

const initialState = {
  submissions: [],
  submission: {},
  loading: false,
  error: null,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    addSubmission: (state, action) => {
      state.submissions.push(action.payload);
    },
    removeSubmission: (state, action) => {
      state.submissions = state.submissions.filter(
        (submission) => submission.id !== action.payload
      );
    },
    updateSubmission: (state, action) => {
      const index = state.submissions.findIndex(
        (submission) => submission.id === action.payload.id
      );
      if (index !== -1) {
        state.submissions[index] = action.payload;
      }
    },
  },
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
      })
      .addCase(getSubmissionByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubmissionByProjectId.fulfilled, (state, action) => {
        state.submissions = action.payload;
        state.loading = false;
      })
      .addCase(getSubmissionByProjectId.rejected, (state, action) => {
        state.submissions = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default submissionSlice.reducer;

export const { addSubmission, removeSubmission, updateSubmission } =
  submissionSlice.actions;
