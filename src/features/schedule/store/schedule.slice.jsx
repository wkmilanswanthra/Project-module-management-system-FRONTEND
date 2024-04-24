import * as api from "../api/index";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schedules: [],
  schedule: null,
  loading: false,
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(api.getAllSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(api.getAllSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(api.getAllSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(api.getScheduleById.pending, (state) => {
        state.loading = true;
      })
      .addCase(api.getScheduleById.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(api.getScheduleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(api.getScheduleByAssessmentId.pending, (state) => {
        state.loading = true;
      })
      .addCase(api.getScheduleByAssessmentId.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(api.getScheduleByAssessmentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(api.createSchedule.pending, (state) => {
        state.loading = true;
      })
      .addCase(api.createSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      })
      .addCase(api.createSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
