import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/store/auth.slice";
import facultyReducer from "../features/faculty/store/faculty.slice";
import studentsReducer from "../features/students/store/students.slice";
import projectReducer from "../features/project/store/project.slice";
import assessmentReducer from "../features/assessments/store/assessment.slice";
import submissionReducer from "../features/submissions/store/submission.slice";
import rubricReducer from "../features/rubrics/store/rubric.slice";
import marksReducer from "../features/marks/store/marks.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    faculty: facultyReducer,
    students: studentsReducer,
    project: projectReducer,
    assessment: assessmentReducer,
    submission: submissionReducer,
    rubric: rubricReducer,
    marks: marksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
