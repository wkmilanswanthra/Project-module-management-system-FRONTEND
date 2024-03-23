import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const api = makeApi();

export const getAllFacultyMembers = createAsyncThunk(
  "auth/faculty/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/faculty/all");
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

export const addFacultyMember = async (values) => {
  values.student = false;
  try {
    const response = await api.post("/auth/faculty/add", values);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateFacultyMember = async (values) => {
  try {
    const response = await api.put("/auth/faculty/update", values);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
