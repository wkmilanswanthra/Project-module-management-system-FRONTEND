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
      let url = "/auth/register";
      if (!data.student) url = "/auth/faculty/register";
      delete data.student;
      const response = await api.post(url, data);
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

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/verify-email", data);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("project");
});

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      let project = localStorage.getItem("project") || "";
      project = project ? JSON.parse(project) : null;
      if (!token) {
        return rejectWithValue("Token not found");
      }
      const user = jwtDecode(token);
      return { user, token, project };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// export const getMe = createAsyncThunk(
//   "auth/getMe",
//   async (_, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const response = await makeApi().get("/auth/me");
//       return { ...response.data };
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
