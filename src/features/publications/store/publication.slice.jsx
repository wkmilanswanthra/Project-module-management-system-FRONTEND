import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPublication,
  getPublication,
  getPublicationByProjectId,
  updatePublication,
  deletePublication,
} from "../api/index.jsx";

const initialState = {
  publications: [],
  publication: null,
  loading: false,
  error: null,
};

const publicationSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    clearPublication: (state) => {
      state.publication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPublication.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPublication.fulfilled, (state, action) => {
        state.loading = false;
        state.publications.push(action.payload);
      })
      .addCase(createNewPublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPublication.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPublication.fulfilled, (state, action) => {
        state.loading = false;
        state.publication = action.payload;
      })
      .addCase(getPublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPublicationByProjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPublicationByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.publications = action.payload;
      })
      .addCase(getPublicationByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePublication.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePublication.fulfilled, (state, action) => {
        state.loading = false;
        state.publication = action.payload;
      })
      .addCase(updatePublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePublication.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePublication.fulfilled, (state, action) => {
        state.loading = false;
        state.publications = state.publications.filter(
          (publication) => publication.id !== action.payload.id
        );
      })
      .addCase(deletePublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default publicationSlice.reducer;
