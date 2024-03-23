import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "../../../config/axiosConfig";

const api = makeApi();

export const getAllStudents = createAsyncThunk(
  "auth/students/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/students/all");
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
