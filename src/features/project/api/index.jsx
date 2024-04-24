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

export const createProject = createAsyncThunk(
  "project/createProject",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.post("/projects", values);
      localStorage.setItem("project", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (values, { rejectWithValue }) => {
    try {
      const response = await api.put("/projects", values);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
