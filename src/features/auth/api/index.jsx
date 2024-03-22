import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "./../../../config/axiosConfig";
import { jwtDecode } from "jwt-decode";

const api = makeApi();

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      const user = jwtDecode(response.data.token);
      response.data.user = user;
      response.data.role = user.role;
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

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", data);
      const user = jwtDecode(response.data.token);
      response.data.user = user;
      response.data.role = user.role;
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
