import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const api = makeApi();

export const getAllFacultyMembers = createAsyncThunk(
  "auth/users/:role",
  async (role, { rejectWithValue }) => {
    try {
      const response = await api.get(`/auth/users/${role}`);
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
