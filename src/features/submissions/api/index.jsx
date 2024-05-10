import { createAsyncThunk } from "@reduxjs/toolkit";

import makeApi from "./../../../config/axiosConfig";

export const fetchAllSubmissions = createAsyncThunk(
  "submissions/fetchAllSubmissions",
  async (role, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/submissions?role=${role}`);
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

export const getSubmission = createAsyncThunk(
  "submissions/getSubmission",
  async (submissionId, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/submissions/${submissionId}`);
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

export const getSubmissionByProjectId = createAsyncThunk(
  "submissions/getSubmissionByProjectId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await makeApi().get(`/submissions/project/${id}`);
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
