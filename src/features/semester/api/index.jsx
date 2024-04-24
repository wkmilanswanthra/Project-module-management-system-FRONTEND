import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const getAllSemesters = createAsyncThunk(
  "semesters/getAllSemesters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApi().get("/semesters");
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

export const updateSemester = createAsyncThunk(
  "semesters/updateSemester",
  async (data, { rejectWithValue }) => {
    try {
      const response = await makeApi().patch(`/semesters/${data.id}`, data);
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
