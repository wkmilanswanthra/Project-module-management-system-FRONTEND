import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, redirect } from "react-router-dom";
import { getRoutes, authRoutes } from "./RouteMap";
import PageNotFound from "../pages/PageNotFound";
import PageUnauthorized from "../pages/Unauthorized";
import { Roles } from "../assets/constants";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import PrivateRoutes from "./../pages/PrivateRoutes";

const ApplicationRoutes = () => {
  const { isLoggedIn, role, project } = useSelector((state) => state.auth);
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  const [allowedAuthRoutes, setAllowedAuthRoutes] = useState([]);
  const [isProjectAvailable, setIsProjectAvailable] = useState(false);

  useEffect(() => {
    console.log("project", project);
    setAllowedRoutes(setupRoutes(project));
    setAllowedAuthRoutes(getAuthRoutes());
  }, []);

  useEffect(() => {
    setAllowedRoutes(setupRoutes(project));
    setAllowedAuthRoutes(getAuthRoutes());
  }, [isLoggedIn, role, project]);

  const setupRoutes = (project) => {
    let y = [];

    getRoutes(!!project).forEach((route) => {
      if (route.allowedRoles.includes(role)) {
        let x = {
          path: route.path,
          element: route.element,
          childRoutes: [],
        };
        route?.childRoutes?.forEach((childRoute) => {
          if (childRoute.allowedRoles.includes(role)) {
            x.childRoutes.push(childRoute);
          } else {
            x.childRoutes.push({
              path: childRoute.path,
              element: <PageUnauthorized />,
            });
          }
        });
        y.push(x);
      }
    });

    return y;
  };

  const getAuthRoutes = () => {
    let y = [];
    authRoutes.forEach((route) => {
      let x = {
        path: route.path,
        element: route.element,
        childRoutes: [],
      };
      route?.childRoutes?.forEach((childRoute) => {
        x.childRoutes.push(childRoute);
      });
      y.push(x);
    });
    return y;
  };

  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        {allowedRoutes.map((route, index) => {
          if (route.childRoutes.length > 0) {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                childRoutes={route.childRoutes}
              >
                {route.childRoutes.map((childRoute, index) => (
                  <Route
                    key={index}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
              </Route>
            );
          } else {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        })}
      </Route>
      {!isLoggedIn &&
        getAuthRoutes().map((route, index) => {
          if (route.childRoutes.length > 0) {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                childRoutes={route.childRoutes}
              >
                {route.childRoutes.map((childRoute, index) => (
                  <Route
                    key={index}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
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
