import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout, getMe } from "./../api";
import { Roles } from "../../../assets/constants";

const prioritizedRoles = [
  Roles.PROJECT_COORDINATOR,
  Roles.MEMBER,
  Roles.EXAMINER,
  Roles.SUPERVISOR,
  Roles.CO_SUPERVISOR,
  Roles.STAFF,
  Roles.PROJECT_LEADER,
  Roles.STUDENT,
];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    project: null,
    token: null,
    roles: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    changeRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user.user;
        state.roles = action.payload.role;
        state.role =
          prioritizedRoles.find((role) =>
            action.payload.user.role.includes(role)
          ) || Roles.STUDENT;

        state.project = action.payload.project || null;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user.user;
        state.roles = action.payload.role;
        state.role =
          prioritizedRoles.find((role) =>
            action.payload.user.role.includes(role)
          ) || Roles.STUDENT;
        state.project = action.payload.project || null;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user.user;
        state.roles = action.payload.user.role;
        state.role =
          prioritizedRoles.find((role) =>
            action.payload.user.role.includes(role)
          ) || Roles.STUDENT;
        state.isLoggedIn = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { changeRole } = authSlice.actions;

export default authSlice.reducer;
