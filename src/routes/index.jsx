import React from "react";
import { Route, Routes } from "react-router-dom";
import InitialPage from "../pages/InitialPage";
import Dashboard from "../pages/Dashboard";
import routes from "./RouteMap";

const ApplicationRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const token = localStorage.getItem("token");
  const allowedRoutes = [];

  if (token) {
    routes.forEach((route) => {
      if (route.allowedRoles.includes("PROJECT_COORDINATOR")) {
        allowedRoutes.push(route);
      }
    });
  }

  return (
    <Routes>
      <Route path="/*" element={<InitialPage />} />
      {isLoggedIn &&
        allowedRoutes.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={<Dashboard />} />
          );
        })}
    </Routes>
  );
};

export default ApplicationRoutes;
