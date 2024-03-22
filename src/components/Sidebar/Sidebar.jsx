import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Divider } from "antd";

function Sidebar({ menuItems, subMenuItems }) {
  const location = useLocation();

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="z-40 fixed top-[84px] w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-400 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 font-medium">
            {menuItems?.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`block p-2 rounded-md hover:bg-gray-100 ${
                    location.pathname === "/dashboard" + item.path
                      ? "bg-gray-200"
                      : "text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {subMenuItems && <Divider />}
            {subMenuItems?.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`block p-2 rounded-md hover:bg-gray-100 ${
                    location.pathname === "/dashboard" + item.path
                      ? "bg-gray-200"
                      : "text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
