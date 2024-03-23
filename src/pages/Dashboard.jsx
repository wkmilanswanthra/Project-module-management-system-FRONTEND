import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const menuItems = [
  {
    name: "Faculty Members",
    path: "/faculty",
  },
  {
    name: "Students",
    path: "/students",
  },
  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Assessments",
    path: "/assessments",
  },
  {
    name: "Submissions",
    path: "/submissions",
  },
  {
    name: "Rubrics",
    path: "/rubrics",
  },
  {
    name: "Marksheets",
    path: "/marksheets",
  },
  {
    name: "Semesters",
    path: "/semesters",
  },
  {
    name: "Schedule",
    path: "/schedule",
  },
];

const subMenuItems = [
  {
    name: "Create Assessment",
    path: "/assessments/create",
  },
  {
    name: "Create Rubric",
    path: "/rubrics/create",
  },
  {
    name: "Schedule a Presentation",
    path: "/schedule/create",
  },
  {
    name: "Mark Assessment",
    path: "/marks/new",
  },
];

function Dashboard() {
  return (
    <>
      <Sidebar menuItems={menuItems} subMenuItems={subMenuItems} />
      <div className="p-4 sm:ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
