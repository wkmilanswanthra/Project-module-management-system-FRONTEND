import { createSlice } from "@reduxjs/toolkit";
import { getAllSemesters, updateSemester } from "../api";

const initialState = {
  semesters: [],
  loading: false,
  error: null,
};

const semesterSlice = createSlice({
  name: "semester",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSemesters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSemesters.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = action.payload;
      })
      .addCase(getAllSemesters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSemester.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.semesters = state.semesters.map((semester) => {
          if (semester.id === action.payload.id) {
            return action.payload;
          }
          return semester;
        });
      })
      .addCase(updateSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default semesterSlice.reducer;
