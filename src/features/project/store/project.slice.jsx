import { createSlice } from "@reduxjs/toolkit";
import { getAllProjects } from "../api";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default projectSlice.reducer;
