import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

const api = makeApi();

export const getAllProjects = createAsyncThunk(
  "project/getProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
