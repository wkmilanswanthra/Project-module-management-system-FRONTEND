import React from "react";
import WelcomeContainer from "../features/auth/components/WelcomeContainer";
import LoginContainer from "../features/auth/components/LoginContainer";
import StudentRegisterContainer from "../features/auth/components/StudentRegisterContainer";
import FacultyRegisterContainer from "../features/auth/components/FacultyRegisterContainer";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function InitialPage() {
  return (
    <Routes>
      <Route path="" element={<WelcomeContainer />} />
      <Route path="login" element={<LoginContainer />} />
      <Route path="signup" element={<StudentRegisterContainer />} />
      <Route path="faculty/signup" element={<FacultyRegisterContainer />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
