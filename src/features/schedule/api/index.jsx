import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const getAllSchedules = createAsyncThunk(
  "schedules/getAllSchedules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApi().get("/schedules");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getScheduleById = createAsyncThunk(
  "schedules/getScheduleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getScheduleByAssessmentId = createAsyncThunk(
  "schedules/getScheduleByAssessmentId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/schedules/assessment/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createSchedule = createAsyncThunk(
  "schedules/createSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const response = await makeApi().post("/schedules", data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateSchedule = createAsyncThunk(
  "schedules/updateSchedule",
  async (data, { rejectWithValue }) => {
    try {
      const response = await makeApi().patch(`/schedules/${data.id}`, data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteSchedule = createAsyncThunk(
  "schedules/deleteSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApi().delete(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
