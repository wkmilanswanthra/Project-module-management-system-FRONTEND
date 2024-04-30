import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const getAllMarksheets = createAsyncThunk(
  "marksheet/getAllMarksheets",
  async () => {
    const api = makeApi();
    const response = await api.get("/marksheets");
    return response.data;
  }
);

export const generateMarksheets = createAsyncThunk(
  "marksheet/generateMarksheets",
  async (_) => {
    const api = makeApi();
    const response = await api.post("/marksheets/generate");
    return response.data;
  }
);

export const getMarksheetById = createAsyncThunk(
  "marksheet/getMarksheetById",
  async (id) => {
    const api = makeApi();
    const response = await api.get(`/marksheets/${id}`);
    return response.data;
  }
);
