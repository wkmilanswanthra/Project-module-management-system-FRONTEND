import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const createNewPublication = createAsyncThunk(
  "publications/createNewPublication",
  async (data) => {
    const api = makeApi();
    const response = await api.post("/publications", data);
    return response.data;
  }
);

export const getPublication = createAsyncThunk(
  "publications/getPublication",
  async (id) => {
    const api = makeApi();
    const response = await api.get(`/publications/${id}`);
    return response.data;
  }
);

export const getPublicationByProjectId = createAsyncThunk(
  "publications/getPublicationByStudentId",
  async (id) => {
    const api = makeApi();
    const response = await api.get(`/publications/project/${id}`);
    return response.data;
  }
);

export const updatePublication = createAsyncThunk(
  "publications/updatePublication",
  async (data) => {
    const api = makeApi();
    const response = await api.patch(`/publications/${data.id}`, data);
    return response.data;
  }
);

export const deletePublication = createAsyncThunk(
  "publications/deletePublication",
  async (id) => {
    const api = makeApi();
    const response = await api.delete(`/publications/${id}`);
    return response.data;
  }
);
