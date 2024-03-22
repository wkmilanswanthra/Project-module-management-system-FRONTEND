import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, redirect } from "react-router-dom";
import routes, { authRoutes } from "./RouteMap";
import PageNotFound from "../pages/PageNotFound";
import PageUnauthorized from "../pages/Unauthorized";
import { Roles } from "../assets/constants";
import { useSelector } from "react-redux";

const ApplicationRoutes = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [allowedRoutes, setAllowedRoutes] = useState([]);

  useEffect(() => {
    setAllowedRoutes(setupRoutes);
  }, []);

  useEffect(() => {
    setAllowedRoutes(setupRoutes);
  }, [isLoggedIn, role]);

  const setupRoutes = () => {
    let y = [];
    if (isLoggedIn) {
      routes.forEach((route) => {
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
        } else {
          y.push({
            path: route.path,
            element: <PageUnauthorized />,
            childRoutes: [],
          });
        }
      });
    } else {
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
    }

    return y;
  };

  return (
    <Routes>
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

      <Route path="*" element={<PageNotFound />} />
      {/* <Route path="/401" element={<PageUnauthorized />} /> */}
    </Routes>
  );
};

export default ApplicationRoutes;
