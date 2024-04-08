import React, { useState, Fragment, useEffect } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { Roles } from "../../assets/constants";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/api";
import { openNotificationWithIcon } from "../../util/notifications";
import { changeRole } from "../../features/auth/store/auth.slice";

const NavBar = ({ name }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [links, setLinks] = useState([]);
  const { roles } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout())
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Logged out successfully",
          "You have been logged out successfully"
        );
        navigate("/");
      })
      .catch((e) => {
        openNotificationWithIcon(
          "error",
          "Error",
          "An error occurred while logging out"
        );
      });
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 shadow-sm z-[100]">
      <div className="flex items-center flex-shrink-0 mr-6">
        <img src={logo} alt="Logo" className="h-8 mr-2"></img>
        <span className="font-semibold text-xl tracking-tight">
          Grade Master
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded border-black ">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">{links}</div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {name}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {roles.map((element) => {
                  if (element.toString() !== "STAFF") {
                    return (
                      <Menu.Item key={element}>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              dispatch(changeRole(element));
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-500"
                                : "text-gray-900",
                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            {element.toString()}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  }
                  return null;
                })}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logOut}
                      className={classNames(
                        active ? "bg-gray-100 text-red-500" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default NavBar;
