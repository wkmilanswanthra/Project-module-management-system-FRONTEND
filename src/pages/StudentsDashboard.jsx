import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { getAllSemesters } from "./../features/semester/api/index";

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

function StudentsDashboard() {
  const { project } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSemesters());
  }, [dispatch]);

  return project ? (
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
