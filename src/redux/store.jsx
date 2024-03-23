import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/store/auth.slice";
import facultyReducer from "../features/faculty/store/faculty.slice";
import studentsReducer from "../features/students/store/students.slice";
import projectReducer from "../features/project/store/project.slice";
import assessmentReducer from "../features/assessments/store/assessment.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    faculty: facultyReducer,
    students: studentsReducer,
    project: projectReducer,
    assessment: assessmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
