import React from "react";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const routes = [
  {
    path: "/dashboard/*",
    element: Dashboard,
    allowedRoles: ["PROJECT_COORDINATOR"],
  },
];

export default routes;
