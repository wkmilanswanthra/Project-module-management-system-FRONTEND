import { createSlice } from "@reduxjs/toolkit";
import { getAllFacultyMembers } from "../api";

const facultySlice = createSlice({
  name: "faculty",
  initialState: { members: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFacultyMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFacultyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(getAllFacultyMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facultySlice.reducer;
