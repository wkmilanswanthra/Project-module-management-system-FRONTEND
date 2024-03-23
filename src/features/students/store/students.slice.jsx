import { createSlice } from "@reduxjs/toolkit";
import { getAllStudents } from "../api";

const studentsSlice = createSlice({
  name: "students",
  initialState: { students: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentsSlice.reducer;
