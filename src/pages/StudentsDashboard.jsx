import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Assessments",
    path: "/assessments",
  },
];

const subMenuItems = [
  {
    name: "Add Publication",
    path: "/add-publication",
  },
];

function StudentsDashboard({ hasAProject }) {
  return hasAProject ? (
    <>
      <Sidebar menuItems={menuItems} subMenuItems={subMenuItems} />
      <div className="p-4 sm:ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </>
  ) : (
    <Outlet />
  );
}

export default StudentsDashboard;
