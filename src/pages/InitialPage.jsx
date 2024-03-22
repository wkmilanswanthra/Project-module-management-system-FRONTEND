import React from "react";
import WelcomeContainer from "../features/auth/components/WelcomeContainer";
import LoginContainer from "../features/auth/components/LoginContainer";
import StudentRegisterContainer from "../features/auth/components/StudentRegisterContainer";
import FacultyRegisterContainer from "../features/auth/components/FacultyRegisterContainer";
import { Route, Routes, Outlet } from "react-router-dom";
import PageNotFound from "./PageNotFound";

export default function InitialPage() {
  return <Outlet />;
}
