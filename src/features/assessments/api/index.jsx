import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const getAllAssessments = createAsyncThunk(
  "assessments/getAllAssessments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApi().get("/assessments");
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

export const createAssessment = createAsyncThunk(
  "assessments/createAssessment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await makeApi().post("/assessments", data);
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
