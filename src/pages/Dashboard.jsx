import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import StudentsContainer from "../features/dashboard/components/StudentsContainer";
import FacultyContainer from "../features/dashboard/components/FacultyContainer";
import Projectscontainer from "../features/dashboard/components/ProjectsContainer";
import SemesterContainer from "../features/dashboard/components/SemesterContainer";
import MarksheetsContainer from "../features/dashboard/components/MarksheetsContainer";
import AssessmentsContainer from "../features/dashboard/components/AssessmentsContainer";

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
    name: "Marksheets",
    path: "/marksheets",
  },
  {
    name: "Semesters",
    path: "/semsters",
  },
];

function Dashboard() {
  return (
    <>
      <Sidebar menuItems={menuItems} />
      <div class="p-4 sm:ml-64">
        <Routes>
          <Route path="/" element={<FacultyContainer />} />
          <Route path="/faculty" element={<FacultyContainer />} />
          <Route path="/students" element={<StudentsContainer />} />
          <Route path="/projects" element={<Projectscontainer />} />
          <Route path="/assessments" element={<AssessmentsContainer />} />
          <Route path="/marksheets" element={<MarksheetsContainer />} />
          <Route path="/semsters" element={<SemesterContainer />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;
