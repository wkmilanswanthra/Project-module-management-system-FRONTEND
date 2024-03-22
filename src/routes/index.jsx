import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import InitialPage from "../pages/InitialPage";
import Dashboard from "../pages/Dashboard";
import routes from "./RouteMap";
import PageNotFound from "../pages/PageNotFound";
import { Roles } from "../assets/constants";
import { useSelector } from "react-redux";

const ApplicationRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");
  const allowedRoutes = [];
  const currentRole = Roles.PROJECT_COORDINATOR;

  if (token) {
    routes.forEach((route) => {
      if (route.allowedRoles.includes(currentRole)) {
        let x = {
          path: route.path,
          element: route.element,
          childRoutes: [],
        };
        route?.childRoutes?.forEach((childRoute) => {
          if (childRoute.allowedRoles.includes(currentRole)) {
            x.childRoutes.push(childRoute);
          }
        });
        allowedRoutes.push(x);
      }
    });
  }

  return (
    <Routes>
      {!isLoggedIn && <Route path="/*" element={<InitialPage />} />}
      {isLoggedIn &&
        allowedRoutes.map((route, index) => {
          if (route.childRoutes.length > 0) {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                childRoutes={route.childRoutes}
              >
                {route.childRoutes.map((childRoute, index) => {
                  return (
                    <Route
                      key={index}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  );
                })}
              </Route>
            );
          } else {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        })}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ApplicationRoutes;
