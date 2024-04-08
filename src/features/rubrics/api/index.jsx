import { createAsyncThunk } from "@reduxjs/toolkit";
import makeApi from "../../../config/axiosConfig";

export const fetchAllRubrics = createAsyncThunk(
  "rubrics/fetchAllRubrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeApi().get("/rubrics");
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

export const createRubric = createAsyncThunk(
  "rubrics/createRubric",
  async (rubric, { rejectWithValue }) => {
    try {
      const response = await makeApi().post("/rubrics", rubric);
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

export const getRubric = createAsyncThunk(
  "rubrics/getRubric",
  async (rubricId, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/rubrics/${rubricId}`);
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

export const getRubricByAssessmentId = createAsyncThunk(
  "rubrics/getRubricByAssessmentId",
  async (assessmentId, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(
        `/rubrics/assessment/${assessmentId}`
      );
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

export const updateRubric = createAsyncThunk(
  "rubrics/updateRubric",
  async (rubric, { rejectWithValue }) => {
    try {
      const response = await makeApi().put(`/rubrics/${rubric.id}`, rubric);
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

export const deleteRubric = createAsyncThunk(
  "rubrics/deleteRubric",
  async (rubricId, { rejectWithValue }) => {
    try {
      const response = await makeApi().delete(`/rubrics/${rubricId}`);
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
