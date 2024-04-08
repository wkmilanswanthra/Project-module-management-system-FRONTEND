import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const createNewmarking = createAsyncThunk(
  "marks/createNewmarking",
  async (data) => {
    const api = makeApi();
    const response = await api.post("/marks", data);
    return response.data;
  }
);

export const getMarking = createAsyncThunk("marks/getMarking", async (id) => {
  const api = makeApi();
  const response = await api.get(`/marks/${id}`);
  return response.data;
});

export const getMarkingBySubmissionId = createAsyncThunk(
  "marks/getMarkingBySubmissionId",
  async (id) => {
    const api = makeApi();
    const response = await api.get(`/marks/submission/${id}`);
    return response.data;
  }
);

export const updateMarking = createAsyncThunk(
  "marks/updateMarking",
  async (data) => {
    const api = makeApi();
    const response = await api.patch(`/marks/${data.id}`, data);
    return response.data;
  }
);

export const deleteMarking = createAsyncThunk(
  "marks/deleteMarking",
  async (id) => {
    const api = makeApi();
    const response = await api.delete(`/marks/${id}`);
    return response.data;
  }
);
