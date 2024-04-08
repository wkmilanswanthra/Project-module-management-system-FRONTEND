import { createSlice } from "@reduxjs/toolkit";
import { getAllFacultyMembers, updateRoles, deleteFacultyMember } from "../api";

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
      })
      .addCase(updateRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoles.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFacultyMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFacultyMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFacultyMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default facultySlice.reducer;
