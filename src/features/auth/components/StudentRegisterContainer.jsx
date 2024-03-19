import React from "react";
import { Link } from "react-router-dom";

const StudentRegisterContainer = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div
        style={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="md:w-full w-[80%]"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-20">
          Student Registration
        </h1>
        <form className="w-full max-w-md md:max-w-3xl  grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="contact"
              >
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="specialization"
              >
                Specialization
              </label>
              <select
                id="specialization"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              >
                <option value="IT">Information Technology</option>
                <option value="SE">Software Engineering</option>
                <option value="IS">Information Systems</option>
                <option value="CS">Cyber Security</option>
                <option value="DS">Data Science</option>
                <option value="CSNE">
                  Computer Systems and Network Engineering
                </option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-900 mb-1"
                htmlFor="registrationNumber"
              >
                Registration Number
              </label>
              <input
                id="registrationNumber"
                type="text"
                placeholder="Enter your registration number"
                className="w-full text-sm px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col col-span-2 w-full items-center">
            <div className="text-sm text-gray-500 hover:text-blue-500 mt-4 mb-2 w-min-[50%]">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </div>
            <button
              type="submit"
              className="px-2 my-2 min-w-[50%] w-[50%]   bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out "
            >
              Register
            </button>
            <Link
              to="/login"
              className="px-2 my-2 w-[50%]  text-center bg-gray-300 text-gray-900 font-bold py-3 rounded-lg hover:bg-white hover:text-gray-900 shadow-sm transition duration-300 ease-in-out"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <footer className="mt-auto py-4 text-center text-gray-500 text-sm justify-end">
        &copy; {new Date().getFullYear()} Grade Master. All rights reserved.
      </footer>
    </div>
  );
};

export default StudentRegisterContainer;
